import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const monumentRegular = localFont({
  src: "./fonts/MonumentExtended-Regular.otf",
  variable: "--font-monument-regular",
  weight: "400",
});
const monumentBold = localFont({
  src: "./fonts/MonumentExtended-UltraBold.otf",
  variable: "--font-monument-bold",
  weight: "900",
});

export const metadata = {
  title: "FitMate",
  description: "Your perfect fit, just a click away!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${monumentRegular.variable} ${monumentBold.variable} antialiased`}
        style={{
          backgroundImage: `url('https://i.pinimg.com/originals/dd/b8/5d/ddb85dc58883b87a2ea5324dd37b0fdf.gif')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center fix",
        }}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
