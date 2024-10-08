import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CookiesProvider } from "next-client-cookies/server";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const monumentRegular = localFont({
  src: "./fonts/MonumentExtended-Regular.otf",
});
const monumentBold = localFont({
  src: "./fonts/MonumentExtended-UltraBold.otf",
});

export const metadata = {
  title: "FitMate",
  description: "Your perfect fit, just a click away!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${monumentRegular.className} ${monumentBold.className} antialiased`}
        style={{
          backgroundImage: `url('https://i.pinimg.com/originals/dd/b8/5d/ddb85dc58883b87a2ea5324dd37b0fdf.gif')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center fix",
        }}
      >
        <CookiesProvider>
          <Navbar />
          {children}
          <Footer />
        </CookiesProvider>
        <ToastContainer />
        <div id="modal"></div>
      </body>
    </html>
  );
}
