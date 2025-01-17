import express, { urlencoded } from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

app.use(express.json()) // parses client JSON req to js object
app.use(express.urlencoded({ extended: true })) // to parse urlencoded form data from postman
app.use(cookieParser());

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
    connectToMongoDB();
})

// app.listen(6000, () => {
//     console.log("Server is running on port 6000.")
// })