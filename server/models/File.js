import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  fileName: String,
  fileUrl: String,
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

export default mongoose.model('File', fileSchema); 