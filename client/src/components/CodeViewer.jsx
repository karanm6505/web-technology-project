import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowLeft, Copy, Download, Check, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

// Import languages
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

// Register languages
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

const CodeViewer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const files = location.state?.files || [];
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchContent = async (file) => {
    try {
      const response = await fetch(file.content);
      if (!response.ok) throw new Error('Failed to fetch file');
      const text = await response.text();
      setContent(text);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching file:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (files.length > 0) {
      fetchContent(files[0]);
    }
  }, [files]);

  if (!files || files.length === 0) {
    return (
      <div className="min-h-screen bg-black/95 text-white flex items-center justify-center">
        <p className="text-white/60">No code available</p>
      </div>
    );
  }

  const getLanguage = (filename) => {
    const extension = filename.split('.').pop().toLowerCase();
    const languageMap = {
      'js': 'javascript',
      'jsx': 'javascript',
      'ts': 'typescript',
      'tsx': 'typescript',
      'py': 'python',
      'java': 'java',
      'cpp': 'cpp',
      'c': 'cpp',
      'cs': 'csharp',
      'php': 'php',
      'rb': 'ruby',
      'swift': 'swift',
      'go': 'go',
      'rs': 'rust',
      'kt': 'kotlin',
      'scala': 'scala',
      'r': 'r',
      'dart': 'dart',
      'm': 'matlab',
      'pl': 'perl',
      'hs': 'haskell',
      'jl': 'julia',
      'v': 'verilog'
    };
    return languageMap[extension] || 'javascript';
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    toast.success('Code copied to clipboard');
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = files[0].name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
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
              <span className="text-sm text-white/70">{files[0].name}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={handleCopy}
              size="sm"
              className="
                px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300
                bg-white/10 text-white/70 hover:bg-white hover:text-black
              "
            >
              <Copy className="h-4 w-4" />
              Copy
            </Button>
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
      </div>

      {/* Code Container */}
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
              <span className="text-xs text-white/40 font-mono">
                {getLanguage(files[0].name)}
              </span>
            </div>
            {loading ? (
              <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            ) : (
              <SyntaxHighlighter
                language={getLanguage(files[0].name)}
                style={atomOneDark}
                showLineNumbers={true}
                customStyle={{
                  margin: 0,
                  padding: '1.5rem',
                  background: 'transparent',
                  fontSize: '0.9rem',
                  lineHeight: '1.5',
                }}
                lineNumberStyle={{
                  minWidth: '3em',
                  paddingRight: '1em',
                  color: '#636d83',
                  textAlign: 'right',
                }}
                codeTagProps={{
                  style: {
                    fontFamily: 'JetBrains Mono, monospace',
                  }
                }}
              >
                {content}
              </SyntaxHighlighter>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeViewer;