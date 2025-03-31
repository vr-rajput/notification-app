import jwt from "jsonwebtoken";

export const authenticateToken = ( req, res, next ) => {
    try {
        const token = req.header("Authorization");
        if (!token) return res.status(401).json({ error: "Access denied. No token provided." });
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log("error: ", error?.message);
        return res.status(401).json({ error: error?.message });
    }
}