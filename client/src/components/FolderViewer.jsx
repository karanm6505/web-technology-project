import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileCode, File, FolderOpen, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

const FolderViewer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { folder, unitId } = location.state;
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFolderContents = async () => {
      try {
        // Debug logs
        console.log('Folder state:', {
          folder,
          unitId,
          content: folder.content,
          name: folder.name
        });
        
        // Handle path construction
        let folderPath = '';
        if (folder.content.includes('/codes/')) {
          folderPath = folder.content.split('/codes/')[1];
        } else if (folder.content.startsWith('/server/uploads/')) {
          folderPath = folder.content.split('/codes/')[1];
        } else {
          folderPath = folder.name;
        }

        // Remove any leading or trailing slashes
        folderPath = folderPath.replace(/^\/+|\/+$/g, '');
        
        console.log('Constructed folder path:', folderPath);
        
        // Make the API request
        const url = `http://68.233.118.120:5001/api/units/${unitId}/folder/${encodeURIComponent(folderPath)}`;
        console.log('Making request to:', url);
        
        const response = await fetch(url);
        
        if (!response.ok) {
          const text = await response.text();
          console.error('Server response:', text);
          throw new Error(`Server returned ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Server response data:', data);
        
        if (data.success) {
          setFiles(data.files);
        }
      } catch (error) {
        console.error('Error fetching folder contents:', error);
      }
    };

    if (folder) {
      fetchFolderContents();
    }
  }, [folder, unitId]);

  const handleItemClick = (item) => {
    console.log('Clicked item:', item); // Debug log

    if (item.isDirectory) {
      navigate('/folder-viewer', {
        state: {
          folder: {
            name: item.name,
            content: item.content,
            isFolder: true
          },
          unitId: unitId
        }
      });
    } else {
      // Construct the correct file path
      const fullPath = `http://68.233.118.120:5001/api/units/${unitId}/file/${encodeURIComponent(item.content.split('/codes/')[1])}`;
      console.log('Opening file with path:', fullPath); // Debug log
      
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

  const getFileIcon = (filename) => {
    const ext = filename?.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'js':
      case 'jsx':
        return <FileCode className="h-5 w-5 text-yellow-400" />;
      case 'py':
        return <FileCode className="h-5 w-5 text-blue-400" />;
      case 'java':
        return <FileCode className="h-5 w-5 text-red-400" />;
      case 'html':
        return <FileCode className="h-5 w-5 text-orange-400" />;
      case 'css':
        return <FileCode className="h-5 w-5 text-blue-300" />;
      case 'txt':
        return <File className="h-5 w-5 text-white/70" />;
      default:
        return <File className="h-5 w-5 text-green-400" />;
    }
  };

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
              <FolderOpen className="h-6 w-6 text-yellow-400" />
              <div>
                <h1 className="text-2xl font-semibold">{folder.name}</h1>
                <p className="text-sm text-white/60">
                  {folder.content.split('/codes/')[1] || 'Root'} • {files.length} files
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <Card className="bg-white/[0.02] border-white/5 overflow-hidden">
          <ScrollArea className="h-[calc(100vh-250px)]">
            <div className="p-2">
              {files.length > 0 ? (
                <div className="divide-y divide-white/5">
                  {files.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => handleItemClick(item)}
                      className="group flex items-center justify-between p-4 hover:bg-white/5 rounded-lg cursor-pointer transition-all duration-200"
                    >
                      <div className="flex items-center gap-3">
                        {item.isDirectory ? (
                          <FolderOpen className="h-5 w-5 text-yellow-400" />
                        ) : (
                          getFileIcon(item.name)
                        )}
                        <span className="text-white/80 group-hover:text-white transition-colors">
                          {item.name}
                        </span>
                        {!item.isDirectory && (
                          <span className="px-2 py-0.5 rounded text-xs bg-white/5 text-white/40">
                            {item.name.split('.').pop().toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-white/40 group-hover:text-white/80">
                        <ExternalLink className="h-4 w-4" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[300px] text-white/40">
                  <File className="h-12 w-12 mb-3" />
                  <p>No files in this folder</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
};

export default FolderViewer; 