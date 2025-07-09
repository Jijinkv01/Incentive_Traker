const jwt = require("jsonwebtoken")

const userAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
        }
        const token = authHeader.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SCRET);

            req.user = decoded
            next()

    } catch (error) {
         console.error("JWT Auth Error:", error);
    return res.status(401).json({ success: false, message: "Unauthorized: Invalid or expired token" });
    }
}

module.exports = userAuth