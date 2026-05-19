import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        crimson: {
          DEFAULT: "#DC143C",
          50: "#FDE8EC",
          100: "#F9C5CE",
          200: "#F28B9D",
          300: "#EB516C",
          400: "#E4173B",
          500: "#DC143C",
          600: "#B01030",
          700: "#840C24",
          800: "#580818",
          900: "#2C040C",
          950: "#160206",
        },
        blood: {
          DEFAULT: "#8B0000",
          light: "#B22222",
          dark: "#4A0000",
        },
        smoke: {
          DEFAULT: "#1A1A1A",
          light: "#2A2A2A",
          dark: "#0D0D0D",
          muted: "#333333",
        },
        steel: {
          DEFAULT: "#C0C0C0",
          light: "#D4D4D4",
          dark: "#808080",
          chrome: "#E8E8E8",
        },
      },
      fontFamily: {
        inter: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        grotesk: ["Space Grotesk", "sans-serif"],
        bebas: ["Bebas Neue", "sans-serif"],
      },
      animation: {
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "flicker": "flicker 0.15s infinite",
        "shake": "shake 0.5s ease-in-out",
        "smoke-drift": "smoke-drift 20s linear infinite",
        "ember-rise": "ember-rise 4s ease-out infinite",
        "slash": "slash 0.4s ease-out forwards",
        "fade-in": "fade-in 1s ease-out forwards",
        "scale-in": "scale-in 0.6s ease-out forwards",
        "slide-up": "slide-up 0.8s ease-out forwards",
        "text-glow": "text-glow 2s ease-in-out infinite alternate",
        "border-glow": "border-glow 3s ease-in-out infinite alternate",
        "pulse-red": "pulse-red 2s ease-in-out infinite",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(220, 20, 60, 0.3)" },
          "50%": { boxShadow: "0 0 60px rgba(220, 20, 60, 0.8)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "flicker": {
          "0%": { opacity: "1" },
          "50%": { opacity: "0.8" },
          "100%": { opacity: "1" },
        },
        "shake": {
          "0%, 100%": { transform: "translateX(0)" },
          "10%": { transform: "translateX(-10px)" },
          "20%": { transform: "translateX(10px)" },
          "30%": { transform: "translateX(-8px)" },
          "40%": { transform: "translateX(8px)" },
          "50%": { transform: "translateX(-4px)" },
          "60%": { transform: "translateX(4px)" },
          "70%": { transform: "translateX(-2px)" },
          "80%": { transform: "translateX(2px)" },
        },
        "smoke-drift": {
          "0%": { transform: "translateX(-100%) translateY(0)" },
          "100%": { transform: "translateX(100%) translateY(-50px)" },
        },
        "ember-rise": {
          "0%": { transform: "translateY(100vh) scale(0)", opacity: "0" },
          "20%": { opacity: "1" },
          "100%": { transform: "translateY(-20vh) scale(1)", opacity: "0" },
        },
        "slash": {
          "0%": { transform: "translateX(-120%) rotate(-45deg) scaleX(0)" },
          "100%": { transform: "translateX(120%) rotate(-45deg) scaleX(1)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(40px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "text-glow": {
          "0%": { textShadow: "0 0 10px rgba(220, 20, 60, 0.5)" },
          "100%": { textShadow: "0 0 40px rgba(220, 20, 60, 1), 0 0 80px rgba(220, 20, 60, 0.5)" },
        },
        "border-glow": {
          "0%": { borderColor: "rgba(220, 20, 60, 0.2)" },
          "100%": { borderColor: "rgba(220, 20, 60, 0.8)" },
        },
        "pulse-red": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-crimson": "linear-gradient(135deg, #DC143C, #8B0000)",
        "gradient-dark": "linear-gradient(180deg, #000000, #0D0D0D, #1A1A1A)",
        "gradient-steel": "linear-gradient(135deg, #C0C0C0, #808080, #C0C0C0)",
      },
    },
  },
  plugins: [],
};

export default config;
