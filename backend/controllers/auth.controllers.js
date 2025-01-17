import UserModel from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await UserModel.findOne({ username });
        if (!existingUser) {
            return res.status(400).json({ error: "User does not exist." });
        }

        if (await bcrypt.compare(password || "", existingUser.password || "")) {
            generateTokenAndSetCookie(existingUser._id, res);

            res.status(201).json({
                _id: existingUser._id,
                fullname: existingUser.fullname,
                username: existingUser.username,
                email: existingUser.email,
                followers: existingUser.followers,
                following: existingUser.following,
                profileImg: existingUser.profileImg,
                coverImg: existingUser.coverImg
            })
        } else {
            return res.status(400).json({ error: "Password is incorrect." });
        }

    } catch (e) {
        console.log("error in login controller ", e.message);
        res.status(500).json({ error: "Internal server error." });
    }
}

export const signup = async (req, res) => {
    try {
        const { fullname, username, email, password } = req.body;
        const emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Email is invalid." })
        }

        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username is already taken." })
        }

        const existingEmail = await UserModel.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ error: "Email is already taken." })
        }

        if (password.length < 8) {
            return res.status(400).json({ error: "Password length is too short." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
            fullname,
            username,
            email,
            password: hashedPassword
        })

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                email: newUser.email,
                followers: newUser.followers,
                following: newUser.following,
                profileImg: newUser.profileImg,
                coverImg: newUser.coverImg
            })
        } else {
            res.status(400).json({ error: "Invalid user data." });
        }

    } catch (e) {
        console.log("error in signup controller ", e.message);
        res.status(500).json({ error: "Internal server error." });
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", {
            maxAge: 0
        })
        res.status(201).json({ message: "logged out successfully." })
    } catch (e) {
        console.log("error in logout controller ", e.message);
        res.status(500).json({ error: "Internal server error." });
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user._id).select("-password");
        res.status(200).json(user);
    } catch (e) {
        console.log("error in getMe controller ", e.message);
        res.status(500).json({ error: "Internal server error." });
    }
}