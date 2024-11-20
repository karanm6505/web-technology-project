import File from '../models/File.js';

export const saveFile = async (req, res) => {
  try {
    const { fileUrl, fileName } = req.body;
    
    const newFile = await File.create({
      fileName,
      fileUrl,
      uploadedBy: req.user._id // Assuming you have authentication
    });

    res.json({ success: true, file: newFile });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}; 