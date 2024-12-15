import { Request, Response } from 'express';
import db from '../config/db';

// Fetch all creators
export const getAllCreators = (req: Request, res: Response) => {
    db.query('SELECT * FROM creators', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Fetch a creator by ID
export const getCreatorById = (req: Request, res: Response) => {
    const { id } = req.params;
    db.query('SELECT * FROM creators WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!Array.isArray(results) || results.length === 0) return res.status(404).json({ message: 'Creator not found' });
        res.json(results[0]);
    });
};
