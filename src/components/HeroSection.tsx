import { useRef, useMemo, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, Center, Float } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedText() {
  const textRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
      textRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  // Optimized particle system with fewer particles
  const particleCount = 50;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, []);

  return (
    <group>
      <Center>
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <group ref={textRef}>
            <Text3D
              font="/fonts/helvetiker_regular.typeface.json"
              size={0.6}
              height={0.15}
              curveSegments={6}
            >
              Surya Nesanuru
              <meshStandardMaterial
                color="#00D4FF"
                emissive="#00D4FF"
                emissiveIntensity={0.1}
                metalness={0.6}
                roughness={0.3}
              />
            </Text3D>
          </group>
        </Float>
      </Center>
      
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#B300FF" size={0.015} />
      </points>

      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#00D4FF" />
      <pointLight position={[-5, -5, 5]} intensity={0.4} color="#B300FF" />
    </group>
  );
}

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, type: "spring" }}
          className="mb-8 h-64"
        >
          <Canvas 
            camera={{ position: [0, 0, 5], fov: 50 }}
            performance={{ min: 0.5 }}
            dpr={[1, 2]}
            gl={{ antialias: false, alpha: true }}
          >
            <Suspense fallback={null}>
              <AnimatedText />
            </Suspense>
          </Canvas>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="space-y-6"
        >
          <h2 className="text-2xl md:text-3xl font-light text-white/90 max-w-2xl mx-auto leading-relaxed">
            Frontend Developer & 3D Web Specialist
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Creating immersive digital experiences with React, TypeScript, and cutting-edge 3D technologies. 
            4+ years of crafting production-ready applications for industry leaders.
          </p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 212, 255, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-medium transition-all duration-300"
            >
              View My Work
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(179, 0, 255, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border border-purple-500 text-purple-300 hover:bg-purple-500/10 rounded-full font-medium transition-all duration-300"
            >
              Get In Touch
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/50"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-center"
        >
          <p className="text-sm mb-2">Scroll to explore</p>
          <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent mx-auto"></div>
        </motion.div>
      </motion.div>
    </section>
  );
}