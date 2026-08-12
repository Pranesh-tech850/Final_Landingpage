
import React from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Projects from "./components/Projects";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

const App = () => {
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

export default App;
