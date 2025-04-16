import React, { forwardRef } from "react";
import { Github, Linkedin, Twitter, Instagram, Mail } from "lucide-react";

const SocialTabs = () => {
  return (
    <>
      {/* Desktop version */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-30 flex-col gap-4 hidden lg:flex">
        <div className="w-px h-20 bg-gradient-to-b from-cyan-400 to-purple-500 mx-auto"></div>

        <a
          href="https://github.com/yashsingh9651"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon-link"
          aria-label="GitHub"
        >
          <Github className="social-icon" />
        </a>

        <a
          href="https://linkedin.com/in/yash-singh-a191b0262"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon-link"
          aria-label="LinkedIn"
        >
          <Linkedin className="social-icon" />
        </a>

        <a
          href="https://x.com/Yash_singh9"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon-link"
          aria-label="Twitter"
        >
          <Twitter className="social-icon" />
        </a>

        <a
          href="https://www.instagram.com/yash.singh.me/profilecard/?igsh=cDR0c2Q4dDV6czVx"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon-link"
          aria-label="Instagram"
        >
          <Instagram className="social-icon" />
        </a>

        <a
          href="mailto:singhyash9009670@gmail.com"
          className="social-icon-link"
          aria-label="Email"
        >
          <Mail className="social-icon" />
        </a>

        <div className="w-px h-20 bg-gradient-to-b from-purple-500 to-cyan-400 mx-auto"></div>
      </div>
      {/* Mobile version  */}
      <div className="w-full pb-16 lg:hidden flex justify-center items-center gap-4">
        <div className="h-px w-12 bg-gradient-to-r from-cyan-400 to-purple-500"></div>

        <a
          href="https://github.com/yashsingh9651"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon-link"
          aria-label="GitHub"
        >
          <Github className="social-icon" />
        </a>

        <a
          href="https://linkedin.com/in/yash-singh-a191b0262"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon-link"
          aria-label="LinkedIn"
        >
          <Linkedin className="social-icon" />
        </a>

        <a
          href="https://x.com/Yash_singh9"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon-link"
          aria-label="Twitter"
        >
          <Twitter className="social-icon" />
        </a>

        <a
          href="https://www.instagram.com/yash.singh.me/profilecard/?igsh=cDR0c2Q4dDV6czVx"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon-link"
          aria-label="Instagram"
        >
          <Instagram className="social-icon" />
        </a>

        <a
          href="mailto:singhyash9009670@gmail.com"
          className="social-icon-link"
          aria-label="Email"
        >
          <Mail className="social-icon" />
        </a>

        <div className="h-px w-12 bg-gradient-to-r from-purple-500 to-cyan-400"></div>
      </div>
    </>
  );
};

export default SocialTabs;
