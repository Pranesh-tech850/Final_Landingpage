import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Vibrant Electric Palette (Cyan, Magenta, Purple, Gold)
const PALETTE = {
  primary: "#6b093a",      // Neon Magenta
  secondary: "#dad9dc",    // Electric Purple
  glow: "#0a4951",         // Cyber Cyan
  accent: "#856208",       // Vivid Gold
  darkAccent: "#9c84b3",   // Deep Violet Shadow
};

// 1. Surrounding 3D Particle Field
function ParticleCloud({ count = 700 }) {
  const pointsRef = useRef();

  // Generate random spherical positions
  const positions = useMemo(() => {
    const coords = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 2.0 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      coords[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      coords[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      coords[i * 3 + 2] = radius * Math.cos(phi);
    }
    return coords;
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color={PALETTE.glow}
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

// 2. Main Interactive Globe & Orbit Rings
const HolographicGlobe = () => {
  const groupRef = useRef();
  const innerCoreRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const { x, y } = state.pointer; // Mouse tracking

    // Smooth group rotation tilt based on mouse position
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        x * 0.8 + time * 0.15,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -y * 0.5,
        0.05
      );
    }

    // Opposite spin for rings
    if (ring1Ref.current) ring1Ref.current.rotation.z = time * 0.4;
    if (ring2Ref.current) ring2Ref.current.rotation.z = -time * 0.3;
    if (innerCoreRef.current) innerCoreRef.current.rotation.y = -time * 0.2;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1.2}>
      <group ref={groupRef}>
        
        {/* ================= INNER GLOWING CORE ================= */}
        <mesh ref={innerCoreRef}>
          <sphereGeometry args={[0.95, 32, 32]} />
          <meshStandardMaterial
            color={PALETTE.primary}
            roughness={0.15}
            metalness={0.8}
            emissive={PALETTE.secondary}
            emissiveIntensity={1.2}
          />
        </mesh>

        {/* ================= WIREFRAME LATITUDE/LONGITUDE GRID ================= */}
        <mesh>
          <sphereGeometry args={[1.12, 24, 24]} />
          <meshStandardMaterial
            color={PALETTE.glow}
            wireframe
            transparent
            opacity={0.45}
          />
        </mesh>

        {/* ================= OUTER ORBIT RING 1 (Cyan Ring + Magenta Node) ================= */}
        <group ref={ring1Ref} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
          <mesh>
            <torusGeometry args={[1.5, 0.02, 16, 100]} />
            <meshStandardMaterial
              color={PALETTE.glow}
              emissive={PALETTE.glow}
              emissiveIntensity={1.5}
            />
          </mesh>

          {/* Node Orbiting on Ring 1 */}
          <mesh position={[1.5, 0, 0]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color={PALETTE.primary} />
          </mesh>
        </group>

        {/* ================= OUTER ORBIT RING 2 (Gold Ring + Purple Node) ================= */}
        <group ref={ring2Ref} rotation={[-Math.PI / 4, -Math.PI / 4, 0]}>
          <mesh>
            <torusGeometry args={[1.8, 0.018, 16, 100]} />
            <meshStandardMaterial
              color={PALETTE.accent}
              emissive={PALETTE.accent}
              emissiveIntensity={1.2}
            />
          </mesh>

          {/* Node Orbiting on Ring 2 */}
          <mesh position={[-1.8, 0, 0]}>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshBasicMaterial color={PALETTE.secondary} />
          </mesh>
        </group>

        {/* Floating Ambient Particles */}
        <ParticleCloud />

      </group>
    </Float>
  );
};

const HeroModel = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.8], fov: 45 }}
      dpr={[1, 2]}
    >
      {/* Dynamic Multi-Color Lighting Setup */}
      <ambientLight intensity={0.8} />
      
      {/* Top Right Cyan Light */}
      <directionalLight position={[5, 8, 5]} intensity={2.5} color="#00f0ff" />
      
      {/* Bottom Left Magenta Fill Light */}
      <pointLight position={[-4, -2, 3]} intensity={3.0} color="#ff007f" />
      
      {/* Backlight for depth glow */}
      <pointLight position={[0, 0, -4]} intensity={2.0} color="#7000ff" />

      {/* Holographic Globe Model */}
      <HolographicGlobe />

      {/* Environment Reflections */}
      <Environment preset="city" />

      {/* Camera Controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
      />
    </Canvas>
  );
};

export default HeroModel;