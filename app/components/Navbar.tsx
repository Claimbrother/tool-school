"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';


// --- Sections ---

// 1. Navigation
const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      setHidden(currentY > lastY && currentY > 80);
      lastY = currentY;

      const sections = ['home', 'über mich', 'projekte', 'schulungen', 'kontakt'];
      const scrollPosition = currentY + 100;
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navLinks = [
    { name: 'Home', href: 'https://smart-mana-it.de/', section: 'home' },               // Hauptseite
    { name: 'Über mich', href: 'https://smart-mana-it.de/ProfileOverview', section: 'about' },    // Ordner AboutMe
    { name: 'Projekte', href: 'https://smart-mana-it.de/#projects', section: 'projects' },   // Ordner Projects
    { name: 'Schulungen', href: 'home', section: 'classes' },  // Ordner Classes
    { name: 'Kontakt', href: '/#contact', section: 'contact' },     // Ordner Contact
  ];



  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: hidden ? '-150%' : '0%', opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className="fixed top-6 left-0 right-0 z-[100] flex justify-center px-4"
    >
      <div className={`
        flex items-center gap-1 md:gap-4 px-6 py-3 rounded-full 
        transition-all duration-300 backdrop-blur-xl border border-white/10
        ${ !hidden ? 'bg-slate-950/40 shadow-lg shadow-black/20' : 'bg-white/5' }
      `}>
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`hidden md:block px-4 py-2 text-sm font-medium transition-colors rounded-full border ${
              activeSection === link.section
                ? 'text-white bg-blue-500/20 border-blue-400/30'
                : 'text-slate-300 border-transparent hover:text-white hover:bg-white/10'
            }`}
          >
            {link.name}
          </Link>
        ))}

        {/* Burger Button */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] rounded-full hover:bg-white/10 transition-colors"
          aria-label="Menü öffnen"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className="block w-5 h-[2px] bg-slate-300 rounded-full origin-center"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
            className="block w-5 h-[2px] bg-slate-300 rounded-full"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className="block w-5 h-[2px] bg-slate-300 rounded-full origin-center"
          />
        </button>
      </div>

      {/* Mobile Fullscreen Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(24px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] md:hidden bg-slate-950/80 flex flex-col items-center justify-center"
            onClick={() => setMenuOpen(false)}
          >
            <nav className="flex flex-col items-center gap-6" onClick={e => e.stopPropagation()}>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block text-3xl font-bold tracking-tight transition-colors ${
                      activeSection === link.section
                        ? 'text-blue-400'
                        : 'text-slate-200 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Dekorativer Untertitel */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-12 text-[0.65rem] text-slate-500 uppercase tracking-widest font-mono"
            >
              Full-Stack · KI · Beratung
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;