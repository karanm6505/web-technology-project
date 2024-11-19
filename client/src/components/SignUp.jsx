import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Mail, Lock, Phone, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

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
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />

      <div className="relative container mx-auto px-4">
        <div className="flex min-h-screen items-center justify-center py-12">
          <Card className="w-full max-w-md bg-white/[0.02] border-white/5 p-8 rounded-2xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 bg-white/5 rounded-full px-4 py-2 text-white">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span>Create Account</span>
              </div>
              
              <h1 className="mt-6 text-3xl font-bold text-white">
                Join Our Community
              </h1>
              
              <p className="mt-2 text-lg text-white/60">
                Start your learning journey today
              </p>
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
        </div>
      </div>
    </div>
  );
};

export default SignUp;