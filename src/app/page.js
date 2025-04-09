"use client";
import { useRef, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Geist_Mono, Space_Mono } from "next/font/google";
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
// Character model component
function Character({ triggerAnimation }) {
  const group = useRef();
  const mixerRef = useRef(null);
  const defaultActionRef = useRef(null);
  const specialActionRef = useRef(null);
  console.log(
    "Memory usage before model load:",
    performance.memory
      ? Math.round(performance.memory.usedJSHeapSize / 1024 / 1024) + "MB"
      : "Not available"
  );
  const { scene, animations } = useGLTF("/man3.glb");
  console.log(
    "Memory usage after model load:",
    performance.memory
      ? Math.round(performance.memory.usedJSHeapSize / 1024 / 1024) + "MB"
      : "Not available"
  );
  console.log("Animations:", animations);

  // Initialize the mixer and actions once
  useEffect(() => {
    mixerRef.current = new THREE.AnimationMixer(scene);

    // Default animation (looping)
    defaultActionRef.current = mixerRef.current.clipAction(animations[0]); // Using index 1 for default animation
    defaultActionRef.current.loop = THREE.LoopRepeat;
    defaultActionRef.current.play();

    // Special animation (plays once when button is clicked)
    specialActionRef.current = mixerRef.current.clipAction(animations[3]); // Using index 0 for special animation
    specialActionRef.current.loop = THREE.LoopOnce;
    specialActionRef.current.clampWhenFinished = false;

    // Clean up
    return () => {
      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
      }
    };
  }, [scene, animations]);

  // Play special animation when triggerAnimation changes
  useEffect(() => {
    if (
      triggerAnimation &&
      specialActionRef.current &&
      defaultActionRef.current &&
      mixerRef.current
    ) {
      // Fade out default animation
      defaultActionRef.current.fadeOut(0.5);

      // Reset and play the special animation
      specialActionRef.current.reset();
      specialActionRef.current.fadeIn(0.5);
      specialActionRef.current.play();

      // When special animation finishes, return to default animation
      mixerRef.current.addEventListener("finished", function onFinished(e) {
        if (e.action === specialActionRef.current) {
          // Fade out special animation
          specialActionRef.current.fadeOut(0.5);
          // Fade in default animation
          defaultActionRef.current.reset();
          // defaultActionRef.current.fadeIn(0.5);
          defaultActionRef.current.play();
          // Remove the event listener to avoid multiple calls
          mixerRef.current.removeEventListener("finished", onFinished);
        }
      });
    }
  }, [triggerAnimation]);

  useFrame((state, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
  });

  return (
    <group ref={group} position={[0, -0.5, 0]}>
      <primitive object={scene} scale={1.5} position={[0, -1, 0]} />
    </group>
  );
}

// Loader component
function Loader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black text-white">
      <p className="text-xl">Loading 3D Character...</p>
    </div>
  );
}
export default function Home() {
  const [animationCount, setAnimationCount] = useState(0);
  const handleAnimationClick = () => {
    setAnimationCount((prev) => prev + 1); // Increment to trigger animation
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      // Set isScrolled to true if scrolled more than 50 pixels
      setIsScrolled(window.scrollY > 50);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    {
      name: "Home",
      href: "#",
    },
    {
      name: "Projects",
      href: "#project",
    },
    {
      name: "About",
      href: "#about",
    },
    {
      name: "Contact",
      href: "#contact",
    },
  ];

  return (
    <div className={`relative min-h-screen w-full overflow-x-hidden`}>
      {/* Neon gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(67,22,219,0.15),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(0,236,181,0.1),transparent_50%)] pointer-events-none"></div>
      {/* Glow effects */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-cyan-500 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-purple-600 rounded-full opacity-20 blur-3xl"></div>
      {/* Navbar */}
      <nav
        className={`
          fixed top-0 flex p-5 w-full z-50 transition-all duration-300 ${
            isScrolled
              ? "bg-black/30 backdrop-blur-md border-b border-cyan-500/20"
              : "bg-transparent"
          }
        `}
      >
        <div className="w-full hidden md:flex bg-transparent justify-between items-center uppercase z-30">
          <h1
            className={`text-nowrap text-white font-bold ${
              isScrolled ? "block" : "hidden"
            } duration-200 ease-in-out`}
          >
            <span className="text-cyan-400">Yash</span> Singh
          </h1>
          <div className="w-full flex justify-end gap-5 uppercase">
            {navItems.map((item, i) => (
              <div key={i} onClick={handleAnimationClick}>
                <Link
                  key={i}
                  href={item.href}
                  className="relative font-montserrat text-white text-md xl:text-lg transition-colors duration-300
                   after:content-[''] after:absolute after:left-0 after:bottom-0
                   after:h-[2.5px] after:bg-cyan-400 after:transform-gpu after:w-0 hover:after:w-full
                   after:transition-all after:duration-300 hover:text-cyan-400"
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
        {/* Mobile Hamburger Menu */}
        <div className="md:hidden flex w-full items-center justify-between p-2">
          <Image
            src={"/logo.svg"}
            width={20}
            height={80}
            alt="logo"
            className={`${
              isScrolled ? "block" : "hidden"
            } duration-200 ease-in-out`}
          />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none ml-auto"
          >
            <Menu className="text-lg text-white cursor-pointer hover:text-cyan-400" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden font-montserrat fixed top-20 left-0 right-0 bg-black/50 p-4 z-40 backdrop-blur-md border border-cyan-500/20">
          <div className="flex flex-col space-y-4">
            {navItems.map((navItem, idx) => (
              <Link
                key={idx}
                href={navItem.href}
                className="px-4 py-2 text-sm font-medium transition-all text-white hover:text-cyan-400 hover:bg-white/5 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                {navItem.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 3D Canvas */}
      <div className="fixed top-0 right-0 h-screen w-1/4 z-0 bg-transparent">
        <Canvas camera={{ position: [1, 0, 5], fov: 45 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <spotLight
              position={[10, 10, 10]}
              angle={0.15}
              penumbra={1}
              intensity={1}
            />
            <pointLight position={[-10, -10, -10]} />
            <Character triggerAnimation={animationCount} />
            <Environment preset="city" />
            <OrbitControls enableZoom={true} />
          </Suspense>
        </Canvas>
      </div>

      {/* Main content sections */}
      {/* Hero Section */}
      <div className="h-screen w-3/4 flex flex-col justify-center items-start p-12 z-10 relative">
        {/* Background elements */}
        <div className="absolute top-1/3 -left-10 w-32 h-32 border border-cyan-500/40 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-24 h-24 border-2 border-purple-500/20 rounded-full animate-ping opacity-80"></div>
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
        {/* Animated typing indicator */}
        <div className="mb-1 flex items-center">
          <span className="h-3 w-3 rounded-full bg-cyan-400 mr-2 animate-pulse"></span>
          <span className="text-sm text-cyan-400 font-mono">
            Online & Available for Work
          </span>
        </div>
        {/* Main content */}
        <div className="relative">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              Hi, I'm Yash Singh
            </span>
          </h1>
          {/* Secondary title - faded and larger */}
          <h2 className="text-5xl md:text-6xl font-extrabold text-white/10 mb-6">
            Full Stack Web Developer
          </h2>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-xl border-l-2 border-cyan-500/50 pl-4">
            I craft responsive websites and applications with modern
            technologies, specializing in interactive 3D experiences that merge
            creativity with technical excellence.
          </p>
          {/* Buttons with improved styling */}
          <div className="flex flex-wrap gap-4">
            <a
              href="/Yash_Singh_CV.pdf"
              download
              className="group px-6 py-3 bg-transparent text-cyan-400 border border-cyan-500/50 rounded-lg hover:bg-cyan-950/30 transition-all flex items-center gap-2"
            >
              <span>Download CV</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 group-hover:translate-y-1 transition-transform"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="#project"
              className="px-6 py-3 bg-white/5 backdrop-blur-sm text-white hover:text-cyan-400 rounded-lg hover:bg-white/10 transition-all"
            >
              View Projects
            </a>
          </div>
        </div>
        {/* Banner */}
        <div className="w-screen font-playfair font-semibold opacity-80 select-none absolute bottom-0 left-0 flex text-5xl justify-around p-10">
          <span
            className="text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5"
            style={{ textShadow: "0 1px 1px rgba(0,255,255,0.1)" }}
          >
            FULLSTACK
          </span>
          <span
            className="text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5"
            style={{ textShadow: "0 1px 1px rgba(168,85,247,0.1)" }}
          >
            MERN
          </span>
          <span
            className="text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5"
            style={{ textShadow: "0 1px 1px rgba(0,255,255,0.1)" }}
          >
            FRONTEND
          </span>
          <span
            className="text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5"
            style={{ textShadow: "0 1px 1px rgba(168,85,247,0.1)" }}
          >
            BACKEND
          </span>
        </div>
      </div>

      {/* About Section */}
      <div
        id="about"
        className="h-screen w-3/4 flex flex-col justify-center items-start p-12 z-10"
      >
        <div className="max-w-2xl">
          <h2 className="text-4xl font-bold text-white mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              About Me
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            I'm a full-stack developer with a passion for creating beautiful,
            functional, and user-friendly websites and applications. Specialized
            in React, Next.js, and Three.js for creating immersive 3D
            experiences on the web.
          </p>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/5 p-6 rounded-lg border border-cyan-500/20 backdrop-blur-sm hover:bg-white/10 transition-all">
              <h3 className="text-xl font-bold text-cyan-400 mb-2">Frontend</h3>
              <p className="text-gray-300">
                React, Next.js, Three.js, TailwindCSS
              </p>
            </div>
            <div className="bg-white/5 p-6 rounded-lg border border-purple-500/20 backdrop-blur-sm hover:bg-white/10 transition-all">
              <h3 className="text-xl font-bold text-purple-400 mb-2">
                Backend
              </h3>
              <p className="text-gray-300">
                Node.js, Express, MongoDB, Firebase
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Project section placeholder */}
      <div id="project" className="min-h-screen w-3/4 p-12 z-10">
        {/* Add your project content here */}
      </div>
    </div>
  );
}
