import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Code, Copy, Check, Download, Share2, Eye } from 'lucide-react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import javascript from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';
import java from 'react-syntax-highlighter/dist/esm/languages/hljs/java';
import cpp from 'react-syntax-highlighter/dist/esm/languages/hljs/cpp';
import csharp from 'react-syntax-highlighter/dist/esm/languages/hljs/csharp';
import { toast } from 'react-hot-toast';

SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('java', java);
SyntaxHighlighter.registerLanguage('cpp', cpp);
SyntaxHighlighter.registerLanguage('csharp', csharp);

const getLanguage = (filename) => {
  const ext = filename.split('.').pop().toLowerCase();
  const languageMap = {
    'js': 'javascript',
    'jsx': 'javascript',
    'py': 'python',
    'java': 'java',
    'cpp': 'cpp',
    'c': 'cpp',
    'cs': 'csharp',
  };
  return languageMap[ext] || 'javascript';
};

const CodeViewer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { files, title } = location.state || {};
  const [activeFile, setActiveFile] = useState(files?.[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    toast.success('Code copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([activeFile.content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = activeFile.name;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const decodeContent = (content) => {
    try {
      // Check if content is base64
      if (content.startsWith('data:')) {
        const base64Content = content.split(',')[1];
        return atob(base64Content);
      }
      return content;
    } catch (error) {
      console.error('Error decoding content:', error);
      return content;
    }
  };

  const formatContent = (content) => {
    const decoded = decodeContent(content);
    // Add word wrap and limit line length
    return decoded.split('\n').map(line => 
      line.length > 100 ? line.match(/.{1,100}/g).join('\n') : line
    ).join('\n');
  };

  if (!files || files.length === 0) {
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
            <Code className="h-4 w-4 mr-2" />
            <span className="text-sm">{title}</span>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-[#adbac7] hover:bg-[#444c56] rounded-md"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-[#adbac7] hover:bg-[#444c56] rounded-md"
          >
            <Download className="h-4 w-4" />
            Download
          </button>
          <button className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-[#adbac7] hover:bg-[#444c56] rounded-md">
            <Share2 className="h-4 w-4" />
            Share
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="h-[32px] flex items-center bg-[#22272e] border-b border-[#444c56]">
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
            <Code className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{file.name}</span>
          </button>
        ))}
      </div>

      {/* File Info Bar */}
      <div className="h-[40px] flex items-center justify-between px-4 bg-[#1c2128] border-b border-[#444c56]">
        <div className="flex items-center gap-4 text-xs text-[#768390]">
          <span className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            {Math.floor(Math.random() * 100)} views
          </span>
          <span>{activeFile.content.split('\n').length} lines</span>
          <span>{(activeFile.content.length / 1024).toFixed(2)} KB</span>
        </div>
      </div>

      {/* Code Content */}
      <div className="flex-1 overflow-auto bg-[#22272e]">
        <div className="p-4">
          <SyntaxHighlighter
            language={getLanguage(activeFile.name)}
            style={atomOneDark}
            showLineNumbers
            wrapLines={true}
            wrapLongLines={true}
            customStyle={{
              margin: 0,
              borderRadius: '6px',
              background: '#1c2128',
            }}
            codeTagProps={{
              style: {
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
              }
            }}
          >
            {formatContent(activeFile.content)}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default CodeViewer;