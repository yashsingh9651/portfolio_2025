"use client";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Project data
const projects = [
  {
    id: 1,
    title: "Dexterix Official Website",
    description:
      "Official website for Dexterix Hackathon, built to handle registrations, showcase event details, and deliver a smooth user experience. Led the UI/UX design and frontend development.",
    technologies: ["React.js", "Tailwind CSS", "Gsap"],
    deployedUrl: "https://dexterix.technojam.in",
    githubUrl: "https://github.com/technojam/4.0",
    imageUrl: "/dexterix.mp4",
    color: "#0891b2", // cyan-600
  },
  {
    id: 2,
    title: "Inventory Management System",
    description:
      "A full-stack inventory management system to track stock levels, orders, and suppliers with real-time dashboard and role-based access control.",
    technologies: ["Next.js", "Node.js", "MongoDB", "Tailwind CSS","Sanity.io","nodemailer"],
    deployedUrl: "https://inventory.yashks.codes",
    githubUrl: "https://github.com/yashsingh9651/points_system",
    imageUrl: "/inventory.mp4",
    color: "#7e22ce", // purple-700
  },
  {
    id: 3,
    title: "SecureIPData",
    description:
      "A client project for an IP services provider offering secure handling of proofreading, PTA, COC, and expiration management. Designed and developed a responsive frontend for seamless client interaction.",
    technologies: ["Next.js", "Tailwind CSS", "Redux Toolkit", "Sanity.io"],
    deployedUrl: "https://secureipdata.com",
    githubUrl: "https://github.com/yashsingh9651",
    imageUrl: "/secureipdata.mp4",
    color: "#0891b2", // cyan-600
  },
];


export default function ProjectSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  // Setup animations on component mount
  useEffect(() => {
    setIsLoaded(true);

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

    return () => {
      timeline.kill();
    };
  }, []);

  // Handle navigation
  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  // Animation variants with fixed easing
  const cardVariants = {
    hidden: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  // Thumbnail animations with fixed easing
  const thumbnailVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: "easeOut", // Fixed easing
      },
    }),
  };

  // Progress bar component
  const ProgressBar = ({ active, total }) => {
    return (
      <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden my-4 md:my-8">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 to-purple-400"
          initial={{ width: `${(active / total) * 100}%` }}
          animate={{ width: `${((active + 1) / total) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
    );
  };

  return (
    <section
      id="project"
      ref={sectionRef}
      className="min-h-screen w-full lg:w-3/4 !pt-20 px-4 md:px-12 relative"
    >
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 border border-cyan-300/30 rounded-full animate-pulse"></div>
      <div className="absolute bottom-40 left-10 w-32 h-32 border border-purple-500/60 rounded-full animate-pulse"></div>
      <div className="absolute -bottom-20 right-1/4 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl"></div>

      {/* Section header */}
      <div className="mb-8 relative z-10">
        <div ref={titleRef} className="opacity-0">
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            Projects
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full my-4"></div>
          <p className="text-lg text-gray-300">
            Explore my latest work showcasing my skills and creative approach to
            problem-solving.
          </p>
        </div>
      </div>

      {/* Interactive Carousel */}
      <div className="relative z-30">
        {/* Progress indicator */}
        <div className="flex justify-between items-center md:mb-2">
          <div className="flex items-center space-x-2">
            <span className="h-3 w-3 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-sm text-cyan-400 font-mono">
              Project {activeIndex + 1}/{projects.length}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white cursor-pointer"
              aria-label="Previous project"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white cursor-pointer"
              aria-label="Next project"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        <ProgressBar active={activeIndex} total={projects.length} />
        {/* Main carousel */}
        <div
          ref={carouselRef}
          className="relative h-[620px] md:h-[450px] lg:h-[420px] rounded-xl backdrop-blur-sm bg-black/30 border border-white/10 overflow-hidden"
        >
          <AnimatePresence initial={false} mode="wait" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute inset-0 p-4 md:p-5"
            >
              <div className="h-full flex flex-col md:flex-row gap-4 md:gap-6">
                {/* Project image */}
                <div className="w-full md:w-1/2 relative aspect-[3/4] rounded-lg overflow-hidden bg-gradient-to-r from-cyan-900/30 to-purple-900/30">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Replace with actual images when available */}
                    <video src={projects[activeIndex].imageUrl} autoPlay={true} loop={true} className="relative object-cover h-full w-full">
                      {/* Animated border */}
                      <div className="absolute inset-0 z-10">
                        <div className="absolute top-0 right-0 w-[2px] h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent animate-pulse"></div>
                        <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent animate-pulse"></div>
                      </div>
                    </video>
                  </div>
                </div>
                {/* Project details */}
                <div className="w-full md:w-1/2 flex flex-col">
                  <h3 className="text-xl md:text-3xl font-bold text-white mb-4">
                    {projects[activeIndex].title}
                  </h3>

                  <p className="text-gray-300 mb-6 flex-grow">
                    {projects[activeIndex].description}
                  </p>

                  <div className="mb-6 flex flex-wrap gap-2">
                    {projects[activeIndex].technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="inline-block bg-white/5 text-cyan-300 px-3 py-1 text-sm rounded-full border border-cyan-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <a
                      href={projects[activeIndex].deployedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg hover:from-cyan-600 hover:to-cyan-700 transition-all"
                    >
                      <span>Live Demo</span>
                      <ExternalLink
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </a>
                    <a
                      href={projects[activeIndex].githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm text-white rounded-lg hover:bg-white/10 transition-all"
                    >
                      <span>View Code</span>
                      <Github size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
