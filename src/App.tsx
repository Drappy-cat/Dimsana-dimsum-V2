/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronRight,
  Clock,
  MapPin,
  Instagram,
  Phone,
  CheckCircle2,
  Menu as MenuIcon,
  X,
  Star,
  Quote,
  UtensilsCrossed,
  Package,
  Soup,
  Sun,
  Moon
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import logoImg from './picture/logo/dimsam.jpg';
import mentaiImg from './picture/food/Dimsum Mentai.jpg';
import dumplingKejuImg from './picture/food/dumpling Keju.jpg';
import mentaiImg2 from './picture/food/Dimsum mentai 2.jpg';
import dumplingKejuImg2 from './picture/food/dumpling Keju 2.jpg';
import fruitTeaImg from './picture/drnk/Fruit tea.jpg';
import fruitTeaLemonImg from './picture/drnk/Fruit tea lemon.jpg';
import simpleLemonIcedTeaImg from './picture/drnk/Simple Lemon Iced Tea.jpg';
import rizmaImg from './picture/FotoProfile/Rizmaindra.png';
import puteraImg from './picture/FotoProfile/Putera.png';
import bintangImg from './picture/FotoProfile/Bintang.png';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = (event: React.MouseEvent) => {
    const x = event.clientX;
    const y = event.clientY;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const toggle = () => {
      document.documentElement.classList.toggle('dark');
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    // @ts-ignore - view transitions api
    if (!document.startViewTransition) {
      toggle();
      return;
    }

    // @ts-ignore
    const transition = document.startViewTransition(() => {
      toggle();
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 600,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Tentang Kami', href: '#tentang' },
    { name: 'Menu', href: '#menu' },
    { name: 'Galeri', href: '#galeri' },
    { name: 'Testimoni', href: '#testimoni' },
    { name: 'Tim Kami', href: '#tim' },
    { name: 'Kontak', href: '#kontak' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md py-3 shadow-sm dark:border-b dark:border-gray-800' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src={logoImg} alt="Dimsana Logo" className="w-10 h-10 rounded-full object-cover" />
          <span className={`text-2xl font-bold tracking-tight ${isScrolled ? 'text-gray-900 dark:text-white' : 'text-white'}`}>
            Dimsana
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium hover:text-orange-600 dark:hover:text-orange-500 transition-colors ${isScrolled ? 'text-gray-700 dark:text-gray-300' : 'text-white'}`}
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors ${isScrolled ? 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800' : 'text-white hover:bg-white/20'}`}
            aria-label="Toggle Dark Mode"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <a
            href="#kontak"
            className="bg-orange-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20"
          >
            Pesan Sekarang
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors ${isScrolled ? 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800' : 'text-white hover:bg-white/20'}`}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            className="p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className={isScrolled ? 'text-gray-900 dark:text-white' : 'text-white'} /> : <MenuIcon className={isScrolled ? 'text-gray-900 dark:text-white' : 'text-white'} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-700 dark:text-gray-300 font-medium py-2 border-b border-gray-50 dark:border-gray-800 last:border-0"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#kontak"
                className="bg-orange-600 text-white text-center py-3 rounded-xl font-bold mt-2"
              >
                Pesan Sekarang
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ children, subtitle, light = false }: { children: React.ReactNode, subtitle?: string, light?: boolean }) => (
  <div className="text-center mb-16 px-4">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-3xl md:text-5xl font-bold mb-4 tracking-tight ${light ? 'text-white' : 'text-gray-900 dark:text-white'}`}
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={`max-w-2xl mx-auto text-lg ${light ? 'text-orange-100' : 'text-gray-600 dark:text-gray-400'}`}
      >
        {subtitle}
      </motion.p>
    )}
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: 80 }}
      viewport={{ once: true }}
      className="h-1.5 bg-orange-600 mx-auto mt-6 rounded-full"
    />
  </div>
);

const ProductCard = ({ title, description, image, tag }: { title: string, description: string, image: string, tag?: string }) => (
  <motion.div
    whileHover={{ y: -10 }}
    className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-none hover:shadow-[0_0_40px_rgba(234,88,12,0.4)] dark:hover:shadow-[0_0_40px_rgba(234,88,12,0.4)] border border-transparent hover:border-orange-500 dark:border-gray-700 dark:hover:border-orange-500 group transition-all duration-300 relative z-10 bg-clip-padding"
  >
    <div className="relative overflow-hidden bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <img
        src={image}
        alt={title}
        className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-110"
      />
      {tag && (
        <div className="absolute top-4 right-4 bg-orange-600 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest z-10">
          {tag}
        </div>
      )}
    </div>
    <div className="p-8 text-center">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

const TestimonialCard = ({ quote, author, role }: { quote: string, author: string, role: string }) => (
  <div className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-sm border border-orange-100 dark:border-gray-700 relative transition-colors">
    <Quote className="absolute top-6 left-6 text-orange-200 dark:text-orange-900/50 w-12 h-12 -z-0" />
    <div className="relative z-10">
      <div className="flex gap-1 mb-6">
        {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-orange-500 text-orange-500" />)}
      </div>
      <p className="text-gray-700 dark:text-gray-300 italic text-lg leading-relaxed mb-8">"{quote}"</p>
      <div>
        <h4 className="font-bold text-gray-900 dark:text-white">{author}</h4>
        <p className="text-orange-600 dark:text-orange-500 text-sm font-medium">{role}</p>
      </div>
    </div>
  </div>
);

const ConstellationsBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none hidden dark:block z-0">
    {/* Pisces */}
    <motion.svg
      className="absolute left-[-5%] top-[10%] w-[400px] h-[400px] opacity-40 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
      viewBox="0 0 100 100"
      animate={{ y: [0, -20, 0], x: [0, 10, 0], rotate: [0, 2, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    >
      <g stroke="white" strokeWidth="0.3" fill="white">
        <line x1="20" y1="20" x2="35" y2="40" />
        <line x1="35" y1="40" x2="50" y2="70" />
        <line x1="50" y1="70" x2="65" y2="80" />
        <line x1="65" y1="80" x2="80" y2="75" />
        <line x1="50" y1="70" x2="70" y2="50" />
        <line x1="70" y1="50" x2="90" y2="30" />
        <circle cx="20" cy="20" r="1.5" />
        <circle cx="35" cy="40" r="1" />
        <circle cx="50" cy="70" r="1.5" />
        <circle cx="65" cy="80" r="1" />
        <circle cx="80" cy="75" r="1.5" />
        <circle cx="70" cy="50" r="1" />
        <circle cx="90" cy="30" r="1.5" />
      </g>
    </motion.svg>

    {/* Capricorn */}
    <motion.svg
      className="absolute right-[-2%] bottom-[5%] w-[350px] h-[350px] opacity-40 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
      viewBox="0 0 100 100"
      animate={{ y: [0, 20, 0], x: [0, -10, 0], rotate: [0, -2, 0] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
    >
      <g stroke="white" strokeWidth="0.3" fill="white">
        <line x1="80" y1="20" x2="50" y2="40" />
        <line x1="50" y1="40" x2="20" y2="50" />
        <line x1="20" y1="50" x2="30" y2="80" />
        <line x1="30" y1="80" x2="60" y2="70" />
        <line x1="60" y1="70" x2="50" y2="40" />
        <circle cx="80" cy="20" r="1.5" />
        <circle cx="50" cy="40" r="1.5" />
        <circle cx="20" cy="50" r="1.5" />
        <circle cx="30" cy="80" r="1.5" />
        <circle cx="60" cy="70" r="1.5" />
      </g>
    </motion.svg>
  </div>
);

const GlowingParticlesBackground = () => {
  const particles = [
    { top: '15%', left: '10%', size: 4, delay: 0, duration: 3 },
    { top: '25%', left: '85%', size: 6, delay: 1, duration: 4 },
    { top: '75%', left: '20%', size: 3, delay: 0.5, duration: 2.5 },
    { top: '80%', left: '70%', size: 5, delay: 2, duration: 3.5 },
    { top: '45%', left: '50%', size: 4, delay: 1.5, duration: 3 },
    { top: '60%', left: '90%', size: 7, delay: 0.2, duration: 4.5 },
    { top: '30%', left: '30%', size: 5, delay: 2.5, duration: 3.2 },
    { top: '85%', left: '40%', size: 4, delay: 0.8, duration: 2.8 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none hidden dark:block z-0">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute bg-orange-400 rounded-full shadow-[0_0_15px_3px_rgba(251,146,60,0.8)] dark:bg-orange-500 dark:shadow-[0_0_15px_3px_rgba(249,115,22,0.8)]"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const particlePositions = [
  { top: '10%', left: '20%', delay: 0, duration: 2 },
  { top: '30%', left: '80%', delay: 0.5, duration: 2.5 },
  { top: '70%', left: '15%', delay: 1, duration: 2.2 },
  { top: '80%', left: '75%', delay: 1.5, duration: 2.8 },
  { top: '20%', left: '50%', delay: 0.2, duration: 2.1 },
  { top: '50%', left: '10%', delay: 0.8, duration: 2.4 },
  { top: '60%', left: '90%', delay: 1.2, duration: 2.6 },
];

const ShootingStars = () => {
  const stars = [
    { top: '-10%', left: '80%', delay: '0s', duration: '2s' },
    { top: '10%', left: '100%', delay: '1.5s', duration: '2.5s' },
    { top: '-20%', left: '40%', delay: '2s', duration: '3s' },
    { top: '30%', left: '110%', delay: '0.5s', duration: '2.2s' },
    { top: '0%', left: '60%', delay: '3s', duration: '2.8s' },
    { top: '-10%', left: '20%', delay: '4s', duration: '2s' },
    { top: '40%', left: '120%', delay: '1.2s', duration: '2.4s' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none hidden dark:block z-0">
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute w-[2px] h-[150px] bg-gradient-to-t from-white via-orange-400/60 to-transparent animate-shooting-star opacity-0 rounded-full blur-[1px]"
          style={{
            top: star.top,
            left: star.left,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        />
      ))}
    </div>
  );
};

const TeamCard = ({ name, nim, prodi, image }: { name: string, nim: string, prodi: string, image: string }) => {
  return (
    <motion.div
      whileHover="hover"
      initial="initial"
      className="bg-white dark:bg-gray-800 p-8 rounded-[3rem] shadow-xl shadow-gray-200/50 dark:shadow-none border border-transparent dark:border-gray-700 text-center transition-all group relative overflow-hidden"
    >
      {/* Background glow on hover */}
      <motion.div
        variants={{
          initial: { opacity: 0 },
          hover: { opacity: 1 }
        }}
        className="absolute inset-0 bg-gradient-to-t from-orange-500/5 to-transparent pointer-events-none z-0 transition-opacity duration-500"
      />

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {particlePositions.map((pos, i) => (
          <motion.div
            key={i}
            variants={{
              initial: { opacity: 0, scale: 0, y: 0 },
              hover: {
                opacity: [0, 1, 0],
                scale: [0.5, 1.5, 0.5],
                y: -40,
                transition: {
                  duration: pos.duration,
                  repeat: Infinity,
                  delay: pos.delay,
                  ease: "easeInOut"
                }
              }
            }}
            className="absolute w-1.5 h-1.5 bg-orange-400 rounded-full shadow-[0_0_8px_2px_rgba(251,146,60,0.8)] dark:bg-orange-500 dark:shadow-[0_0_8px_2px_rgba(249,115,22,0.8)]"
            style={{ left: pos.left, top: pos.top }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <motion.div
          variants={{
            initial: { y: 0 },
            hover: { y: -10, transition: { duration: 0.3 } }
          }}
          className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-orange-100 dark:border-gray-700 group-hover:border-orange-500 transition-colors bg-white"
        >
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </motion.div>
        <motion.h3
          variants={{ hover: { y: -5 } }}
          className="text-xl font-bold text-gray-900 dark:text-white mb-2"
        >
          {name}
        </motion.h3>
        <motion.p
          variants={{ hover: { y: -5 } }}
          className="text-orange-600 dark:text-orange-500 font-bold text-sm mb-1"
        >
          {nim}
        </motion.p>
        <motion.p
          variants={{ hover: { y: -5 } }}
          className="text-gray-500 dark:text-gray-400 text-sm"
        >
          {prodi}
        </motion.p>
      </div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  // Update SEO and Meta tags
  useEffect(() => {
    document.title = "Dimsana - Dimsum Lezat, Teman Santai di Setiap Momen";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Dimsana menyediakan dimsum enak, berkualitas, dan terjangkau. Tersedia dalam bentuk siap makan dan frozen dengan rasa autentik.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFCFB] dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans selection:bg-orange-100 dark:selection:bg-orange-900 selection:text-orange-900 dark:selection:text-orange-100 transition-colors">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-0">
          <img
            src={dumplingKejuImg}
            alt="Hero Background"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="inline-block bg-orange-600/20 backdrop-blur-md text-orange-100 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
              >
                UMKM Kuliner Premium
              </motion.span>
              <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
                Dimsum Lezat, <br />
                <span className="text-orange-500">Teman Santai</span> <br />
                di Setiap Momen
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-lg leading-relaxed">
                Nikmati dimsum homemade dengan rasa autentik, bahan berkualitas, dan harga bersahabat. Cocok untuk segala suasana.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                <a
                  href="#kontak"
                  className="bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-orange-700 transition-all transform hover:scale-105 shadow-xl shadow-orange-600/30 flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  Pesan Sekarang <ChevronRight />
                </a>
                <a
                  href="#menu"
                  className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full text-lg font-bold hover:bg-white/20 transition-all w-full sm:w-auto text-center"
                >
                  Lihat Menu
                </a>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-4 sm:gap-8">
                <div className="text-white">
                  <p className="text-2xl sm:text-3xl font-bold mb-1">100%</p>
                  <p className="text-gray-400 text-[10px] sm:text-xs uppercase tracking-widest font-semibold">Bahan Fresh</p>
                </div>
                <div className="text-white">
                  <p className="text-2xl sm:text-3xl font-bold mb-1">20+</p>
                  <p className="text-gray-400 text-[10px] sm:text-xs uppercase tracking-widest font-semibold">Varian Rasa</p>
                </div>
                <div className="text-white">
                  <p className="text-2xl sm:text-3xl font-bold mb-1">1k+</p>
                  <p className="text-gray-400 text-[10px] sm:text-xs uppercase tracking-widest font-semibold">Happy Buyers</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative hidden md:block"
            >
              <div className="absolute -inset-4 bg-orange-600/20 blur-3xl rounded-full animate-pulse" />
              <img
                src={mentaiImg}
                alt="Delicious Dimsum"
                className="w-full h-auto rounded-[3rem] shadow-2xl relative z-10 border-8 border-white/5"
              />
              <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-2xl z-20 max-w-[200px] hidden lg:block">
                <div className="flex gap-2 text-orange-500 mb-2">
                  <Star fill="currentColor" />
                  <Star fill="currentColor" />
                  <Star fill="currentColor" />
                  <Star fill="currentColor" />
                  <Star fill="currentColor" />
                </div>
                <p className="text-gray-900 font-bold text-sm italic">"Rasa premium harga ramah banget di kantong!"</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 z-10"
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-orange-500 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Highlights Bar */}
      <section className="bg-orange-600 py-10 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row flex-wrap justify-around items-start sm:items-center gap-6 sm:gap-8 relative z-10">
          <div className="flex items-center gap-4 text-white">
            <UtensilsCrossed className="w-6 h-6 sm:w-8 sm:h-8 opacity-70" />
            <span className="font-bold text-base sm:text-lg">Dibuat Fresh Setiap Hari</span>
          </div>
          <div className="flex items-center gap-4 text-white">
            <Star className="w-6 h-6 sm:w-8 sm:h-8 opacity-70" />
            <span className="font-bold text-base sm:text-lg">Kualitas Rasa Premium</span>
          </div>
          <div className="flex items-center gap-4 text-white">
            <Package className="w-6 h-6 sm:w-8 sm:h-8 opacity-70" />
            <span className="font-bold text-base sm:text-lg">Siap Makan & Frozen</span>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 flex items-center justify-center pointer-events-none">
          <span className="text-7xl md:text-9xl font-black text-white whitespace-nowrap">DIMSANA PREMIUM HIGH QUALITY</span>
        </div>
      </section>

      {/* Tentang Kami Section */}
      <section id="tentang" className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden transition-colors">
        <ShootingStars />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="order-2 md:order-1 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative z-10 aspect-square"
              >
                <img
                  src={mentaiImg}
                  alt="Dimsum Mentai"
                  className="absolute top-0 right-0 w-[75%] h-auto rounded-[3rem] shadow-2xl z-10 transform translate-x-4 -translate-y-4 hover:z-30 transition-all duration-300 hover:scale-105 border-8 border-white dark:border-gray-900 hover:border-orange-500 hover:shadow-[0_0_40px_rgba(234,88,12,0.6)]"
                />
                <img
                  src={dumplingKejuImg}
                  alt="Dumpling Keju"
                  className="absolute bottom-0 left-0 w-[75%] h-auto rounded-[3rem] shadow-2xl z-20 transform -translate-x-4 translate-y-4 hover:z-30 transition-all duration-300 hover:scale-105 border-8 border-white dark:border-gray-900 hover:border-orange-500 hover:shadow-[0_0_40px_rgba(234,88,12,0.6)]"
                />
              </motion.div>
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-orange-100 dark:bg-orange-900/20 rounded-full -z-0 blur-3xl opacity-50" />
              <div className="absolute h-full w-full border-4 border-dashed border-orange-200 dark:border-gray-700 top-10 left-10 rounded-[4rem] -z-10" />
            </div>

            <div className="order-1 md:order-2">
              <span className="text-orange-600 font-black uppercase tracking-[0.3em] text-sm mb-4 block">Cerita Kami</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 leading-tight tracking-tight">Kualitas Premium <br /> dalam Setiap Gigitan</h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
                Dimsana adalah UMKM kuliner yang berfokus pada penyajian dimsum berkualitas dengan cita rasa autentik. Berawal dari usaha rumahan, Dimsana hadir dengan komitmen untuk memberikan produk yang tidak hanya lezat, tetapi juga higienis dan terjangkau.
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-12">
                Setiap dimsum dibuat menggunakan bahan pilihan dan melalui proses produksi yang terjaga, sehingga menghasilkan rasa yang konsisten dan memuaskan di setiap momen.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
                <div className="bg-orange-50 dark:bg-gray-800 p-6 md:p-8 rounded-3xl border border-orange-100 dark:border-gray-700 group hover:bg-orange-600 dark:hover:bg-orange-600 transition-all duration-300">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-2xl flex items-center justify-center text-orange-600 mb-4 group-hover:bg-white/20 group-hover:text-white">
                    <UtensilsCrossed className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-white">Visi</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm group-hover:text-orange-50 underline decoration-orange-300 underline-offset-4 decoration-2">Menjadi pilihan utama dimsum lokal yang dikenal karena kelezatannya.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm group hover:border-orange-600 dark:hover:border-orange-500 transition-all duration-300">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-4 group-hover:bg-orange-600 group-hover:text-white">
                    <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Misi</h4>
                  <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-2">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-orange-400 rounded-full shrink-0"></span> Higienis & Berkualitas</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-orange-400 rounded-full shrink-0"></span> Tanpa Pengawet</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu / Produk Section */}
      <section id="menu" className="py-24 bg-[#FDFCFB] dark:bg-gray-950 relative overflow-hidden transition-colors">
        <ConstellationsBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <SectionHeading
            subtitle="Cicipi beragam varian dimsum favorit pelanggan kami yang dibuat dengan resep rahasia dan bahan terbaik."
          >
            Varian Menu Dimsana
          </SectionHeading>

          {/* Menu Makanan */}
          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center flex items-center justify-center gap-3">
              <UtensilsCrossed className="w-8 h-8 text-orange-600" />
              Makanan
            </h3>
            <div className="grid sm:grid-cols-2 gap-10 max-w-4xl mx-auto">
              <ProductCard
                title="Dimsum Mentai"
                description="Dimsum dengan topping saus mentai creamy yang menjadi favorit pelanggan kekinian."
                image={mentaiImg}
                tag="Favorit"
              />
              <ProductCard
                title="Dumpling Keju"
                description="Perpaduan sempurna antara lembutnya dimsum dan lumeran keju gurih di dalamnya."
                image={dumplingKejuImg}
                tag="Best Seller"
              />
            </div>
          </div>

          {/* Menu Minuman */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center flex items-center justify-center gap-3">
              <span className="text-orange-600 text-3xl">🥤</span>
              Minuman
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
              <ProductCard
                title="Fruit Tea"
                description="Minuman teh buah segar yang manis dan menyegarkan, sangat cocok disajikan dengan dimsum."
                image={fruitTeaImg}
              />
              <ProductCard
                title="Fruit Tea"
                description="Perpaduan sempurna teh buah dengan kesegaran lemon alami untuk melegakan dahaga."
                image={fruitTeaLemonImg}
              />
              <ProductCard
                title="Fruit Tea"
                description="Es teh lemon klasik yang menyegarkan, pilihan tepat untuk menemani santap dimsum."
                image={simpleLemonIcedTeaImg}
              />
            </div>
          </div>

          <div className="mt-16 md:mt-20 bg-orange-50 dark:bg-gray-800 rounded-3xl md:rounded-[3rem] p-8 md:p-16 border border-orange-100 dark:border-gray-700 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-12 transition-colors">
            <div className="max-w-xl text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold dark:text-white mb-6">Keunggulan Produk Kami</h3>
              <div className="grid sm:grid-cols-2 gap-4 md:gap-6 text-left">
                {[
                  "Tanpa Pengawet",
                  "Diproduksi Higienis",
                  "Bahan Berkualitas",
                  "Siap Makan & Frozen"
                ].map((item, id) => (
                  <div key={id} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center text-white text-[10px]">✓</div>
                    <span className="font-semibold text-gray-700 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-orange-100 dark:border-gray-700 hover:-translate-y-2 dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all duration-300">
                <Soup className="w-10 h-10 text-orange-600 mx-auto mb-2" />
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Authentic</p>
              </div>
              <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-orange-100 dark:border-gray-700 hover:-translate-y-2 dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all duration-300">
                <Soup className="w-10 h-10 text-orange-600 mx-auto mb-2" />
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Premium</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Galeri Section */}
      <section id="galeri" className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden transition-colors">
        <GlowingParticlesBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <SectionHeading
            subtitle="Kami menghadirkan dimsum dengan tampilan yang menggugah selera dan kualitas yang terjaga di setiap prosesnya."
          >
            Momen Lezat Bersama Dimsana
          </SectionHeading>

          <div className="columns-1 sm:columns-2 lg:columns-4 gap-4 space-y-4">
            <div className="break-inside-avoid bg-white dark:bg-gray-800 p-2 md:p-3 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-xl dark:shadow-none hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(234,88,12,0.4)] dark:hover:shadow-[0_0_40px_rgba(234,88,12,0.4)] hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-300 group">
              <div className="overflow-hidden rounded-2xl">
                <img src={mentaiImg} className="w-full h-auto transform group-hover:scale-[1.05] transition-transform duration-500" alt="Galeri 1 - Dimsum Mentai" />
              </div>
            </div>
            <div className="break-inside-avoid bg-white dark:bg-gray-800 p-2 md:p-3 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-xl dark:shadow-none hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(234,88,12,0.4)] dark:hover:shadow-[0_0_40px_rgba(234,88,12,0.4)] hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-300 group">
              <div className="overflow-hidden rounded-2xl">
                <img src={dumplingKejuImg} className="w-full h-auto transform group-hover:scale-[1.05] transition-transform duration-500" alt="Galeri 2 - Dumpling Keju" />
              </div>
            </div>
            <div className="break-inside-avoid bg-white dark:bg-gray-800 p-2 md:p-3 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-xl dark:shadow-none hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(234,88,12,0.4)] dark:hover:shadow-[0_0_40px_rgba(234,88,12,0.4)] hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-300 group">
              <div className="overflow-hidden rounded-2xl">
                <img src={mentaiImg2} className="w-full h-auto transform group-hover:scale-[1.05] transition-transform duration-500" alt="Galeri 3 - Dimsum Mentai 2" />
              </div>
            </div>
            <div className="break-inside-avoid bg-white dark:bg-gray-800 p-2 md:p-3 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-xl dark:shadow-none hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(234,88,12,0.4)] dark:hover:shadow-[0_0_40px_rgba(234,88,12,0.4)] hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-300 group">
              <div className="overflow-hidden rounded-2xl">
                <img src={dumplingKejuImg2} className="w-full h-auto transform group-hover:scale-[1.05] transition-transform duration-500" alt="Galeri 4 - Dumpling Keju 2" />
              </div>
            </div>
            <div className="break-inside-avoid bg-white dark:bg-gray-800 p-2 md:p-3 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-xl dark:shadow-none hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(234,88,12,0.4)] dark:hover:shadow-[0_0_40px_rgba(234,88,12,0.4)] hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-300 group">
              <div className="overflow-hidden rounded-2xl">
                <img src={fruitTeaImg} className="w-full h-auto transform group-hover:scale-[1.05] transition-transform duration-500" alt="Galeri 5 - Fruit Tea" />
              </div>
            </div>
            <div className="break-inside-avoid bg-white dark:bg-gray-800 p-2 md:p-3 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-xl dark:shadow-none hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(234,88,12,0.4)] dark:hover:shadow-[0_0_40px_rgba(234,88,12,0.4)] hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-300 group">
              <div className="overflow-hidden rounded-2xl">
                <img src={fruitTeaLemonImg} className="w-full h-auto transform group-hover:scale-[1.05] transition-transform duration-500" alt="Galeri 6 - Fruit Tea Lemon" />
              </div>
            </div>
            <div className="break-inside-avoid bg-white dark:bg-gray-800 p-2 md:p-3 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-xl dark:shadow-none hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(234,88,12,0.4)] dark:hover:shadow-[0_0_40px_rgba(234,88,12,0.4)] hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-300 group">
              <div className="overflow-hidden rounded-2xl">
                <img src={simpleLemonIcedTeaImg} className="w-full h-auto transform group-hover:scale-[1.05] transition-transform duration-500" alt="Galeri 7 - Simple Lemon Iced Tea" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimoni Section */}
      <section id="testimoni" className="py-24 bg-orange-600 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 0 L100 0 L100 100 Z" fill="white" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <SectionHeading light subtitle="Apa kata mereka yang sudah merasakan kehangatan dan kelezatan dimsum dari dapur Dimsana.">
            Apa Kata Pelanggan
          </SectionHeading>

          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="Rasanya enak dan konsisten. Salah satu dimsum terbaik yang pernah saya coba. Sausnya juga juara!"
              author="Rina"
              role="Customer Tetap"
            />
            <TestimonialCard
              quote="Produk frozen-nya sangat praktis dan tetap enak saat disajikan. Teksturnya masih lembut seperti baru dikukus."
              author="Andi"
              role="Frozen Lover"
            />
            <TestimonialCard
              quote="Harga terjangkau dengan kualitas yang sangat baik. Isian ayamnya berasa banget, bukan cuma tepung."
              author="Sari"
              role="Food Enthusiast"
            />
          </div>
        </div>
      </section>

      {/* Tim Kami Section */}
      <section id="tim" className="py-24 bg-[#FDFCFB] dark:bg-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            subtitle="Mengenal lebih dekat para mahasiswa yang berada di balik layar pembuatan website profil UMKM Dimsana."
          >
            Tim Pengembang
          </SectionHeading>

          <div className="grid md:grid-cols-3 gap-8">
            <TeamCard
              name="Rizma Indra Pramudya"
              nim="25051204370"
              prodi="Teknik / Teknik Informatika"
              image={rizmaImg}
            />
            <TeamCard
              name="Putera Al Khalidi"
              nim="25051204362"
              prodi="Teknik / Teknik Informatika"
              image={puteraImg}
            />
            <TeamCard
              name="Bintang Wira Akbar Aghni Habibilla"
              nim="25051204359"
              prodi="Teknik / Teknik Informatika"
              image={bintangImg}
            />
          </div>
        </div>
      </section>

      {/* Kontak Section */}
      <section id="kontak" className="py-24 bg-white dark:bg-gray-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-gray-900 rounded-3xl md:rounded-[4rem] overflow-hidden shadow-2xl relative">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-20 text-white relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 md:mb-8 tracking-tight">Hubungi Kami <br /> untuk Pesanan</h2>
                <p className="text-gray-400 mb-8 md:mb-12 text-base md:text-lg leading-relaxed">Siap melayani pesanan harian, stok rumah tangga (frozen), hingga kebutuhan katering acara spesial Anda.</p>

                <div className="space-y-8 md:space-y-10">
                  <div className="flex items-start gap-4 md:gap-6">
                    <div className="w-14 h-14 bg-orange-600 rounded-2xl flex items-center justify-center shrink-0">
                      <Phone className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-1">WhatsApp</p>
                      <p className="text-xl font-bold">08xxxxxxxxxx</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 bg-orange-600 rounded-2xl flex items-center justify-center shrink-0">
                      <Instagram className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-1">Instagram</p>
                      <p className="text-xl font-bold">@dimsana.id</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 bg-orange-600 rounded-2xl flex items-center justify-center shrink-0">
                      <Clock className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-1">Jam Operasional</p>
                      <p className="text-lg">Senin – Minggu <br /> 09.00 – 21.00 WIB</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 p-8 md:p-20 transition-colors">
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">Nama Lengkap</label>
                    <input
                      type="text"
                      placeholder="Masukkan nama Anda"
                      className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 dark:text-white rounded-2xl p-4 focus:ring-2 focus:ring-orange-600 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">Nomor Telepon</label>
                    <input
                      type="tel"
                      placeholder="Contoh: 0812xxxx"
                      className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 dark:text-white rounded-2xl p-4 focus:ring-2 focus:ring-orange-600 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">Pesan / Pesanan</label>
                    <textarea
                      rows={4}
                      placeholder="Ketikkan pesan atau daftar pesanan Anda..."
                      className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 dark:text-white rounded-2xl p-4 focus:ring-2 focus:ring-orange-600 outline-none transition-all resize-none"
                    ></textarea>
                  </div>
                  <button className="w-full bg-orange-600 text-white font-bold py-5 rounded-2xl hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/20">
                    Kirim Pesan via WhatsApp
                  </button>
                </form>
              </div>
            </div>

            {/* Decoration */}
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Tagline / Footer Section */}
      <footer className="bg-gray-950 pt-24 pb-12 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
              Dimsana, <span className="text-orange-500 italic">Nikmatnya Bikin Nagih!</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-4 md:gap-10">
              <span className="text-gray-400 font-medium italic underline decoration-orange-600/30 underline-offset-8">Sekali Coba, Pasti Ingin Lagi</span>
              <span className="text-gray-400 font-medium italic underline decoration-orange-600/30 underline-offset-8">Teman Ngemil Paling Juara</span>
              <span className="text-gray-400 font-medium italic underline decoration-orange-600/30 underline-offset-8">Cita Rasa Tak Terlupakan</span>
            </div>
          </div>

          <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <img src={logoImg} alt="Dimsana Logo" className="w-8 h-8 rounded-full object-cover" />
              <span className="text-xl font-bold tracking-tight">Dimsana</span>
            </div>

            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Dimsana.id - Semua Hak Dilindungi.
            </p>

            <div className="flex gap-6">
              <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-orange-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-orange-600 transition-colors">
                <Phone className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-orange-600 transition-colors">
                <MapPin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Abstract shapes */}
        <div className="absolute top-1/2 left-0 -translate-x-1/2 w-96 h-96 bg-orange-600/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 translate-x-1/4 w-[50vw] h-[50vw] bg-orange-600/5 rounded-full blur-[150px] pointer-events-none" />
      </footer>
    </div>
  );
}