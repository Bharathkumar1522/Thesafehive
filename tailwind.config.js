/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // ━━ NEW Earthy-Organic Palette ━━
        olive: { DEFAULT: "#6B7C3A", light: "#8A9E4C", dark: "#505D2B" }, // muted olive — trust + safety
        vanilla: { DEFAULT: "#FAF5E4", dark: "#F2EDD8" },                    // warm cream dominant bg
        oatOlive: { DEFAULT: "#F2F1E6", dark: "#E6E5D6" },                    // subtle olive-tinted section bg
        terracotta: { DEFAULT: "#B85C38", light: "#D4785A", dark: "#8C4428" },// accent red-brown

        // ━━ Legacy tokens (kept for body/prose) ━━
        carbon: { DEFAULT: "#0D0F0A", light: "#161A12", dark: "#070806" },
        forest: { DEFAULT: "#0F2419", light: "#1A3A25", dark: "#091610" },
        moss: { DEFAULT: "#1A3A25", light: "#2C5A3C", dark: "#0F2419" },
        sage: { DEFAULT: "#3A6B4A", light: "#4E8862", dark: "#2C5038" },
        mint: { DEFAULT: "#47FFAB", light: "#7FFFCA", dark: "#2BE090" },

        // ━━ Light surface tokens ━━
        oat: { DEFAULT: "#F0EDEA", dark: "#E3DFDB" },    // Light section bg
        linen: { DEFAULT: "#E8E3DC", dark: "#D9D3CA" },    // Warm off-white surfaces

        // ━━ Legacy editorial tokens (kept for light sections / prose) ━━
        cream: { DEFAULT: "#F4ECE6", dark: "#EFEBE5" },
        offWhite: { DEFAULT: "#FDFCFB", dark: "#F6F5F2" },
        charcoal: { DEFAULT: "#22211F", light: "#3D3A36", dark: "#141312" },
        taupe: { DEFAULT: "#A39B92", light: "#C1B8AD", dark: "#857D75" },
        umber: { DEFAULT: "#8C6D53", light: "#A98565", dark: "#6F5641" },
        terracotta: { DEFAULT: "#B85C38", light: "#D4785A", dark: "#8C4428" },  // Warm handcrafted red-brown accent

        // ━━ Semantic ━━
        success: { DEFAULT: "#47FFAB" },   // mint
        warning: { DEFAULT: "#D4B06A" },
        danger: { DEFAULT: "#FF5C5C" },
      },

      fontFamily: {
        // Display: cinematic compressed for massive headings
        display: ["'Bebas Neue'", "Impact", "sans-serif"],
        // Heading: now mapped to sans to enforce max 3 fonts constraint
        heading: ["'DM Sans'", "Outfit", "system-ui", "sans-serif"],
        // Body: clean humanist geometric
        body: ["'DM Sans'", "Outfit", "system-ui", "sans-serif"],
        sans: ["'DM Sans'", "Outfit", "system-ui", "sans-serif"],
        // Mono: data / SVA-1 UI
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },

      /* Tailwind Typography — calibrated for editorial dark/light contexts */
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.charcoal.DEFAULT"),
            lineHeight: "1.75",
            "h1,h2,h3,h4,h5,h6": {
              fontFamily: theme("fontFamily.heading").join(", "),
              color: theme("colors.charcoal.DEFAULT"),
              fontWeight: "600",
              letterSpacing: "-0.02em",
            },
            a: {
              color: theme("colors.mint.DEFAULT"),
              textDecoration: "underline",
              textUnderlineOffset: "4px",
              "&:hover": { color: theme("colors.mint.light") },
            },
          },
        },
      }),

      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1.5rem",
          lg: "2rem",
          xl: "2.5rem",
          "2xl": "3rem",
        },
      },

      backgroundImage: {
        "mint-radial": "radial-gradient(ellipse at 50% 50%, rgba(71,255,171,0.12) 0%, transparent 70%)",
        "carbon-gradient": "linear-gradient(135deg, #0D0F0A 0%, #0F2419 100%)",
        "grid-pattern": "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2347FFAB' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },

      keyframes: {
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-18px) rotate(2deg)" },
          "66%": { transform: "translateY(-8px) rotate(-1deg)" },
        },
        "float-medium": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-24px) rotate(-3deg)" },
        },
        "pulse-mint": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "text-reveal": {
          "0%": { clipPath: "inset(0 100% 0 0)" },
          "100%": { clipPath: "inset(0 0% 0 0)" },
        },
        "counter-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },

      animation: {
        "float-slow": "float-slow 8s ease-in-out infinite",
        "float-medium": "float-medium 6s ease-in-out infinite",
        "pulse-mint": "pulse-mint 3s ease-in-out infinite",
        "scan-line": "scan-line 3s linear infinite",
        "text-reveal": "text-reveal 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "counter-up": "counter-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};
