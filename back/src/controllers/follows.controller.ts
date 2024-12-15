import { Request, Response } from 'express';
import db from '../config/db';

// User follows a creator
export const followCreator = (req: Request, res: Response) => {
    const { user_id, creator_id } = req.body;

    if (!user_id || !creator_id) {
        return res.status(400).json({ error: 'User ID and Creator ID are required' });
    }

    db.query(
        'INSERT INTO follows (user_id, creator_id) VALUES (?, ?)',
        [user_id, creator_id],
        (err) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ error: 'User already follows this creator' });
                }
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'Followed successfully', user_id, creator_id });
        }
    );
};

// Fetch all creators a user follows
export const getCreatorsFollowedByUser = (req: Request, res: Response) => {
    const { user_id } = req.params;

    db.query(
        'SELECT c.id AS creator_id FROM follows f JOIN creators c ON f.creator_id = c.id WHERE f.user_id = ?',
        [user_id],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        }
    );
};

// Fetch all followers of a creator
export const getFollowersOfCreator = (req: Request, res: Response) => {
    const { creator_id } = req.params;

    db.query(
        'SELECT u.id AS user_id, u.wallet_address FROM follows f JOIN users u ON f.user_id = u.id WHERE f.creator_id = ?',
        [creator_id],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        }
    );
};
