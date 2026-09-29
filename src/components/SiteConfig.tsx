"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { DEFAULT_CONFIG, loadSiteConfig, type SiteConfig } from "@/lib/firebase";

const Ctx = createContext<SiteConfig>(DEFAULT_CONFIG);

export function SiteConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG);
  useEffect(() => {
    let alive = true;
    loadSiteConfig().then((c) => alive && setConfig(c));
    return () => {
      alive = false;
    };
  }, []);
  return <Ctx.Provider value={config}>{children}</Ctx.Provider>;
}

export function useSiteConfig() {
  return useContext(Ctx);
}
