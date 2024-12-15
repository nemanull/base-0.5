import { Request, Response } from 'express';
import { getAllArts, getArtsByCreator, getArtById } from '../models/arts.model';

// Fetch all arts
export const fetchAllArts = (req: Request, res: Response) => {
    getAllArts((err: any, results: any) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Fetch arts by creator ID
export const fetchArtsByCreator = (req: Request, res: Response) => {
    const { creator_id } = req.params;

    getArtsByCreator(Number(creator_id), (err: any, results: any) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Fetch a single art by ID
export const fetchArtById = (req: Request, res: Response) => {
    const { id } = req.params;

    getArtById(Number(id), (err: any, results: any) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Art not found' });
        res.json(results[0]);
    });
};
