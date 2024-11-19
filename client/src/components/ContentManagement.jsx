import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit2, Upload, FileText, Video, Code, X, Plus, Eye, Trash2 } from 'lucide-react';

import { toast } from 'react-hot-toast';

const UNIT_STRUCTURE = [
  { id: 1, title: 'Unit-1', description: 'Introduction to Web Development' },
  { id: 2, title: 'Unit-2', description: 'Frontend Fundamentals' },
  { id: 3, title: 'Unit-3', description: 'Backend Development' },
  { id: 4, title: 'Unit-4', description: 'Full Stack Integration' }
];

const ContentManagement = () => {
  const navigate = useNavigate();
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [units, setUnits] = useState(() => {
    const savedUnits = localStorage.getItem('unitContents');
    return savedUnits ? JSON.parse(savedUnits) : UNIT_STRUCTURE.map(unit => ({
      ...unit,
      pdfs: [],
      videos: [],
      codes: []
    }));
  });

  const [formData, setFormData] = useState({
    pdfs: [],
    videos: [''],
    codes: []
  });

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editVideos, setEditVideos] = useState('');

  const [isEditingUnit, setIsEditingUnit] = useState(false);
  const [editingUnitData, setEditingUnitData] = useState(null);

  useEffect(() => {
    localStorage.setItem('unitContents', JSON.stringify(units));
  }, [units]);

  const handleFileUpload = async (e, type) => {
    const files = Array.from(e.target.files);
    
    if (type === 'pdfs') {
      const validFiles = files.filter(file => 
        file.type === 'application/pdf'
      );

      if (validFiles.length !== files.length) {
        toast.error('Some files are not PDFs');
        return;
      }

      const pdfPromises = validFiles.map(file => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            resolve({
              name: file.name,
              content: event.target.result
            });
          };
          reader.readAsDataURL(file);
        });
      });

      const pdfContents = await Promise.all(pdfPromises);
      setFormData(prev => ({
        ...prev,
        pdfs: [...prev.pdfs, ...pdfContents]
      }));
      toast.success('PDF files uploaded successfully');
    } else if (type === 'codes') {
      const validFiles = files.filter(file => {
        const extension = file.name.split('.').pop().toLowerCase();
        return Object.values(SUPPORTED_LANGUAGES).some(exts => exts.includes(extension));
      });

      if (validFiles.length !== files.length) {
        toast.error('Some files are not supported code files');
        return;
      }

      const codePromises = validFiles.map(file => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            resolve({
              name: file.name,
              content: event.target.result
            });
          };
          reader.readAsDataURL(file);
        });
      });

      const codeContents = await Promise.all(codePromises);
      setFormData(prev => ({
        ...prev,
        codes: [...prev.codes, ...codeContents]
      }));
    }
  };

  const removeFile = (type, index) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const addVideoField = () => {
    setFormData(prev => ({
      ...prev,
      videos: [...prev.videos, '']
    }));
  };

  const updateVideoUrl = (index, value) => {
    setFormData(prev => ({
      ...prev,
      videos: prev.videos.map((url, i) => i === index ? value : url)
    }));
  };

  const handleSave = () => {
    setUnits(prev => prev.map(unit => 
      unit.id === selectedUnit.id 
        ? {
            ...unit,
            pdfs: formData.pdfs,
            videos: formData.videos.filter(url => url.trim() !== ''),
            codes: formData.codes,
            lastUpdated: new Date().toISOString()
          }
        : unit
    ));

    setSelectedUnit(null);
    setFormData({
      pdfs: [],
      videos: [''],
      codes: []
    });
  };

  const handleEdit = (unit) => {
    setSelectedUnit(unit);
    setFormData({
      pdfs: unit.pdfs || [],
      videos: unit.videos?.length ? unit.videos : [''],
      codes: unit.codes || []
    });
  };

  // When editing, load existing unit data
  useEffect(() => {
    if (selectedUnit) {
      const unit = units.find(u => u.id === selectedUnit.id);
      if (unit) {
        setFormData({
          pdfs: unit.pdfs || [],
          videos: unit.videos?.length ? unit.videos : [''],
          codes: unit.codes || []
        });
      }
    }
  }, [selectedUnit, units]);

  // When clicking on a video to view
  const handleViewVideos = (unit) => {
    // Debug log to see what we're working with
    console.log('Unit:', unit);
    console.log('Unit videos:', unit.videos);

    // Make sure videos exist and are in the correct format
    const validVideos = unit.videos.filter(video => video && (typeof video === 'string' || video.url));
    
    if (validVideos.length === 0) {
      toast.error('No valid videos available');
      return;
    }

    // Format videos if needed
    const formattedVideos = validVideos.map(video => {
      if (typeof video === 'string') {
        return { url: video };
      }
      return video;
    });

    console.log('Formatted videos:', formattedVideos);

    navigate('/youtube-viewer', {
      state: {
        videos: formattedVideos,
        title: unit.title
      }
    });
  };

  const handleViewPDFs = (unit) => {
    navigate('/pdf-viewer', {
      state: {
        files: unit.pdfs,
        title: unit.title
      }
    });
  };

  const handleViewCodes = (unit) => {
    navigate('/code-viewer', {
      state: {
        files: unit.codes,
        title: unit.title
      }
    });
  };

  const handleEditUnit = (unit) => {
    setIsEditingUnit(true);
    setEditingUnitData({
      id: unit.id,
      title: unit.title,
      description: unit.description
    });
  };
  // Add this state for content editing
const [isEditingContent, setIsEditingContent] = useState(false);
const [editingContent, setEditingContent] = useState(null);

// Add this handler function
const handleEditContent = (unit) => {
  setIsEditingContent(true);
  setEditingContent({
    id: unit.id,
    title: unit.title,
    pdfs: unit.pdfs || [],
    videos: unit.videos || [''],
    codes: unit.codes || []
  });
};

// Add this to your JSX, after your existing modals
{isEditingContent && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
    <div className="bg-[#161b22] p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          Edit Content: {editingContent.title}
        </h2>
        <button
          onClick={() => setIsEditingContent(false)}
          className="text-[#768390] hover:text-[#adbac7]"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-6">
        {/* PDF Files */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium">PDF Files</label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="file"
              id="pdf-upload"
              multiple
              accept=".pdf"
              onChange={(e) => handleFileUpload(e, 'pdfs')}
              className="hidden"
            />
            <label
              htmlFor="pdf-upload"
              className="px-4 py-2 bg-[#238636] rounded-lg hover:bg-[#2ea043] cursor-pointer flex items-center space-x-2"
            >
              <Upload className="h-4 w-4" />
              <span>Upload PDF Files</span>
            </label>
            <span className="text-sm text-[#8b949e]">
              {editingContent.pdfs.length} file(s) selected
            </span>
          </div>
          {editingContent.pdfs.length > 0 && (
            <div className="mt-2 space-y-2">
              {editingContent.pdfs.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-[#21262d] rounded-lg"
                >
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-orange-400" />
                    <span className="text-sm">{file.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      setEditingContent(prev => ({
                        ...prev,
                        pdfs: prev.pdfs.filter((_, i) => i !== index)
                      }));
                    }}
                    className="text-red-400 hover:text-red-300"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Video URLs */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium">Video URLs</label>
            <button
              onClick={() => setEditingContent(prev => ({
                ...prev,
                videos: [...prev.videos, '']
              }))}
              className="text-sm text-blue-400 hover:text-blue-300 flex items-center space-x-1"
            >
              <Plus className="h-4 w-4" />
              <span>Add Video</span>
            </button>
          </div>
          {editingContent.videos.map((url, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={url}
                onChange={(e) => {
                  const newVideos = [...editingContent.videos];
                  newVideos[index] = e.target.value;
                  setEditingContent(prev => ({
                    ...prev,
                    videos: newVideos
                  }));
                }}
                placeholder="YouTube URL"
                className="flex-1 p-2 bg-[#0d1117] rounded border border-[#30363d] focus:border-[#388bfd] outline-none"
              />
              <button
                onClick={() => {
                  setEditingContent(prev => ({
                    ...prev,
                    videos: prev.videos.filter((_, i) => i !== index)
                  }));
                }}
                className="text-red-400 hover:text-red-300 p-2"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Code Files */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Code Files</label>
          <div className="flex items-center space-x-2">
            <input
              type="file"
              id="code-upload"
              multiple
              accept=".js,.jsx,.py,.java,.cpp,.c,.cs"
              onChange={(e) => handleFileUpload(e, 'codes')}
              className="hidden"
            />
            <label
              htmlFor="code-upload"
              className="px-4 py-2 bg-[#238636] rounded-lg hover:bg-[#2ea043] cursor-pointer flex items-center space-x-2"
            >
              <Upload className="h-4 w-4" />
              <span>Upload Code Files</span>
            </label>
          </div>
          <div className="space-y-2">
            {editingContent.codes.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-[#21262d] rounded-lg"
              >
                <div className="flex items-center space-x-2">
                  <Code className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-[#8b949e]">
                    {file.name}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setEditingContent(prev => ({
                      ...prev,
                      codes: prev.codes.filter((_, i) => i !== index)
                    }));
                  }}
                  className="text-red-400 hover:text-red-300"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Actions */}
      <div className="flex justify-end space-x-3 mt-6">
        <button
          onClick={() => setIsEditingContent(false)}
          className="px-4 py-2 bg-[#30363d] rounded-lg hover:bg-[#30363d]/80"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            // Update the unit with new content
            setUnits(prev => prev.map(unit => 
              unit.id === editingContent.id
                ? {
                    ...unit,
                    pdfs: editingContent.pdfs,
                    videos: editingContent.videos.filter(v => v.trim() !== ''),
                    codes: editingContent.codes
                  }
                : unit
            ));
            setIsEditingContent(false);
            toast.success('Content updated successfully');
          }}
          className="px-4 py-2 bg-[#238636] rounded-lg hover:bg-[#2ea043]"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
)}

// Update the edit button in your unit list
<button
  onClick={() => handleEditContent(unit)}
  className="p-2 hover:bg-[#30363d] rounded-lg"
>
  <Edit2 className="h-5 w-5 text-blue-400" />
</button>

  const handleAddUnit = () => {
    setIsEditingUnit(true);
    setEditingUnitData({
      id: units.length + 1,
      title: '',
      description: '',
      pdfs: [],
      videos: [],
      codes: []
    });
  };

  const handleSaveUnit = () => {
    if (!editingUnitData.title || !editingUnitData.description) {
      toast.error('Title and description are required');
      return;
    }

    setUnits(prev => {
      if (editingUnitData.id > prev.length) {
        // Adding new unit
        return [...prev, {
          ...editingUnitData,
          pdfs: [],
          videos: [],
          codes: []
        }];
      } else {
        // Updating existing unit
        return prev.map(unit => 
          unit.id === editingUnitData.id 
            ? { ...unit, ...editingUnitData }
            : unit
        );
      }
    });

    setIsEditingUnit(false);
    setEditingUnitData(null);
    toast.success(editingUnitData.id > units.length ? 'Unit added successfully' : 'Unit updated successfully');
  };

  const handleDeleteUnit = (unitId) => {
    if (window.confirm('Are you sure you want to delete this unit?')) {
      setUnits(prev => prev.filter(unit => unit.id !== unitId));
      toast.success('Unit deleted successfully');
    }
  };

  if (!units) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="text-blue-500 hover:text-blue-400"
            >
              ← Back
            </button>
            <h1 className="text-2xl font-bold">Content Management</h1>
          </div>
          <button
            onClick={handleAddUnit}
            className="px-4 py-2 bg-[#238636] text-white rounded-lg hover:bg-[#2ea043] flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Unit
          </button>
        </div>

        {/* Units List */}
        <div className="grid gap-6">
          {units.map((unit) => (
            <div key={unit.id} className="bg-[#161b22] p-6 rounded-lg border border-[#30363d]">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{unit.title}</h2>
                  <p className="text-[#8b949e] mt-1">{unit.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditUnit(unit)}
                    className="p-2 hover:bg-[#30363d] rounded-lg"
                  >
                    <Edit2 className="h-5 w-5 text-blue-400" />
                  </button>
                  <button
                    onClick={() => handleDeleteUnit(unit.id)}
                    className="p-2 hover:bg-[#30363d] rounded-lg"
                  >
                    <Trash2 className="h-5 w-5 text-red-400" />
                  </button>
                </div>
              </div>

              {/* Display Files */}
              <div className="space-y-4">
                {/* PDFs */}
                {unit.pdfs?.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-[#8b949e]">PDF Files</h3>
                    <div className="grid gap-2">
                      {unit.pdfs.map((pdf, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-[#0d1117] rounded-lg">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-5 w-5 text-orange-400" />
                            <span className="text-sm truncate">{pdf.name}</span>
                          </div>
                          <button
                            onClick={() => handleViewPDFs(unit)}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Videos */}
                {unit.videos?.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-[#8b949e]">Video Tutorials</h3>
                    <div className="grid gap-2">
                      {unit.videos.map((video, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-[#0d1117] rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Video className="h-5 w-5 text-blue-400" />
                            <span className="text-sm truncate">Video {index + 1}</span>
                          </div>
                          <button
                            onClick={() => {
                              console.log('Viewing videos for unit:', unit);
                              handleViewVideos(unit);
                            }}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Code Files */}
                {unit.codes?.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-[#8b949e]">Code Examples</h3>
                    <div className="grid gap-2">
                      {unit.codes.map((code, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-[#0d1117] rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Code className="h-5 w-5 text-green-400" />
                            <span className="text-sm truncate">{code.name}</span>
                          </div>
                          <button
                            onClick={() => handleViewCodes(unit)}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Edit Modal */}
        {isEditingUnit && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-[#161b22] p-6 rounded-lg w-full max-w-2xl">
              <h2 className="text-xl font-semibold mb-4">
                Edit {editingUnitData.title}
              </h2>

              <div className="space-y-6">
                {/* PDF Files */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium">PDF Files</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="file"
                      id="pdf-upload"
                      multiple
                      accept=".pdf"
                      onChange={(e) => handleFileUpload(e, 'pdfs')}
                      className="hidden"
                    />
                    <label
                      htmlFor="pdf-upload"
                      className="px-4 py-2 bg-[#238636] rounded-lg hover:bg-[#2ea043] cursor-pointer flex items-center space-x-2"
                    >
                      <Upload className="h-4 w-4" />
                      <span>Upload PDF Files</span>
                    </label>
                    <span className="text-sm text-[#8b949e]">
                      {formData.pdfs.length} file(s) selected
                    </span>
                  </div>
                  {formData.pdfs.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {formData.pdfs.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-[#161b22] rounded-lg"
                        >
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4 text-orange-400" />
                            <span className="text-sm">{file.name}</span>
                          </div>
                          <button
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                pdfs: prev.pdfs.filter((_, i) => i !== index)
                              }));
                            }}
                            className="text-red-400 hover:text-red-300"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Video URLs */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium">Video URLs</label>
                    <button
                      onClick={addVideoField}
                      className="text-sm text-blue-400 hover:text-blue-300 flex items-center space-x-1"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Video</span>
                    </button>
                  </div>
                  {formData.videos.map((url, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={url}
                        onChange={(e) => updateVideoUrl(index, e.target.value)}
                        placeholder="YouTube URL"
                        className="flex-1 p-2 bg-[#0d1117] rounded border border-[#30363d] focus:border-[#388bfd] outline-none"
                      />
                      <button
                        onClick={() => removeFile('videos', index)}
                        className="text-red-400 hover:text-red-300 p-2"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Code Files */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Code Files</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="file"
                      id="code-upload"
                      multiple
                      accept={Object.values(SUPPORTED_LANGUAGES)
                        .flat()
                        .map(ext => `.${ext}`)
                        .join(',')}
                      onChange={(e) => handleFileUpload(e, 'codes')}
                      className="hidden"
                    />
                    <label
                      htmlFor="code-upload"
                      className="px-4 py-2 bg-[#238636] rounded-lg hover:bg-[#2ea043] cursor-pointer flex items-center space-x-2"
                    >
                      <Upload className="h-4 w-4" />
                      <span>Upload Code Files</span>
                    </label>
                  </div>
                  <div className="space-y-2">
                    {formData.codes.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-[#161b22] rounded-lg"
                      >
                        <div className="flex items-center space-x-2">
                          <Code className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-[#8b949e]">
                            {file.name}
                          </span>
                        </div>
                        <button
                          onClick={() => removeFile('codes', index)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setIsEditingUnit(false);
                    setEditingUnitData(null);
                  }}
                  className="px-4 py-2 bg-[#30363d] rounded-lg hover:bg-[#30363d]/80"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveUnit}
                  className="px-4 py-2 bg-[#238636] rounded-lg hover:bg-[#2ea043]"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentManagement;