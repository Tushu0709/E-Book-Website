import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Facebook, Twitter, Instagram } from "lucide-react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { Button } from "@/components/ui/button";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });



const handleSubmit = async (e) => {
  e.preventDefault();
  if (!formData.name || !formData.email || !formData.message) {
    setError("Please fill out all fields.");
    return;
  }

  setError("");
  try {
    const response = await fetch("http://localhost:5000/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } else {
      setError("Failed to send message. Try again later.");
    }
  } catch (err) {
    setError("An error occurred. Please try again.");
    console.error(err);
  }
};



  return (
    <>
      <Navigation />

      <section className="bg-[#fffaf0] min-h-screen py-28 px-6 text-[#3e2c23]">
        <div className="max-w-5xl mx-auto">
          <motion.h1
            className="text-4xl font-bold text-center mb-6"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            Contact Us 📚
          </motion.h1>

         

          {/* Divider */}
          <div className="h-[2px] bg-gradient-to-r from-[#f97316] via-[#fcd34d] to-[#f97316] rounded-full mb-12" />

          <motion.div
            className="grid md:grid-cols-2 gap-12"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            custom={2}
          >
            {/* Contact Info + Map + Social */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Mail className="text-[#F97316]" />
                  <div>
                    <h3 className="font-semibold text-lg">Email</h3>
                    <p className="text-[#6b4c3b]">support@BookHaven.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="text-[#F97316]" />
                  <div>
                    <h3 className="font-semibold text-lg">Phone</h3>
                    <p className="text-[#6b4c3b]">+91 9872X XXXXX </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="text-[#F97316]" />
                  <div>
                    <h3 className="font-semibold text-lg">Location</h3>
                    <p className="text-[#6b4c3b]">123 Book Street, India</p>
                  </div>
                </div>
              </div>

              {/* Google Map */}
              <div className="rounded-lg overflow-hidden border border-[#F97316]/20 shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.006807755285!2d78.48667127599024!3d17.40248940105598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI0JzA5LjAiTiA3OMKwMjknMTUuOSJF!5e0!3m2!1sen!2sin!4v1614921725221"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  loading="lazy"
                  title="Map Location"
                ></iframe>
              </div>

              {/* Social Icons */}
              <div className="flex gap-4 pt-4">
                <a href="https://www.facebook.com/" target="_blank">
                  <Facebook className="text-[#3b5998] hover:scale-110 transition" />
                </a>
                <a href="https://x.com/" target="_blank">
                  <Twitter className="text-[#1da1f2] hover:scale-110 transition" />
                </a>
                <a href="https://www.instagram.com/accounts/login/" target="_blank">
                  <Instagram className="text-[#e1306c] hover:scale-110 transition" />
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-lg p-6 shadow-md border border-[#fcd34d]/40 space-y-5"
            >
              <div>
                <label className="block text-sm font-semibold mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-md border border-[#F97316]/30 focus:outline-none focus:ring-2 focus:ring-[#F97316]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-md border border-[#F97316]/30 focus:outline-none focus:ring-2 focus:ring-[#F97316]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-md border border-[#F97316]/30 focus:outline-none focus:ring-2 focus:ring-[#F97316]"
                ></textarea>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <Button
                type="submit"
                className="w-full bg-[#F97316] text-white hover:bg-[#ea6a0c] transition duration-300"
              >
                <Send className="h-4 w-4 mr-2" /> Send Message
              </Button>

              {submitted && (
                <p className="text-green-600 text-sm text-center pt-2">
                  Thank you! We'll get back to you shortly.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contact;
