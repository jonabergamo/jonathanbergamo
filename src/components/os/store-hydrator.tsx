"use client";

import * as React from "react";
import { useWindowStore } from "@/store/window-store";

/** Rehydrates the persisted layout after mount so server and first client render match. */
export function StoreHydrator() {
  React.useEffect(() => {
    const done = () => useWindowStore.getState().setHydrated(true);
    const unsub = useWindowStore.persist.onFinishHydration(done);
    void useWindowStore.persist.rehydrate();
    return unsub;
  }, []);
  return null;
}
