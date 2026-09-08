"use client";

import * as React from "react";
import type { ResizeEdge } from "@/lib/rect";
import { cn } from "@/lib/utils";

const EDGES: { edge: ResizeEdge; className: string; cursor: string }[] = [
  { edge: "n", className: "-top-1 left-2 right-2 h-2", cursor: "ns-resize" },
  { edge: "s", className: "-bottom-1 left-2 right-2 h-2", cursor: "ns-resize" },
  { edge: "e", className: "-right-1 top-2 bottom-2 w-2", cursor: "ew-resize" },
  { edge: "w", className: "-left-1 top-2 bottom-2 w-2", cursor: "ew-resize" },
  {
    edge: "ne",
    className: "-top-1.5 -right-1.5 size-4",
    cursor: "nesw-resize",
  },
  { edge: "nw", className: "-top-1.5 -left-1.5 size-4", cursor: "nwse-resize" },
  {
    edge: "se",
    className: "-bottom-1.5 -right-1.5 size-4",
    cursor: "nwse-resize",
  },
  {
    edge: "sw",
    className: "-bottom-1.5 -left-1.5 size-4",
    cursor: "nesw-resize",
  },
];

export function WindowResizeHandles({
  onPointerDown,
}: {
  onPointerDown: (edge: ResizeEdge, e: React.PointerEvent) => void;
}) {
  return (
    <>
      {EDGES.map(({ edge, className, cursor }) => (
        <div
          key={edge}
          data-resize-handle={edge}
          aria-hidden
          className={cn("absolute z-10", className)}
          style={{ cursor, touchAction: "none" }}
          onPointerDown={(e) => onPointerDown(edge, e)}
        />
      ))}
    </>
  );
}
