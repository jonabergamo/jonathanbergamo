"use client";

import * as React from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

export const MODEL_URL = "/models/jonathan.glb";
export const WAVE_URL = "/animations/Waving.fbx";
export const DANCE_URL = "/animations/HipHop.fbx";

type Props = {
  /** Normalised pointer position in [-1, 1], updated by the parent. */
  pointer: React.RefObject<{ x: number; y: number }>;
  /** Set to 1 by the parent to trigger a wave. */
  waveRef: React.RefObject<number>;
  /** While true (music is playing) he dances in a loop. */
  dancing: boolean;
  /** Horizontal placement inside the canvas, world units. */
  offsetX?: number;
  animate: boolean;
};

const FORWARD = new THREE.Vector3(0, 0, 1);
const dir = new THREE.Vector3();
const qDelta = new THREE.Quaternion();
const qParent = new THREE.Quaternion();
const qGoal = new THREE.Quaternion();
const qIdentity = new THREE.Quaternion();

/**
 * Turn `bone` so that its straight-ahead world orientation `forward` is
 * rotated by `delta` (scaled by `amount`), easing over time.
 */
function aimBone(
  bone: THREE.Object3D,
  forward: THREE.Quaternion,
  delta: THREE.Quaternion,
  amount: number,
  dt: number,
) {
  qGoal.copy(qIdentity).slerp(delta, amount).multiply(forward); // world goal
  if (bone.parent) {
    bone.parent.getWorldQuaternion(qParent).invert();
    qGoal.premultiply(qParent); // to local
  }
  bone.quaternion.slerp(qGoal, 1 - Math.exp(-7 * dt));
}

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
function adaptClip(clip: THREE.AnimationClip, name: string) {
  const c = clip.clone();
  c.name = name;
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

export function Avatar({
  pointer,
  waveRef,
  dancing,
  animate,
  offsetX = 0,
}: Props) {
  const group = React.useRef<THREE.Group>(null);
  const { scene } = useGLTF(MODEL_URL);
  const fbx = useFBX(WAVE_URL);
  const clips = React.useMemo(
    () => [adaptClip(fbx.animations[0], "wave")],
    [fbx],
  );
  const { actions, mixer } = useAnimations(clips, group);

  const bones = React.useRef<{
    head: THREE.Object3D | null;
    neck: THREE.Object3D | null;
    spine: THREE.Object3D | null;
    rest: Map<THREE.Object3D, THREE.Quaternion>;
    headForward: THREE.Quaternion;
    neckForward: THREE.Quaternion;
  }>({
    head: null,
    neck: null,
    spine: null,
    rest: new Map(),
    headForward: new THREE.Quaternion(),
    neckForward: new THREE.Quaternion(),
  });
  const phase = React.useRef<
    "idle" | "waving" | "dancing" | "restoring" | "loading"
  >("idle");
  const danceAction = React.useRef<THREE.AnimationAction | null>(null);
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
    // Rest pose: the model's own bind pose (upright, facing the camera) for
    // the body, and frame 0 of the wave clip for the arms only, which brings
    // them down from the A-pose to a relaxed stance.
    const bind = new Map<THREE.Object3D, THREE.Quaternion>();
    scene.traverse((o) => {
      if ((o as THREE.Bone).isBone) bind.set(o, o.quaternion.clone());
    });
    action.reset().play();
    mixer.update(0);
    b.rest.clear();
    for (const [bone, q] of bind) {
      const arm = /Shoulder|Arm|Hand/.test(bone.name);
      b.rest.set(bone, arm ? bone.quaternion.clone() : q);
    }
    action.stop();
    for (const [bone, q] of b.rest) bone.quaternion.copy(q);
    // World orientation of the head and neck when looking straight ahead.
    scene.updateMatrixWorld(true);
    if (b.head) b.head.getWorldQuaternion(b.headForward);
    if (b.neck) b.neck.getWorldQuaternion(b.neckForward);
  }, [scene, actions, mixer]);

  // Wave: play once, then ease back to the rest pose so the arms do not stay up.
  React.useEffect(() => {
    const action = actions.wave;
    if (!action) return;
    action.setLoop(THREE.LoopOnce, 1);
    const onFinished = (e: { action: THREE.AnimationAction }) => {
      // stop() restores the bind pose, so pin the last animated frame first
      // and ease from there back to the rest pose.
      const b = bones.current;
      const last = new Map<THREE.Object3D, THREE.Quaternion>();
      for (const bone of b.rest.keys()) last.set(bone, bone.quaternion.clone());
      e.action.stop();
      for (const [bone, q] of last) bone.quaternion.copy(q);
      phase.current = "restoring";
      restoreT.current = 0;
    };
    mixer.addEventListener("finished", onFinished);
    return () => mixer.removeEventListener("finished", onFinished);
  }, [actions, mixer]);

  useFrame((state, delta) => {
    if (!animate) return;
    const b = bones.current;
    const t = state.clock.elapsedTime;

    // Music on: start (or keep) the dance loop. Music off: ease back to rest.
    if (dancing && phase.current === "idle") {
      waveRef.current = 0;
      phase.current = "loading";
      const start = (clip: THREE.AnimationClip) => {
        if (!group.current) return;
        const a = mixer.clipAction(clip, group.current);
        a.setLoop(THREE.LoopRepeat, Infinity);
        danceAction.current = a;
        phase.current = "dancing";
        a.reset().fadeIn(0.3).play();
      };
      if (danceAction.current) start(danceAction.current.getClip());
      else
        new FBXLoader()
          .loadAsync(DANCE_URL)
          .then((f) => start(adaptClip(f.animations[0], "dance")))
          .catch(() => {
            phase.current = "idle";
          });
    } else if (!dancing && phase.current === "dancing" && danceAction.current) {
      const b = bones.current;
      const last = new Map<THREE.Object3D, THREE.Quaternion>();
      for (const bone of b.rest.keys()) last.set(bone, bone.quaternion.clone());
      danceAction.current.stop();
      for (const [bone, q] of last) bone.quaternion.copy(q);
      phase.current = "restoring";
      restoreT.current = 0;
    } else if (
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

    if (phase.current !== "waving" && phase.current !== "dancing") {
      // Breathing on the chest, gentle sway on the whole body.
      if (b.spine) b.spine.rotation.x = Math.sin(t * 1.6) * 0.02;

      // Head follows the cursor, computed in world space: rotate the "straight
      // ahead" orientation by the rotation that takes +Z to the look direction,
      // then convert back into the bone's local space.
      if (b.head) {
        const p = pointer.current ?? { x: 0, y: 0 };
        dir
          .set(
            THREE.MathUtils.clamp(p.x, -1, 1) * 0.85,
            THREE.MathUtils.clamp(-p.y, -1, 1) * 0.55,
            1,
          )
          .normalize();
        qDelta.setFromUnitVectors(FORWARD, dir);
        aimBone(b.head, b.headForward, qDelta, 1, delta);
        if (b.neck) aimBone(b.neck, b.neckForward, qDelta, 0.35, delta);
        if (group.current)
          group.current.rotation.y = THREE.MathUtils.damp(
            group.current.rotation.y,
            p.x * 0.08,
            4,
            delta,
          );
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
    <group ref={group} position={[offsetX, -1.52, 0]} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload(MODEL_URL);
useFBX.preload(WAVE_URL);
