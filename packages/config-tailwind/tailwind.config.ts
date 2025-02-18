import type { Config } from "tailwindcss";
import { PluginAPI } from "tailwindcss/types/config";
import {
  BOSTON_BLUE,
  CUSTOM_GREEN,
  CUSTOM_YELLOW,
  SALMON_RED,
  ZOMBIE_GREEN,
} from "./colors";

// We want each package to be responsible for its own content.
const config: Omit<Config, "content"> = {
  theme: {
    extend: {
      colors: {
        "secondary-color" : "#3884C5",
        "primary-color" : "#FFC648",
        "tertiary-red" : "#F47673",
        "tertiary-green" : "#8AC48A",
        "primary-black" : "#333333",
        "venetian-red": "#4D4D4D",
        "secondary-venetican-red" : "#F2685C",
        "primary-gray": "#808080",
      },
      backgroundImage: {
        "glow-conic":
          "conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)",
      },
      fontFamily: {
        heyComic: ["var(--font-heycomic)"],
        cheri: ["var(--font-cheri)"],
        helvetica: ["var(--font-helvetica)"],
        helveticaRoundedBold: ["var(--font-helvetica-rounded-bold)"],
        helveticaOblique: ["var(--font-helvetica-oblique)"],
      },
    },
  },
  plugins: [
    function ({ addUtilities }: PluginAPI) {
      const newUtilities: Record<string, Record<string, string>> = {
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      };

      addUtilities(newUtilities);
    },
  ],
};
export default config;
