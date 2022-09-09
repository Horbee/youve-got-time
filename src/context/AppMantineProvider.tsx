import { useState } from "react"

import { ColorSchemeProvider, MantineProvider } from "@mantine/core"

import type { ColorScheme } from "@mantine/core";
import type { ReactNode } from "react";

export const AppMantineProvider = ({ children }: { children: ReactNode }) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    (localStorage.getItem("colorScheme") as ColorScheme) || "light"
  );
  const toggleColorScheme = (value?: ColorScheme) => {
    const newColorScheme = value || (colorScheme === "dark" ? "light" : "dark");
    localStorage.setItem("colorScheme", newColorScheme);
    setColorScheme(newColorScheme);
  };

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
