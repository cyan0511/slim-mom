import app from "./app.js"; // Make sure to include the file extension
import connectDB from "./config/database.js"; // Same here

const PORT = process.env.PORT || 8080;

// Connect to MongoDB
const startServer = async () => {
  try {
    await connectDB(); // Ensure the connection to the database is established
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    process.exit(1); // Exit the application with a failure code
  }
};

// Start the server
startServer();

// Graceful shutdown
const shutdown = () => {
  console.log("Shutting down gracefully...");
  process.exit(0); // Exit the application gracefully
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
