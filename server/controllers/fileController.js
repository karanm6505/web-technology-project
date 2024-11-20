import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { unitId, fileType } = req.params;
    // Create directory path
    const dir = path.join('uploads', `unit${unitId}`, fileType);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    // Create unique filename
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

export const upload = multer({ storage });

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    // Create file URL
    const fileUrl = `/uploads/unit${req.params.unitId}/${req.params.fileType}/${req.file.filename}`;

    res.status(200).json({
      success: true,
      file: {
        name: req.file.originalname,
        url: fileUrl,
        type: req.file.mimetype
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}; 