import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ArrowLeft, FileText, Video, Code, Upload, Plus, X } from 'lucide-react';
import { toast } from 'react-hot-toast';

const SUPPORTED_CODE_EXTENSIONS = [
  '.js', '.jsx', '.ts', '.tsx',  // JavaScript/TypeScript
  '.py', '.ipynb',               // Python
  '.java',                       // Java
  '.cpp', '.cc', '.c', '.h',     // C/C++
  '.cs',                         // C#
  '.rb',                         // Ruby
  '.php',                        // PHP
  '.swift',                      // Swift
  '.go',                         // Go
  '.rs',                         // Rust
  '.kt',                         // Kotlin
  '.m',                          // Objective-C
  '.scala',                      // Scala
  '.pl', '.pm',                  // Perl
  '.html', '.css', '.scss',      // Web
  '.sql',                        // SQL
  '.r',                          // R
  '.dart',                       // Dart
  '.lua',                        // Lua
  '.ex', '.exs'  ,
  '.v'                // Elixir
];
const ManageUnitContent = () => {
  const { unitId } = useParams();
  const navigate = useNavigate();

  const [pdfFiles, setPdfFiles] = useState([]);
  const [codeFiles, setCodeFiles] = useState([]);
  const [videoUrls, setVideoUrls] = useState([]);
  const [isUrlDialogOpen, setIsUrlDialogOpen] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const fileInputRef = React.useRef(null);

  // Load existing unit data
  useEffect(() => {
    if (!unitId) {
      console.error("Unit ID is missing!");
      return;
    }

    const savedUnits = localStorage.getItem('units');
    if (savedUnits) {
      const units = JSON.parse(savedUnits);
      const currentUnit = units.find((u) => u.id === parseInt(unitId));
      if (currentUnit) {
        setPdfFiles(currentUnit.pdfs || []);
        setCodeFiles(currentUnit.codes || []);
        setVideoUrls(currentUnit.videos || []);
      }
    }
  }, [unitId]);

  // Utility function to update localStorage
  const updateUnitData = (key, value) => {
    const savedUnits = JSON.parse(localStorage.getItem('units') || '[]');
    const updatedUnits = savedUnits.map((unit) => {
      if (unit.id === parseInt(unitId)) {
        return { ...unit, [key]: value };
      }
      return unit;
    });
    localStorage.setItem('units', JSON.stringify(updatedUnits));
  };

  // PDF Upload Handler
  const onPdfUpload = async (e) => {
    const files = Array.from(e.target.files);
    const processedFiles = await Promise.all(
      files.map((file) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            resolve({
              name: file.name,
              type: file.type,
              content: event.target.result,
            });
          };
          reader.readAsDataURL(file);
        })
      )
    );
    const updatedPdfs = [...pdfFiles, ...processedFiles];
    setPdfFiles(updatedPdfs);
    updateUnitData("pdfs", updatedPdfs);
    fileInputRef.current.value = null; // Reset input
  };

  // Code Upload Handler
  const onCodeUpload = async (e) => {
    const files = Array.from(e.target.files);
    
    // Validate file extensions
    const validFiles = files.filter(file => {
      const extension = '.' + file.name.split('.').pop().toLowerCase();
      return SUPPORTED_CODE_EXTENSIONS.includes(extension);
    });

    if (validFiles.length !== files.length) {
      toast.error('Some files were skipped due to unsupported file types');
    }

    const processedFiles = await Promise.all(
      validFiles.map((file) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            resolve({
              id: Date.now() + Math.random(),
              name: file.name,
              type: file.type,
              content: event.target.result,
            });
          };
          reader.readAsDataURL(file);
        })
      )
    );
    const updatedCodes = [...codeFiles, ...processedFiles];
    setCodeFiles(updatedCodes);
    updateUnitData("codes", updatedCodes);
    fileInputRef.current.value = null; // Reset input
  };

  // Remove Handlers
  const handleRemoveItem = (index, type) => {
    if (type === "pdfs") {
      const updatedPdfs = pdfFiles.filter((_, i) => i !== index);
      setPdfFiles(updatedPdfs);
      updateUnitData("pdfs", updatedPdfs);
    } else if (type === "codes") {
      const updatedCodes = codeFiles.filter((_, i) => i !== index);
      setCodeFiles(updatedCodes);
      updateUnitData("codes", updatedCodes);
    }
  };

  // Modify the video removal handler
  const handleRemoveVideo = (index) => {
    const updatedVideos = videoUrls.filter((_, i) => i !== index);
    setVideoUrls(updatedVideos);
    updateUnitData("videos", updatedVideos);
  };

  // Add YouTube URL
  const onAddVideo = () => {
    if (youtubeUrl.trim()) {
      const updatedVideos = [...videoUrls, { url: youtubeUrl }];
      setVideoUrls(updatedVideos);
      updateUnitData("videos", updatedVideos);
      setYoutubeUrl('');
      setIsUrlDialogOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={() => navigate('/admin/dashboard')}
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-medium">Unit {unitId} Content</h1>
        </div>

        {/* PDF Section */}
        <ContentSection
          title="PDF Files"
          files={pdfFiles}
          fileType="pdfs"
          onUpload={onPdfUpload}
          onRemove={handleRemoveItem}
          inputRef={fileInputRef}
          accept=".pdf"
          uploadLabel="Upload PDF"
          icon={FileText}
        />

        {/* Code Section */}
          <ContentSection
          title="Code Files"
          files={codeFiles}
          fileType="codes"
          onUpload={onCodeUpload}
          onRemove={handleRemoveItem}
          inputRef={fileInputRef}
          accept={SUPPORTED_CODE_EXTENSIONS.join(',')}
          uploadLabel="Upload Code"
          icon={Code}
      />

        {/* Video URLs Section */}
        <div className="bg-white/5 p-6 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Video URLs</h2>
            <Button
              onClick={() => setIsUrlDialogOpen(true)}
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Video URL
            </Button>
          </div>
          <div className="space-y-2">
            {videoUrls.map((video, index) => (
              <ContentListItem
                key={index}
                name={video.url}
                icon={Video}
                onRemove={() => handleRemoveVideo(index)}
              />
            ))}
          </div>
        </div>

        {/* YouTube URL Dialog */}
        <Dialog open={isUrlDialogOpen} onOpenChange={setIsUrlDialogOpen}>
          <DialogContent className="bg-[#1a1a1a] border-white/10">
            <DialogHeader>
              <DialogTitle className="text-white">Add YouTube URL</DialogTitle>
            </DialogHeader>
            <Input
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="Paste YouTube URL here"
              className="bg-white/5 border-white/10 text-white"
            />
            <DialogFooter>
              <Button onClick={onAddVideo} className="bg-purple-500 hover:bg-purple-600 text-white">
                Add URL
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

// Reusable Components for Content Section
const ContentSection = ({ title, files, fileType, onUpload, onRemove, inputRef, accept, uploadLabel, icon: Icon }) => (
  <div className="bg-white/5 p-6 rounded-xl mb-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-medium">{title}</h2>
      <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
        <Upload className="h-4 w-4" />
        {uploadLabel}
        <input
          type="file"
          accept={accept}
          multiple
          onChange={onUpload}
          ref={inputRef}
          className="hidden"
        />
      </label>
    </div>
    <div className="space-y-2">
      {files.map((file, index) => (
        <ContentListItem
          key={index}
          name={file.name}
          icon={Icon}
          onRemove={() => onRemove(index, fileType)}
        />
      ))}
    </div>
  </div>
);

const ContentListItem = ({ name, icon: Icon, onRemove }) => (
  <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-blue-400" />
      <span>{name}</span>
    </div>
    <Button
      variant="ghost"
      size="sm"
      onClick={onRemove}
      className="text-red-400 hover:text-red-300"
    >
      <X className="h-4 w-4" />
    </Button>
  </div>
);

export default ManageUnitContent;
