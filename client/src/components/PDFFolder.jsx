import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, File, FolderOpen, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

const PDFFolder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { folder, unitId } = location.state;
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFolderContents = async () => {
      try {
        const folderPath = folder.content.split('/pdfs/')[1];
        const response = await fetch(
          `http://localhost:5001/api/units/${unitId}/pdf-folder/${encodeURIComponent(folderPath)}`
        );
        
        if (!response.ok) {
          throw new Error(`Server returned ${response.status}`);
        }
        
        const data = await response.json();
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
    if (item.isDirectory) {
      navigate('/pdf-folder', {
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
      navigate('/pdf-viewer', {
        state: { 
          files: [{
            name: item.name,
            content: item.content,
            unitId: unitId,
            type: 'pdf'
          }]
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-black/95 text-white">
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
              <FolderOpen className="h-6 w-6 text-orange-400" />
              <div>
                <h1 className="text-2xl font-semibold">{folder.name}</h1>
                <p className="text-sm text-white/60">{files.length} PDFs</p>
              </div>
            </div>
          </div>
        </div>
      </div>

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
                          <FolderOpen className="h-5 w-5 text-orange-400" />
                        ) : (
                          <File className="h-5 w-5 text-orange-400" />
                        )}
                        <span className="text-white/80 group-hover:text-white transition-colors">
                          {item.name}
                        </span>
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
                  <p>No PDFs in this folder</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
};

export default PDFFolder; 