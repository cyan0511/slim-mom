import jwt from 'jsonwebtoken'; // Import jwt to verify the token

export function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: 'Access token is missing' });
  }

  try {
    const verifiedUser = jwt.verify(token, 'your_secret_key'); // Use your JWT secret key
    req.user = verifiedUser; // Attach the user data to the request
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
}
