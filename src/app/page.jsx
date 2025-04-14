"use client";
import { useRef, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Geist_Mono, Space_Mono } from "next/font/google";
import AboutSection from "@/components/About";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin);
}

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
function Character({ triggerAnimation, initialAnimation = false, castShadow }) {
  const group = useRef();
  const mixerRef = useRef(null);
  const defaultActionRef = useRef(null);
  const specialActionRef = useRef(null);
  const jumpActionRef = useRef(null);
  const { scene, animations } = useGLTF("/man3.glb");

  // Apply castShadow to all meshes in the model
  useEffect(() => {
    if (castShadow) {
      scene.traverse((object) => {
        if (object.isMesh) {
          object.castShadow = true;
        }
      });
    }
  }, [scene, castShadow]);

  // Initialize the mixer and actions once
  useEffect(() => {
    mixerRef.current = new THREE.AnimationMixer(scene);
    defaultActionRef.current = mixerRef.current.clipAction(animations[0]); // Idle animation
    defaultActionRef.current.loop = THREE.LoopRepeat;
    // Special animation (plays once when button is clicked)
    specialActionRef.current = mixerRef.current.clipAction(animations[3]); // Another animation
    specialActionRef.current.loop = THREE.LoopOnce;
    specialActionRef.current.clampWhenFinished = false;
    // Jump animation for initial page load
    jumpActionRef.current = mixerRef.current.clipAction(animations[3]);
    jumpActionRef.current.loop = THREE.LoopOnce;
    jumpActionRef.current.clampWhenFinished = true;
    if (initialAnimation) {
      jumpActionRef.current.play();
      // Switch to default animation when jump finishes
      mixerRef.current.addEventListener(
        "finished",
        function onInitialFinished(e) {
          if (e.action === jumpActionRef.current) {
            jumpActionRef.current.fadeOut(0.5);
            defaultActionRef.current.reset();
            defaultActionRef.current.fadeIn(0.5);
            defaultActionRef.current.play();
            mixerRef.current.removeEventListener("finished", onInitialFinished);
          }
        }
      );
    } else {
      defaultActionRef.current.play();
    }
    // Clean up
    return () => {
      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
      }
    };
  }, [scene, animations, initialAnimation]);

  // Play special animation when triggerAnimation changes
  useEffect(() => {
    if (
      triggerAnimation &&
      specialActionRef.current &&
      defaultActionRef.current &&
      mixerRef.current
    ) {
      defaultActionRef.current.fadeOut(0.5);
      specialActionRef.current.reset();
      specialActionRef.current.fadeIn(0.5);
      specialActionRef.current.play();
      mixerRef.current.addEventListener("finished", function onFinished(e) {
        if (e.action === specialActionRef.current) {
          // Fade out special animation
          specialActionRef.current.fadeOut(0.5);
          // Fade in default animation
          defaultActionRef.current.reset();
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

// Loading Screen Component
function LoadingScreen({ progress, finishLoading }) {
  const loadingBarRef = useRef(null);
  const loadingTextRef = useRef(null);
  const loadingContainerRef = useRef(null);

  useEffect(() => {
    // Animate loading progress
    gsap.to(loadingBarRef.current, {
      width: `${progress}%`,
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(loadingTextRef.current, {
      innerHTML: `${Math.round(progress)}%`,
      duration: 0.1,
      snap: { innerHTML: 1 },
    });

    if (progress >= 100) {
      // Short delay before removing loading screen
      const timeout = setTimeout(() => {
        gsap.to(loadingContainerRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
          onComplete: finishLoading,
        });
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [progress, finishLoading]);

  return (
    <div
      ref={loadingContainerRef}
      className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center"
    >
      <div className="w-full max-w-md px-8 flex flex-col items-center">
        <div className="w-32 h-32 mb-12">
          {/* Animated logo or spinner */}
          <div className="w-32 h-32 border-4 border-cyan-500/50 border-t-cyan-400 rounded-full animate-spin"></div>
        </div>

        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-8">
          Loading Experience
        </h2>

        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-2">
          <div
            ref={loadingBarRef}
            className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
            style={{ width: "0%" }}
          ></div>
        </div>

        <div className="flex justify-between w-full">
          <span className="text-cyan-400 font-mono text-sm">Yash Singh</span>
          <span
            ref={loadingTextRef}
            className="text-white/80 font-mono text-sm"
          >
            0%
          </span>
        </div>

        <div className="mt-16 text-white/50 font-mono text-xs flex flex-wrap justify-center gap-4">
          <span>Next.js</span>
          <span>•</span>
          <span>Three.js</span>
          <span>•</span>
          <span>GSAP</span>
          <span>•</span>
          <span>MongoDB</span>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full py-4 text-center text-white/30 text-xs font-mono">
        Full Stack Web Developer
      </div>
    </div>
  );
}

export default function Home() {
  const [animationCount, setAnimationCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [initialAnimationPlayed, setInitialAnimationPlayed] = useState(false);
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);
  const statusIndicatorRef = useRef(null);
  const bannerRef = useRef(null);
  const navRef = useRef(null);
  const bgEffectsRef = useRef(null);
  
  // Smooth scrolling function
  const scrollToSection = (sectionId) => {
    // Special case for home page (top of the page)
    if (sectionId === "" || sectionId === "home") {
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: 0,
        },
        ease: "power3.inOut",
      });
      return;
    }
    
    const section = document.getElementById(sectionId);
    if (section) {
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: section,
          offsetY: 0,
        },
        ease: "power3.inOut",
      });
    }
  };

  // Simulate loading progress
  useEffect(() => {
    if (loading && loadingProgress < 100) {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          const increment = Math.random() * 15;
          const newProgress = Math.min(prev + increment, 100);
          return newProgress;
        });
      }, 150);
      return () => clearInterval(interval);
    }
  }, [loading, loadingProgress]);
  
  const finishLoading = () => {
    setLoading(false);
    setInitialAnimationPlayed(true);
    setTimeout(() => {
      startContentAnimations();
    }, 150);
  };

  // Content animations
  const startContentAnimations = () => {
    gsap.set(
      [
        navRef.current,
        bgEffectsRef.current,
        statusIndicatorRef.current,
        titleRef.current,
        subtitleRef.current,
        descriptionRef.current,
        buttonsRef.current,
        bannerRef.current,
      ],
      {
        opacity: 0,
        y: 20,
      }
    );
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });
    tl.to(navRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: 0.6,
    });
    tl.to(
      bgEffectsRef.current,
      {
        opacity: 1,
        duration: 1,
        stagger: 0.1,
      },
      "-=0.3"
    );
    tl.to(
      statusIndicatorRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
      },
      "-=0.8"
    );
    tl.to(
      titleRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
      },
      "-=0.4"
    );
    tl.to(
      subtitleRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
      },
      "-=0.6"
    );
    tl.to(
      descriptionRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
      },
      "-=0.6"
    );
    tl.to(
      buttonsRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
      },
      "-=0.6"
    );
    tl.to(
      bannerRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
      },
      "-=0.6"
    );
  };
  
  // Setup smooth scrolling for all anchor links
  useEffect(() => {
    // Handle anchor links
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a');
      if (!target) return;
      
      const href = target.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      
      // Prevent default behavior
      e.preventDefault();
      
      // Extract section ID and scroll
      const sectionId = href.substring(1);
      scrollToSection(sectionId);
      setAnimationCount(prev => prev + 1); // Trigger character animation on navigation
    };
    
    // Add event listener to document
    document.addEventListener('click', handleAnchorClick);
    
    // Cleanup
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);
  
  const handleAnimationClick = () => {
    setAnimationCount((prev) => prev + 1); // Increment to trigger animation
  };
  
  // Navbar state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  const navItems = [
    {
      name: "Home",
      href: "#home", // Changed from "#" to "#home" for consistency
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
  
  // Download CV function
  const handleDownload = async () => {
    try {
      const link = document.createElement("a");
      link.href = "/cv.pdf";
      link.setAttribute("download", "Yash_Singh_CV.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading CV:", error);
    }
  };
  
  return (
    <>
      {loading && (
        <LoadingScreen
          progress={loadingProgress}
          finishLoading={finishLoading}
        />
      )}

      <div
        className={`relative min-h-screen !scroll-smooth w-full overflow-x-hidden ${
          loading ? "opacity-0" : "opacity-100 transition-opacity duration-500"
        }`}
      >
        {/* Neon gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(67,22,219,0.15),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(0,236,181,0.1),transparent_50%)] pointer-events-none"></div>

        {/* Glow effects */}
        <div ref={bgEffectsRef} className="opacity-0">
          <div className="absolute top-1/4 -left-20 w-72 h-72 bg-cyan-500 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-purple-600 rounded-full opacity-20 blur-3xl"></div>
        </div>

        {/* Navbar */}
        <nav
          ref={navRef}
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
                <div key={i}>
                  <a
                    href={item.href}
                    className="relative font-montserrat text-white text-md xl:text-lg transition-colors duration-300
                     after:content-[''] after:absolute after:left-0 after:bottom-0
                     after:h-[2.5px] after:bg-cyan-400 after:transform-gpu after:w-0 hover:after:w-full
                     after:transition-all after:duration-300 hover:text-cyan-400"
                    onClick={(e) => {
                      e.preventDefault();
                      const sectionId = item.href.substring(1);
                      scrollToSection(sectionId);
                      handleAnimationClick();
                    }}
                  >
                    {item.name}
                  </a>
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
                <a
                  key={idx}
                  href={navItem.href}
                  className="px-4 py-2 text-sm font-medium transition-all text-white hover:text-cyan-400 hover:bg-white/5 rounded-md"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    const sectionId = navItem.href.substring(1);
                    scrollToSection(sectionId);
                    handleAnimationClick();
                  }}
                >
                  {navItem.name}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* 3D Canvas */}
        <div className="fixed top-0 right-0 h-screen w-1/4 z-0 bg-transparent">
          <Canvas camera={{ position: [1, 0, 5], fov: 45 }} shadows>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <spotLight
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={1}
                intensity={1}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-bias={-0.0001}
              />
              <pointLight position={[-10, -10, -10]} />
              <Character
                triggerAnimation={animationCount}
                initialAnimation={initialAnimationPlayed}
                castShadow
              />

              {/* Shadow-receiving circular plane beneath the character */}
              <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -1.5, 0]}
                receiveShadow
              >
                <circleGeometry args={[2, 32]} />
                <shadowMaterial transparent opacity={0.4} color="#000000" />
              </mesh>

              <Environment preset="city" />
              <OrbitControls enableZoom={true} />
            </Suspense>
          </Canvas>
        </div>

        {/* Main content sections */}
        {/* Hero Section */}
        <div
          id="home"
          ref={heroRef}
          className="h-screen w-3/4 flex flex-col justify-center items-start p-12 z-10 relative"
        >
          {/* Background elements */}
          <div className="absolute top-1/3 -left-10 w-32 h-32 border border-cyan-500/40 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/3 w-24 h-24 border-2 border-purple-500/20 rounded-full animate-ping opacity-80"></div>
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>

          {/* Animated typing indicator */}
          <div
            ref={statusIndicatorRef}
            className="mb-1 flex items-center opacity-0"
          >
            <span className="h-3 w-3 rounded-full bg-cyan-400 mr-2 animate-pulse"></span>
            <span className="text-sm text-cyan-400 font-mono">
              Online & Available for Work
            </span>
          </div>

          {/* Main content */}
          <div className="relative">
            <h1
              ref={titleRef}
              className="text-5xl md:text-6xl font-bold text-white mb-2 opacity-0"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Hi, I'm Yash Singh
              </span>
            </h1>

            {/* Secondary title - faded and larger */}
            <h2
              ref={subtitleRef}
              className="text-5xl md:text-6xl font-extrabold text-white/10 mb-6 opacity-0"
            >
              Full Stack Web Developer
            </h2>

            <p
              ref={descriptionRef}
              className="text-lg text-gray-300 mb-8 leading-relaxed max-w-xl border-l-2 border-cyan-500/50 pl-4 opacity-0"
            >
              I craft responsive websites and applications with modern
              technologies, specializing in interactive 3D experiences that
              merge creativity with technical excellence.
            </p>

            {/* Buttons with improved styling */}
            <div ref={buttonsRef} className="flex flex-wrap gap-4 opacity-0">
              <button
                onClick={handleDownload}
                download
                className="group cursor-pointer download px-6 py-3 bg-transparent text-cyan-400 border border-cyan-500/50 rounded-lg hover:bg-cyan-950/30 transition-all flex items-center gap-2"
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
              </button>
              <a
                href="#project"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("project");
                  handleAnimationClick();
                }}
                className="px-6 py-3 bg-white/5 backdrop-blur-sm text-white hover:text-cyan-400 rounded-lg hover:bg-white/10 transition-all"
              >
                View Projects
              </a>
            </div>
          </div>

          {/* Banner */}
          <div
            ref={bannerRef}
            className="w-screen font-playfair font-semibold opacity-0 select-none absolute bottom-0 left-0 flex text-5xl justify-around p-10"
          >
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
        <AboutSection />

        {/* Project section placeholder */}
        <div id="project" className="min-h-screen w-3/4 p-12 z-10">
          {/* Add your project content here */}
        </div>

        {/* Contact section placeholder */}
        <div id="contact" className="min-h-screen w-3/4 p-12 z-10">
          {/* Add your contact content here */}
        </div>
      </div>
    </>
  );
}