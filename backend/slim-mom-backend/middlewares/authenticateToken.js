// middlewares/authenticateToken.js

export const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  // Implement your token verification logic here
  if (!token) return res.sendStatus(401); // Unauthorized
  // If token is valid, call next()
  next();
};
