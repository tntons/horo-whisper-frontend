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
        pink03: "#6F0066",
        yellow01: "#FBF6D1",
        yellow02: "#D4BB2C",
        yellow03: "#534002",
        greydate: "#979797",
        greybackground: "#F6F6F6",
        greyborder: "#D0D0D0",
        grey01: "#CECECE",
        grey02: "#6D6D6D",
        blue01: "#2C2D4D",
        blue02: "#787BC3",
        white01: "#F8F8F8",
        luckyblack: "#333333",
        luckywhite: "#FFFFFF",
        luckygrey: "#D9D9D9",
        luckyred: "#E95050",
        luckyorange: "#F29C11",
        luckyyellow: "#F7EB82",
        luckygreen: "#80EC79",
        luckyblue: "#53B1EF",
        luckypurple: "#A678E1",
        luckypink: "#F071E5",
        luckybrown: "#A45D44"
      },
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        playfair: ["var(--font-playfair)", 'serif'],
      },
      fontSize: {
        'xs': '6px',      
        'sm': '8px',    
        'base': '10px',   
        'md': '11px',     
        'lg': '15px',   
        'xl': '20px',     
        '2xl': '24px',  
      },
      container: {
        center: true,
      },

    },
  },
  plugins: [],
} satisfies Config;
