import { useNavigate } from 'react-router-dom';
import { 
  Code2, 
  BookOpen, 
  Users, 
  Laptop,
  Layout,
  Database,
  Github,
  Globe2,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Trophy,
  GraduationCap,
  Star,
  CheckCircle2,
  Award,
  Zap,
  Shield,
  Home
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Layout className="h-6 w-6" />,
      title: "Frontend Development",
      description: "Master HTML, CSS, and modern JavaScript frameworks",
      color: "text-blue-400"
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Backend Integration",
      description: "Learn APIs, databases, and server-side concepts",
      color: "text-green-400"
    },
    {
      icon: <Code2 className="h-6 w-6" />,
      title: "Interactive Learning",
      description: "Practice with real-world code examples and exercises",
      color: "text-purple-400"
    },
    {
      icon: <Github className="h-6 w-6" />,
      title: "Best Practices",
      description: "Learn modern development workflows and tools",
      color: "text-orange-400"
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Comprehensive Resources",
      description: "Access tutorials, documentation, and reference guides",
      color: "text-pink-400"
    },
    {
      icon: <Globe2 className="h-6 w-6" />,
      title: "Web Standards",
      description: "Stay updated with latest web technologies and standards",
      color: "text-yellow-400"
    }
  ];

  const benefits = [
    {
      icon: <CheckCircle2 className="h-6 w-6 text-green-400" />,
      title: "Industry-Relevant Curriculum",
      description: "Courses designed in collaboration with industry experts"
    },
    {
      icon: <Award className="h-6 w-6 text-yellow-400" />,
      title: "Certification",
      description: "Earn recognized certificates upon course completion"
    },
    {
      icon: <Zap className="h-6 w-6 text-blue-400" />,
      title: "Learn at Your Pace",
      description: "Flexible learning schedule with lifetime access"
    },
    {
      icon: <Shield className="h-6 w-6 text-purple-400" />,
      title: "Project-Based Learning",
      description: "Build real-world projects for your portfolio"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Home Button */}
      <Button
        variant="outline"
        size="default"
        className="fixed top-6 left-6 bg-black/50 backdrop-blur-sm border-white/10 
                   hover:bg-white/10 transition-all duration-300 z-50 
                   flex items-center gap-2"
        onClick={() => navigate('/home')}
      >
        <Home className="h-5 w-5" />
        <span>Home</span>
      </Button>

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />

      <div className="relative">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-white/5 rounded-full px-4 py-2 text-white mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span>Your Web Development Journey Starts Here</span>
            </div>

            <h1 className="text-5xl font-bold mb-6">
              Master Modern Web Development
            </h1>

            <p className="text-xl text-white/60 mb-8">
              A comprehensive resource hub for learning web technologies, from frontend basics 
              to full-stack development. Access curated tutorials, interactive exercises, 
              and real-world projects.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={() => navigate('/signup')}
                className="bg-white text-black hover:bg-gray-200 rounded-full px-8 py-6 text-lg"
              >
                Start Learning
              </Button>
              <Button
                onClick={() => navigate('/login')}
                className="bg-white/5 text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white/[0.02] border border-white/5 rounded-2xl p-6
                         hover:border-white/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`${feature.color} mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/60">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="container mx-auto px-4 py-20 bg-white/[0.02]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Choose WebDev Hub?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-white/60">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-12 border border-white/5">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-white/60 mb-8">
              Join thousands of successful developers who have transformed their careers with us.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={() => navigate('/signup')}
                className="bg-white text-black hover:bg-gray-200 rounded-full px-8 py-6 text-lg"
              >
                Get Started Now
              </Button>
              <Button
                onClick={() => navigate('/courses')}
                className="bg-white/5 text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg"
              >
                Browse Courses
              </Button>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-20">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">10K+</div>
              <div className="text-white/60">Active Learners</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">500+</div>
              <div className="text-white/60">Video Tutorials</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">50+</div>
              <div className="text-white/60">Expert Mentors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-400 mb-2">95%</div>
              <div className="text-white/60">Success Rate</div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <footer className="border-t border-white/5 bg-black/30 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Company Info */}
              <div className="space-y-4">
                <h4 className="text-xl font-semibold">WebDev Hub</h4>
                <p className="text-white/60">
                  Empowering developers to build the future of the web.
                </p>
                <div className="flex space-x-4">
                  <a 
                    href="https://github.com/karanm6505/web-technology-project" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white/60 hover:text-white"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-white/60 hover:text-white">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-white/60 hover:text-white">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Company */}
              <div className="space-y-4">
                <h4 className="text-xl font-semibold">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-white/60 hover:text-white">About Us</a></li>
                  <li><a href="#" className="text-white/60 hover:text-white">Careers</a></li>
                  <li>
                    <Link to="/contact" className="text-white/60 hover:text-white">Contact</Link>
                  </li>
                  <li><a href="#" className="text-white/60 hover:text-white">Privacy Policy</a></li>
                </ul>
              </div>

              {/* Newsletter */}
              <div className="space-y-4">
                <h4 className="text-xl font-semibold">Stay Updated</h4>
                <p className="text-white/60">Subscribe to our newsletter</p>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 flex-grow
                             focus:outline-none focus:border-white/20"
                  />
                  <Button className="bg-white text-black hover:bg-gray-200">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>

            <div className="border-t border-white/5 mt-12 pt-8 text-center text-white/40">
              <p>© {new Date().getFullYear()} WebDev Hub. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default About;