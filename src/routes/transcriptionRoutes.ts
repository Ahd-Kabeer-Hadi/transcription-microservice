import express from 'express';
import { createTranscription, getTranscription } from '../controllers/transcriptionController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.post('/', authenticate, createTranscription);
router.get('/:id',authenticate, getTranscription);

export default router;