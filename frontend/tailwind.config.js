module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // Enable dark mode
  theme: {
    extend: {
      keyframes: {
        "toast-progress": {
          "0%": { width: "100%" },
          "100%": { width: "0%" },
        },
      },
      animation: {
        "toast-progress": "toast-progress 3s linear",
      },
      width: {
        "3/10": "30%",
        "7/10": "70%",
      },
      animation: {
        fadeIn: "fadeIn 2s ease-in-out",
        bounce: "bounce 2s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      screens: {
        xs: "400px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require("@tailwindcss/aspect-ratio"),
    function ({ addUtilities }) {
      const newUtilities = {
        ".scrollbar-thin": {
          scrollbarWidth: "thin",
          scrollbarColor: "rgb(31 29 29) white",
        },
        ".scrollbar-webkit": {
          "&::-webkit-scrollbar": {
            width: "8px",
          },

          "&::-webkit-scrollbar-track": {
            background: "white",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgb(31 41 55)",
            borderRadius: "20px",
            border: "1px solid white",
          },
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
