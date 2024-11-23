import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

const PdfViewer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { files } = location.state || {};
  const [loading, setLoading] = useState(true);

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
    toast.success('File downloaded');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      {/* Header */}
      <div className="fixed top-0 w-full z-10 bg-black/90 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate(-1)}
              size="sm"
              className="
                px-4 py-2 rounded-lg flex items-center gap-2
                bg-white/10 text-white/70
                hover:bg-white hover:text-black
                transition-all duration-300
              "
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg">
              <FileText className="h-4 w-4 text-white/50" />
              <span className="text-sm text-white/70">{currentFile.name}</span>
            </div>
          </div>
          <Button
            onClick={handleDownload}
            size="sm"
            className="
              px-4 py-2 rounded-lg flex items-center gap-2
              bg-white/10 text-white/70
              hover:bg-white hover:text-black
              transition-all duration-300
            "
          >
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>
      </div>

      {/* PDF Container */}
      <div className="pt-20 px-4 pb-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl border border-white/5">
            {/* File Info Bar */}
            <div className="px-4 py-2 bg-white/5 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-xs text-white/40 font-mono">PDF Document</span>
            </div>

            {loading && (
              <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            )}

            <div className="relative" style={{ height: 'calc(100vh - 180px)' }}>
              <embed
                src={`${currentFile.content}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                type="application/pdf"
                className="w-full h-full"
                style={{ backgroundColor: 'white' }}
                onLoad={() => setLoading(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;