import { Ref, forwardRef, useCallback, useEffect, useImperativeHandle, useState } from "react";

import type { CreateOverlayElement } from "../model/types";

interface OverlayControllerProps {
  overlayElement: CreateOverlayElement;
  onExit: () => void;
}
export interface OverlayControlRef {
  close: () => void;
}
export const OverlayController = forwardRef(function OverlayController(
  { overlayElement: OverlayElement, onExit }: OverlayControllerProps,
  ref: Ref<OverlayControlRef>
) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOverlayClose = useCallback(() => setIsOpen(false), []);

  useImperativeHandle(ref, () => ({ close: handleOverlayClose }), [handleOverlayClose]);

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsOpen(true);
    });
  }, []);

  return <OverlayElement isOpen={isOpen} close={handleOverlayClose} exit={onExit} />;
});
