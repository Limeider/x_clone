import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

console.log(process.env.MONGO_URI);

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
    connectToMongoDB();
})

// app.listen(6000, () => {
//     console.log("Server is running on port 6000.")
// })