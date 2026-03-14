import Header from "../components/Header";
import Footer from "../components/Footer";
import Home from "./Home";
// import CustomCursor from "../components/CustomCursor";

export default function LandingPage() {
  return (
    <div className="bg-[#0b0f1a] text-white min-h-screen">
      {/* <CustomCursor /> */}
      <Header />
      <Home />
      <Footer />
    </div>
  );
}