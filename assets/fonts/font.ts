import LocalFont from "next/font/local";

export const myFont = LocalFont({
  src: [
    {
      path: "../assets/fonts/ABCGintoNormal-Black-Trial-BF651b7b782fcb2.otf",
      style: "normal",
      // weight: "800",
    },
    {
      path: "../assets/fonts/ABCGintoNormal-Bold-Trial-BF651b7b77d863b.otf",
      style: "normal",
      // weight: "700",
    },
    {
      path: "../assets/fonts/ABCGintoNormal-Medium-Trial-BF651b7b785c106.otf",
      style: "normal",
      // weight: "500",
    },
    {
      path: "../assets/fonts/ABCGintoNormal-Regular-Trial-BF651b7b7846685.otf",
      style: "normal",
      // weight: "400",
    },
  ],
  display: "swap",
});
