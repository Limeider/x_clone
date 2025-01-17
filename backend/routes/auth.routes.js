import express from "express";
import { getMe, login, signup, logout } from "../controllers/auth.controllers.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/me", protectRoute, getMe)
router.post("/login", login)
router.post("/signup", signup)
router.post("/logout", logout)

export default router;