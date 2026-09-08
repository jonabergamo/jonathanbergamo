"use client";

import * as React from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { COLORS, stripeTexture, toon, toonGradient } from "./avatar-materials";

type Props = {
  /** Normalised pointer position in [-1, 1], updated by the parent. */
  pointer: React.RefObject<{ x: number; y: number }>;
  waveRef: React.RefObject<number>;
  animate: boolean;
};

const HAIR_TUFTS: {
  pos: [number, number, number];
  rot: [number, number, number];
  len: number;
  r: number;
}[] = [
  // fringe, hanging over the forehead
  { pos: [-0.2, 0.19, 0.24], rot: [1.25, 0, 0.45], len: 0.16, r: 0.055 },
  { pos: [-0.07, 0.22, 0.27], rot: [1.35, 0, 0.12], len: 0.17, r: 0.06 },
  { pos: [0.07, 0.22, 0.27], rot: [1.35, 0, -0.15], len: 0.17, r: 0.06 },
  { pos: [0.2, 0.19, 0.24], rot: [1.25, 0, -0.5], len: 0.16, r: 0.055 },
  // sides
  { pos: [-0.3, 0.08, 0.08], rot: [0.3, 0, 1.1], len: 0.14, r: 0.05 },
  { pos: [0.3, 0.08, 0.08], rot: [0.3, 0, -1.1], len: 0.14, r: 0.05 },
  // crown, a little messy
  { pos: [-0.12, 0.33, 0.02], rot: [0.4, 0, 0.9], len: 0.1, r: 0.05 },
  { pos: [0.1, 0.34, -0.04], rot: [-0.3, 0, -0.8], len: 0.1, r: 0.05 },
  { pos: [0, 0.3, -0.2], rot: [-1.0, 0, 0], len: 0.12, r: 0.055 },
];

const BASE_Y = -1.15;

export function Avatar({ pointer, waveRef, animate }: Props) {
  const root = React.useRef<THREE.Group>(null);
  const head = React.useRef<THREE.Group>(null);
  const torso = React.useRef<THREE.Group>(null);
  const rightArm = React.useRef<THREE.Group>(null);
  const eyes = React.useRef<THREE.Group>(null);
  const blink = React.useRef({ next: 2.5, t: 0 });

  const m = React.useMemo(() => {
    toonGradient();
    return {
      skin: toon(COLORS.skin),
      hair: toon(COLORS.hair),
      stubble: toon(COLORS.stubble, { transparent: true, opacity: 0.32 }),
      jacket: toon(COLORS.jacket),
      jacketTrim: toon(COLORS.jacketTrim),
      sweater: new THREE.MeshToonMaterial({
        map: stripeTexture(),
        gradientMap: toonGradient(),
      }),
      sweaterDark: toon(COLORS.sweaterDark),
      frames: toon(COLORS.frames),
      lens: new THREE.MeshPhysicalMaterial({
        color: COLORS.lens,
        transparent: true,
        opacity: 0.22,
        roughness: 0.1,
        metalness: 0,
      }),
      eye: toon(COLORS.eye),
      mouth: toon(COLORS.mouth),
      blush: toon(COLORS.blush, { transparent: true, opacity: 0.16 }),
      earring: new THREE.MeshStandardMaterial({
        color: COLORS.earring,
        metalness: 0.9,
        roughness: 0.25,
      }),
    };
  }, []);

  React.useEffect(
    () => () => Object.values(m).forEach((mat) => mat.dispose()),
    [m],
  );

  useFrame((_, delta) => {
    if (!animate) return;
    const t = performance.now() / 1000;
    if (root.current)
      root.current.position.y = BASE_Y + Math.sin(t * 1.2) * 0.02;
    if (torso.current) torso.current.scale.y = 1 + Math.sin(t * 1.6) * 0.012;

    if (head.current) {
      const p = pointer.current ?? { x: 0, y: 0 };
      const targetY = THREE.MathUtils.clamp(p.x * 0.45, -0.5, 0.5);
      const targetX = THREE.MathUtils.clamp(-p.y * 0.3, -0.28, 0.28);
      head.current.rotation.y = THREE.MathUtils.damp(
        head.current.rotation.y,
        targetY,
        6,
        delta,
      );
      head.current.rotation.x = THREE.MathUtils.damp(
        head.current.rotation.x,
        targetX,
        6,
        delta,
      );
      // Slight body follow.
      if (root.current)
        root.current.rotation.y = THREE.MathUtils.damp(
          root.current.rotation.y,
          targetY * 0.25,
          4,
          delta,
        );
    }

    // Blink.
    const b = blink.current;
    b.t += delta;
    if (eyes.current) {
      if (b.t > b.next) {
        const phase = b.t - b.next;
        eyes.current.scale.y =
          phase < 0.08
            ? 1 - phase / 0.08
            : phase < 0.16
              ? (phase - 0.08) / 0.08
              : 1;
        if (phase > 0.16) {
          b.t = 0;
          b.next = 2.5 + Math.random() * 3;
          eyes.current.scale.y = 1;
        }
      }
    }

    // Wave: waveRef counts down from 1 to 0 over ~0.9s.
    if (rightArm.current) {
      const w = waveRef.current ?? 0;
      if (w > 0) {
        waveRef.current = Math.max(0, w - delta / 0.9);
        const k = 1 - waveRef.current;
        const raise =
          Math.sin(Math.min(k, 0.25) * Math.PI * 2) * 0.5 + (k > 0.25 ? 1 : 0);
        rightArm.current.rotation.z =
          -2.4 * Math.min(1, raise) +
          Math.sin(k * Math.PI * 6) * 0.35 * (k > 0.2 && k < 0.85 ? 1 : 0);
        if (k >= 1) rightArm.current.rotation.z = 0;
      } else {
        rightArm.current.rotation.z = THREE.MathUtils.damp(
          rightArm.current.rotation.z,
          0.12,
          5,
          delta,
        );
      }
    }
  });

  return (
    <group ref={root} position={[0, BASE_Y, 0]}>
      {/* Head */}
      <group ref={head} position={[0, 1.58, 0]}>
        <mesh material={m.skin} scale={[1, 1.08, 0.95]}>
          <sphereGeometry args={[0.34, 24, 18]} />
        </mesh>
        {/* Ears */}
        <mesh material={m.skin} position={[-0.33, -0.02, 0]}>
          <sphereGeometry args={[0.065, 12, 10]} />
        </mesh>
        <mesh material={m.skin} position={[0.33, -0.02, 0]}>
          <sphereGeometry args={[0.065, 12, 10]} />
        </mesh>
        {/* Earring, left ear */}
        <mesh
          material={m.earring}
          position={[-0.34, -0.09, 0.01]}
          rotation={[0, Math.PI / 2, 0]}
        >
          <torusGeometry args={[0.032, 0.008, 8, 16]} />
        </mesh>

        {/* Hair cap */}
        <mesh
          material={m.hair}
          position={[0, 0.08, -0.03]}
          scale={[1.03, 0.98, 1.03]}
        >
          <sphereGeometry
            args={[0.35, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.52]}
          />
        </mesh>
        {/* Messy tufts */}
        {HAIR_TUFTS.map((tuft, i) => (
          <mesh
            key={i}
            material={m.hair}
            position={tuft.pos}
            rotation={tuft.rot}
          >
            <capsuleGeometry args={[tuft.r, tuft.len, 4, 8]} />
          </mesh>
        ))}

        {/* Glasses */}
        <group position={[0, 0.02, 0.31]}>
          <mesh material={m.frames} position={[-0.135, 0, 0]}>
            <torusGeometry args={[0.115, 0.009, 8, 32]} />
          </mesh>
          <mesh material={m.frames} position={[0.135, 0, 0]}>
            <torusGeometry args={[0.115, 0.009, 8, 32]} />
          </mesh>
          <mesh material={m.lens} position={[-0.135, 0, 0]}>
            <circleGeometry args={[0.108, 24]} />
          </mesh>
          <mesh material={m.lens} position={[0.135, 0, 0]}>
            <circleGeometry args={[0.108, 24]} />
          </mesh>
          <mesh material={m.frames} position={[0, 0.01, 0]}>
            <boxGeometry args={[0.05, 0.012, 0.012]} />
          </mesh>
          <mesh
            material={m.frames}
            position={[-0.29, 0.01, -0.14]}
            rotation={[0, 0.15, 0]}
          >
            <boxGeometry args={[0.012, 0.012, 0.3]} />
          </mesh>
          <mesh
            material={m.frames}
            position={[0.29, 0.01, -0.14]}
            rotation={[0, -0.15, 0]}
          >
            <boxGeometry args={[0.012, 0.012, 0.3]} />
          </mesh>
        </group>

        {/* Eyes */}
        <group ref={eyes} position={[0, 0.02, 0.3]}>
          <mesh material={m.eye} position={[-0.135, 0, 0]}>
            <sphereGeometry args={[0.028, 10, 8]} />
          </mesh>
          <mesh material={m.eye} position={[0.135, 0, 0]}>
            <sphereGeometry args={[0.028, 10, 8]} />
          </mesh>
        </group>
        {/* Brows */}
        <mesh
          material={m.hair}
          position={[-0.135, 0.13, 0.3]}
          rotation={[0, 0, 0.12]}
        >
          <capsuleGeometry args={[0.014, 0.1, 3, 6]} />
        </mesh>
        <mesh
          material={m.hair}
          position={[0.135, 0.13, 0.3]}
          rotation={[0, 0, -0.12]}
        >
          <capsuleGeometry args={[0.014, 0.1, 3, 6]} />
        </mesh>
        {/* Nose */}
        <mesh
          material={m.skin}
          position={[0, -0.06, 0.34]}
          rotation={[0.3, 0, 0]}
        >
          <capsuleGeometry args={[0.032, 0.05, 4, 8]} />
        </mesh>
        {/* Smile */}
        <mesh
          material={m.mouth}
          position={[0, -0.16, 0.31]}
          rotation={[0, 0, Math.PI]}
        >
          <torusGeometry args={[0.055, 0.009, 6, 16, Math.PI]} />
        </mesh>
        {/* Stubble / goatee */}
        <mesh
          material={m.stubble}
          position={[0, -0.27, 0.19]}
          scale={[0.95, 0.42, 0.7]}
        >
          <sphereGeometry args={[0.15, 16, 12]} />
        </mesh>
        {/* Blush */}
        <mesh material={m.blush} position={[-0.21, -0.08, 0.26]}>
          <sphereGeometry args={[0.05, 10, 8]} />
        </mesh>
        <mesh material={m.blush} position={[0.21, -0.08, 0.26]}>
          <sphereGeometry args={[0.05, 10, 8]} />
        </mesh>
      </group>

      {/* Neck */}
      <mesh material={m.skin} position={[0, 1.27, 0]}>
        <cylinderGeometry args={[0.1, 0.11, 0.16, 12]} />
      </mesh>

      {/* Torso */}
      <group ref={torso} position={[0, 0.78, 0]}>
        <RoundedBox
          args={[0.62, 0.82, 0.38]}
          radius={0.08}
          smoothness={3}
          material={m.sweater}
        />
        {/* Crew neck */}
        <mesh
          material={m.sweaterDark}
          position={[0, 0.42, 0.02]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <torusGeometry args={[0.13, 0.03, 8, 20]} />
        </mesh>
        {/* Puffer jacket: two open front panels of stacked segments */}
        {[-1, 1].map((side) => (
          <group key={side} position={[side * 0.27, 0, 0.06]}>
            {[0.28, 0.1, -0.08, -0.26].map((y, i) => (
              <mesh
                key={i}
                material={m.jacket}
                position={[side * 0.02, y, 0]}
                rotation={[0, 0, Math.PI / 2]}
              >
                <capsuleGeometry args={[0.095, 0.16, 4, 10]} />
              </mesh>
            ))}
          </group>
        ))}
        {/* Back panel */}
        {[0.28, 0.1, -0.08, -0.26].map((y, i) => (
          <mesh
            key={i}
            material={m.jacket}
            position={[0, y, -0.16]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <capsuleGeometry args={[0.1, 0.5, 4, 10]} />
          </mesh>
        ))}
        {/* Collar */}
        <mesh
          material={m.jacketTrim}
          position={[0, 0.43, -0.06]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <capsuleGeometry args={[0.1, 0.5, 4, 10]} />
        </mesh>
        {/* Left arm (viewer's left) */}
        <group position={[-0.44, 0.3, 0]} rotation={[0, 0, -0.12]}>
          <mesh material={m.jacket} position={[0, -0.3, 0]}>
            <capsuleGeometry args={[0.115, 0.5, 4, 10]} />
          </mesh>
          <mesh material={m.skin} position={[0, -0.64, 0]}>
            <sphereGeometry args={[0.085, 12, 10]} />
          </mesh>
        </group>
        {/* Right arm, waves */}
        <group ref={rightArm} position={[0.44, 0.3, 0]} rotation={[0, 0, 0.12]}>
          <mesh material={m.jacket} position={[0, -0.3, 0]}>
            <capsuleGeometry args={[0.115, 0.5, 4, 10]} />
          </mesh>
          <mesh material={m.skin} position={[0, -0.64, 0]}>
            <sphereGeometry args={[0.085, 12, 10]} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
