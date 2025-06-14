/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      scrollbar: {
        thin: "scrollbar-thin",
        auto: "scrollbar-auto",
        none: "scrollbar-none",
      },
    },
  },
  plugins: [
    // Add a plugin to enable scrollbar utilities
    function ({ addUtilities }) {
      const newUtilities = {
        ".scrollbar-thin": {
          scrollbarWidth: "thin",
          scrollbarColor: "#888 #1a1b2c",
        },
        ".scrollbar-auto": {
          scrollbarWidth: "auto",
          scrollbarColor: "#888 #f1f1f1",
        },
        ".scrollbar-none": {
          scrollbarWidth: "none",
        },
        "::-webkit-scrollbar": {
          width: "8px",
        },
        "::-webkit-scrollbar-track": {
          background: "#1b1c23",
        },
        "::-webkit-scrollbar-thumb": {
          background: "#888",
          borderRadius: "4px",
        },
        "::-webkit-scrollbar-thumb:hover": {
          background: "#555",
        },
      };
      addUtilities(newUtilities, ["responsive"]);
    },
  ],
};
