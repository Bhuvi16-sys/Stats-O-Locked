import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshWobbleMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

function FloatingTorus({ position, color, speed = 1, wobble = 0.5 }) {
  const mesh = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mesh.current.position.y = position[1] + Math.sin(t * speed + position[0]) * 0.3;
    mesh.current.rotation.x = t * 0.4 * speed;
    mesh.current.rotation.z = t * 0.3 * speed;
  });
  return (
    <mesh ref={mesh} position={position}>
      <torusGeometry args={[0.7, 0.18, 16, 60]} />
      <MeshWobbleMaterial
        color={color}
        factor={wobble}
        speed={2}
        metalness={0.7}
        roughness={0.2}
        emissive={color}
        emissiveIntensity={0.4}
      />
    </mesh>
  );
}

function FloatingOctahedron({ position, color, speed = 1 }) {
  const mesh = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.x = t * 0.5 * speed;
    mesh.current.rotation.y = t * 0.7 * speed;
    mesh.current.position.y = position[1] + Math.sin(t * speed * 0.8 + position[2]) * 0.4;
  });
  return (
    <mesh ref={mesh} position={position}>
      <octahedronGeometry args={[0.65, 0]} />
      <meshStandardMaterial
        color={color}
        wireframe={false}
        metalness={0.8}
        roughness={0.1}
        emissive={color}
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

function DataNodeNetwork() {
  const groupRef = useRef();
  // Connection lines between some nodes
  const linePositions = new Float32Array([
    -2, 1, 0,  2, 1.5, -1,
    2, 1.5, -1, 0, -1.5, 1,
    0, -1.5, 1, -2, 0.5, -1,
    -2, 0.5, -1, 1.5, -0.8, 0,
    1.5, -0.8, 0, -1, 2, 0.5,
  ]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.07;
  });

  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

  return (
    <group ref={groupRef}>
      {/* Connection lines */}
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color="#00f0ff" transparent opacity={0.18} />
      </lineSegments>

      {/* Nodes */}
      {[
        { pos: [-2, 1, 0], color: '#00f0ff' },
        { pos: [2, 1.5, -1], color: '#7c3aed' },
        { pos: [0, -1.5, 1], color: '#3b82f6' },
        { pos: [-2, 0.5, -1], color: '#00f0ff' },
        { pos: [1.5, -0.8, 0], color: '#7c3aed' },
        { pos: [-1, 2, 0.5], color: '#3b82f6' },
      ].map((n, i) => (
        <mesh key={i} position={n.pos}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color={n.color} emissive={n.color} emissiveIntensity={4} />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[-3, 3, 3]} color="#7c3aed" intensity={2} />
      <pointLight position={[3, -3, 3]} color="#00f0ff" intensity={1.5} />
      <FloatingTorus position={[-3, 0, 0]} color="#7c3aed" speed={0.7} wobble={0.4} />
      <FloatingTorus position={[3, 0.5, -1]} color="#00f0ff" speed={1.1} wobble={0.6} />
      <FloatingOctahedron position={[0, 0.5, 0]} color="#3b82f6" speed={0.9} />
      <FloatingOctahedron position={[-1.5, -1.5, 1]} color="#7c3aed" speed={0.6} />
      <DataNodeNetwork />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI * 0.75}
        minPolarAngle={Math.PI * 0.25}
      />
    </>
  );
}

export default function ThreeDScene() {
  return (
    <section
      id="3d-scene"
      style={{
        padding: '80px 0 120px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, transparent, rgba(124,58,237,0.04), transparent)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '50px' }}
        >
          <span style={{
            display: 'inline-block',
            padding: '5px 16px',
            borderRadius: '100px',
            background: 'rgba(124, 58, 237, 0.1)',
            border: '1px solid rgba(124, 58, 237, 0.3)',
            color: '#c4b5fd',
            fontSize: '0.8rem',
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 500,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '20px',
          }}>
            Interactive 3D
          </span>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '12px',
          }}>
            Explore the <span className="gradient-text">Data Universe</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.95rem' }}>
            Drag and rotate the scene • Powered by WebGL & React Three Fiber
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          style={{
            height: '500px',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '1px solid rgba(124, 58, 237, 0.2)',
            background: 'rgba(255,255,255,0.01)',
            backdropFilter: 'blur(4px)',
            boxShadow: '0 0 80px rgba(124, 58, 237, 0.1)',
            position: 'relative',
          }}
        >
          <Canvas
            camera={{ position: [0, 0, 6], fov: 60 }}
            gl={{ antialias: true, alpha: true }}
          >
            <Scene />
          </Canvas>

          {/* Corner hint */}
          <div style={{
            position: 'absolute',
            bottom: '16px',
            right: '20px',
            color: 'rgba(255,255,255,0.25)',
            fontSize: '0.75rem',
            fontFamily: "'Space Grotesk', sans-serif",
            letterSpacing: '1px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <span>🖱</span> Drag to Explore
          </div>
        </motion.div>
      </div>
    </section>
  );
}
