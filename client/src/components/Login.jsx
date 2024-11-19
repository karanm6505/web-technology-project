import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowRight, Mail, Lock } from 'lucide-react';
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
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />

      <div className="relative container mx-auto px-4">
        <div className="flex min-h-screen items-center justify-center">
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
    </div>
  );
};

export default Login;