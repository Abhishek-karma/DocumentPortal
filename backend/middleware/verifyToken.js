import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
 
    const token = req.cookies?.token || 
                 req.headers.authorization?.split(' ')[1];
    
    if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach full user object to request
        req.user = {
            id: decoded.userId,
            // Add other decoded fields if needed
        };
        
        next();
    } catch (error) {
        console.log("Token verification error:", error);
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
};