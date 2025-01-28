const User = require('../models/User');
const jwt = require('jsonwebtoken');

const adminAuthenticate = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded",decoded)
        const user = await User.findById(decoded.id);
        if (user && user.role === 'admin') {
            req.admin = decoded;
            next();
        } else {
            res.status(403).json({ error: 'Access denied. Admins only.' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Invalid token.' });
    }
};

module.exports = adminAuthenticate;


