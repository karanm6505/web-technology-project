import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";

const PdfViewer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { files } = location.state || {};

  if (!files || files.length === 0) {
    return (
      <div className="min-h-screen bg-black/95 text-white flex items-center justify-center">
        <p className="text-white/60">No PDF available</p>
      </div>
    );
  }

  const currentFile = files[0];

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = currentFile.content;
    link.download = currentFile.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-black/95 text-white">
      {/* Header */}
      <div className="fixed top-0 w-full z-10 bg-gradient-to-b from-black/80 to-transparent">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate(-1)}
              variant="ghost"
              size="sm"
              className="text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <span className="text-white/70">{currentFile.name}</span>
          </div>
          <Button
            onClick={handleDownload}
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      {/* PDF Container */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-5xl">
          <embed
            src={`${currentFile.content}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
            type="application/pdf"
            className="absolute inset-0 w-full h-full"
            style={{
              border: 'none',
              backgroundColor: 'white'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;