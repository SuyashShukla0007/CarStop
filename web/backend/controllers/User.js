import User from '../Models/User.js';
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const secret = 'ca'; // Use environment variable for secret

// Get User
export const getUser = async (req, res) => {
    try {
        const toke = req.cookies.token // Access token from cookies

        if (!toke) {
            return res.status(400).json("Token is required");
        }

        // Log the token and secret for debugging
        console.log("Token:", toke);
        console.log("JWT Secret:", secret);

        const decoded = jwt.verify(toke, 'ca');

        if (!decoded || !decoded.id) {
            return res.status(400).json("Invalid token");
        }

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json("User not found");
        }

        return res.json(user);
    } catch (error) {
        console.error("Error:", error); // Log the actual error
        return res.status(500).json("Server error");
    }
};

// Register User
export const register = async (req, res) => {
    try {
        console.log(req.body); // Log the request body to verify its content
        const { name, email, password, phone } = req.body.formValues;

        // Check if password is provided
        if (!password) {
            return res.status(400).json({ error: 'Password is required' });
        }

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, 10);
        user = new User({ name, email, password: hashedPassword, phone });
        await user.save();

        // Create a token
        const payload = { id: user._id };
        const token = jwt.sign(payload, 'ca', { expiresIn: '3d' });

        res.status(200).json({ message: 'User registered successfully', token });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(400).json({ error: err.message });
    }
};

// Logout User
export const logout = (req, res) => {
    try {
        // Clear the token from cookies (optional)
        res.clearCookie('token');
        res.status(200).send('Logout successful. Please clear your token from storage.');
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).send('An error occurred during logout');
    }
};

// Login User
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        const payload = { id: user._id };
        const token = jwt.sign(payload, secret, { expiresIn: '1d' });
        res.status(200).json({ message: "Login successful", token });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(400).json({ error: err.message });
    }
}

export default { register, logout, login };