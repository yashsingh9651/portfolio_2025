import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(useGSAP);

const AboutSection = () => {
  gsap.registerPlugin(ScrollTrigger);
  const container = useRef();

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.from(".heading", {
        y: 50,
        opacity: 0,
        scrollTrigger: {
          trigger: ".heading",
          start: "20% 80%",
          end: "top 30%",
          scrub: true,
        },
      })
        .from(".describe", {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.4,
          scrollTrigger: {
            trigger: ".describe",
            start: "20% 80%",
            end: "top 35%",
            scrub: true,
          },
        })
        .from(".skill", {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger:.5,
          scrollTrigger: {
            trigger: ".skill",
            start: "20% 80%",
            end: "top 30%",
            scrub: true,
          },
        });
    },
    { scope: container }
  );

  return (
    <div
      id="about"
      ref={container}
      className="min-h-screen w-full lg:w-3/4 pt-20 px-4 md:px-12 relative"
    >
      {/* Background elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 -left-20 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl"></div>

      <h2 className="heading text-3xl md:text-4xl font-bold text-white mb-4">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
          About Me
        </span>
        <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full my-4"></div>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left column - Description, Expertise & Approach */}
        <div className="describe space-y-4">
          <p className="text-lg text-gray-300 leading-relaxed">
            As a dedicated Full Stack JavaScript Developer, I specialize in
            crafting modern, responsive web applications using Next.js and
            Three.js on the frontend with Node.js backends, focusing on creating
            seamless interfaces that deliver exceptional user experiences
            through technical expertise and creative vision.
          </p>

          {/* Expertise - Now on the left below about info */}
          <div className="describe">
            <h3 className="text-xl font-medium text-white/90 my-4">
              My Expertise
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/5 p-5 rounded-lg border border-cyan-500/20 backdrop-blur-sm hover:bg-white/10 transition-all">
                <h4 className="text-lg font-bold text-cyan-400 mb-2">
                  Frontend
                </h4>
                <p className="text-gray-300 text-sm">
                  React, Next.js, Three.js, TailwindCSS, Animation libraries,
                  Responsive design
                </p>
              </div>
              <div className="bg-white/5 p-5 rounded-lg border border-purple-500/20 backdrop-blur-sm hover:bg-white/10 transition-all">
                <h4 className="text-lg font-bold text-purple-400 mb-2">
                  Backend
                </h4>
                <p className="text-gray-300 text-sm">
                  Node.js, Express, MongoDB, Firebase, REST APIs, Authentication
                  systems
                </p>
              </div>
            </div>
          </div>

          {/* My Approach - Now on the left below expertise */}
          <div className="describe">
            <h3 className="text-xl font-medium text-white/90 mb-4">
              My Approach
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/5 p-5 rounded-lg border border-cyan-500/20 backdrop-blur-sm hover:bg-white/10 transition-all">
                <h4 className="text-lg font-bold text-cyan-400 mb-2">
                  User-Centered
                </h4>
                <p className="text-gray-300 text-sm">
                  Prioritizing intuitive interfaces and seamless user
                  experiences
                </p>
              </div>
              <div className="bg-white/5 p-5 rounded-lg border border-purple-500/20 backdrop-blur-sm hover:bg-white/10 transition-all">
                <h4 className="text-lg font-bold text-purple-400 mb-2">
                  Performance-Driven
                </h4>
                <p className="text-gray-300 text-sm">
                  Creating fast, optimized applications that scale effectively
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Only Technical Proficiency */}
        <div className="space-y-4">
          <h3 className="text-2xl skill font-medium text-white/90">
            Technical Proficiency
          </h3>
          <div className="space-y-3">
            <div className="space-y-2">
              <h4 className="text-lg skill font-semibold text-cyan-400 mb-1">
                Frontend Development
              </h4>
              <div className="mb-4 skill">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-300">Next.js</span>
                  <span className="text-gray-400 text-sm">95%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r w-[95%] from-cyan-400 to-cyan-500/80`}
                  ></div>
                </div>
              </div>
              <div className="mb-4 skill">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-300">TailwindCSS</span>
                  <span className="text-gray-400 text-sm">92%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r w-[92%] from-cyan-400 to-cyan-500/80`}
                  ></div>
                </div>
              </div>
              <div className="mb-4 skill">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-300">GSAP</span>
                  <span className="text-gray-400 text-sm">80%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r w-[80%] from-cyan-400 to-cyan-500/80`}
                  ></div>
                </div>
              </div>
              <div className="mb-4 skill">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-300">Three.js</span>
                  <span className="text-gray-400 text-sm">75%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r w-[75%] from-cyan-400 to-cyan-500/80`}
                  ></div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-lg skill font-semibold text-purple-400 mb-1">
                Backend Development
              </h4>
              <div className="mb-4 skill">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-300">Node.js</span>
                  <span className="text-gray-400 text-sm">88%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r w-[88%] from-cyan-400 to-cyan-500/80`}
                  ></div>
                </div>
              </div>
              <div className="mb-4 skill">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-300">Express.js</span>
                  <span className="text-gray-400 text-sm">85%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r w-[85%] from-cyan-400 to-cyan-500/80`}
                  ></div>
                </div>
              </div>
              <div className="mb-4 skill">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-300">MongoDB</span>
                  <span className="text-gray-400 text-sm">82%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r w-[82%] from-cyan-400 to-cyan-500/80`}
                  ></div>
                </div>
              </div>
              <div className="mb-4 skill">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-300">Next Auth</span>
                  <span className="text-gray-400 text-sm">75%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r w-[75%] from-cyan-400 to-cyan-500/80`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
