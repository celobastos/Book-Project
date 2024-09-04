import express from 'express';
import { getRecommendations } from '../controllers/recommendationsController';

const router = express.Router();

router.get('/', getRecommendations);

export default router;
