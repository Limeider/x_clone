import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    link: {
        type: String,
        default: "",
        trim: true
    },
    bio: {
        type: String,
        default: "",
        trim: true
    },
    profileImg: {
        type: String,
        default: "",
        trim: true
    },
    coverImg: {
        type: String,
        default: "",
        trim: true
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId, // 16 char ID
            ref: "User",
            default: []
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId, // 16 char ID
            ref: "User",
            default: []
        }
    ]
}, {timestamps: true})

const UserModel = mongoose.model("User", userSchema);

export default UserModel;