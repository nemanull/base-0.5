import { Router } from 'express';
import { fetchAllArts, fetchArtsByCreator, fetchArtById } from '../controllers/arts.controller';

const router = Router();

router.get('/', fetchAllArts);                // GET /api/arts - Fetch all arts
router.get('/:id', fetchArtById);             // GET /api/arts/:id - Fetch single art by ID
router.get('/creator/:creator_id', fetchArtsByCreator); // GET /api/arts/creator/:creator_id - Fetch arts by creator

export default router;
