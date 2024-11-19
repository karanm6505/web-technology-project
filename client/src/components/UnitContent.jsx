import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  ArrowRight,
  ArrowLeft,
  Play, 
  Code2,
  FileText,
  CheckCircle2,
  ChevronRight,
  Terminal,
  Youtube,
  Video,
  Code
} from 'lucide-react';

const UnitContent = () => {
  const { unitId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pdfs');
  
  const unitContent = JSON.parse(localStorage.getItem('unitContents'))?.find(
    unit => unit.id === parseInt(unitId)
  );

  const contentTypes = [
    { id: 'pdfs', label: 'PDFs', icon: <FileText className="h-5 w-5" /> },
    { id: 'videos', label: 'Videos', icon: <Video className="h-5 w-5" /> },
    { id: 'codes', label: 'Code Examples', icon: <Code className="h-5 w-5" /> }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <Button
          onClick={() => navigate('/dashboard')}
          className="mb-8 bg-white/5 hover:bg-white/10"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Dashboard
        </Button>

        <h1 className="text-3xl font-bold mb-8">Unit {unitId} Materials</h1>

        {/* Content Type Tabs */}
        <div className="flex gap-4 mb-8">
          {contentTypes.map(type => (
            <Button
              key={type.id}
              onClick={() => setActiveTab(type.id)}
              className={`flex items-center gap-2 px-6 py-4 rounded-lg
                ${activeTab === type.id 
                  ? 'bg-white text-black' 
                  : 'bg-white/5 hover:bg-white/10'}`}
            >
              {type.icon}
              {type.label}
            </Button>
          ))}
        </div>

        {/* Content Display */}
        <Card className="bg-white/[0.02] border-white/5 p-6">
          {unitContent?.[activeTab]?.map((item, idx) => (
            <div 
              key={idx}
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg mb-2"
            >
              <div className="flex items-center gap-3">
                {activeTab === 'pdfs' && <FileText className="h-5 w-5 text-blue-400" />}
                {activeTab === 'videos' && <Video className="h-5 w-5 text-red-400" />}
                {activeTab === 'codes' && <Code className="h-5 w-5 text-green-400" />}
                <span>{item.name || `Resource ${idx + 1}`}</span>
              </div>
              <Button 
                onClick={() => handleViewContent(item, activeTab)}
                className="bg-white/10 hover:bg-white/20"
              >
                View
              </Button>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

export default UnitContent;