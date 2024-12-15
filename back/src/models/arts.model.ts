import db from '../config/db';

// Fetch all arts
export const getAllArts = (callback: Function) => {
    db.query('SELECT * FROM arts', (err, results) => callback(err, results));
};

// Fetch arts by creator ID
export const getArtsByCreator = (creatorId: number, callback: Function) => {
    db.query(
        'SELECT * FROM arts WHERE creator_id = ?',
        [creatorId],
        (err, results) => callback(err, results)
    );
};

// Fetch a single art by ID
export const getArtById = (id: number, callback: Function) => {
    db.query('SELECT * FROM arts WHERE id = ?', [id], (err, results) => callback(err, results));
};
