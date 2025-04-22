import type {Config} from "tailwindcss";
import {nextui} from "@nextui-org/react";

const colors = require("tailwindcss/colors");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      "mono": ["ui-monospace", "Courier New", "monospace"],
      "serif": ["Lora", "Times New Roman", "ui-serif", "system-ui"],
      "sans": ["Roboto Condensed", "ui-sans", "system-ui"]
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "muted-foreground": "var(--muted-foreground)",
        light: "var(--light)",
        yellow: {
          "50": "#f7f3f0",
          "100": "#f0e9e4",
          "200": "#e1d2c7",
          "300": "#cdb4a4",
          "400": "#b9927e",
          "500": "#aa7865",
          "600": "#9d6759",
          "700": "#83544b",
          "800": "#6b4741",
          "900": "#573b37",
          "950": "#2e1e1c",
        },
        "gray": {
          "50": "#f6f6f6",
          "100": "#e7e7e7",
          "200": "#d1d1d1",
          "300": "#b0b0b0",
          "400": "#888888",
          "500": "#6d6d6d",
          "600": "#5d5d5d",
          "700": "#555555",
          "800": "#454545",
          "900": "#3d3d3d",
          "950": "#262626",
        },
        "purple": {
          "50": "#f4f2ff",
          "100": "#ebe8ff",
          "200": "#dad4ff",
          "300": "#bfb2ff",
          "400": "#9f85ff",
          "500": "#8155fd",
          "600": "#7232f5",
          "700": "#6320e1",
          "800": "#541abd",
          "900": "#46189a",
          "950": "#290c69",
        },
      },
    },
  },
  plugins: [nextui(
    {
      themes: {
        light: {
          colors: {
            primary: colors.purple["500"],
          },
        },
        dark: {
          colors: {
            primary: colors.purple["500"],
          },
        },
      },
    }
  )]
} as any;
export default config;
