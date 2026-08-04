"use client";

import { Canvas } from "@react-three/fiber";
import { Stars, PerspectiveCamera } from "@react-three/drei";

export default function Scene() {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 bg-black pointer-events-none">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={50} />

        <ambientLight intensity={0.1} />
        {/* Subtle red glow from below for atmosphere */}
        <pointLight position={[0, -8, -5]} color="#E62429" intensity={80} />

        {/* Stars only — no city blocks */}
        <Stars
          radius={80}
          depth={60}
          count={4000}
          factor={4}
          saturation={0}
          fade
          speed={0.6}
        />
      </Canvas>
    </div>
  );
}
