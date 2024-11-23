import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  ArrowRight, 
  CheckCircle2,
  Lock,
  LogOut,
  User,
  Settings
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const UnitDashboard = () => {
  const navigate = useNavigate();
  const [selectedUnit, setSelectedUnit] = useState(1);
  const [userProfile, setUserProfile] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const { user } = useAuth();

  useEffect(() => {
    const savedUnits = localStorage.getItem('units');
    if (!savedUnits) {
      const UNIT_STRUCTURE = units.map(unit => ({
        ...unit,
        pdfs: [],
        codes: [],
        videos: []
      }));
      localStorage.setItem('units', JSON.stringify(UNIT_STRUCTURE));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        
        const data = await response.json();
        setUserProfile(data);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleStartLearning = (unitId) => {
    navigate(`/unit/${unitId}/resources`);
  };

  const units = [
    {
      id: 1,
      title: "HTML, CSS & JavaScript Fundamentals",
      duration: "14 hours",
      description: "Core fundamentals of web development covering HTML, CSS, and JavaScript",
      syllabus: [
        "Introduction to Web Architecture and Web protocols (HTTP Request Response Formats, URLs)",
        "Basic Mark-ups & syntax",
        "HTML elements & attributes",
        "Web Form 2.0 & Form Controls",
        "HTML5 (New Tags, Inputs, Elements and Controls)",
        "CSS3.0-Styles and Style sheets",
        "Selectors",
        "Style properties",
        "Box Model and Positioning",
        "JavaScript Basics(Variables, Scope)",
        "JavaScript Basics: Functions, Hoisting",
        "JavaScript Built-in Objects",
        "JavaScript Objects",
        "DOM Manipulations",
        "DOM Manipulations Examples",
        "Events",
        "Event Handling in JavaScript",
        "Event Handling Examples",
        
      ]
    },
    {
      id: 2,
      title: "Advanced JavaScript & jQuery",
      duration: "14 hours",
      description: "Advanced JavaScript concepts including HTML5 APIs and jQuery",
      syllabus: [
        "HTML5 (APIs)",
        "Audio, Video and Progress",
        "Canvas, SVG",
        "File api, geolocation",
        "web workers",
        "jQuery (Introduction, Handling events)",
        "jQuery (Introduction, Handling events)",
        "Callbacks & Promises",
        "Callbacks & Promises",
        "Single Page Application",
        "XML Vs JSON",
        "Asynchronous Communication- XHR (properties and methods)",
        "Asynchronous Communication- XHR (properties and methods)",
        "$.ajax,$.get,$.post, $load",
        "$.ajax,$.get,$.post, $load"
      ]
    },
    {
      id: 3,
      title: "React & Node.js Fundamentals",
      duration: "14 hours",
      description: "Introduction to React components and Node.js architecture",
      syllabus: [
        "Complex components",
        "Properties, States and Context",
        "Component lifecycle methods",
        "Component lifecycle methods",
        "Stateless components",
        "Refs",
        "Keys",
        "Event Handling",
        "React Forms",
        "React Forms",
        "React Hook",
        "Understanding Node JS Architecture",
        "Set up Node JS app",
        "Node Modules",
        "Node Modules",
        "File system",
        "HTTP Module",
        "Handling HTTP Requests - 2"
      ]
    },
    {
      id: 4,
      title: "Advanced React & Backend Integration",
      duration: "14 hours",
      description: "Advanced React concepts and server-side integration",
      syllabus: [
        "MongoDB - Documents, Collections",
        "Reading and writing to the DB",
        "MongoDB NodeJS driver",
        "Running a react application on NodeJS (Hands-on)",
        "React Router",
        "ExpressJS - Introduction to Web services",
        "REST APIs",
        "Express Framework Overview",
        "Routing",
        "URL Binding",
        "Error Handling",
        "File Upload",
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with Profile and Sign Out */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-8">
            <h1 className="text-3xl font-medium">Course Units</h1>
          </div>
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 
                         flex items-center justify-center hover:from-violet-500/30 hover:to-fuchsia-500/30 
                         transition-all duration-300 border border-white/10"
            >
              <User className="h-5 w-5" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl bg-gradient-to-br from-gray-900/95 to-black/95 
                              backdrop-blur-xl border border-white/10 shadow-2xl transform origin-top-right 
                              transition-all duration-200 scale-100 opacity-100">
                <div className="p-3">
                  {/* User Info Section */}
                  <div className="px-3 py-4 flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 
                                  flex items-center justify-center border border-white/10">
                      <User className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="font-medium">{userProfile?.username || userProfile?.name}</div>
                      <div className="text-sm text-white/60">{userProfile?.email}</div>
                    </div>
                  </div>

                  <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent my-2" />

                  {/* Menu Items */}
                  <button
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white/80 
                             hover:bg-white/5 rounded-lg transition-colors group"
                    onClick={() => navigate('/profile')}
                  >
                    <User className="h-4 w-4 group-hover:text-violet-400 transition-colors" />
                    Your Profile
                  </button>
                  <button
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white/80 
                             hover:bg-white/5 rounded-lg transition-colors group"
                    onClick={() => navigate('/settings')}
                  >
                    <Settings className="h-4 w-4 group-hover:text-violet-400 transition-colors" />
                    Settings
                  </button>

                  <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent my-2" />

                  {/* Sign Out Button */}
                  <button
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 
                             hover:bg-red-500/10 rounded-lg transition-colors group"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-4 w-4 group-hover:text-red-400 transition-colors" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Unit Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {units.map((unit) => (
            <Button
              key={unit.id}
              onClick={() => setSelectedUnit(unit.id)}
              className={`
                px-8 py-6 rounded-full text-lg font-medium transition-all duration-300
                ${selectedUnit === unit.id
                  ? 'bg-white text-black hover:bg-gray-200'
                  : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                }
              `}
            >
              Unit {unit.id}
            </Button>
          ))}
        </div>

        {/* Selected Unit Content */}
        {units
          .filter(unit => unit.id === selectedUnit)
          .map(unit => (
            <div key={unit.id} className="max-w-4xl mx-auto">
              <Card className="bg-white/[0.02] border-white/5 p-8 rounded-2xl">
                {/* Unit Header */}
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{unit.title}</h2>
                    <p className="text-white/60">{unit.description}</p>
                  </div>
                  <Badge className="bg-white/5 text-white/60 border-0">
                    {unit.duration}
                  </Badge>
                </div>

                {/* Syllabus */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-white/80">Syllabus Overview</h3>
                  <div className="grid gap-3">
                    {unit.syllabus.map((item, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center gap-4 p-4 bg-white/[0.02] rounded-xl"
                      >
                        <span className="text-white/40 text-sm font-mono">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="text-white/80">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Start Learning Button */}
                <Button
                  onClick={() => handleStartLearning(unit.id)}
                  className="w-full mt-8 bg-white text-black hover:bg-gray-200 
                           rounded-full py-6 text-lg font-medium"
                >
                  Start Learning Unit {unit.id}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UnitDashboard;