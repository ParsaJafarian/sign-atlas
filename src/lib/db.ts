import mongoose from "mongoose";

/**
 * Connect to the database using the MONGO_URI environment variable
 */
export default async function connectDB() {
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI is not defined");
  if (!mongoose.connection || mongoose.connection.readyState === 1) {
    console.log("Database is already connected");
    return;
  }

  await mongoose.connect(process.env.MONGO_URI);
  mongoose.Promise = global.Promise;
  mongoose.connection.on(
    "error",
    console.error.bind(console, "connection error:"),
  );
  mongoose.connection.once("open", () => console.log("Database connected"));
}
