import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Video, Share2, Eye } from 'lucide-react';

const YoutubeViewer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { videos, title } = location.state || {};
  const [activeVideo, setActiveVideo] = useState(videos?.[0]);

  // Convert YouTube URL to embed URL
  const getEmbedUrl = (url) => {
    if (!url) return null;
    
    try {
      // Handle different YouTube URL formats
      const patterns = [
        /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([^"&?\/\s]{11})/,
        /^([^"&?\/\s]{11})$/, // Direct video ID
      ];

      let videoId = null;
      for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
          videoId = match[1];
          break;
        }
      }

      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    } catch (error) {
      console.error('Error parsing YouTube URL:', error);
      return null;
    }
  };

  // Debug logging
  console.log('Location State:', location.state);
  console.log('Videos:', videos);
  console.log('Active Video:', activeVideo);
  console.log('Embed URL:', activeVideo ? getEmbedUrl(activeVideo) : null);

  // Filter out empty URLs and invalid YouTube links
  const validVideos = videos?.filter(url => {
    const isValid = url && url.trim() !== '' && getEmbedUrl(url);
    console.log('Validating URL:', url, 'Is Valid:', isValid);
    return isValid;
  }) || [];

  if (!validVideos.length) {
    console.log('No valid videos found, navigating back');
    return navigate(-1);
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="h-[48px] flex items-center justify-between px-4 bg-[#1c2128] border-b border-[#444c56]">
        <div className="flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-[#539bf5] hover:text-[#539bf5]/80 mr-4"
          >
            <ChevronLeft className="h-[20px] w-[20px]" />
            <span className="text-sm">Back</span>
          </button>
          <div className="flex items-center text-[#768390]">
            <Video className="h-4 w-4 mr-2" />
            <span className="text-sm">{title}</span>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-[#adbac7] hover:bg-[#444c56] rounded-md">
            <Share2 className="h-4 w-4" />
            Share
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="h-[32px] flex items-center bg-[#22272e] border-b border-[#444c56]">
        {validVideos.map((video, index) => (
          <button
            key={index}
            onClick={() => setActiveVideo(video)}
            className={`
              relative h-[32px] px-3 flex items-center gap-2 text-sm
              ${activeVideo === video 
                ? 'text-[#adbac7] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#f47067]' 
                : 'text-[#768390] hover:text-[#adbac7]'
              }
            `}
          >
            <Video className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">Video {index + 1}</span>
          </button>
        ))}
      </div>

      {/* Video Info Bar */}
      <div className="h-[40px] flex items-center px-4 bg-[#1c2128] border-b border-[#444c56]">
        <div className="flex items-center gap-4 text-xs text-[#768390]">
          <span className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            {Math.floor(Math.random() * 100)} views
          </span>
          <span className="truncate max-w-[500px]">{activeVideo}</span>
        </div>
      </div>

      {/* Video Content */}
      <div className="flex-1 bg-[#22272e] overflow-hidden">
        <div className="max-w-4xl mx-auto p-4 h-full">
          <div className="aspect-video w-full bg-[#1c2128] rounded-lg overflow-hidden">
            {activeVideo && getEmbedUrl(activeVideo) ? (
              <iframe
                src={getEmbedUrl(activeVideo)}
                className="w-full h-full"
                title={`Video ${validVideos.indexOf(activeVideo) + 1}`}
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                frameBorder="0"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#768390]">
                Invalid video URL
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YoutubeViewer;