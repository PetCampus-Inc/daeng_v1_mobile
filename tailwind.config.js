/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      inherit: "inherit",

      white: "#FFFFFF",
      black: "#000000",
      foreground: "#292929",
      background: "#EEE5E8",

      third: "#F9BCDD",
      fourth: "#74445A",
      navBg: "#ffc078",
      lightMain: "#fdf1e8",
      interfaceBg: "#f7f9fc",

      primary: {
        DEFAULT: "#956F4C",
        2: "#F08538",
        3: "#EE7821",
        4: "#FFCD4D"
      },
      second: "#D5A4CF",
      br: {
        2: "#C8A584",
        3: "#E4CAB1",
        4: "#EEE3D9",
        5: "#F6F1ED"
      },
      gray: {
        1: "#525252",
        2: "#858585",
        3: "#B5B5B5",
        4: "#E9E9E9",
        5: "#F6F6F6",
        B: "#F8F6F5"
      },
      red: {
        1: "#DD5435",
        2: "#FAE7E3"
      },
      green: "#5BBA70",
      yellow: {
        1: "#FFD12D",
        2: "#FFF0C8",
        3: "#FFF7E1"
      }
    },
    spacing: {
      px: "1px",
      0: "0",
      0.5: "2px",
      1: "4px",
      1.5: "6px",
      2: "8px",
      2.5: "10px",
      3: "12px",
      3.5: "14px",
      ...(() => {
        const spacingObject = {};
        for (let i = 1; i <= 50; i++) {
          spacingObject[i] = `${i * 4}px`;
        }
        return spacingObject;
      })()
    },
    extend: {
      fontFamily: { roboto: ["Roboto-Medium"] }
    }
  },

  plugins: [
    ({ addUtilities }) => {
      addUtilities({
        // Size
        ".typo-size-10": {
          fontSize: "10px",
          lineHeight: "13px"
        },
        ".typo-size-12": {
          fontSize: "12px",
          lineHeight: "15px"
        },
        ".typo-size-14": {
          fontSize: "14px",
          lineHeight: "17px"
        },
        ".typo-size-16": {
          fontSize: "16px",
          lineHeight: "20px"
        },
        ".typo-size-18": {
          fontSize: "18px",
          lineHeight: "24px"
        },
        ".typo-size-20": {
          fontSize: "20px",
          lineHeight: "27px"
        },
        ".typo-size-24": {
          fontSize: "24px",
          lineHeight: "30px"
        },
        ".typo-size-28": {
          fontSize: "28px",
          lineHeight: "36px"
        },

        // Title
        ".typo-title-20": {
          fontSize: "20px",
          lineHeight: "26px",
          letterSpacing: "-1.2px",
          fontWeight: "400"
        },
        ".typo-title-20-b": {
          fontSize: "20px",
          lineHeight: "28px",
          letterSpacing: "-0.24px",
          fontWeight: "700"
        },
        ".typo-title-24": {
          fontSize: "24px",
          lineHeight: "26px",
          letterSpacing: "-1.2px",
          fontWeight: "400"
        },
        ".typo-title-24-b": {
          fontSize: "24px",
          lineHeight: "32px",
          letterSpacing: "-1.2px",
          fontWeight: "700"
        },
        ".typo-title-28-b": {
          fontSize: "28px",
          lineHeight: "40px",
          letterSpacing: "0px",
          fontWeight: "700"
        },

        // Body
        ".typo-body-16": {
          fontSize: "16px",
          lineHeight: "23px",
          letterSpacing: "-0.192px",
          fontWeight: "400"
        },
        ".typo-body-16-b": {
          fontSize: "16px",
          lineHeight: "23px",
          letterSpacing: "-1.2px",
          fontWeight: "700"
        },
        ".typo-body-18": {
          fontSize: "18px",
          lineHeight: "26px",
          letterSpacing: "-1.2px",
          fontWeight: "400"
        },
        ".typo-body-18-b": {
          fontSize: "18px",
          lineHeight: "27px",
          letterSpacing: "0px",
          fontWeight: "700"
        },

        // Label
        ".typo-label-14": {
          fontSize: "14px",
          lineHeight: "20px",
          letterSpacing: "0.28px",
          fontWeight: "400"
        },
        ".typo-label-14-m": {
          fontSize: "14px",
          lineHeight: "25px",
          letterSpacing: "0.28px",
          fontWeight: "500"
        },
        ".typo-label-14-b": {
          fontSize: "14px",
          lineHeight: "20px",
          letterSpacing: "0.28px",
          fontWeight: "700"
        },
        ".typo-label-16": {
          fontSize: "16px",
          lineHeight: "24px",
          letterSpacing: "-0.192px",
          fontWeight: "400"
        },
        ".typo-label-16-m": {
          fontSize: "16px",
          lineHeight: "24px",
          letterSpacing: "-1.2px",
          fontWeight: "500"
        },
        ".typo-label-16-b": {
          fontSize: "16px",
          lineHeight: "24px",
          letterSpacing: "-0.192px",
          fontWeight: "700"
        },

        // Caption
        ".typo-caption-10": {
          fontSize: "10px",
          lineHeight: "17.5px",
          letterSpacing: "-0.12px",
          fontWeight: "400"
        },
        ".typo-caption-12": {
          fontSize: "12px",
          lineHeight: "17.5px",
          letterSpacing: "-0.12px",
          fontWeight: "400"
        },
        ".typo-caption-12-b": {
          fontSize: "12px",
          lineHeight: "20px",
          letterSpacing: "0.24px",
          fontWeight: "700"
        }
      });
    }
  ]
};
