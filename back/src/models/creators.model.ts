import db from '../config/db';

// Fetch all creators
export const getAllCreators = (callback: Function) => {
    db.query('SELECT * FROM creators', (err, results) => callback(err, results));
};

// Fetch a specific creator by ID
export const getCreatorById = (id: number, callback: Function) => {
    db.query('SELECT * FROM creators WHERE id = ?', [id], (err, results) => callback(err, results));
};
