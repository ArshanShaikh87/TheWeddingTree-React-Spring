import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";


function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<div className="text-center pt-20">Gallery Page</div>} />
          <Route path="/contact" element={<div className="text-center pt-20">Contact Page</div>} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
