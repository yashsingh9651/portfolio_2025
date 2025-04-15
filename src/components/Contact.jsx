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
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
export default function Contact() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formState, setFormState] = useState({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  });
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
  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormState({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        errorMessage: "Please fill out all required fields.",
      });
      return;
    }

    // Set submitting state
    setFormState({
      isSubmitting: true,
      isSuccess: false,
      isError: false,
      errorMessage: "",
    });

    // Simulate form submission (replace with actual API call)
    try {
      // Fake API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success state
      setFormState({
        isSubmitting: false,
        isSuccess: true,
        isError: false,
        errorMessage: "",
      });

      // Reset form after success
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormState((prev) => ({ ...prev, isSuccess: false }));
      }, 5000);
    } catch (error) {
      // Error state
      setFormState({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        errorMessage: "Something went wrong. Please try again later.",
      });
    }
  };
  // Hover effect for social icons
  const iconVariants = {
    hover: {
      y: -5,
      color: "#22d3ee", // cyan-400
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen w-3/4 p-8 md:p-12 !pt-20 relative"
    >
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 border border-purple-500/30 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 border border-cyan-300/40 rounded-full animate-pulse"></div>
      <div className="absolute -top-20 right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl"></div>
      {/* Section header */}
      <div className="mb-10 relative z-10">
        <div ref={titleRef} className="opacity-0">
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
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
            <form onSubmit={handleSubmit} className="space-y-4">
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
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                    required
                  />
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
                    value={formData.subject}
                    onChange={handleChange}
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
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Hello Yash, I'd like to discuss..."
                  rows={5}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all resize-none"
                  required
                />
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
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                    required
                  />
                </motion.div>

                <motion.div
                  custom={4}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={formFieldVariants}
                  className="flex items-end"
                >
                  <motion.button
                    type="submit"
                    disabled={formState.isSubmitting}
                    className="w-full bg-gradient-to-r cursor-pointer from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-medium py-2 px-6 rounded-lg transition-all flex items-center justify-center space-x-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>
                      {formState.isSubmitting ? "Sending..." : "Send Message"}
                    </span>
                    {!formState.isSubmitting && (
                      <Send
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    )}
                    {formState.isSubmitting && (
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

              {/* Error message */}
              {formState.isError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg"
                >
                  <p className="text-red-400 text-sm">
                    {formState.errorMessage}
                  </p>
                </motion.div>
              )}

              {/* Success message */}
              {formState.isSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg"
                >
                  <p className="text-green-400 text-sm">
                    Your message has been sent successfully! I'll get back to
                    you soon.
                  </p>
                </motion.div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
