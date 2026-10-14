"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { useDeviceCapability } from "./use-device-capability";

export type AvatarVariant = "wallpaper" | "mobile";

const AvatarScene = dynamic(() => import("./avatar-scene"), {
  ssr: false,
  loading: () => null,
});

class AvatarBoundary extends React.Component<
  { children: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function AvatarLazy({ variant }: { variant: AvatarVariant }) {
  const { capability, animate } = useDeviceCapability();
  // no 3D, no stand in. the wallpaper just shows the name
  if (capability !== "3d") return null;
  return (
    <AvatarBoundary>
      <AvatarScene variant={variant} animate={animate} />
    </AvatarBoundary>
  );
}
