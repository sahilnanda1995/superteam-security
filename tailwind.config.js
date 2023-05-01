/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Archivo", "Inter", ...defaultTheme.fontFamily.sans],
        mono: ["JetBrainsMono", "menlo", ...defaultTheme.fontFamily.mono],
      },
      fontSize: {
        xs: ["10px", "13px"],
      },
      colors: {
        "sec-green": "#2bbc8a",
        "sec-text": "#e1e2e3",
        "sec-link": "#80aad4",
        "sec-code-bg": "#282A36",
        "sec-code": "#F55555",
        "sec-bold": "#e66363",
        "sec-quote": "#8a6d3b",
        "sec-quote-b": "#faebcc",
        "home-bg": "#121212",
        "home-neon": "#97DA8D",
        "home-parrot": "#B0CCAB",
        "home-green": "#98DA8D",
        "home-tab-head": "#1D1D1D",
        "home-tab-title": "#636363",
        "home-tab-amt": "#999999",
        "home-tab-exp-bg": "#272727",
        "home-tab-exp-txt": "#C2C2C2",
        "home-tab-exp-subtxt": "#909090",
      },
      keyframes: {
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden",
          },
          "100%": {
            width: "100%",
          },
        },
        blink: {
          "50%": {
            borderColor: "transparent",
          },
          "100%": {
            borderColor: "#97DA8D",
          },
        },
      },
      animation: {
        typing: "typing 2s steps(20) alternate, blink .7s infinite",
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.sec-text"),
            "--tw-prose-headings": theme("colors.sec-green"),
            // '--tw-prose-headings': theme('colors.pink[900]'),
            "--tw-prose-lead": theme("colors.pink[700]"),
            "--tw-prose-links": theme("colors.sec-link"),
            "--tw-prose-bold": theme("colors.sec-bold"),
            "--tw-prose-counters": theme("colors.sec-green"),
            "--tw-prose-bullets": theme("colors.sec-green"),
            "--tw-prose-hr": theme("colors.pink[300]"),
            "--tw-prose-quotes": theme("colors.sec-quote"),
            "--tw-prose-quote-borders": theme("colors.sec-quote-b"),
            "--tw-prose-captions": theme("colors.pink[700]"),
            "--tw-prose-code": theme("colors.sec-code"),
            "--tw-prose-pre-code": theme("colors.pink[100]"),
            "--tw-prose-pre-bg": theme("colors.sec-code-bg"),
            "--tw-prose-th-borders": theme("colors.pink[300]"),
            "--tw-prose-td-borders": theme("colors.pink[200]"),
            "--tw-prose-invert-body": theme("colors.pink[200]"),
            "--tw-prose-invert-headings": theme("colors.white"),
            "--tw-prose-invert-lead": theme("colors.pink[300]"),
            "--tw-prose-invert-links": theme("colors.white"),
            "--tw-prose-invert-bold": theme("colors.white"),
            "--tw-prose-invert-counters": theme("colors.pink[400]"),
            "--tw-prose-invert-bullets": theme("colors.pink[600]"),
            "--tw-prose-invert-hr": theme("colors.pink[700]"),
            "--tw-prose-invert-quotes": theme("colors.pink[100]"),
            "--tw-prose-invert-quote-borders": theme("colors.pink[700]"),
            "--tw-prose-invert-captions": theme("colors.pink[400]"),
            "--tw-prose-invert-code": theme("colors.white"),
            "--tw-prose-invert-pre-code": theme("colors.pink[300]"),
            "--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
            "--tw-prose-invert-th-borders": theme("colors.pink[600]"),
            "--tw-prose-invert-td-borders": theme("colors.pink[700]"),
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
