"use client";

import * as React from "react";
import { useWindowStore } from "@/store/window-store";

/** Rehydrates the persisted layout after mount so server and first client render match. */
/** Set before hydration; consumed by WindowLayer once the desktop size is known. */
export const firstVisit = { windows: false };

export function StoreHydrator() {
  React.useEffect(() => {
    try {
      firstVisit.windows = localStorage.getItem("jb-windows") === null;
    } catch {
      firstVisit.windows = false;
    }
    const done = () => useWindowStore.getState().setHydrated(true);
    const unsub = useWindowStore.persist.onFinishHydration(done);
    void useWindowStore.persist.rehydrate();
    return unsub;
  }, []);
  return null;
}
