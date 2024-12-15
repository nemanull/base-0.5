import { Router } from 'express';
import {
    followCreator,
    getCreatorsFollowedByUser,
    getFollowersOfCreator
} from '../controllers/follows.controller';

const router = Router();

router.post('/', followCreator);                   // POST /api/follows - User follows a creator
router.get('/user/:user_id', getCreatorsFollowedByUser);  // GET /api/follows/user/:user_id - Creators followed by user
router.get('/creator/:creator_id', getFollowersOfCreator); // GET /api/follows/creator/:creator_id - Followers of a creator

export default router;
