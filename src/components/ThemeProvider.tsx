// src/components/ThemeProvider.tsx
"use client";

import * as React from "react";
// KORRIGIERTER IMPORT: Die Typen werden jetzt direkt aus dem Hauptpaket importiert
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}