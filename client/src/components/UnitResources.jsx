import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Video, Code } from 'lucide-react';

const UnitResources = () => {
  const { unitId } = useParams();
  const navigate = useNavigate();
  const [resources, setResources] = useState(null);

  useEffect(() => {
    const savedUnits = localStorage.getItem('units');
    if (savedUnits) {
      const units = JSON.parse(savedUnits);
      const currentUnit = units.find(u => u.id === parseInt(unitId));
      if (currentUnit) {
        setResources(currentUnit);
      }
    }
  }, [unitId]);

  const handleViewPDF = (file) => {
    navigate('/pdf-viewer', {
      state: {
        files: [file],
        title: `Unit ${unitId} - ${file.name}`
      }
    });
  };

  const handleViewCode = (file) => {
    navigate('/code-viewer', {
      state: {
        files: [file],
        title: `Unit ${unitId} - ${file.name}`
      }
    });
  };

  const handleWatchVideo = (video) => {
    navigate('/youtube-viewer', {
      state: {
        video: video.url || video,
        title: `Unit ${unitId} - Video`
      }
    });
  };

  if (!resources) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading resources...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={() => navigate('/dashboard')}
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-medium">Unit {unitId} Resources</h1>
        </div>

        {/* PDF Materials */}
        <div className="bg-white/5 p-6 rounded-xl mb-6">
          <h2 className="text-lg font-medium mb-4">PDF Materials</h2>
          <div className="space-y-3">
            {resources.pdfs?.length > 0 ? (
              resources.pdfs.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-blue-400" />
                    <span>{file.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewPDF(file)}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    View PDF
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-white/50 text-center py-4">No PDF materials available</p>
            )}
          </div>
        </div>

        {/* Code Files */}
        <div className="bg-white/5 p-6 rounded-xl mb-6">
          <h2 className="text-lg font-medium mb-4">Code Files</h2>
          <div className="space-y-3">
            {resources.codes?.length > 0 ? (
              resources.codes.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Code className="h-5 w-5 text-green-400" />
                    <span>{file.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewCode(file)}
                    className="text-green-400 hover:text-green-300"
                  >
                    View Code
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-white/50 text-center py-4">No code files available</p>
            )}
          </div>
        </div>

        {/* Videos */}
        <div className="bg-white/5 p-6 rounded-xl">
          <h2 className="text-lg font-medium mb-4">Video Content</h2>
          <div className="space-y-3">
            {resources.videos && resources.videos.length > 0 ? (
              resources.videos.map((video, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Video className="h-5 w-5 text-purple-400" />
                    <span className="truncate max-w-[400px]">
                      {video.url || video}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleWatchVideo(video)}
                    className="text-purple-400 hover:text-purple-300"
                  >
                    Watch Video
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-white/50 text-center py-4">No video content available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitResources;