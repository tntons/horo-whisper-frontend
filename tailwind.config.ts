import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        purple01: "#B48FE8",
        purple02: "#565896",
        purple03: "#4D4F8A",
        purple04: "#2C2D4D",
        pink01: "#FFE9FD",
        pink02: "#E990DA",
        yellow01: "#FBF6D1",
        yellow02: "#D4BB2C",
        yellow03: "#FFC13C",
        greydate: "#979797",
        grey01: "#D4D4D4",
        grey02: "#6D6D6D",
      },
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
      },

    },
  },
  plugins: [],
} satisfies Config;
