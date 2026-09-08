"use client";

import * as React from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export type Capability = "unknown" | "3d" | "static";

function probe(): Capability {
  if (typeof window === "undefined") return "unknown";
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };
  if (nav.connection?.saveData) return "static";
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory < 4)
    return "static";
  if (
    typeof nav.hardwareConcurrency === "number" &&
    nav.hardwareConcurrency <= 2
  )
    return "static";
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    if (!gl) return "static";
  } catch {
    return "static";
  }
  return "3d";
}

let cached: Capability | null = null;
const noop = () => () => {};

/** Whether to render the 3D avatar or its flat fallback. "unknown" on the server and during hydration. */
export function useDeviceCapability(): {
  capability: Capability;
  animate: boolean;
} {
  const reduced = useReducedMotion();
  const capability = React.useSyncExternalStore(
    noop,
    () => (cached ??= probe()),
    () => "unknown" as Capability,
  );
  return { capability: reduced ? "static" : capability, animate: !reduced };
}
