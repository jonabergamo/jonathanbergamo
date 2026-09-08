"use client";

import * as React from "react";
import { useShallow } from "zustand/react/shallow";
import { useWindowStore, selectVisibleOrder } from "@/store/window-store";
import { OsWindow } from "./os-window";

/** Renders every running window inside the desktop bounds and keeps the store's bounds in sync. */
export function WindowLayer() {
  const order = useWindowStore(useShallow(selectVisibleOrder));
  const setBounds = useWindowStore((s) => s.setBounds);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setBounds({ w: el.clientWidth, h: el.clientHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [setBounds]);

  return (
    <div
      ref={ref}
      data-testid="window-layer"
      className="absolute inset-0 bottom-12 overflow-hidden"
    >
      {order.map((id, i) => (
        <OsWindow key={id} id={id} zIndex={10 + i} />
      ))}
    </div>
  );
}
