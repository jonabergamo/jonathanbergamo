"use client";

import * as React from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useAnimations, useFBX, useGLTF } from "@react-three/drei";

export const MODEL_URL = "/models/jonathan.glb";
export const WAVE_URL = "/animations/Waving.fbx";

type Props = {
  /** Normalised pointer position in [-1, 1], updated by the parent. */
  pointer: React.RefObject<{ x: number; y: number }>;
  /** Set to 1 by the parent to trigger a wave. */
  waveRef: React.RefObject<number>;
  animate: boolean;
};

/** Drives the eyesClosed morph target on every mesh that has it. */
function applyBlink(root: THREE.Object3D, v: number) {
  root.traverse((o) => {
    const m = o as THREE.Mesh;
    if (!m.isMesh || !m.morphTargetDictionary || !m.morphTargetInfluences)
      return;
    const i = m.morphTargetDictionary.eyesClosed;
    if (i !== undefined) m.morphTargetInfluences[i] = v;
  });
}

/** Mixamo clips name bones "mixamorigHips"; the Ready Player Me rig uses "Hips". */
function adaptClip(clip: THREE.AnimationClip) {
  const c = clip.clone();
  c.name = "wave";
  c.tracks = c.tracks
    // No root motion and no root rotation: the FBX hips carry a 90° export
    // rotation that would flip the avatar. The body stays where we put it.
    .filter(
      (t) =>
        !t.name.endsWith(".position") &&
        !/^(mixamorig:?)?(Hips|Armature)\./.test(t.name),
    )
    .map((t) => {
      t.name = t.name.replace(/^mixamorig:?/, "");
      return t;
    });
  return c;
}

export function Avatar({ pointer, waveRef, animate }: Props) {
  const group = React.useRef<THREE.Group>(null);
  const { scene } = useGLTF(MODEL_URL);
  const fbx = useFBX(WAVE_URL);
  const clips = React.useMemo(() => [adaptClip(fbx.animations[0])], [fbx]);
  const { actions, mixer } = useAnimations(clips, group);

  const bones = React.useRef<{
    head: THREE.Object3D | null;
    neck: THREE.Object3D | null;
    spine: THREE.Object3D | null;
    rest: Map<THREE.Object3D, THREE.Quaternion>;
  }>({ head: null, neck: null, spine: null, rest: new Map() });
  const phase = React.useRef<"idle" | "waving" | "restoring">("idle");
  const restoreT = React.useRef(0);
  const blink = React.useRef({ next: 2.5, t: 0 });

  // One-time rig setup: shadows, morph targets, and the rest pose taken from
  // the first frame of the wave clip (a relaxed stance, arms down).
  React.useEffect(() => {
    const action = actions.wave;
    if (!action) return;
    const b = bones.current;
    b.head = scene.getObjectByName("Head") ?? null;
    b.neck = scene.getObjectByName("Neck") ?? null;
    b.spine =
      scene.getObjectByName("Spine2") ?? scene.getObjectByName("Spine") ?? null;
    scene.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) {
        const m = o as THREE.Mesh;
        m.castShadow = true;
        m.frustumCulled = false;
      }
    });
    // Keep the model's own head and neck orientation (the clip starts with a
    // slight turn); everything else takes its rest pose from frame 0 of the
    // wave, which is a relaxed stance with the arms down.
    const bindHead = b.head?.quaternion.clone();
    const bindNeck = b.neck?.quaternion.clone();
    action.reset().play();
    mixer.update(0);
    b.rest.clear();
    scene.traverse((o) => {
      if ((o as THREE.Bone).isBone) b.rest.set(o, o.quaternion.clone());
    });
    if (b.head && bindHead) b.rest.set(b.head, bindHead);
    if (b.neck && bindNeck) b.rest.set(b.neck, bindNeck);
    action.stop();
    for (const [bone, q] of b.rest) bone.quaternion.copy(q);
  }, [scene, actions, mixer]);

  // Wave: play once, then ease back to the rest pose so the arms do not stay up.
  React.useEffect(() => {
    const action = actions.wave;
    if (!action) return;
    action.setLoop(THREE.LoopOnce, 1);
    const onFinished = () => {
      // stop() restores the bind pose, so pin the last animated frame first
      // and ease from there back to the rest pose.
      const b = bones.current;
      const last = new Map<THREE.Object3D, THREE.Quaternion>();
      for (const bone of b.rest.keys()) last.set(bone, bone.quaternion.clone());
      action.stop();
      for (const [bone, q] of last) bone.quaternion.copy(q);
      phase.current = "restoring";
      restoreT.current = 0;
    };
    mixer.addEventListener("finished", onFinished);
    return () => mixer.removeEventListener("finished", onFinished);
  }, [actions, mixer]);

  const target = React.useMemo(() => new THREE.Vector3(), []);
  const tmpQ = React.useMemo(() => new THREE.Quaternion(), []);

  useFrame((state, delta) => {
    if (!animate) return;
    const b = bones.current;
    const t = state.clock.elapsedTime;

    if (
      (waveRef.current ?? 0) > 0 &&
      phase.current === "idle" &&
      actions.wave
    ) {
      waveRef.current = 0;
      phase.current = "waving";
      actions.wave.reset().fadeIn(0.15).play();
    }

    if (phase.current === "restoring") {
      restoreT.current += delta / 0.6;
      const k = Math.min(1, restoreT.current);
      for (const [bone, q] of b.rest) bone.quaternion.slerp(q, k);
      if (k >= 1) phase.current = "idle";
    }

    if (phase.current !== "waving") {
      // Breathing on the chest, gentle sway on the whole body.
      if (b.spine) b.spine.rotation.x = Math.sin(t * 1.6) * 0.02;
      if (group.current) group.current.rotation.y = Math.sin(t * 0.5) * 0.03;

      // Head follows the cursor.
      if (b.head) {
        const p = pointer.current ?? { x: 0, y: 0 };
        const yaw = THREE.MathUtils.clamp(p.x * 0.6, -0.6, 0.6);
        const pitch = THREE.MathUtils.clamp(p.y * 0.35, -0.3, 0.35);
        target.set(Math.sin(yaw), -pitch, Math.cos(yaw));
        tmpQ.setFromEuler(new THREE.Euler(-pitch * 0.9, yaw * 0.7, 0));
        const restHead = b.rest.get(b.head);
        if (restHead) {
          const goal = restHead.clone().multiply(tmpQ);
          b.head.quaternion.slerp(goal, 1 - Math.exp(-6 * delta));
        }
        if (b.neck) {
          const restNeck = b.rest.get(b.neck);
          if (restNeck) {
            tmpQ.setFromEuler(new THREE.Euler(-pitch * 0.3, yaw * 0.3, 0));
            b.neck.quaternion.slerp(
              restNeck.clone().multiply(tmpQ),
              1 - Math.exp(-6 * delta),
            );
          }
        }
      }
    }

    // Blink through the eyesClosed morph target.
    blink.current.t += delta;
    if (blink.current.t > blink.current.next) {
      const ph = blink.current.t - blink.current.next;
      const v = ph < 0.08 ? ph / 0.08 : ph < 0.18 ? 1 - (ph - 0.08) / 0.1 : 0;
      applyBlink(scene, Math.max(0, v));
      if (ph > 0.18) blink.current = { t: 0, next: 2.5 + Math.random() * 3.5 };
    }
  });

  return (
    <group ref={group} position={[0, -1.52, 0]} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload(MODEL_URL);
useFBX.preload(WAVE_URL);
