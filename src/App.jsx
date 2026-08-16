import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Projects from "./components/Projects";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import ContactModal from "./components/ContactModal";


const Home = () => {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Features />
        <Projects />
        <CTA />
      </main>

      <Footer />
    </>
  );
};


const App = () => {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/contact"
          element={<ContactModal />}
        />

      </Routes>

    </BrowserRouter>
  );
};


export default App;