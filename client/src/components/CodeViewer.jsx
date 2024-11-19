import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Copy, Check, Download, Code } from 'lucide-react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import javascript from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';
import java from 'react-syntax-highlighter/dist/esm/languages/hljs/java';
import cpp from 'react-syntax-highlighter/dist/esm/languages/hljs/cpp';
import csharp from 'react-syntax-highlighter/dist/esm/languages/hljs/csharp';
import php from 'react-syntax-highlighter/dist/esm/languages/hljs/php';
import ruby from 'react-syntax-highlighter/dist/esm/languages/hljs/ruby';
import swift from 'react-syntax-highlighter/dist/esm/languages/hljs/swift';
import go from 'react-syntax-highlighter/dist/esm/languages/hljs/go';
import rust from 'react-syntax-highlighter/dist/esm/languages/hljs/rust';
import kotlin from 'react-syntax-highlighter/dist/esm/languages/hljs/kotlin';
import typescript from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript';
import scala from 'react-syntax-highlighter/dist/esm/languages/hljs/scala';
import r from 'react-syntax-highlighter/dist/esm/languages/hljs/r';
import dart from 'react-syntax-highlighter/dist/esm/languages/hljs/dart';
import matlab from 'react-syntax-highlighter/dist/esm/languages/hljs/matlab';
import perl from 'react-syntax-highlighter/dist/esm/languages/hljs/perl';
import haskell from 'react-syntax-highlighter/dist/esm/languages/hljs/haskell';
import julia from 'react-syntax-highlighter/dist/esm/languages/hljs/julia';
import verilog from 'react-syntax-highlighter/dist/esm/languages/hljs/verilog';
import { Button } from "@/components/ui/button";
import { toast } from 'react-hot-toast';

// Register all languages
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('java', java);
SyntaxHighlighter.registerLanguage('cpp', cpp);
SyntaxHighlighter.registerLanguage('csharp', csharp);
SyntaxHighlighter.registerLanguage('php', php);
SyntaxHighlighter.registerLanguage('ruby', ruby);
SyntaxHighlighter.registerLanguage('swift', swift);
SyntaxHighlighter.registerLanguage('go', go);
SyntaxHighlighter.registerLanguage('rust', rust);
SyntaxHighlighter.registerLanguage('kotlin', kotlin);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('scala', scala);
SyntaxHighlighter.registerLanguage('r', r);
SyntaxHighlighter.registerLanguage('dart', dart);
SyntaxHighlighter.registerLanguage('matlab', matlab);
SyntaxHighlighter.registerLanguage('perl', perl);
SyntaxHighlighter.registerLanguage('haskell', haskell);
SyntaxHighlighter.registerLanguage('julia', julia);
SyntaxHighlighter.registerLanguage('verilog', verilog);

const getLanguage = (filename) => {
  const ext = filename.split('.').pop().toLowerCase();
  const languageMap = {
    // JavaScript & TypeScript
    'js': 'javascript',
    'jsx': 'javascript',
    'ts': 'typescript',
    'tsx': 'typescript',
    // Python
    'py': 'python',
    'pyc': 'python',
    // Java & JVM
    'java': 'java',
    'kt': 'kotlin',
    'scala': 'scala',
    // C-family
    'cpp': 'cpp',
    'c': 'cpp',
    'h': 'cpp',
    'hpp': 'cpp',
    'cs': 'csharp',
    // Web
    'php': 'php',
    // Mobile
    'swift': 'swift',
    'dart': 'dart',
    // Systems
    'go': 'go',
  };
  return languageMap[ext] || 'javascript';
};

const CodeViewer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { files } = location.state || {};
  const [activeFile, setActiveFile] = useState(files?.[0]);
  const [copied, setCopied] = useState(false);

  if (!files || files.length === 0) {
    return (
      <div className="min-h-screen bg-black/95 text-white flex items-center justify-center">
        <p className="text-white/60">No code available</p>
      </div>
    );
  }

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
      return content.startsWith('data:') ? atob(content.split(',')[1]) : content;
    } catch (error) {
      console.error('Error decoding content:', error);
      return content;
    }
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
            <span className="text-white/70">{activeFile.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleCopy}
              variant="ghost"
              size="sm"
              className="text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
            <Button
              onClick={handleDownload}
              variant="ghost"
              size="sm"
              className="text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* File Tabs */}
      {files.length > 1 && (
        <div className="fixed top-16 w-full z-10 bg-black/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 py-2 flex gap-2 overflow-x-auto">
            {files.map((file, index) => (
              <Button
                key={index}
                onClick={() => setActiveFile(file)}
                variant="ghost"
                size="sm"
                className={`text-white/70 hover:text-white hover:bg-white/10 transition-colors ${
                  activeFile === file ? 'bg-white/10' : ''
                }`}
              >
                <Code className="h-4 w-4 mr-2" />
                {file.name}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Code Container */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-5xl mx-auto px-4 pt-16">
          <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
            <SyntaxHighlighter
              language={getLanguage(activeFile.name)}
              style={atomOneDark}
              showLineNumbers
              customStyle={{
                margin: 0,
                borderRadius: '1rem',
                background: '#000',
              }}
            >
              {decodeContent(activeFile.content)}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeViewer;