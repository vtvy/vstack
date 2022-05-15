module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                textColorDark: "#C5C8D8",
                indigo: {
                    850: "#465f8b",
                    950: "#1E2745",
                    1000: "#182039",
                    1050: "#171E37",
                },
            },
            animation: {
                scale: "scale 2s linear infinite alternate-reverse",
                wiggle: "wiggle 1s ease-in-out infinite",
            },
            keyframes: {
                scale: {
                    "100%": { width: "90rem", height: "90rem" },
                },
                wiggle: {
                    "0%, 100%": { transform: "rotate(-3deg)" },
                    "50%": { transform: "rotate(3deg)" },
                },
            },
        },
    },
    plugins: [],
    darkMode: "class",
};
