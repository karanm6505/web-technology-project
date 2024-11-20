import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowRight, Mail, Lock, CheckCircle2, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login(formData);
      // Navigation is handled in AuthContext
    } catch (err) {
      setError(err.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="absolute top-[40%] left-[50%] w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-[120px]" />
          <div className="absolute top-[45%] left-[45%] w-[400px] h-[400px] rounded-full bg-purple-500/20 blur-[120px]" />
        </div>
      </div>

      <div className="relative container mx-auto px-4">
        <div className="flex min-h-screen">
          {/* Left side - We'll replace this entire section */}
          <div className="hidden lg:flex lg:flex-1 flex-col justify-center pr-16 space-y-8">
            <h2 className="text-4xl font-bold mb-6">
              Start Your Coding Journey
            </h2>
            
            {/* Interactive Terminal */}
            <div className="bg-[#0d1117] rounded-2xl p-6 font-mono mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="space-y-2">
                <div className="typing-animation-1">
                  <span className="text-green-400">student@webdev</span>
                  <span className="text-white">:</span>
                  <span className="text-blue-400">~</span>
                  <span className="text-white">$ show-learning-path</span>
                </div>
                <div className="typing-animation-2 text-white/60">
                  Loading curriculum data...
                </div>
              </div>
            </div>

            {/* Learning Path - Appears after terminal animation */}
            <div className="space-y-6 path-animation">
              {/* Connecting Line */}
              <div className="relative">
                <div className="absolute left-5 top-8 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-blue-500 to-purple-500"></div>
                
                {/* Path Steps */}
                <div className="space-y-8">
                  {[
                    {
                      color: "green",
                      title: "Fundamentals",
                      desc: "HTML, CSS & JavaScript basics",
                      command: "initialize-basics"
                    },
                    {
                      color: "blue",
                      title: "Frontend Development",
                      desc: "React & Modern JavaScript",
                      command: "start-frontend"
                    },
                    {
                      color: "purple",
                      title: "Full Stack",
                      desc: "Backend & Database Integration",
                      command: "deploy-fullstack"
                    }
                  ].map((step, idx) => (
                    <div key={idx} 
                         className="flex items-center gap-4 path-step"
                         style={{ animationDelay: `${(idx + 2) * 1}s` }}>
                      <div className={`w-10 h-10 rounded-full bg-${step.color}-500/20 flex items-center justify-center relative z-10`}>
                        <div className={`w-6 h-6 rounded-full bg-${step.color}-500 animate-pulse`}></div>
                      </div>
                      <div className="bg-white/[0.02] p-4 rounded-xl flex-1 group hover:bg-white/[0.04] transition-colors">
                        <h3 className="font-semibold">{step.title}</h3>
                        <p className="text-sm text-white/60">{step.desc}</p>
                        <div className="mt-2 font-mono text-sm hidden group-hover:block typing-effect">
                          <span className="text-green-400">$</span>
                          <span className="text-white/80"> {step.command}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Existing Login Form */}
          <div className="flex-1 flex items-center justify-center">
            <Card className="w-full max-w-md bg-white/[0.02] border-white/5 p-8 rounded-2xl">
              <div className="text-center mb-8">
                <div className="inline-flex items-center space-x-2 bg-white/5 rounded-full px-4 py-2 text-white mb-4">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span>Welcome Back</span>
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Login to Your Account</h1>
                <p className="text-white/60">Continue your learning journey</p>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mb-6 text-red-200 text-center">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-white/40" />
                    <Input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-white/5 border-white/10 text-white pl-10 py-6"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-white/40" />
                    <Input
                      type="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="bg-white/5 border-white/10 text-white pl-10 py-6"
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-white text-black hover:bg-gray-200 text-lg py-6 rounded-full"
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-white/60">
                  Don't have an account?{' '}
                  <button
                    onClick={() => navigate('/signup')}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <footer className="absolute bottom-0 left-0 right-0 py-6 border-t border-white/5">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-white/60 text-sm">
                © 2024 WebDev Hub. All rights reserved.
              </div>
              <div className="flex gap-6">
                <a href="#" className="text-white/60 hover:text-white text-sm">Privacy Policy</a>
                <a href="#" className="text-white/60 hover:text-white text-sm">Terms of Service</a>
                <a href="#" className="text-white/60 hover:text-white text-sm">Contact</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Login;