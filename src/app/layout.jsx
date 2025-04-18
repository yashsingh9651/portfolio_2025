import {  Montserrat } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "Yash Singh",
  description: "Java Script Full Stack Web Developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} scroll-smooth bg-gradient-to-br from-gray-900 via-purple-900 to-violet-950 antialiased`}
      >
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
