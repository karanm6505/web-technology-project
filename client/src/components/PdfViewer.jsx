import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, FileText } from 'lucide-react';

const PDFViewer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { files, title } = location.state || {};
  const [activeFile, setActiveFile] = useState(files?.[0]);

  if (!files || files.length === 0) {
    return navigate(-1);
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="h-[48px] flex items-center px-4 bg-[#1c2128] border-b border-[#444c56]">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-[#539bf5] hover:text-[#539bf5]/80 mr-4"
        >
          <ChevronLeft className="h-[20px] w-[20px]" />
          <span className="text-sm">Back</span>
        </button>
        <div className="flex items-center text-[#768390]">
          <FileText className="h-4 w-4 mr-2" />
          <span className="text-sm">{title}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="h-[32px] flex items-center bg-[#22272e]">
        {files.map((file, index) => (
          <button
            key={index}
            onClick={() => setActiveFile(file)}
            className={`
              relative h-[32px] px-3 flex items-center gap-2 text-sm
              ${activeFile === file 
                ? 'text-[#adbac7] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#f47067]' 
                : 'text-[#768390] hover:text-[#adbac7]'
              }
            `}
          >
            <FileText className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{file.name}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 bg-[#22272e] overflow-hidden">
        <iframe
          src={`${activeFile?.content}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
          className="w-full h-full"
          title={activeFile?.name}
        />
      </div>
    </div>
  );
};

export default PDFViewer;