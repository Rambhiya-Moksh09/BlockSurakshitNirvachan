import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';

configDotenv();

const checkAuth = (req, res, next) => {
    const token = req.cookies['uid'];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }


        req.userId = decoded.id;
        next();
    });
};

export default checkAuth;
