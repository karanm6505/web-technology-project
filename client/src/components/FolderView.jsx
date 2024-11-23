import { useState } from 'react';
import { ChevronRight, ChevronDown, Folder, FileCode } from 'lucide-react';
import { cn } from '@/lib/utils';

const FolderView = ({ structure, onFileSelect, selectedFile }) => {
  const [expandedFolders, setExpandedFolders] = useState(new Set());

  const toggleFolder = (folderPath) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderPath)) {
      newExpanded.delete(folderPath);
    } else {
      newExpanded.add(folderPath);
    }
    setExpandedFolders(newExpanded);
  };

  const renderItem = (item, path = '') => {
    const currentPath = path ? `${path}/${item.name}` : item.name;
    
    if (item.type === 'folder') {
      const isExpanded = expandedFolders.has(currentPath);
      
      return (
        <div key={currentPath}>
          <button
            onClick={() => toggleFolder(currentPath)}
            className={cn(
              "w-full flex items-center gap-2 px-2 py-1.5 rounded-lg",
              "hover:bg-white/5 text-white/70 hover:text-white",
              "transition-colors duration-200"
            )}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
            <Folder className="h-4 w-4 text-yellow-400" />
            <span className="text-sm">{item.name}</span>
          </button>
          
          {isExpanded && (
            <div className="ml-4 border-l border-white/10 pl-2 mt-1">
              {Object.entries(item.children).map(([name, child]) => 
                renderItem(child, currentPath)
              )}
            </div>
          )}
        </div>
      );
    }

    return (
      <button
        key={currentPath}
        onClick={() => onFileSelect(item)}
        className={cn(
          "w-full flex items-center gap-2 px-2 py-1.5 rounded-lg",
          "hover:bg-white/5",
          selectedFile?.name === item.name
            ? "bg-white/10 text-white"
            : "text-white/70 hover:text-white",
          "transition-colors duration-200"
        )}
      >
        <FileCode className="h-4 w-4 text-blue-400" />
        <span className="text-sm">{item.name}</span>
      </button>
    );
  };

  return (
    <div className="w-64 bg-black/20 border-r border-white/10 p-4 space-y-2">
      {Object.entries(structure).map(([name, item]) => renderItem(item))}
    </div>
  );
};

export default FolderView; 