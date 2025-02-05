import mongoose from "mongoose"

const connectToMongoDB = async () => {
    try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
} 

export default connectToMongoDB;