import { useRef } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

const FluidMaterial = shaderMaterial(
  {
    time: 0,
    mouse: new THREE.Vector2(0, 0),
    resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
  },
  // Simplified vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Optimized fragment shader
  `
    uniform float time;
    uniform vec2 mouse;
    uniform vec2 resolution;
    varying vec2 vUv;
    
    void main() {
      vec2 uv = vUv;
      vec2 m = mouse / resolution;
      
      // Simplified fluid distortion
      float d = distance(uv, m);
      float wave = sin(d * 6.0 - time * 2.0) * 0.3 + 0.7;
      
      // Simplified color mixing
      vec3 color1 = vec3(0.0, 0.831, 1.0); // Electric blue
      vec3 color2 = vec3(0.702, 0.0, 1.0); // Neon purple
      vec3 color3 = vec3(0.039, 0.039, 0.039); // Deep space gray
      
      vec3 finalColor = mix(color1, color2, wave);
      finalColor = mix(finalColor, color3, 0.2);
      
      // Simplified glow effect
      float glow = 1.0 - smoothstep(0.0, 0.4, d);
      finalColor += glow * vec3(0.5, 0.5, 0.5) * 0.1;
      
      gl_FragColor = vec4(finalColor, 0.6);
    }
  `
);

extend({ FluidMaterial });

function FluidMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.time = state.clock.elapsedTime * 0.5; // Slower animation
      materialRef.current.mouse.set(
        state.mouse.x * window.innerWidth * 0.3,
        state.mouse.y * window.innerHeight * 0.3
      );
    }
  });

  return (
    <mesh ref={meshRef} scale={[2, 2, 1]}>
      <planeGeometry args={[2, 2, 32, 32]} />
      <primitive object={new FluidMaterial()} ref={materialRef} transparent />
    </mesh>
  );
}

export default function FluidBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        style={{ background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A2E 100%)' }}
        performance={{ min: 0.2 }}
        dpr={[1, 1.5]}
        gl={{ 
          antialias: false, 
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <FluidMesh />
      </Canvas>
    </div>
  );
}