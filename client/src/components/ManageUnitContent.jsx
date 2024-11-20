import { useState, useRef } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const ManageUnitContent = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5001/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setFiles(prev => [...prev, response.data.file]);
        toast.success('File uploaded successfully');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="p-4">
      <input
        type="file"
        onChange={handleUpload}
        disabled={uploading}
        ref={fileInputRef}
        className="mb-4"
      />

      {uploading && <p>Uploading...</p>}

      <div className="grid gap-4">
        {files.map((file, index) => (
          <div key={index} className="p-4 border rounded">
            <p>{file.name}</p>
            <a 
              href={`http://localhost:5001${file.url}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View File
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUnitContent;
