import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(useGSAP);

const AboutSection = () => {
  gsap.registerPlugin(ScrollTrigger);
  const container = useRef();
  const skillBarsRef = useRef([]);

  // Skill data with proficiency levels
  const skills = [
    { name: "Next.js", level: 90, color: "cyan" },
    { name: "Three.js", level: 85, color: "cyan" },
    { name: "TailwindCSS", level: 92, color: "cyan" },
    { name: "GSAP", level: 80, color: "cyan" },
    { name: "Node.js", level: 88, color: "cyan" },
    { name: "Express.js", level: 85, color: "cyan" },
    { name: "MongoDB", level: 82, color: "cyan" },
    { name: "Firebase", level: 78, color: "cyan" },
    { name: "Next Auth", level: 75, color: "cyan" },
  ];

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
        .from(".skillHead", {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".skillHead",
            start: "20% 80%",
            scrub: true,
          },
        })
        .from(".bar", {
          width: "0%",
          duration: 1.5,
          ease: "power3.out",
          stagger: 0.5,
          scrollTrigger: {
            trigger: ".bar",
            start: "top 90%",
            end: "top top",
            markers: true,
          },
        });
    },
    { scope: container }
  );

  return (
    <div
      id="about"
      ref={container}
      className="min-h-screen w-3/4 pt-20 px-12 relative"
    >
      {/* Background elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 -left-20 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl"></div>

      <h2 className="heading text-3xl md:text-4xl font-bold text-white mb-4">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
          About Me
        </span>
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
          <h3 className="text-2xl skillHead font-medium text-white/90">
            Technical Proficiency
          </h3>
          <div className="space-y-3">
            <div className="space-y-2">
              <h4 className="text-lg font-semibold text-cyan-400 mb-1">
                Frontend Development
              </h4>
              {skills.slice(0, 4).map((skill, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-300">{skill.name}</span>
                    <span className="text-gray-400 text-sm">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r w-[${skill.level}%] bar from-${skill.color}-400 to-${skill.color}-500/80`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <h4 className="text-lg font-semibold text-purple-400 mb-1">
                Backend Development
              </h4>
              {skills.slice(4).map((skill, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-300">{skill.name}</span>
                    <span className="text-gray-400 text-sm">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r w-[${skill.level}%] bar from-${skill.color}-400 to-${skill.color}-500/80`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
