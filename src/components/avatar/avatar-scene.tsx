"use client";

import * as React from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, ContactShadows } from "@react-three/drei";
import { Avatar } from "./avatar";
import { readBrand, type Brand } from "./avatar-materials";
import { useTheme } from "next-themes";
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
  const { theme } = useTheme();
  // Re-read the CSS palette whenever the theme string changes.
  const brand = React.useMemo<Brand>(() => {
    void theme;
    return readBrand();
  }, [theme]);

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
    ? { position: [0, 0.45, 3.6] as [number, number, number], fov: 32 }
    : { position: [0, 0.35, 3.4] as [number, number, number], fov: 30 };

  return (
    <Canvas
      data-testid="avatar-canvas"
      dpr={mobile ? 1 : [1, 1.5]}
      camera={camera}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      frameloop={animate && visible ? "always" : "demand"}
      performance={{ min: 0.5 }}
      onPointerDown={() => {
        wave.current = 1;
      }}
      style={{ touchAction: "pan-y" }}
    >
      <ambientLight color={brand.paper} intensity={0.9} />
      <directionalLight
        color={brand.paper}
        intensity={1.6}
        position={[2.5, 4, 3]}
      />
      <pointLight color={brand.mid} intensity={6} position={[-3, 1.5, -2]} />
      <Avatar
        pointer={pointer}
        waveRef={wave}
        animate={animate}
        brand={brand}
      />
      <ContactShadows
        position={[0, -1.17, 0]}
        opacity={0.35}
        scale={3}
        blur={2.2}
        far={1.2}
        color={brand.ink}
      />
      <AdaptiveDpr pixelated />
    </Canvas>
  );
}
