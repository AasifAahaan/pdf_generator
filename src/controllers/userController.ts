import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import { signJWT } from '../services/userServices';

export const registerUser = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        return res.status(201).json({ message: 'User registered successfully', user });
    } catch (err: any) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'This email is not registered. Please check your email or sign up for a new account.'
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Incorrect password. Please try again.'
            });
        }
        const payload = {
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
            },
        };
        const token = signJWT(payload);
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        }).json({
            success: true,
            token,
            message: 'Login successful',
        });
    } catch (err: any) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};