import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Boxes,
  Fingerprint
} from 'lucide-react';
import { Button } from "@/components/ui/button";

const Home = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const [isHovered, setIsHovered] = useState(false);

  // Smooth mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen bg-black overflow-hidden font-sans"
    >
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950"
        animate={{
          background: isHovered 
            ? "radial-gradient(circle at center, rgba(50, 50, 50, 0.2) 0%, rgba(0, 0, 0, 1) 100%)"
            : "radial-gradient(circle at center, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 100%)"
        }}
        transition={{ duration: 1 }}
      />

      {/* Interactive light beam */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.03) 0%, transparent 15%)`
        }}
      />

      {/* Main content container */}
      <div className="relative z-10 max-w-7xl mx-auto h-screen flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-20 p-8">
          
          {/* Left column - Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <motion.div 
              className="mb-8 flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Fingerprint className="w-5 h-5 text-neutral-500" />
              <div className="h-px w-12 bg-neutral-800" />
              <span className="text-neutral-500 text-sm tracking-wider">PORTFOLIO 2024</span>
            </motion.div>

            <h1 className="text-7xl font-bold tracking-tight mb-8 leading-none">
              <motion.span 
                className="block text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Design.
              </motion.span>
              <motion.span 
                className="block text-neutral-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Develop.
              </motion.span>
              <motion.span 
                className="block bg-gradient-to-r from-white via-neutral-400 to-neutral-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Deploy.
              </motion.span>
            </h1>

            <motion.p 
              className="text-neutral-400 text-lg mb-12 max-w-md leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Creating digital experiences that blend innovation with elegance. 
              Where every pixel serves a purpose.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <Button
                variant="outline"
                size="lg"
                className="group relative overflow-hidden bg-transparent border border-neutral-800 hover:border-neutral-700 text-white px-8 py-6"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => navigate('/projects')}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-neutral-900 to-neutral-800"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative flex items-center">
                  <span className="mr-2">View Projects</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right column - Visual element */}
          <motion.div 
            className="relative hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="relative w-[500px] h-[500px]">
              {/* Animated grid */}
              <motion.div 
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
                  backgroundSize: '50px 50px',
                }}
                animate={{
                  y: [0, 50],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "linear",
                }}
              />

              {/* Floating elements */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-24 h-24 rounded-2xl bg-neutral-900/50 backdrop-blur-sm border border-neutral-800/50"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + i * 10}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 10, 0],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 5 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-neutral-700" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Corner decoration */}
      <motion.div 
        className="absolute bottom-8 left-8 flex items-center space-x-4 text-sm text-neutral-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <Boxes className="w-4 h-4" />
        <span className="tracking-wider">CRAFTED WITH PRECISION</span>
      </motion.div>
    </div>
  );
};

export default Home;