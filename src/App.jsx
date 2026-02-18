import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<div className="text-center pt-20">About Page</div>} />
          <Route path="/services" element={<div className="text-center pt-20">Services Page</div>} />
          <Route path="/gallery" element={<div className="text-center pt-20">Gallery Page</div>} />
          <Route path="/contact" element={<div className="text-center pt-20">Contact Page</div>} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
