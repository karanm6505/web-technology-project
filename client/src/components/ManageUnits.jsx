import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  FileText,
  Video,
  Code,
  Upload,
  Plus,
  Trash2
} from 'lucide-react';

  // Example: Define UNIT_STRUCTURE in a separate constants file
  // client/src/constants/unitStructure.js
  
  export const UNIT_STRUCTURE = [
    { id: 1, title: "Unit 1", description: "Description for Unit 1" },
    { id: 2, title: "Unit 2", description: "Description for Unit 2" },
    { id: 3, title: "Unit 3", description: "Description for Unit 3" },
    { id: 4, title: "Unit 4", description: "Description for Unit 4" },
  ];
const SUPPORTED_CODE_EXTENSIONS = [
  '.js', '.jsx', '.ts', '.tsx',  // JavaScript/TypeScript
  '.py', '.ipynb',               // Python
  '.java',                       // Java
  '.cpp', '.cc', '.c', '.h',     // C/C++
  '.cs',                         // C#
  '.rb',                         // Ruby
  '.php',                        // PHP
  '.swift',                      // Swift
  '.go',                         // Go
  '.rs',                         // Rust
  '.kt',                         // Kotlin
  '.m',                          // Objective-C
  '.scala',                      // Scala
  '.pl', '.pm',                  // Perl
  '.html', '.css', '.scss',      // Web
  '.sql',                        // SQL
  '.r',                          // R
  '.dart',                       // Dart
  '.lua',                        // Lua
  '.ex', '.exs'                  // Elixir
];

const ManageUnits = () => {
  const navigate = useNavigate();
  const [units, setUnits] = useState(() => {
    const savedUnits = localStorage.getItem('units');
    if (savedUnits) {
      const parsedUnits = JSON.parse(savedUnits);
      // Ensure each unit has the required arrays
      return parsedUnits.map(unit => ({
        ...unit,
        pdfs: unit.pdfs || [],
        videos: unit.videos || [],
        codes: unit.codes || []
      }));
    }
    // Initialize with predefined units if no saved data exists
    const initialUnits = UNIT_STRUCTURE.map(unit => ({
      ...unit,
      pdfs: [],
      videos: [],
      codes: []
    }));
    localStorage.setItem('units', JSON.stringify(initialUnits));
    return initialUnits;
  });
  const [isUrlDialogOpen, setIsUrlDialogOpen] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [selectedUnitId, setSelectedUnitId] = useState(null);

  useEffect(() => {
    const savedUnits = localStorage.getItem('units');
    if (savedUnits) {
      setUnits(JSON.parse(savedUnits));
    }
  }, []); // Run only on mount

  useEffect(() => {
    if (units.length > 0) {
      localStorage.setItem('units', JSON.stringify(units));
    }
  }, [units]); // Run whenever units change

  const handleFileUpload = async (e, unitId, type) => {
    const files = Array.from(e.target.files);
    
    const processedFiles = await Promise.all(
      files.map(async (file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve({
              id: Date.now() + Math.random(),
              name: file.name,
              type: file.type,
              content: reader.result,
              unitId: unitId
            });
          };
          reader.readAsDataURL(file);
        });
      })
    );

    setUnits(prevUnits => {
      const updatedUnits = prevUnits.map(unit => {
        if (unit.id === parseInt(unitId)) {
          const existingFiles = unit[type] || [];
          return {
            ...unit,
            [type]: [...existingFiles, ...processedFiles]
          };
        }
        return unit;
      });
      return updatedUnits;
    });

    const updatedUnits = units.map(unit => {
      if (unit.id === parseInt(unitId)) {
        const existingFiles = unit[type] || [];
        return {
          ...unit,
          [type]: [...existingFiles, ...processedFiles]
        };
      }
      return unit;
    });
    localStorage.setItem('units', JSON.stringify(updatedUnits));

    e.target.value = '';
  };

  const handleRemove = (unitId, type, index) => {
    setUnits(prevUnits => {
      const updatedUnits = prevUnits.map(unit => {
        if (unit.id === unitId) {
          const updatedFiles = [...unit[type]];
          updatedFiles.splice(index, 1);
          return {
            ...unit,
            [type]: updatedFiles
          };
        }
        return unit;
      });
      
      // Update localStorage immediately
      localStorage.setItem('units', JSON.stringify(updatedUnits));
      return updatedUnits;
    });
  };
  const handleAddYoutubeUrl = (unitId) => {
    setSelectedUnitId(unitId);
    setIsUrlDialogOpen(true);
  };

  const handleUrlSubmit = () => {
    if (!youtubeUrl.trim()) return;

    // Update both state and localStorage in one go
    const savedUnits = JSON.parse(localStorage.getItem('units') || '[]');
    const updatedUnits = savedUnits.map(unit => {
      if (unit.id === selectedUnitId) {
        return {
          ...unit,
          videos: [...(unit.videos || []), { url: youtubeUrl }]
        };
      }
      return unit;
    });

    // Update localStorage first
    localStorage.setItem('units', JSON.stringify(updatedUnits));
    
    // Then update state
    setUnits(updatedUnits);

    setYoutubeUrl('');
    setIsUrlDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate('/admin/dashboard')}
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/5"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-medium">Manage Units</h1>
          </div>
        </div>

        <div className="space-y-8">
          {units.map(unit => (
            <Card key={unit.id} className="bg-white/5 p-6 rounded-xl border border-white/10">
              <div className="mb-6">
                <h2 className="text-xl font-medium">{unit.title}</h2>
                <p className="text-white/60 mt-1">{unit.description}</p>
              </div>
              
              {/* PDF Files Section */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-white/70">PDF FILES</h3>
                  <div>
                    <input
                      type="file"
                      id={`pdf-${unit.id}`}
                      multiple
                      accept=".pdf"
                      onChange={(e) => handleFileUpload(e, unit.id, 'pdfs')}
                      style={{ display: 'none' }}
                    />
                    <label
                      htmlFor={`pdf-${unit.id}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg cursor-pointer"
                    >
                      <Upload className="h-4 w-4" />
                      Upload PDFs
                    </label>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {unit.pdfs?.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-blue-400" />
                        <span>{file.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                        onClick={() => handleRemove(unit.id, 'pdfs', index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Code Files Section */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-white/70">CODE FILES</h3>
                  <div>
                    <input
                      type="file"
                      id={`code-${unit.id}`}
                      multiple
                      accept={SUPPORTED_CODE_EXTENSIONS.join(',')}
                      onChange={(e) => handleFileUpload(e, unit.id, 'codes')}
                      style={{ display: 'none' }}
                    />
                    <label
                      htmlFor={`code-${unit.id}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg cursor-pointer"
                    >
                      <Upload className="h-4 w-4" />
                      Upload Code Files
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  {unit.codes?.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Code className="h-4 w-4 text-green-400" />
                        <span>{file.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                        onClick={() => handleRemove(unit.id, 'codes', index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Video URLs */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-white/70">VIDEO URLS</h3>
                  <Button
                    variant="outline"
                    className="bg-transparent border-white/10 text-white hover:bg-white/5 rounded-xl"
                    onClick={() => handleAddYoutubeUrl(unit.id)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add YouTube URL
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {unit.videos?.map((video, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/[0.07] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Video className="h-5 w-5 text-white/40" />
                        <span className="text-sm text-white/80">{video.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white/40 hover:text-white hover:bg-white/10"
                        onClick={() => handleRemove(unit.id, 'videos', index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* YouTube URL dialog */}
      <Dialog open={isUrlDialogOpen} onOpenChange={setIsUrlDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add YouTube URL</DialogTitle>
            <DialogFooter>
              <Button type="submit" onClick={() => handleUrlSubmit()}>
                Save
              </Button>
            </DialogFooter>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="url"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="Paste YouTube URL"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageUnits;