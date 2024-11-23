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
  const [isExpanded, setIsExpanded] = useState(false);
  
  const getDirectChildren = () => {
    if (!item.allFiles) return [];
    
    // Get current folder's relative path
    const currentPath = item.content.split('/codes/')[1] || '';
    const children = new Map();
    
    item.allFiles.forEach(file => {
      // Get file's relative path
      const filePath = file.content.split('/codes/')[1] || '';
      
      // Skip if this is not a child of current folder
      if (!filePath.startsWith(currentPath + '/')) return;
      
      // Get the path after current folder
      const relativePath = filePath.slice(currentPath.length + 1);
      const segments = relativePath.split('/');
      
      // Skip empty segments
      if (segments.length === 0 || !segments[0]) return;
      
      // Get immediate child name
      const childName = segments[0];
      
      // Determine if it's a folder (has more segments) or file
      const isFolder = segments.length > 1;
      
      // Only add if we haven't seen this child before
      if (!children.has(childName)) {
        children.set(childName, {
          name: childName,
          content: `${item.content}/${childName}`,
          isFolder: isFolder,
          originalItem: isFolder ? null : file,
          unitId: item.unitId,
          allFiles: item.allFiles
        });
      }
    });
    
    return Array.from(children.values());
  };

  const isFolder = !item.name?.includes('.') || item.isFolder;
  const children = isExpanded ? getDirectChildren() : [];

  if (isFolder) {
    return (
      <div>
        <div
          onClick={() => {
            console.log('Folder:', item);
            console.log('Folder contents:', getDirectChildren());
            setIsExpanded(!isExpanded);
          }}
          className="group flex items-center justify-between p-4 hover:bg-white/5 rounded-lg cursor-pointer transition-all duration-200"
        >
          <div className="flex items-center gap-3">
            {isExpanded ? (
              <FolderOpen className="h-5 w-5 text-yellow-400" />
            ) : (
              <Folder className="h-5 w-5 text-yellow-400" />
            )}
            <span className="text-white/80 group-hover:text-white transition-colors">
              {item.name}
            </span>
          </div>
          <ChevronRight 
            className={`h-4 w-4 text-white/40 transition-transform duration-200 ${
              isExpanded ? 'rotate-90' : ''
            }`} 
          />
        </div>
        {isExpanded && children.length > 0 && (
          <div className="ml-4">
            {children.map((child, index) => (
              <FileTreeItem
                key={index}
                item={child}
                onFileClick={onFileClick}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // File rendering
  return (
    <div
      onClick={() => onFileClick(item.originalItem || item)}
      className="group flex items-center justify-between p-4 hover:bg-white/5 rounded-lg cursor-pointer transition-all duration-200"
    >
      <div className="flex items-center gap-3">
        {getFileIcon(item.name)}
        <span className="text-white/80 group-hover:text-white transition-colors">
          {item.name}
        </span>
        <span className="px-2 py-0.5 rounded text-xs bg-white/5 text-white/40">
          {item.name.split('.').pop().toUpperCase()}
        </span>
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
      const response = await fetch(`http://localhost:5001/api/units/${unitId}/resources`);
      const data = await response.json();
      
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
    const fullPath = `http://localhost:5001${file.content}`;
    navigate(type === 'pdf' ? '/pdf-viewer' : '/code-viewer', {
      state: { files: [{ ...file, content: fullPath }] }
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
                      onClick={() => handleViewFile(file, 'pdf')}
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