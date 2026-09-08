"use client";

import * as React from "react";
import { Canvas } from "@react-three/fiber";
import { PCFShadowMap } from "three";
import {
  AdaptiveDpr,
  ContactShadows,
  Environment,
  Lightformer,
} from "@react-three/drei";
import { Avatar } from "./avatar";
import type { AvatarVariant } from "./avatar-lazy";
import { useMusicStore } from "@/store/music-store";

export default function AvatarScene({
  variant,
  animate,
}: {
  variant: AvatarVariant;
  animate: boolean;
}) {
  const pointer = React.useRef({ x: 0, y: 0 });
  const wave = React.useRef(0);
  const [visible, setVisible] = React.useState(true);
  const dancing = useMusicStore((s) => s.playing);

  // Follow the cursor anywhere on the page, not just over the canvas.
  React.useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onVis = () => setVisible(!document.hidden);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const mobile = variant === "mobile";
  // Camera is level (it looks at a point at its own height) so the avatar
  // stands perfectly vertical, no top-down perspective.
  const eye = mobile ? 0.14 : 0.05;
  const camera = mobile
    ? { position: [0, eye, 1.75] as [number, number, number], fov: 30 }
    : { position: [0, eye, 2.6] as [number, number, number], fov: 26 };

  return (
    <Canvas
      data-testid="avatar-canvas"
      dpr={mobile ? 1 : [1, 1.5]}
      camera={camera}
      shadows={{ type: PCFShadowMap }}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      frameloop={animate && visible ? "always" : "demand"}
      performance={{ min: 0.5 }}
      onCreated={({ camera: cam }) => cam.lookAt(0, eye, 0)}
      onPointerDown={() => {
        wave.current = 1;
      }}
      style={{ touchAction: "pan-y" }}
    >
      {/* Studio lighting: a procedural environment for soft ambient light and
          reflections (no HDR download), a warm key, a cool fill and a rim. */}
      <Environment resolution={128} frames={1}>
        <Lightformer
          intensity={2.2}
          position={[0, 4, 2]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[8, 8, 1]}
          color="#fff6e8"
        />
        <Lightformer
          intensity={1.4}
          position={[-4, 1.5, 2]}
          rotation={[0, Math.PI / 3, 0]}
          scale={[3, 4, 1]}
          color="#dfe9f5"
        />
        <Lightformer
          intensity={1}
          position={[4, 1, -1]}
          rotation={[0, -Math.PI / 3, 0]}
          scale={[3, 4, 1]}
          color="#ffffff"
        />
        <Lightformer
          intensity={0.6}
          position={[0, -3, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[10, 10, 1]}
          color="#c9d2dc"
        />
      </Environment>
      <directionalLight
        intensity={1.6}
        color="#fff1e0"
        position={[2.2, 3, 2.5]}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0005}
      />
      <directionalLight
        intensity={0.45}
        color="#cfe0f2"
        position={[-3, 1.5, 2]}
      />
      <directionalLight
        intensity={0.9}
        color="#ffffff"
        position={[-1.5, 2.5, -3]}
      />
      <React.Suspense fallback={null}>
        <Avatar
          pointer={pointer}
          waveRef={wave}
          dancing={dancing}
          animate={animate}
        />
      </React.Suspense>
      <ContactShadows
        position={[0, -1.52, 0]}
        opacity={0.35}
        scale={3}
        blur={2.2}
        far={1.5}
        color="#000000"
      />
      <AdaptiveDpr pixelated />
    </Canvas>
  );
}
