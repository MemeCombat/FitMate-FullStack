import Navbar from "../app/components/Navbar";
// import Footer from "./Footer";

export default function LayoutWithNavbar({ children }) {
  return (
    <>
      <Navbar />
      {children}
      {/* <Footer /> */}
    </>
  );
}
