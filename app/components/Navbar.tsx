"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';


// --- Sections ---

// 1. Navigation
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  // const [isDark, setIsDark] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Determine active section based on scroll position
      const sections = ['home', 'about', 'projects', 'classes', 'contact'];
      const scrollPosition = window.scrollY + 100; // Offset for navbar height
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial active section
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navLinks = [
    { name: 'Home', href: '/', section: 'home' },               // Hauptseite
    { name: 'Über mich', href: '/#about', section: 'about' },    // Ordner AboutMe
    { name: 'Projekte', href: '/#projects', section: 'projects' },   // Ordner Projects
    { name: 'Schulungen', href: '/#classes', section: 'classes' },  // Ordner Classes
    { name: 'Kontakt', href: '/#contact', section: 'contact' },     // Ordner Contact
  ];


  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
    >
      <div className={`
        flex items-center gap-1 md:gap-4 px-6 py-3 rounded-full 
        transition-all duration-300 backdrop-blur-xl border border-white/10
        ${ scrolled ? 'bg-slate-950/80 shadow-lg shadow-black/20' : 'bg-white/5' }
      `}>
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`hidden md:block px-4 py-2 text-sm font-medium transition-colors rounded-full ${
              activeSection === link.section
                ? 'text-white bg-blue-500/20 border border-blue-400/30'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            {link.name}
          </Link>
        ))}

        {/* Mobile Menu Simplified for demo */}
        <div className="md:hidden flex gap-2">
          <a 
            href="#home" 
            className={`px-3 py-2 text-sm transition-colors rounded-full ${
              activeSection === 'home'
                ? 'text-white bg-blue-500/20 border border-blue-400/30'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Home
          </a>
          <a 
            href="#about" 
            className={`px-3 py-2 text-sm transition-colors rounded-full ${
              activeSection === 'about'
                ? 'text-white bg-blue-500/20 border border-blue-400/30'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            About
          </a>
          <a 
            href="#projects" 
            className={`px-3 py-2 text-sm transition-colors rounded-full ${ 
              activeSection === 'projects'
                ? 'text-white bg-blue-500/20 border border-blue-400/30'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Projects
          </a>
          <a 
            href="#classes"
            className={`px-3 py-2 text-sm transition-colors rounded-full ${
              activeSection === 'classes'
                ? 'text-white bg-blue-500/20 border border-blue-400/30'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Classes
          </a>
          <a 
            href="#contact"
            className={`px-3 py-2 text-sm transition-colors rounded-full ${
              activeSection === 'contact'
                ? 'text-white bg-blue-500/20 border border-blue-400/30'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Contact
          </a>
        </div>

        {/* <div className="w-px h-6 bg-white/20 mx-2 hidden md:block"></div> */}

        {/* <button
          onClick={() => setIsDark(!isDark)}
          className="p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
        >
          {isDark ? <Moon size={18} /> : <Sun size={18} />}
        </button> */}
      </div>
    </motion.nav>
  );
};

export default Navbar;