import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { aiNodes, aiLinks } from '../data/aiData';

// 1. NetworkNode Component (Handles drift, rendering, and hover/click events)
function NetworkNode({ node, onClick, onHover, hoveredId, registerRef, activeId }) {
  const sphereRef = useRef();
  const isHovered = hoveredId === node.id;
  const isActive = activeId === node.id;

  // Register the ref so connections can bind to it
  useEffect(() => {
    registerRef(node.id, sphereRef);
    return () => registerRef(node.id, null);
  }, [node.id]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Particle physics drift system using out-of-sync sine/cosine wave patterns
    const dx = Math.sin(time * node.speed + node.seedX) * 0.25;
    const dy = Math.cos(time * node.speed + node.seedY) * 0.25;
    const dz = Math.sin(time * node.speed * 0.8 + node.seedZ) * 0.2;

    if (sphereRef.current) {
      sphereRef.current.position.set(
        node.position[0] + dx,
        node.position[1] + dy,
        node.position[2] + dz
      );
    }
  });

  const size = node.level === 0 ? 0.24 : node.level === 1 ? 0.16 : 0.1;

  return (
    <mesh
      ref={sphereRef}
      onClick={(e) => {
        e.stopPropagation();
        onClick(node);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
        onHover(node.id);
      }}
      onPointerOut={(e) => {
        document.body.style.cursor = 'default';
        onHover(null);
      }}
      scale={isHovered ? 1.25 : isActive ? 1.15 : 1}
    >
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        color={node.color}
        emissive={node.color}
        emissiveIntensity={isHovered ? 6 : isActive ? 4 : 2}
        metalness={0.9}
        roughness={0.1}
      />

      {/* Halo glow when hovered/active */}
      {(isHovered || isActive) && (
        <pointLight color={node.color} intensity={4} distance={3} />
      )}

      {/* Glowing 3D Label */}
      <Html distanceFactor={7} position={[size + 0.12, 0.1, 0]} style={{ pointerEvents: 'none' }}>
        <div style={{
          whiteSpace: 'nowrap',
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: node.level === 0 ? '13px' : node.level === 1 ? '11px' : '9px',
          fontWeight: node.level === 0 ? '700' : '600',
          color: '#fff',
          background: 'rgba(2, 11, 22, 0.85)',
          backdropFilter: 'blur(10px)',
          border: `1.5px solid ${isHovered ? '#fff' : isActive ? node.color : node.color + '55'}`,
          padding: '3px 8px',
          borderRadius: '6px',
          boxShadow: `0 0 12px ${node.color}44`,
          textShadow: `0 0 4px ${node.color}`,
          transition: 'all 0.25s ease',
          opacity: 0.95,
        }}>
          {node.label}
        </div>
      </Html>
    </mesh>
  );
}

// 2. LinkLine Component (Synapses connecting parents and children dynamically)
function LinkLine({ sourceId, targetId, nodeRefs, color }) {
  const lineRef = useRef();
  const points = useMemo(() => [new THREE.Vector3(), new THREE.Vector3()], []);

  useFrame(() => {
    const sourceRef = nodeRefs.current[sourceId];
    const targetRef = nodeRefs.current[targetId];

    if (sourceRef?.current && targetRef?.current && lineRef.current) {
      points[0].copy(sourceRef.current.position);
      points[1].copy(targetRef.current.position);
      lineRef.current.geometry.setFromPoints(points);
      
      // Synapse firing: variable opacity based on time & node position
      const opacity = 0.16 + Math.sin(Date.now() * 0.003 + sourceRef.current.position.x) * 0.12;
      if (lineRef.current.material) {
        lineRef.current.material.opacity = Math.max(0.04, Math.min(0.45, opacity));
      }
    }
  });

  return (
    <line ref={lineRef}>
      <bufferGeometry />
      <lineBasicMaterial color={color} transparent depthWrite={false} opacity={0.2} linewidth={1} />
    </line>
  );
}

// 3. Scene Assembly Component (With camera panning and OrbitControls focus animation)
function Scene({ preparedNodes, nodeRefs, onNodeClick, hoveredId, setHoveredId, activeId, registerRef, activeNode }) {
  const { camera } = useThree();
  const controlsRef = useRef();

  // Target coordinates for smooth camera interpolation (panning/focusing)
  const targetCameraPos = useRef(new THREE.Vector3(0, 0, 7.5));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    if (activeNode) {
      // Find the mesh reference position of the active node
      const nodePos = activeNode.position;
      
      // Look directly at the active node
      targetLookAt.current.set(nodePos[0], nodePos[1], nodePos[2]);
      
      // Zoom camera in towards the sub-tree
      targetCameraPos.current.set(nodePos[0], nodePos[1], nodePos[2] + 3.2);
    } else {
      // Return camera and focus back to default overview
      targetLookAt.current.set(0, 0, 0);
      targetCameraPos.current.set(0, 0, 7.5);
    }
  }, [activeNode]);

  useFrame((state, delta) => {
    // Lerp camera position
    camera.position.lerp(targetCameraPos.current, 0.08);

    // Lerp OrbitControls target (looking at target position)
    if (controlsRef.current) {
      controlsRef.current.target.lerp(targetLookAt.current, 0.08);
      controlsRef.current.update();
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[-4, 4, 4]} color="#7c3aed" intensity={1.5} />
      <pointLight position={[4, -4, 4]} color="#00f0ff" intensity={1.5} />
      
      {/* Node vertices */}
      {preparedNodes.map((node) => (
        <NetworkNode
          key={node.id}
          node={node}
          activeId={activeId}
          hoveredId={hoveredId}
          onHover={setHoveredId}
          onClick={onNodeClick}
          registerRef={registerRef}
        />
      ))}

      {/* Dynamic connection lines (edges) */}
      {aiLinks.map((link, idx) => {
        const targetNode = preparedNodes.find(n => n.id === link.target);
        return (
          <LinkLine
            key={idx}
            sourceId={link.source}
            targetId={link.target}
            nodeRefs={nodeRefs}
            color={targetNode ? targetNode.color : '#00f0ff'}
          />
        );
      })}

      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={false}
        autoRotate={!hoveredId && !activeId}
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI * 0.7}
        minPolarAngle={Math.PI * 0.3}
      />
    </>
  );
}

// 4. Main Export Component (Includes dynamic column layout & details card)
export default function ThreeDScene() {
  const [activeNode, setActiveNode] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const nodeRefs = useRef({});

  // Prepare node seeds and speeds for physics loop
  const preparedNodes = useMemo(() => {
    return aiNodes.map(node => ({
      ...node,
      seedX: Math.random() * 100,
      seedY: Math.random() * 100,
      seedZ: Math.random() * 100,
      speed: 0.25 + Math.random() * 0.25
    }));
  }, []);

  const registerRef = (id, ref) => {
    if (ref) {
      nodeRefs.current[id] = ref;
    } else {
      delete nodeRefs.current[id];
    }
  };

  // Find relationships for active node
  const activeRelationships = useMemo(() => {
    if (!activeNode) return null;
    const parentLinks = aiLinks.filter(l => l.target === activeNode.id).map(l => l.source);
    const childLinks = aiLinks.filter(l => l.source === activeNode.id).map(l => l.target);
    
    return {
      parents: aiNodes.filter(n => parentLinks.includes(n.id)),
      children: aiNodes.filter(n => childLinks.includes(n.id))
    };
  }, [activeNode]);

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

      <div className="px-6 md:px-10" style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Section Title */}
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
            Synaptic Map
          </span>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '12px',
          }}>
            Explore the <span className="gradient-text">AI Sub-branches</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.95rem' }}>
            Click on nodes to investigate their neural sub-nodes and primary core functions.
          </p>
        </motion.div>

        {/* Dynamic Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-[30px] items-stretch">
          
          {/* Left: Interactive 3D Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              height: '520px',
              borderRadius: '24px',
              overflow: 'hidden',
              border: '1px solid rgba(0, 240, 255, 0.15)',
              background: 'rgba(2, 11, 22, 0.4)',
              backdropFilter: 'blur(20px)',
              boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1), 0 0 60px rgba(0, 240, 255, 0.03)',
              position: 'relative',
            }}
          >
            <Canvas
              camera={{ position: [0, 0, 7.5], fov: 55 }}
              gl={{ antialias: true, alpha: true }}
              onPointerMissed={() => setActiveNode(null)}
            >
              <Scene
                preparedNodes={preparedNodes}
                nodeRefs={nodeRefs}
                onNodeClick={setActiveNode}
                hoveredId={hoveredId}
                setHoveredId={setHoveredId}
                activeId={activeNode?.id || null}
                registerRef={registerRef}
                activeNode={activeNode}
              />
            </Canvas>

            {/* Hint overlay */}
            <div style={{
              position: 'absolute',
              bottom: '16px',
              left: '20px',
              color: 'rgba(255,255,255,0.35)',
              fontSize: '0.75rem',
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: '1px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              pointerEvents: 'none',
            }}>
              <span>🖱</span> Drag to rotate scene • Click node to focus • Click outside to reset
            </div>
          </motion.div>

          {/* Right: Glassmorphic Details Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="glass-card"
            style={{
              padding: '30px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '350px',
              border: '1px solid rgba(0, 240, 255, 0.15)',
            }}
          >
            <AnimatePresence mode="wait">
              {!activeNode ? (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    textAlign: 'center',
                    color: 'rgba(255,255,255,0.4)',
                    gap: '12px',
                  }}
                >
                  <div style={{ fontSize: '2.5rem' }}>🧠</div>
                  <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: '#fff' }}>
                    Select a Node
                  </h4>
                  <p style={{ fontSize: '0.88rem', lineHeight: '1.6', maxWidth: '240px' }}>
                    Hover over or click any branch in the synaptic map to inspect its core functionalities and AI hierarchy.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={activeNode.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
                >
                  {/* Category Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '18px' }}>
                    <div style={{
                      padding: '4px 10px',
                      borderRadius: '100px',
                      background: `${activeNode.color}15`,
                      border: `1.5px solid ${activeNode.color}40`,
                      color: activeNode.color,
                      fontSize: '0.75rem',
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}>
                      {activeNode.level === 0 ? 'Central Node' : activeNode.level === 1 ? 'Level 1 Branch' : 'Level 2 Sub-node'}
                    </div>
                    
                    <button 
                      onClick={() => setActiveNode(null)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'rgba(255, 255, 255, 0.4)',
                        cursor: 'pointer',
                        fontSize: '0.75rem',
                        fontFamily: "'Space Grotesk', sans-serif",
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        transition: 'color 0.2s'
                      }}
                      onMouseEnter={(e) => e.target.style.color = '#fff'}
                      onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.4)'}
                    >
                      ✕ Reset View
                    </button>
                  </div>

                  {/* Node Title */}
                  <h3 style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1.6rem',
                    fontWeight: 700,
                    color: '#fff',
                    marginBottom: '14px',
                    textShadow: `0 0 15px ${activeNode.color}44`,
                  }}>
                    {activeNode.label}
                  </h3>

                  {/* Description */}
                  <p style={{
                    color: 'rgba(255,255,255,0.65)',
                    fontSize: '0.92rem',
                    lineHeight: '1.7',
                    marginBottom: '24px',
                    flex: '1',
                  }}>
                    {activeNode.description}
                  </p>

                  {/* Relationships */}
                  {activeRelationships && (
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px' }}>
                      {/* Parent Links */}
                      {activeRelationships.parents.length > 0 && (
                        <div style={{ marginBottom: '14px' }}>
                          <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '6px' }}>
                            Parent Domain
                          </span>
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {activeRelationships.parents.map(p => (
                              <button
                                key={p.id}
                                onClick={() => setActiveNode(p)}
                                style={{
                                  background: 'rgba(255,255,255,0.03)',
                                  border: `1px solid ${p.color}33`,
                                  color: '#fff',
                                  padding: '4px 10px',
                                  borderRadius: '6px',
                                  fontSize: '0.8rem',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s',
                                }}
                                onMouseEnter={(e) => e.target.style.borderColor = p.color}
                                onMouseLeave={(e) => e.target.style.borderColor = `${p.color}33`}
                              >
                                {p.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Child Links */}
                      {activeRelationships.children.length > 0 && (
                        <div>
                          <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '6px' }}>
                            Sub-nodes
                          </span>
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {activeRelationships.children.map(c => (
                              <button
                                key={c.id}
                                onClick={() => setActiveNode(c)}
                                style={{
                                  background: 'rgba(255,255,255,0.03)',
                                  border: `1px solid ${c.color}33`,
                                  color: '#fff',
                                  padding: '4px 10px',
                                  borderRadius: '6px',
                                  fontSize: '0.8rem',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s',
                                }}
                                onMouseEnter={(e) => e.target.style.borderColor = c.color}
                                onMouseLeave={(e) => e.target.style.borderColor = `${c.color}33`}
                              >
                                {c.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
