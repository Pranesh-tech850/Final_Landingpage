
import React from "react";
import "../styles/hero.css";
import HeroModel from "./HeroModel";

const MARQUEE_WORDS = [
  "Design",
  "Technology",
  "Innovation",
  "Creativity",
  "Digital Experiences",
  "Project ideas",
  "Business Solutions"
];

const Hero = () => {
  return (
    <section className="hero" id="home">

      {/* Left Content */}

      <div className="hero-content">

        <div className="hero-badge">
          <span className="badge-dot"></span>
          The future starts here
        </div>


        <h1 className="hero-title">
          Build something
          <span> extraordinary.</span>
        </h1>


        <p className="hero-description">
          Create powerful digital experiences with modern technology,
          beautiful design, and intelligent solutions built for the future.
        </p>


       

      </div>


      {/* Right Side - 3D Model */}

      <div className="hero-model-container">

        <div className="model-glow"></div>

        <HeroModel />

      </div>


      {/* Marquee ribbon */}

      <div className="hero-marquee">

        <div className="hero-marquee-track">

          {[0, 1].map((copy) => (

            <div
              className="hero-marquee-group"
              key={copy}
              aria-hidden={copy === 1}
            >

              {MARQUEE_WORDS.map((word) => (

                <span className="hero-marquee-item" key={word}>

                  {word}

                  <span className="hero-marquee-dot"></span>

                </span>

              ))}

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Hero;
