import { Router } from 'express';
import { getAllUsers, createUser } from '../controllers/users.controller';

const router = Router();

router.get('/', getAllUsers);             // GET /api/users - Fetch all users
router.post('/', createUser);             // POST /api/users - Create a new user

export default router;
