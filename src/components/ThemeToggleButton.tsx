// src/components/ThemeToggleButton.tsx
"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggleButton() {
  const { setTheme, theme } = useTheme();
  // Dieser State ist wichtig, um Hydration-Fehler zu vermeiden, da das Theme auf dem Server anders sein kann als initial im Browser
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Auf dem Server und beim ersten Rendern im Browser nichts anzeigen, um Layout-Sprünge zu vermeiden
    return <div className="h-10 w-10" />;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label="Theme wechseln"
    >
      {theme === "light" ? (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem] text-white" />
      )}
    </Button>
  );
}