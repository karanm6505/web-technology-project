import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from './ui/card';

const UnitDashboard = () => {
  const navigate = useNavigate();

  const units = [
    { id: 1, title: 'Unit-1', description: 'Introduction to Web Development' },
    { id: 2, title: 'Unit-2', description: 'Frontend Fundamentals' },
    { id: 3, title: 'Unit-3', description: 'Backend Development' },
    { id: 4, title: 'Unit-4', description: 'Full Stack Integration' },
  ];

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="text-blue-500 hover:text-blue-400"
            >
              ← Back
            </button>
            <h1 className="text-2xl font-bold">Unit Dashboard</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {units.map((unit) => (
            <button
              key={unit.id}
              onClick={() => navigate(`/unit/${unit.id}`)}
              className="group relative h-48 bg-card hover:bg-card/90 
                         rounded-xl shadow-lg transition-all duration-300 
                         border border-border hover:border-primary
                         flex flex-col items-center justify-center p-6"
            >
              <h2 className="text-2xl font-semibold text-primary mb-3">
                {unit.title}
              </h2>
              <p className="text-muted-foreground text-center">
                {unit.description}
              </p>
              <div className="absolute bottom-4 right-4 opacity-0 
                            group-hover:opacity-100 transition-opacity">
                <svg 
                  className="w-6 h-6 text-primary" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 7l5 5m0 0l-5 5m5-5H6" 
                  />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UnitDashboard;