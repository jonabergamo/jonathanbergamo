import * as React from "react";

const noop = () => () => {};

/** False on the server and during hydration, true afterwards. */
export function useHydrated() {
  return React.useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
}
