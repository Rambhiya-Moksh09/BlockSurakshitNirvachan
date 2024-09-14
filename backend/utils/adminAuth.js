import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';

configDotenv();
const checkAdminAuth = (req, res) => {
    const token = req.cookies.adminToken;
    //  console.log(token)
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (decoded.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Access denied: Not an admin' });
        }
        req.admin = decoded;
    } catch (error) {
        // console.log(error)
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

export default checkAdminAuth;