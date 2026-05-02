import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    console.log("MONGO_URI:", process.env.MONGO_URI);

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.log("DB Error:", error.message);
    process.exit(1);
  }
};

export default dbConnection;