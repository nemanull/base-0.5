import db from '../config/db';

// Fetch all users
export const getAllUsers = (callback: Function) => {
    db.query('SELECT * FROM users', (err, results) => callback(err, results));
};

// Create a new user with wallet address
export const createUser = (walletAddress: string, callback: Function) => {
    db.query(
        'INSERT INTO users (wallet_address) VALUES (?)',
        [walletAddress],
        (err, results) => callback(err, results)
    );
};

// Check if a wallet address already exists
export const findUserByWallet = (walletAddress: string, callback: Function) => {
    db.query(
        'SELECT * FROM users WHERE wallet_address = ?',
        [walletAddress],
        (err, results) => callback(err, results)
    );
};
