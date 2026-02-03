// src/components/providers

"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      // This is the key: forcing it to wait for mount 
      // without stopping the child render process.
      forcedTheme={mounted ? undefined : "dark"}
    >
      {children}
    </NextThemesProvider>
  );
}