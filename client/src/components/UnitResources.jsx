import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  FileText, 
  Code, 
  ArrowLeft,
  BookOpen,
  ExternalLink,
  ChevronRight,
  FolderOpen,
  Files,
  Folder,
  FileCode,
  File
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from 'sonner';
import api from '../services/api';

const getFileIcon = (filename) => {
  const ext = filename?.split('.').pop()?.toLowerCase();
  
  // Folders
  if (!ext) return <Folder className="h-5 w-5 text-yellow-400" />;
  
  // Programming Languages
  switch (ext) {
    case 'js':
    case 'jsx':
      return <FileCode className="h-5 w-5 text-yellow-400" />;
    case 'py':
      return <FileCode className="h-5 w-5 text-blue-400" />;
    case 'java':
      return <FileCode className="h-5 w-5 text-red-400" />;
    case 'cpp':
    case 'c':
      return <FileCode className="h-5 w-5 text-purple-400" />;
    case 'html':
      return <FileCode className="h-5 w-5 text-orange-400" />;
    case 'css':
      return <FileCode className="h-5 w-5 text-blue-300" />;
    default:
      return <File className="h-5 w-5 text-green-400" />;
  }
};

const FileTreeItem = ({ item, level = 0, onFileClick }) => {
  const navigate = useNavigate();
  const isFolder = !item.name?.includes('.') || item.isFolder;

  const handleClick = () => {
    if (isFolder) {
      navigate('/folder-viewer', {
        state: {
          folder: {
            ...item,
            allFiles: item.allFiles,
            unitId: item.unitId
          },
          unitId: item.unitId
        }
      });
    } else {
      const fullPath = `${api.defaults.baseURL}/units/${item.unitId}/file/${encodeURIComponent(item.name)}`;
      
      navigate('/code-viewer', {
        state: { 
          files: [{
            name: item.name,
            content: fullPath,
            type: 'file'
          }]
        }
      });
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group flex items-center justify-between p-4 hover:bg-white/5 rounded-lg cursor-pointer transition-all duration-200"
    >
      <div className="flex items-center gap-3">
        {isFolder ? (
          <FolderOpen className="h-5 w-5 text-yellow-400" />
        ) : (
          getFileIcon(item.name)
        )}
        <span className="text-white/80 group-hover:text-white transition-colors">
          {item.name}
        </span>
        {!isFolder && (
          <span className="px-2 py-0.5 rounded text-xs bg-white/5 text-white/40">
            {item.name.split('.').pop().toUpperCase()}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2 text-white/40 group-hover:text-white/80">
        <ExternalLink className="h-4 w-4" />
      </div>
    </div>
  );
};

const UnitResources = () => {
  const { unitId } = useParams();
  const navigate = useNavigate();
  const [resources, setResources] = useState({ pdfs: [], codes: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResources();
  }, [unitId]);

  const fetchResources = async () => {
    try {
      const { data } = await api.get(`/units/${unitId}/resources`);
      
      if (data.success) {
        setResources(data.resources);
      } else {
        toast.error(data.error || 'Failed to load resources');
      }
    } catch (error) {
      toast.error('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const handleViewFile = (file, type) => {
    const fullPath = `${api.defaults.baseURL}${file.content}`;
    navigate(type === 'pdf' ? '/pdf-viewer' : '/code-viewer', {
      state: { files: [{ ...file, content: fullPath }] }
    });
  };

  const handlePDFClick = (item) => {
    console.log('PDF clicked:', {
      name: item.name,
      path: item.content,
      fullPath: `/uploads/unit${unitId}/pdfs/${item.name}`
    });

    // Properly encode the filename for URLs
    const encodedFilename = encodeURIComponent(item.name)
      .replace(/'/g, '%27')
      .replace(/"/g, '%22')
      .replace(/&/g, '%26');

    const pdfUrl = `${api.defaults.baseURL}/units/${unitId}/pdf/${encodedFilename}`;
    
    console.log('Requesting PDF from:', pdfUrl);

    navigate('/pdf-viewer', {
      state: { 
        files: [{
          name: item.name,
          content: pdfUrl,
          unitId: unitId,
          type: 'pdf'
        }]
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black/95 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black/95 text-white">
      {/* Header */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="hover:bg-white/5"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-blue-400" />
              <div>
                <h1 className="text-2xl font-semibold">Unit {unitId}</h1>
                <p className="text-sm text-white/60">Available Resources</p>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5">
                <Files className="h-4 w-4 text-white/60" />
                <span className="text-sm text-white/60">
                  {(resources?.pdfs?.length || 0) + (resources?.codes?.length || 0)} files
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="space-y-8">
          {/* PDF Files */}
          <Card className="bg-white/[0.02] border-white/5 overflow-hidden">
            <div className="p-6 border-b border-white/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <FileText className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h2 className="font-medium">PDF Resources</h2>
                    <p className="text-sm text-white/60">{resources?.pdfs?.length || 0} files available</p>
                  </div>
                </div>
              </div>
            </div>
            <ScrollArea className="h-[400px]">
              <div className="p-2">
                {resources?.pdfs?.length > 0 ? (
                  resources.pdfs.map((file, index) => (
                    <div
                      key={index}
                      onClick={() => handlePDFClick(file)}
                      className="group flex items-center justify-between p-4 hover:bg-white/5 rounded-lg cursor-pointer transition-all duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-blue-400" />
                        <span className="text-white/80 group-hover:text-white transition-colors">
                          {file.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-white/40 group-hover:text-white/80">
                        <ExternalLink className="h-4 w-4" />
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-[300px] text-white/40">
                    <FileText className="h-12 w-12 mb-3" />
                    <p>No PDF files available</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </Card>

          {/* Code Files */}
          <Card className="bg-white/[0.02] border-white/5 overflow-hidden">
            <div className="p-6 border-b border-white/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <Code className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <h2 className="font-medium">Code Resources</h2>
                    <p className="text-sm text-white/60">{resources?.codes?.length || 0} files available</p>
                  </div>
                </div>
              </div>
            </div>
            <ScrollArea className="h-[400px]">
              <div className="p-2">
                {resources?.codes?.length > 0 ? (
                  <div className="divide-y divide-white/5">
                    {resources.codes.map((file, index) => (
                      <FileTreeItem
                        key={index}
                        item={{
                          ...file,
                          allFiles: resources.codes,
                          unitId: unitId,
                          name: file.content.split('/').pop()
                        }}
                        onFileClick={(file) => handleViewFile(file, 'code')}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[300px] text-white/40">
                    <Code className="h-12 w-12 mb-3" />
                    <p>No code files available</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UnitResources;