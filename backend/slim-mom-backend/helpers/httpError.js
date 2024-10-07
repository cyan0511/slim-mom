// Define the messages object with appropriate status codes and messages
const messages = {
  400: "Bad Request",
  401: "Unauthorized",
  404: "Not Found",
  500: "Internal Server Error",
  // Add additional status messages as needed
};

// Define the httpError function
const httpError = (status, message = messages[status]) => {
  // Check if the provided status code is valid
  if (!messages[status]) {
    throw new Error("Invalid status code provided");
  }

  // Create a new Error object with the message
  const error = new Error(message);
  error.status = status;

  // Log the error details for debugging
  console.error(`Error ${status}: ${message}`);
  console.error(error.stack); // Log the stack trace for debugging

  return error;
};

// Export the httpError function
export { httpError };
