const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const UserModel = require('./models/Users');
require('dotenv').config();
const { verifyToken, verifyAdmin } = require('./middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let gfsBucket;
const app = express();

app.use(cors({
    origin: ["https://crud-app-testing.netlify.app", "http://localhost:5173", "http://localhost:5174", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());

app.use('/auth', require('./routes/auth'));

// Protected resume file serving
app.get('/api/resumes/:filename', (req, res) => {
    const token = req.query.token;
    if (!token) return res.status(403).json({ message: "No token provided" });

    const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key';
    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(403).json({ message: "Unauthorized" });

        if (decoded.role !== 'Admin') {
            // Check if the file belongs to the user
            try {
                const user = await UserModel.findOne({ _id: decoded.id, resume: req.params.filename });
                if (!user) {
                    return res.status(403).json({ message: "Unauthorized. You do not own this resume." });
                }
            } catch (error) {
                return res.status(500).json({ message: "Server error" });
            }
        }
        if (!gfsBucket) {
            return res.status(500).send('GridFS is not initialized yet');
        }
        const downloadStream = gfsBucket.openDownloadStreamByName(req.params.filename);
        downloadStream.on('error', (error) => {
            res.status(404).send('File not found');
        });
        downloadStream.pipe(res);
    });
});

const storage = multer.memoryStorage();

const upload = multer({ storage });

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/CRUD');

app.get('/', verifyToken, (req, res) => {
    const query = req.user.role === 'Admin' ? {} : { _id: req.user.id };
    UserModel.find(query).limit(5000)
        .then(users => res.json(users))
        .catch(err => res.json(err));
});

app.get('/getUser/:id', verifyToken, (req, res) => {
    const id = req.params.id;

    if (req.user.role === 'User' && req.user.id !== id) {
        return res.status(403).json({ message: "Access Denied" });
    }

    UserModel.findById(id)
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

app.post('/create', verifyToken, upload.single('resume'), async (req, res) => {
    let filename = "";
    if (req.file) {
        filename = Date.now() + path.extname(req.file.originalname);
        const uploadStream = gfsBucket.openUploadStream(filename, {
            contentType: req.file.mimetype
        });
        uploadStream.end(req.file.buffer);
        await new Promise((resolve, reject) => {
            uploadStream.on('finish', resolve);
            uploadStream.on('error', reject);
        });
    }

    const userData = {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        gender: req.body.gender,
        education: req.body.education,
        skills: JSON.parse(req.body.skills || "[]"),
        resume: filename
    };

    UserModel.create(userData)
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

app.put('/updateUser/:id', verifyToken, upload.single('resume'), async (req, res) => {
    const id = req.params.id;

    if (req.user.role === 'User' && req.user.id !== id) {
        return res.status(403).json({ message: "Access Denied" });
    }

    let filename;
    if (req.file) {
        filename = Date.now() + path.extname(req.file.originalname);
        const uploadStream = gfsBucket.openUploadStream(filename, {
            contentType: req.file.mimetype
        });
        uploadStream.end(req.file.buffer);
        await new Promise((resolve, reject) => {
            uploadStream.on('finish', resolve);
            uploadStream.on('error', reject);
        });
    }

    const updateData = {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        gender: req.body.gender,
        education: req.body.education,
        skills: JSON.parse(req.body.skills || "[]")
    };

    if (filename) {
        updateData.resume = filename;
    }

    UserModel.findByIdAndUpdate(id, updateData, { new: true })
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

app.delete('/deleteUser/:id', verifyToken, verifyAdmin, (req, res) => {
    const id = req.params.id;

    UserModel.findByIdAndDelete(id)
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

const initAdmin = async () => {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@admin.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    const existingAdmin = await UserModel.findOne({ role: 'Admin' });
    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        await UserModel.create({
            name: 'System Admin',
            email: adminEmail,
            password: hashedPassword,
            role: 'Admin'
        });
        console.log('Predefined Admin created:', adminEmail);
    }
};

mongoose.connection.on('connected', () => {
    console.log('MongoDB Connected');
    const db = mongoose.connection.db;
    gfsBucket = new mongoose.mongo.GridFSBucket(db, {
        bucketName: 'resumes'
    });
    initAdmin();
});

mongoose.connection.on('error', (err) => {
    console.log(err);
});

app.put('/removeResume/:id', verifyToken, verifyAdmin, async (req, res) => {
    try {
        await UserModel.findByIdAndUpdate(
            req.params.id,
            { resume: "" }
        );

        res.json("Resume Removed");
    } catch (err) {
        res.json(err);
    }
});

app.put('/updateRole/:id', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const { role } = req.body;
        if (!['Admin', 'User'].includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }
        const updatedUser = await UserModel.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true }
        );
        res.json(updatedUser);
    } catch (err) {
        res.json(err);
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});