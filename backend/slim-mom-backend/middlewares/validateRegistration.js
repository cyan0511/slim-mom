export function validateRegistration(req, res, next) {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }
    // Additional validation logic (e.g., email format, password length) can go here
    
    next(); // Proceed to the next middleware or route handler if validation passes
  };

  export default validateRegistration;
  