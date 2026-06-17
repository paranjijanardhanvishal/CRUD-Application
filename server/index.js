const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const UserModel = require('./models/Users');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

mongoose.connect('mongodb://127.0.0.1:27017/CRUD');

app.get('/', (req, res) => {
    UserModel.find({})
        .then(users => res.json(users))
        .catch(err => res.json(err));
});

app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;

    UserModel.findById(id)
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

app.post('/create', upload.single('resume'), (req, res) => {
    const userData = {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        gender: req.body.gender,
        education: req.body.education,
        skills: JSON.parse(req.body.skills),
        resume: req.file ? req.file.filename : ""
    };

    UserModel.create(userData)
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

app.put('/updateUser/:id', upload.single('resume'), (req, res) => {
    const id = req.params.id;

    const updateData = {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        gender: req.body.gender,
        education: req.body.education,
        skills: JSON.parse(req.body.skills)
    };

    if (req.file) {
        updateData.resume = req.file.filename;
    }

    UserModel.findByIdAndUpdate(id, updateData)
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;

    UserModel.findByIdAndDelete(id)
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

mongoose.connection.on('connected', () => {
    console.log('MongoDB Connected');
});

mongoose.connection.on('error', (err) => {
    console.log(err);
});

app.put('/removeResume/:id', async (req, res) => {
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

app.listen(3001, () => {
    console.log('Server is running');
});