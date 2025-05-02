import localFont from "next/font/local";
import { Inter as FontSans, Sora, Space_Grotesk } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const fontUrban = Sora({
  subsets: ["latin"],
  variable: "--font-urban",
})

export const fontHeading = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
})

export const fontGeist = localFont({
  src: "./GeistVF.woff2",
  variable: "--font-geist",
})
