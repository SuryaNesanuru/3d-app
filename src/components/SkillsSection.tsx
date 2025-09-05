import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Float, Text } from '@react-three/drei';
import * as THREE from 'three';

const skills = [
  { name: 'React', level: 95, color: '#61DAFB', size: 1 },
  { name: 'TypeScript', level: 90, color: '#3178C6', size: 0.9 },
  { name: 'Next.js', level: 88, color: '#000000', size: 0.85 },
  { name: 'Three.js', level: 85, color: '#000000', size: 0.8 },
  { name: 'Node.js', level: 80, color: '#339933', size: 0.75 },
  { name: 'GraphQL', level: 75, color: '#E10098', size: 0.7 },
  { name: 'AWS', level: 70, color: '#FF9900', size: 0.65 },
  { name: 'Docker', level: 68, color: '#2496ED', size: 0.6 },
];

interface Skill {
  name: string;
  level: number;
  color: string;
  size: number;
}

function SkillSphere({ skill, index }: { skill: Skill; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime * 0.3; // Slower animation
      meshRef.current.position.x = Math.sin(time * 0.3 + index) * 2;
      meshRef.current.position.z = Math.cos(time * 0.2 + index) * 1.5;
      meshRef.current.rotation.x = time * 0.1;
      meshRef.current.rotation.y = time * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.1}>
      <group position={[
        Math.sin(index * 0.8) * 3,
        Math.cos(index * 0.6) * 1.5,
        Math.sin(index * 0.4) * 2
      ]}>
        <Sphere ref={meshRef} args={[skill.size, 16, 16]}>
          <meshStandardMaterial
            color={skill.color}
            emissive={skill.color}
            emissiveIntensity={0.1}
            metalness={0.6}
            roughness={0.3}
          />
        </Sphere>
        <Text
          position={[0, skill.size + 0.5, 0]}
          fontSize={0.25}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {skill.name}
        </Text>
        <Text
          position={[0, skill.size + 0.2, 0]}
          fontSize={0.15}
          color="#00D4FF"
          anchorX="center"
          anchorY="middle"
        >
          {skill.level}%
        </Text>
      </group>
    </Float>
  );
}

function SkillsVisualization() {
  // Only show top 6 skills in 3D to improve performance
  const topSkills = skills.slice(0, 6);
  
  return (
    <group>
      {topSkills.map((skill, index) => (
        <SkillSphere key={skill.name} skill={skill} index={index} />
      ))}
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#00D4FF" />
      <pointLight position={[-5, -5, 5]} intensity={0.4} color="#B300FF" />
    </group>
  );
}

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="skills"
      className="min-h-screen py-20 relative"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Expertise</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Interactive 3D visualization of my technical skills, sized by proficiency level
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="h-96 md:h-[500px] w-full"
        >
          <Canvas 
            camera={{ position: [0, 0, 8], fov: 50 }}
            performance={{ min: 0.3 }}
            dpr={[1, 1.5]}
            gl={{ antialias: false, alpha: true }}
          >
            <SkillsVisualization />
          </Canvas>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: index * 0.05 + 0.6, duration: 0.4 }}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white font-medium">{skill.name}</h3>
                <span className="text-blue-400 text-sm">{skill.level}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{ delay: index * 0.1 + 0.8, duration: 0.8 }}
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}