import { useBackHandler } from "@_shared/hooks/useBackHandler";
import { useTokenCookieManager } from "@_shared/hooks/useTokenCookieManager";

export function HybridAppContainer({ children }: { children: React.ReactNode }) {
  useBackHandler();
  useTokenCookieManager();

  return <>{children}</>;
}
