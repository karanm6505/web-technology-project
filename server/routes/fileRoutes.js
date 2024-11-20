import express from 'express';
import { upload, uploadFile } from '../controllers/fileController.js';

const router = express.Router();

router.post('/upload/:unitId/:fileType', upload.single('file'), uploadFile);

export default router; 