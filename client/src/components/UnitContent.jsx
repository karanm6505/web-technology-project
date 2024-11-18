import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FileText, Code, Video, ChevronDown } from 'lucide-react';

const UnitContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Get unit content from localStorage
  const units = JSON.parse(localStorage.getItem('unitContents') || '[]');
  const unit = units.find(u => u.id === parseInt(id));

  const handleViewerOpen = (type) => {
    switch(type) {
      case 'pdf':
        navigate(`/pdf-viewer`, { 
          state: { 
            files: unit.pdfs,
            title: unit.title
          }
        });
        break;
      case 'code':
        navigate(`/code-viewer`, { 
          state: { 
            files: unit.codes,
            title: unit.title
          }
        });
        break;
      case 'video':
        navigate(`/youtube-viewer`, { 
          state: { 
            videos: unit.videos,
            title: unit.title
          }
        });
        break;
      default:
        return;
    }
  };

  if (!unit) {
    return (
      <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-red-400">Unit not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-white text-blue-500 px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold text-white">{unit.title}</h1>
        </div>

        {/* Description */}
        <div className="bg-[#161b22] p-6 rounded-lg border border-[#30363d]">
          <p className="text-gray-400">{unit.description}</p>
        </div>

        {/* Content Sections */}
        <div className="space-y-4">
          {/* PDF Viewer */}
          {unit.pdfs?.length > 0 && (
            <button
              onClick={() => handleViewerOpen('pdf')}
              className="w-full bg-white rounded-lg p-4 flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center space-x-3">
                <FileText className="h-6 w-6 text-orange-400" />
                <span className="text-gray-700 font-medium">PDF Viewer</span>
                <span className="text-gray-500">({unit.pdfs.length} files)</span>
              </div>
              <ChevronDown className="h-5 w-5 text-gray-400" />
            </button>
          )}

          {/* Code Viewer */}
          {unit.codes?.length > 0 && (
            <button
              onClick={() => handleViewerOpen('code')}
              className="w-full bg-white rounded-lg p-4 flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center space-x-3">
                <Code className="h-6 w-6 text-green-400" />
                <span className="text-gray-700 font-medium">Code Viewer</span>
                <span className="text-gray-500">({unit.codes.length} files)</span>
              </div>
              <ChevronDown className="h-5 w-5 text-gray-400" />
            </button>
          )}

          {/* Video Viewer */}
          {unit.videos?.length > 0 && (
            <button
              onClick={() => handleViewerOpen('video')}
              className="w-full bg-white rounded-lg p-4 flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center space-x-3">
                <Video className="h-6 w-6 text-blue-400" />
                <span className="text-gray-700 font-medium">Video Viewer</span>
                <span className="text-gray-500">({unit.videos.length} videos)</span>
              </div>
              <ChevronDown className="h-5 w-5 text-gray-400" />
            </button>
          )}
        </div>

        {/* Last Updated */}
        {unit.lastUpdated && (
          <div className="text-sm text-gray-500 text-right">
            Last updated: {new Date(unit.lastUpdated).toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default UnitContent;