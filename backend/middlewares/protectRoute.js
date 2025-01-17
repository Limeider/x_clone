import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt; // name of our cookie was jwt, .cookies made available by cookie parser
        if (!token) {
            return res.status(400).json({ error: "Token not found." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(400).json({ error: "Invalid Token." });
        }

        const user = await UserModel.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(400).json({ error: "User not found." });
        }

        req.user = user;
        next();
    } catch (e) {
        console.log("error in protectRoute route ", e.message);
        return res.status(500).json({ error: "Internal server error." });
    }
}

export default protectRoute;