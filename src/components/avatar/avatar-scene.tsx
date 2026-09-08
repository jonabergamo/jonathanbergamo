"use client";

import * as React from "react";
import { Canvas } from "@react-three/fiber";
import { PCFShadowMap } from "three";
import { AdaptiveDpr, ContactShadows } from "@react-three/drei";
import { Avatar } from "./avatar";
import type { AvatarVariant } from "./avatar-lazy";

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
  const camera = mobile
    ? { position: [0, 0.1, 2.9] as [number, number, number], fov: 28 }
    : { position: [0, 0.05, 2.6] as [number, number, number], fov: 26 };

  return (
    <Canvas
      data-testid="avatar-canvas"
      dpr={mobile ? 1 : [1, 1.5]}
      camera={camera}
      shadows={{ type: PCFShadowMap }}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      frameloop={animate && visible ? "always" : "demand"}
      performance={{ min: 0.5 }}
      onPointerDown={() => {
        wave.current = 1;
      }}
      style={{ touchAction: "pan-y" }}
    >
      <hemisphereLight args={["#ffffff", "#8899aa", 0.9]} />
      <directionalLight
        intensity={2.2}
        position={[2, 3.5, 3]}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight intensity={0.8} position={[-3, 2, -2]} />
      <React.Suspense fallback={null}>
        <Avatar pointer={pointer} waveRef={wave} animate={animate} />
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
