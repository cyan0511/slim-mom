import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  // Check if the authorization header is present and follows the 'Bearer <token>' format
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({ message: "Access denied, token missing!" });

  try {
    // Verify the token using the secret key stored in your environment variable
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user info (from token payload) to the request object for later use
    req.user = decoded;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
