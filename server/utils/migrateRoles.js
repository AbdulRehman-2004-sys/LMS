import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import dotenv from "dotenv";
import connectDB from "../database/db.js";

dotenv.config();

const migrate = async () => {
  try {
    await connectDB();
    console.log("Connected to DB...");

    // Update all users to 'student' except the special instructor
    const result = await User.updateMany(
      { email: { $ne: "instructor@gmail.com" } },
      { $set: { role: "student" } }
    );

    console.log(`Updated ${result.modifiedCount} users to 'student'.`);
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
};

migrate();
