import { verifyToken } from '../utils/helper.js'; // adjust path as needed

export const authMid = (req, res, next) => {
  try {

    const token = req.cookies.token 
   
    if (!token) {
      return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ success: false, message: 'Invalid or expired token.' });
    }
  
    req.user = decoded; 
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: 'Authentication failed.', error: err.message });
  }
};
