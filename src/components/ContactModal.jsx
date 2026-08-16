import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  X,
  Send,
  User,
  Mail,
  MessageSquare,
  Sparkles,
  CheckCircle2
} from "lucide-react";

import "../styles/contact-modal.css";


const ContactModal = ({ onClose }) => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);


  // =========================================
  // HANDLE INPUT
  // =========================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

  };


  // =========================================
  // SUBMIT
  // =========================================

  const handleSubmit = (e) => {

    e.preventDefault();

    console.log("Contact Form:", formData);

    setSubmitted(true);

  };


  return (

    <div className="contact-overlay">

      {/* Background particles */}

      <div className="contact-particle particle-one"></div>
      <div className="contact-particle particle-two"></div>
      <div className="contact-particle particle-three"></div>
      <div className="contact-particle particle-four"></div>


      {/* Modal */}

      <div className="contact-modal">

        {/* Glow */}

        <div className="contact-modal-glow"></div>


        {/* Close */}

        <button
          className="contact-close"
          onClick={() => navigate("/")}
        >
          <X size={20} />
        </button>


        {!submitted ? (

          <>

            {/* Header */}

            <div className="contact-header">

              <div className="contact-icon">
                <Sparkles size={22} />
              </div>

              <span className="contact-small-title">
                LET'S CONNECT
              </span>

              <h2>
                Let's build something
                <span> amazing.</span>
              </h2>

              <p>
                Have a project, idea, or just want to
                say hello? Drop us a message.
              </p>

            </div>


            {/* Form */}

            <form
              className="contact-form"
              onSubmit={handleSubmit}
            >

              {/* NAME */}

              <div className="contact-field">

                <label>
                  Your name
                </label>

                <div className="input-wrapper">

                  <User size={18} />

                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>


              {/* EMAIL */}

              <div className="contact-field">

                <label>
                  Email address
                </label>

                <div className="input-wrapper">

                  <Mail size={18} />

                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>


              {/* MESSAGE */}

              <div className="contact-field">

                <label>
                  Tell us about your idea
                </label>

                <div className="input-wrapper textarea-wrapper">

                  <MessageSquare size={18} />

                  <textarea
                    name="message"
                    placeholder="I'd like to build..."
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    required
                  />

                </div>

              </div>


              {/* SEND */}

              <button
                type="submit"
                className="contact-submit"
              >

                <span>
                  Send message
                </span>

                <Send size={18} />

              </button>

            </form>

          </>

        ) : (

          /* SUCCESS */

          <div className="contact-success">

            <div className="success-icon">
              <CheckCircle2 size={45} />
            </div>

            <h2>
              Message sent!
            </h2>

            <p>
              Thanks for reaching out.
              We'll get back to you soon.
            </p>

            <button
              className="success-button"
              onClick={() => navigate("/")}
            >
              Done
            </button>

          </div>

        )}

      </div>

    </div>

  );

};


export default ContactModal;