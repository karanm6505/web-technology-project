import express from 'express';
import { upload, uploadFile, getUnitFiles } from '../controllers/fileController.js';

const router = express.Router();

router.post('/upload/:unitId/:fileType', upload.single('file'), uploadFile);
router.get('/files/:unitId', getUnitFiles);

export default router; 