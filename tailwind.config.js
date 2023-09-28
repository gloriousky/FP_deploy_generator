const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.vue"],
  important: true,
  darkMode: "class",
  theme: {
    screens: {
      xs: "540px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    fontFamily: {
      nunito: ['"Nunito", sans-serif'],
    },
    extend: {
      screens: {
        lg_992: "992px",
      },
      colors: {
        dark: "#3c4858",
        black: "#161c2d",
        primary: colors.blue, // This is theme primary color please change your primary color here.
        success: colors.emerald,
        warning: colors.amber,
        danger: colors.red,
        info: colors.sky,
        light: colors.gray,
      },

      boxShadow: {
        sm: "0 2px 4px 0 rgb(60 72 88 / 0.15)",
        DEFAULT: "0 0 3px rgb(60 72 88 / 0.15)",
        md: "0 5px 13px rgb(60 72 88 / 0.20)",
        lg: "0 10px 25px -3px rgb(60 72 88 / 0.15)",
        xl: "0 20px 25px -5px rgb(60 72 88 / 0.1), 0 8px 10px -6px rgb(60 72 88 / 0.1)",
        "2xl": "0 25px 50px -12px rgb(60 72 88 / 0.25)",
      },

      fontSize: {
        "4xxl": [
          "2.5rem",
          {
            lineHeight: "2.25rem",
          },
        ],
      },
      height: {
        content: "fit-content",
        4.5: "18px",
        17: "4.1rem",
        88: "22rem",
        112: "28rem",
        120: "30rem",
        128: "32rem",
        136: "34rem",
        144: "36rem",
        "84%": "84%",
      },
      width: {
        content: "fit-content",
        "97%": "97%",
        "94%": "94%",
        "80%": "80%",
        "70%": "70%",
        61: "15.3rem",
        18: "78px",
        68: "17rem",
      },
      lineHeight: {
        "extra-loose": "2.5",
        1: ".25rem",
        11: "2.75",
        12: "3rem",
        16: "64px",
      },
      maxHeight: {
        0: "0",
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
        112: "28rem",
        128: "32rem",
        136: "34rem",
        144: "36rem",
      },
      minWidth: {
        40: "10rem",
      },
      maxWidth: {
        "80%": "80%",
        "85%": "85%",
        "90%": "90%",
        "95%": "95%",
      },
      transitionDuration: {
        0: "0ms",
        2000: "2000ms",
        5000: "5000ms",
      },
      transitionDelay: {
        0: "0ms",
        2000: "2000ms",
        3000: "3000ms",
      },
      transitionProperty: {
        height: "height",
      },
      keyframes: {
        DropDownSlide: {
          "0%": { transform: "translateY(15px)" },
          "100%": { transform: "translateY(0)" },
        },
        collapsing: {
          "0%": { transform: "translateY(-5px)" },
          "100%": { transform: "translateY(5px)" },
        },
        ModalSlide: {
          "0%": { transform: "translateY(-50px)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        DropDownSlide: "DropDownSlide .2s ease-in",
        collapsing: "collapsing .2s ease-in-out",
        ModalSlide: "ModalSlide .3s ease-in-out",
      },

      spacing: {
        0.75: "0.1875rem",
        3.25: "0.8125rem",
      },

      zIndex: {
        1: "1",
        2: "2",
        3: "3",
        999: "999",
      },
    },
  },

  plugins: [
    // require('@tailwindcss/forms'), ({
    //   strategy: 'class',
    // }),
  ],
};
