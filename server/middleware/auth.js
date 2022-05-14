const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.header("vstack");
    if (!token) return res.json({ success: false, error: "User not log in!" });
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_CODE);
        req.body.userId = decoded.id;
        next();
    } catch (error) {
        return res.json({
            success: false,
            error: "User not log in!",
        });
    }
};

module.exports = verifyToken;
