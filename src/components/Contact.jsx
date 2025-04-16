"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Send,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Twitter,
} from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import emailjs from "@emailjs/browser";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Validation schema for form
const Schema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  message: Yup.string().required("Message is required"),
});

export default function Contact() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const form = useRef();

  // Setup animations
  useEffect(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        toggleActions: "play none none reverse",
      },
    });

    timeline.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    timeline.fromTo(
      contentRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    );

    // Clean up
    return () => {
      timeline.kill();
    };
  }, []);

  // Form fields animation sequence
  const formFieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  // Formik setup
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    isSubmitting,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: Schema,
    onSubmit: async (values, action) => {
      try {
        // Send email using EmailJS
        await emailjs.sendForm(
          process.env.NEXT_PUBLIC_EMAIL_KEY,
          "template_hr64q6m",
          form.current,
          "pLJS6d0WCzJXu3_og"
        );
        action.resetForm();
      } catch (error) {
      }
    },
  });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen w-full lg:w-3/4 !pt-20 pb-10 px-4 md:px-12 relative"
    >
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 border border-purple-500/30 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 border border-cyan-300/40 rounded-full animate-pulse"></div>
      <div className="absolute -top-20 right-1/4 w-80 h-80 bg-cyan-500/30 rounded-full blur-3xl"></div>

      {/* Section header */}
      <div className="mb-6 relative z-10">
        <div ref={titleRef} className="opacity-0">
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            Get In Touch
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full my-4"></div>
          <p className="text-lg text-gray-300">
            Have a project in mind or just want to connect? Feel free to reach
            out.
          </p>
        </div>
      </div>

      {/* Single box with form and contact info */}
      <div className="relative z-10">
        <div
          ref={contentRef}
          className="opacity-0 bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-8"
        >
          {/* Form Section */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-white mb-4">
              Send Me a Message
            </h3>
            <form ref={form} onSubmit={handleSubmit} className="space-y-4">
              {/* Name and Subject */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  custom={0}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={formFieldVariants}
                >
                  <label htmlFor="name" className="block text-gray-300 mb-1">
                    Your Name <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="John Doe"
                    className={`w-full px-3 py-2 bg-white/5 border ${
                      errors.name && touched.name
                        ? "border-red-400"
                        : "border-white/10"
                    } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all`}
                    required
                  />
                  {errors.name && touched.name && (
                    <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                  )}
                </motion.div>
                <motion.div
                  custom={1}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={formFieldVariants}
                >
                  <label htmlFor="subject" className="block text-gray-300 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={values.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Project inquiry"
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                  />
                </motion.div>
              </div>

              {/* Message in its own row */}
              <motion.div
                custom={2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={formFieldVariants}
              >
                <label htmlFor="message" className="block text-gray-300 mb-1">
                  Message <span className="text-cyan-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Hello Yash, I'd like to discuss..."
                  rows={5}
                  className={`w-full px-3 py-2 bg-white/5 border ${
                    errors.message && touched.message
                      ? "border-red-400"
                      : "border-white/10"
                  } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all resize-none`}
                  required
                />
                {errors.message && touched.message && (
                  <p className="text-red-400 text-xs mt-1">{errors.message}</p>
                )}
              </motion.div>

              {/* Email and Submit Button in one row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  custom={3}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={formFieldVariants}
                >
                  <label htmlFor="email" className="block text-gray-300 mb-1">
                    Your Email <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="john@example.com"
                    className={`w-full px-3 py-2 bg-white/5 border ${
                      errors.email && touched.email
                        ? "border-red-400"
                        : "border-white/10"
                    } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all`}
                    required
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                  )}
                </motion.div>

                <motion.div
                  custom={4}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={formFieldVariants}
                  className="flex items-end" // Aligns the button to the bottom to match the email input height
                >
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-medium py-2 px-6 rounded-lg transition-all flex items-center justify-center space-x-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                    {!isSubmitting && (
                      <Send
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    )}
                    {isSubmitting && (
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    )}
                  </motion.button>
                </motion.div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
