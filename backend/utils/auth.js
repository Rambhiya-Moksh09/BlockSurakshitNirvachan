import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';

configDotenv();

const checkAuth = (req, res) => {
    const token = req.cookies.jwtToken;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }
        req.userId = decoded.id;
        res.status(200).json({ message: 'Authorized' })
    });
};

export default checkAuth;
