import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";

// Load environment variables
dotenv.config();
const { DB_HOST, PORT = 5001 } = process.env;

// Validate required environment variables
if (!DB_HOST) {
  throw new Error("DB_HOST is missing in the environment variables");
}

// Function to connect to the database
const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection successful");

    // Start the server after a successful DB connection
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (err) {
    console.error(`Error connecting to the database: ${err.message}`);
    process.exit(1);
  }
};

// Graceful shutdown for database connection
const shutdown = async () => {
  try {
    await mongoose.connection.close();
    console.log("Database connection closed");
    process.exit(0);
  } catch (err) {
    console.error("Error closing database connection:", err.message);
    process.exit(1);
  }
};

// Call the function to connect to the database
connectToDatabase();

// Handle process termination signals for graceful shutdown
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
