const errorHandler = (err, req, res, next) => {
  // Log the error stack only in development environment for debugging
  if (process.env.NODE_ENV === "development") {
    console.error(err.stack);
  }

  const statusCode = err.statusCode || 500; // Default to 500 for server errors

  // Prepare error response
  const response = {
    message: err.message || "Internal Server Error", // Provide error message
  };

  // Include error details in development environment for more debugging info
  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
    response.error = err;
  }

  res.status(statusCode).json(response); // Send the error response
};

export default errorHandler;
