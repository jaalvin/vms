import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not set");
    }

    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.info(`Database connected: ${connection.connection.host}`);
  } catch (error) {
    console.error("Unable to connect to database", error.message);
    process.exit(1);
  }
};

export default connectDB;
