import { Router } from 'express';
import { getAllCreators, getCreatorById } from '../controllers/creators.controller';

const router = Router();

router.get('/', getAllCreators);           // GET /api/creators - Fetch all creators
router.get('/:id', getCreatorById);        // GET /api/creators/:id - Fetch a creator by ID

export default router;
