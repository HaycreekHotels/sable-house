import localFont from "next/font/local";

export const bentonLight = localFont({
  src: "./fonts/Benton-Modern-Light.otf",
  weight: "300",
  style: "light",
  display: "swap",
  variable: "--font-benton-light",
});

export const bentonReg = localFont({
  src: "./fonts/Benton-Modern-Regular.otf",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-benton-regular",
});

export const centralNoLight = localFont({
  src: "./fonts/CentraNo1-Light.otf",
  weight: "300",
  style: "normal",
  display: "swap",
  variable: "--font-central-light",
});

export const centralNoReg = localFont({
  src: "./fonts/CentraNo1-Regular.otf",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-central-regular",
});
