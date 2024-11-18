import React, { createContext, useContext, useState } from 'react';

const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
  // Sample content for testing
  const unitContent = {
    '1': {
      pdf: 'https://www.africau.edu/images/default/sample.pdf', // Sample PDF URL
      code: {
        'welcome.js': 'console.log("Welcome to Unit 1");',
        'styles.css': 'body { background: #f0f0f0; }'
      },
      video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' // Sample YouTube URL
    },
    '2': {
      pdf: 'https://www.africau.edu/images/default/sample.pdf',
      code: {
        'react.jsx': 'const App = () => <div>Hello Unit 2</div>;',
        'app.css': '.container { padding: 1rem; }'
      },
      video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    '3': {
      pdf: 'https://www.africau.edu/images/default/sample.pdf',
      code: {
        'backend.js': 'const express = require("express");',
        'db.js': 'mongoose.connect(MONGODB_URI);'
      },
      video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    '4': {
      pdf: 'https://www.africau.edu/images/default/sample.pdf',
      code: {
        'deploy.js': 'console.log("Deployment Unit");',
        'config.js': 'module.exports = { port: 3000 }'
      },
      video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    }
  };

  const [currentContent, setCurrentContent] = useState(null);

  const loadContent = (unitId, type) => {
    console.log('Loading content for unit:', unitId, 'type:', type); // Debug log
    if (unitContent[unitId] && unitContent[unitId][type]) {
      setCurrentContent(unitContent[unitId][type]);
      console.log('Content loaded:', unitContent[unitId][type]); // Debug log
    } else {
      console.log('Content not found'); // Debug log
      setCurrentContent(null);
    }
  };

  return (
    <ContentContext.Provider value={{ currentContent, loadContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};