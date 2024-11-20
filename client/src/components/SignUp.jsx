import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardTitle, CardDescription, CardHeader, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Mail, Lock, Phone, User, Rocket, Shield, Code2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

const SignUp = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    verifyPassword: '',
    phone: '',
    role: 'user'
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activePhase, setActivePhase] = useState(0);

  const technologies = [
    {
      name: "MongoDB",
      icon: "🍃",
      color: "green",
      description: "NoSQL database for modern applications",
      features: ["Document Database", "Atlas Cloud", "Flexible Schema"],
      tag: "Database",
      docLink: "https://docs.mongodb.com/"
    },
    {
      name: "Express.js",
      icon: "⚡",
      color: "gray",
      description: "Fast, unopinionated web framework for Node.js",
      features: ["Middleware", "Routing", "API Building"],
      tag: "Backend",
      docLink: "https://expressjs.com/en/4x/api.html"
    },
    {
      name: "React",
      icon: "⚛️",
      color: "blue",
      description: "JavaScript library for building user interfaces",
      features: ["Component-Based", "Virtual DOM", "Hooks"],
      tag: "Frontend",
      docLink: "https://react.dev/reference/react"
    },
    {
      name: "Node.js",
      icon: "🚀",
      color: "green",
      description: "JavaScript runtime built on Chrome's V8 engine",
      features: ["Event-Driven", "Non-Blocking I/O", "NPM"],
      tag: "Runtime",
      docLink: "https://nodejs.org/docs/latest/api/"
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.verifyPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    setIsLoading(true);
    
    try {
      await signup({
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role: formData.role
      });
    } catch (err) {
      setError(err.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="absolute top-[40%] right-[50%] w-[500px] h-[500px] rounded-full bg-green-500/20 blur-[120px]" />
          <div className="absolute top-[45%] right-[45%] w-[400px] h-[400px] rounded-full bg-blue-500/20 blur-[120px]" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative flex min-h-screen">
        {/* Left Side - Tech Stack */}
        <div className="w-[40%] p-12 flex items-center">
          <div className="space-y-6 w-full">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500/20 to-blue-500/20 
                             flex items-center justify-center text-2xl">
                🚀
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">MERN Stack Journey</h2>
                <p className="text-white/60 text-sm">Master the complete web development stack</p>
              </div>
            </div>
            
            {technologies.map((tech, index) => (
              <Card 
                key={index}
                className="group bg-black/40 backdrop-blur-xl border-white/5 hover:border-white/10 
                         transition-all duration-300 hover:translate-x-2"
              >
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`h-12 w-12 rounded-xl bg-gradient-to-br 
                                    from-${tech.color}-500/20 to-transparent 
                                    flex items-center justify-center text-2xl
                                    group-hover:scale-110 transition-transform duration-300`}>
                        {tech.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl text-white">{tech.name}</CardTitle>
                        <CardDescription className="text-white/60">{tech.description}</CardDescription>
                      </div>
                    </div>
                    <Badge 
                      variant="outline" 
                      className="bg-white/5 text-white 
                                 group-hover:bg-white/10 transition-colors"
                    >
                      {tech.tag}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="flex gap-2 flex-wrap mb-4">
                    {tech.features.map((feature, idx) => (
                      <Badge 
                        key={idx}
                        variant="outline" 
                        className="bg-white/5 hover:bg-white/10 transition-colors text-white"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full bg-white/5 border-white/10 hover:bg-white/10 text-white
                             transition-all duration-300 hover:scale-[1.02] hover:shadow-lg
                             hover:shadow-${tech.color}-500/10"
                    onClick={() => window.open(tech.docLink, '_blank')}
                  >
                    <span className="mr-2">View Documentation</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-[60%] bg-white/[0.02]">
          <div className="h-full flex items-center justify-center p-12">
            <div className="w-full max-w-xl space-y-8">
              {/* Brand Header */}
              <div className="flex flex-col items-center space-y-4 mb-8">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-blue-600 p-2 flex items-center justify-center">
                  <Rocket className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Start Your Journey
                </h1>
                <p className="text-sm text-white/60 max-w-sm text-center">
                  Join our community of developers and start learning today
                </p>
              </div>

              {/* Card Component */}
              <Card className="w-full max-w-md bg-white/[0.02] border-white/5 p-8 rounded-2xl backdrop-blur-xl">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center space-x-2 bg-white/5 rounded-full px-4 py-2 text-white">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span>Create Account</span>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mb-6 text-red-200 text-center">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-white/80 mb-2">Account Type</label>
                    <Select 
                      value={formData.role}
                      onValueChange={(value) => setFormData({ ...formData, role: value })}
                    >
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue placeholder="Select account type" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#161b22] border-white/10">
                        <SelectItem value="user">Regular User</SelectItem>
                        <SelectItem value="admin">Administrator</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

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

                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-white/40" />
                    <Input
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-white/5 border-white/10 text-white pl-10 py-6"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-white/40" />
                    <Input
                      type="password"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="bg-white/5 border-white/10 text-white pl-10 py-6"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-white/40" />
                    <Input
                      type="password"
                      placeholder="Verify password"
                      value={formData.verifyPassword}
                      onChange={(e) => setFormData({ ...formData, verifyPassword: e.target.value })}
                      className="bg-white/5 border-white/10 text-white pl-10 py-6"
                      required
                    />
                  </div>

                  <Button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-white text-black hover:bg-gray-200 
                             transition-all duration-300 ease-in-out
                             rounded-full py-6 text-lg font-medium
                             flex items-center justify-center gap-2
                             disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign Up</span>
                        <ArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </Button>

                  <p className="text-center text-white/60">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => navigate('/login')}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Login
                    </button>
                  </p>
                </form>
              </Card>

              {/* Trust Indicators */}
              <div className="flex justify-center items-center gap-6 py-4">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-white/40" />
                  <span className="text-xs text-white/40">Secure Sign Up</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-white/40" />
                  <span className="text-xs text-white/40">SSL Protected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
