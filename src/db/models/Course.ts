/**
 * Mongoose model Course for course collection
 * It contains all courses offered to every user.
 * It should not be confused with the enrollment collection, which contains the courses that a user is enrolled in.
 */
import mongoose from "mongoose";
import connectDB from "../connectDB";

connectDB();

// Define the course interface for typescript type checking
export interface ICourse extends mongoose.Document {
  title: string;
  description: string;
  lessons: string[]; // each string is the name of the lesson
  courseEndpoint: string;
  testEndpoint: string;
}

// Define the course schema
const courseSchema = new mongoose.Schema<ICourse>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  lessons: {
    type: [String],
    required: true,
    validate: {
      validator: (lessons: string[]) => lessons.length > 0,
      message: "At least one lesson is required",
    },
  },
  courseEndpoint: {
    type: String,
    required: true,
  },
  testEndpoint: {
    type: String,
    required: true,
  },
});

//If the Course model already exists, use it.
//Otherwise, create a new Course model using the course schema and ICourse interface
const Course =
  mongoose.models?.Course || mongoose.model<ICourse>("Course", courseSchema);

// Export the Course model
export default Course;
