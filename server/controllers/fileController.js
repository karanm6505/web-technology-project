import multer from 'multer';
import path from 'path';
import fs from 'fs';
import File from '../models/File.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const unitId = req.params.unitId;
    const fileType = req.params.fileType;
    const uploadDir = path.join('uploads', `unit${unitId}`, fileType);
    
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

export const upload = multer({ storage });

export const uploadFile = async (req, res) => {
  try {
    const file = req.file;
    const { unitId, fileType } = req.params;
    
    const fileUrl = `/uploads/unit${unitId}/${fileType}/${file.filename}`;
    
    // Save file info to database
    const newFile = await File.create({
      fileName: file.originalname,
      fileUrl,
      unitId,
      fileType,
      uploadedBy: req.user?._id
    });

    res.status(200).json({
      success: true,
      file: {
        name: file.originalname,
        url: fileUrl,
        type: file.mimetype,
        _id: newFile._id
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUnitFiles = async (req, res) => {
  try {
    const { unitId } = req.params;
    const files = await File.find({ unitId });
    res.json({ success: true, files });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}; 