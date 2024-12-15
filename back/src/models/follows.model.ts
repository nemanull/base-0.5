import db from '../config/db';

// Add a follow relationship (user follows creator)
export const followCreator = (userId: number, creatorId: number, callback: Function) => {
    db.query(
        'INSERT INTO follows (user_id, creator_id) VALUES (?, ?)',
        [userId, creatorId],
        (err, results) => callback(err, results)
    );
};

// Fetch all creators followed by a user
export const getCreatorsFollowedByUser = (userId: number, callback: Function) => {
    db.query(
        'SELECT c.id AS creator_id, c.id FROM follows f JOIN creators c ON f.creator_id = c.id WHERE f.user_id = ?',
        [userId],
        (err, results) => callback(err, results)
    );
};

// Fetch all followers of a creator
export const getFollowersOfCreator = (creatorId: number, callback: Function) => {
    db.query(
        'SELECT u.id AS user_id, u.wallet_address FROM follows f JOIN users u ON f.user_id = u.id WHERE f.creator_id = ?',
        [creatorId],
        (err, results) => callback(err, results)
    );
};
