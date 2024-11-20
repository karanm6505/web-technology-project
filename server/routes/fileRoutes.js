import express from 'express';
import { upload, uploadFile } from '../controllers/fileController.js';

const router = express.Router();

router.post('/upload', upload.single('file'), uploadFile);

export default router; 