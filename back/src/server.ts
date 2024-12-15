import express from 'express';
import cors from 'cors';

import artsRoutes from './routes/arts.routes';
import creatorsRoutes from './routes/creators.routes';
import usersRoutes from './routes/users.routes';
import followsRoutes from './routes/follows.routes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'Backend is running!' });
});

// Routes
app.use('/api/arts', artsRoutes);
app.use('/api/creators', creatorsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/follows', followsRoutes);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
