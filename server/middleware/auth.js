const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key';

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(403).json({ message: "No token provided" });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(403).json({ message: "No token provided" });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Unauthorized!" });
        req.user = decoded; // { id, role }
        next();
    });
};

const verifyAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'Admin') {
        next();
    } else {
        res.status(403).json({ message: "Require Admin Role!" });
    }
};

const verifyEditorOrAdmin = (req, res, next) => {
    if (req.user && (req.user.role === 'Admin' || req.user.role === 'Editor')) {
        next();
    } else {
        res.status(403).json({ message: "Require Admin or Editor Role!" });
    }
};

module.exports = {
    verifyToken,
    verifyAdmin,
    verifyEditorOrAdmin
};
