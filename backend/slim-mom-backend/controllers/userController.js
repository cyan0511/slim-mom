import bcrypt from 'bcrypt';

const users = []; 

export const registerUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'username and password are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({ username, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully' });
};
