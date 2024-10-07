// errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging
  const statusCode = err.statusCode || 500; // Use the error's status code or default to 500
  res.status(statusCode).json({ message: err.message }); // Send a generic error message
};

export default errorHandler; // Export the error handler as the default export
