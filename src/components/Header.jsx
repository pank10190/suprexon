import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import logo from "/images/suprexon_logo.png";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-indigo-500/20 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="SUPREXON Logo" className="w-28 sm:w-32 h-auto object-contain" />
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 text-sm sm:text-base font-medium text-gray-200">
          <a href="#home" className="hover:text-indigo-400 transition-colors duration-300">Home</a>
          <a href="#services" className="hover:text-indigo-400 transition-colors duration-300">Services</a>
          <a href="#tech" className="hover:text-indigo-400 transition-colors duration-300">Technologies</a>
          <a href="#career" className="hover:text-indigo-400 transition-colors duration-300">Careers</a>
          <a href="#contact" className="hover:text-indigo-400 transition-colors duration-300">Contact</a>
        </nav>

        {/* Get Quote Button */}
        <a
          href="#contact"
          className="hidden md:inline-block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-2 rounded-full text-sm sm:text-base font-semibold text-white shadow-lg hover:scale-105 hover:shadow-pink-400/50 transition-transform duration-300"
        >
          Get Quote
        </a>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-200 text-3xl p-1 hover:text-indigo-400 transition-colors duration-300 focus:outline-none"
          >
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/50 backdrop-blur-xl border-t border-indigo-500/30 px-6 py-4 flex flex-col gap-3 text-center rounded-b-3xl shadow-inner transition-all duration-300">
          {["Home", "Services", "Technologies", "Careers", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-200 font-semibold hover:text-indigo-400 transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-semibold hover:scale-105 hover:shadow-pink-400/50 transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            Get Quote
          </a>
        </div>
      )}
    </header>
  );
}