"use client";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

const Navbar = () => {
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
    <>
      <div>
          <nav
            className={`
          fixed top-0 flex p-5 w-full z-50 transition-all duration-300 ${
            isScrolled ? "bg-black/30 backdrop-blur-md" : "bg-transparent"
          }
              `}
          >
            <div className="w-full hidden md:flex bg-transparent justify-between items-center uppercase z-30">
              <h1
                className={`text-nowrap ${
                  isScrolled ? "block" : "hidden"
                } duration-200 ease-in-out`}
              >
                Yash Singh
              </h1>
              <div className="w-full flex justify-end gap-5 uppercase">
                {navItems.map((item, i) => (
                  <div key={i} onClick={}>
                      <Link
                        key={i}
                        href={item.href}
                        className="relative font-montserrat  text-md xl:text-lg transition-colors duration-300
                       after:content-[''] after:absolute after:left-0 after:bottom-0
                       after:h-[2.5px] after:bg-[#CCFF00] after:transform-gpu after:w-0 hover:after:w-full
                       after:transition-all after:duration-300"
                      >
                        {item.name}
                      </Link>
                  </div>
                ))}
              </div>
            </div>
            {/* Mobile Hamburger Menu (unchanged) */}
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
                <Menu className="text-lg text-white cursor-pointer hover:text-[#CCFF00]" />
              </button>
            </div>
          </nav>
          {/* Mobile Menu (unchanged) */}
          {isMenuOpen && (
            <div className="md:hidden font-montserrat fixed top-20 left-0 right-0 bg-transparent p-4 z-40 backdrop-blur-md">
              <div className="flex flex-col space-y-4">
                {navItems.map((navItem, idx) => (
                  <Link
                    key={idx}
                    href={navItem.href}
                    className="px-4 py-2 text-sm font-medium rounded-full transition-all text-white hover:text-[#CCFF00]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {navItem.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
      </div>
    </>
  );
};

export default Navbar;
