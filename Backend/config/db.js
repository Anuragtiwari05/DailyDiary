import mongoose from 'mongoose';

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);  
        console.log("database connected");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
    }
};

export default connectDb;
