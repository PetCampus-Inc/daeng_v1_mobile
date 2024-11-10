import { createContext, Fragment, PropsWithChildren, useCallback, useMemo, useState } from "react";

export const OverlayContext = createContext<{
  mount(id: string, element: JSX.Element): void;
  unmount(id: string): void;
} | null>(null);

const OverlayProvider = ({ children }: PropsWithChildren) => {
  const [overlayById, setOverlayById] = useState<Map<string, JSX.Element>>(new Map());

  const mount = useCallback((id: string, element: JSX.Element) => {
    setOverlayById((overlays) => {
      const cloned = new Map(overlays);
      cloned.set(id, element);
      return cloned;
    });
  }, []);

  const unmount = useCallback((id: string) => {
    setOverlayById((overlays) => {
      const cloned = new Map(overlays);
      cloned.delete(id);
      return cloned;
    });
  }, []);

  const context = useMemo(() => ({ mount, unmount }), [mount, unmount]);

  return (
    <OverlayContext.Provider value={context}>
      {children}
      {[...overlayById.entries()].map(([id, element]) => {
        return <Fragment key={id}>{element}</Fragment>;
      })}
    </OverlayContext.Provider>
  );
};
export { OverlayProvider };
