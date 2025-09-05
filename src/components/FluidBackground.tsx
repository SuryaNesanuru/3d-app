import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FluidMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime * 0.5;
      materialRef.current.uniforms.mouse.value.set(
        state.mouse.x * state.size.width * 0.3,
        state.mouse.y * state.size.height * 0.3
      );
      materialRef.current.uniforms.resolution.value.set(state.size.width, state.size.height);
    }
  });

  return (
    <mesh ref={meshRef} scale={[2, 2, 1]}>
      <planeGeometry args={[2, 2, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        transparent
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float time;
          uniform vec2 mouse;
          uniform vec2 resolution;
          varying vec2 vUv;
          
          void main() {
            vec2 uv = vUv;
            vec2 m = mouse / resolution;
            
            float d = distance(uv, m);
            float wave = sin(d * 6.0 - time * 2.0) * 0.3 + 0.7;
            
            vec3 color1 = vec3(0.0, 0.831, 1.0);
            vec3 color2 = vec3(0.702, 0.0, 1.0);
            vec3 color3 = vec3(0.039, 0.039, 0.039);
            
            vec3 finalColor = mix(color1, color2, wave);
            finalColor = mix(finalColor, color3, 0.2);
            
            float glow = 1.0 - smoothstep(0.0, 0.4, d);
            finalColor += glow * vec3(0.5, 0.5, 0.5) * 0.1;
            
            gl_FragColor = vec4(finalColor, 0.6);
          }
        `}
        uniforms={{
          time: { value: 0 },
          mouse: { value: new THREE.Vector2(0, 0) },
          resolution: { value: new THREE.Vector2(1, 1) }
        }}
      />
    </mesh>
  );
}

export default function FluidBackground() {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div 
        className="fixed inset-0 -z-10"
        style={{ 
          background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A2E 50%, #16213E 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 10s ease infinite'
        }}
      />
    );
  }

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
        onError={() => setHasError(true)}
      >
        <FluidMesh />
      </Canvas>
    </div>
  );
}