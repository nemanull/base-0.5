import { Request, Response } from 'express';
import db from '../config/db';

// Fetch all users
export const getAllUsers = (req: Request, res: Response) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Create a new user
export const createUser = (req: Request, res: Response) => {
    const { wallet_address } = req.body;
    if (!wallet_address) {
        return res.status(400).json({ error: 'Wallet address is required' });
    }

    db.query('INSERT INTO users (wallet_address) VALUES (?)', [wallet_address], (err) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: 'Wallet address already exists' });
            }
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'User created successfully', wallet_address });
    });
};
