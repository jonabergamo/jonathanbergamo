"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { AvatarFallback } from "./avatar-fallback";
import { useDeviceCapability } from "./use-device-capability";

export type AvatarVariant = "wallpaper" | "mobile";

const AvatarScene = dynamic(() => import("./avatar-scene"), {
  ssr: false,
  loading: () => <AvatarFallback className="opacity-0" />,
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
    return this.state.failed ? <AvatarFallback /> : this.props.children;
  }
}

export function AvatarLazy({ variant }: { variant: AvatarVariant }) {
  const { capability, animate } = useDeviceCapability();
  if (capability === "unknown") return <AvatarFallback className="opacity-0" />;
  if (capability === "static") return <AvatarFallback />;
  return (
    <AvatarBoundary>
      <AvatarScene variant={variant} animate={animate} />
    </AvatarBoundary>
  );
}
