import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const YoutubeViewer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  if (!location.state?.video) {
    return (
      <div className="min-h-screen bg-black/95 text-white flex items-center justify-center">
        <p className="text-white/60">No video available</p>
      </div>
    );
  }

  // Convert YouTube URL to embed format
  const getEmbedUrl = (url) => {
    const videoId = url.includes('youtu.be/') 
      ? url.split('youtu.be/')[1].split('?')[0]
      : url.split('v=')[1]?.split('&')[0];
    
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div className="min-h-screen bg-black/95 text-white">
      {/* Header */}
      <div className="fixed top-0 w-full z-10 bg-gradient-to-b from-black/80 to-transparent">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
      </div>

      {/* Video Container */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-5xl mx-auto px-4 pt-16">
          <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
            <iframe
              src={getEmbedUrl(location.state.video)}
              title="YouTube Video"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default YoutubeViewer;