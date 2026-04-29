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
  Soup
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import logoImg from './picture/logo/dimsam.jpg';
import mentaiImg from './picture/food/Dimsum Mentai.jpg';
import dumplingKejuImg from './picture/food/dumpling Keju.jpg';
import fruitTeaImg from './picture/drnk/Fruit tea.jpg';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Tentang Kami', href: '#tentang' },
    { name: 'Menu', href: '#menu' },
    { name: 'Galeri', href: '#galeri' },
    { name: 'Testimoni', href: '#testimoni' },
    { name: 'Kontak', href: '#kontak' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md py-3 shadow-sm' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src={logoImg} alt="Dimsana Logo" className="w-10 h-10 rounded-full object-cover" />
          <span className={`text-2xl font-bold tracking-tight ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
            Dimsana
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              className={`text-sm font-medium hover:text-orange-600 transition-colors ${isScrolled ? 'text-gray-700' : 'text-white'}`}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#kontak"
            className="bg-orange-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20"
          >
            Pesan Sekarang
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className={isScrolled ? 'text-gray-900' : 'text-white'} /> : <MenuIcon className={isScrolled ? 'text-gray-900' : 'text-white'} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-700 font-medium py-2 border-b border-gray-50 last:border-0"
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
      className={`text-3xl md:text-5xl font-bold mb-4 tracking-tight ${light ? 'text-white' : 'text-gray-900'}`}
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={`max-w-2xl mx-auto text-lg ${light ? 'text-orange-100' : 'text-gray-600'}`}
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
    className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-gray-200/50 group"
  >
    <div className="relative h-64 overflow-hidden">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      {tag && (
        <div className="absolute top-4 right-4 bg-orange-600 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
          {tag}
        </div>
      )}
    </div>
    <div className="p-8 text-center">
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
      <button className="mt-6 text-orange-600 font-bold flex items-center gap-1 mx-auto hover:gap-2 transition-all">
        Lihat Detail <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  </motion.div>
);

const TestimonialCard = ({ quote, author, role }: { quote: string, author: string, role: string }) => (
  <div className="bg-white p-10 rounded-3xl shadow-sm border border-orange-100 relative">
    <Quote className="absolute top-6 left-6 text-orange-200 w-12 h-12 -z-0" />
    <div className="relative z-10">
      <div className="flex gap-1 mb-6">
        {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-orange-500 text-orange-500" />)}
      </div>
      <p className="text-gray-700 italic text-lg leading-relaxed mb-8">"{quote}"</p>
      <div>
        <h4 className="font-bold text-gray-900">{author}</h4>
        <p className="text-orange-600 text-sm font-medium">{role}</p>
      </div>
    </div>
  </div>
);

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
    <div className="min-h-screen bg-[#FDFCFB] text-gray-900 font-sans selection:bg-orange-100 selection:text-orange-900">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1496116218417-1a781b1c416c?q=80&w=2670&auto=format&fit=crop" 
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
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#kontak"
                  className="bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-orange-700 transition-all transform hover:scale-105 shadow-xl shadow-orange-600/30 flex items-center gap-2"
                >
                  Pesan Sekarang <ChevronRight />
                </a>
                <a 
                  href="#menu"
                  className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full text-lg font-bold hover:bg-white/20 transition-all"
                >
                  Lihat Menu
                </a>
              </div>
              
              <div className="mt-12 grid grid-cols-3 gap-8">
                <div className="text-white">
                  <p className="text-3xl font-bold mb-1">100%</p>
                  <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold">Bahan Fresh</p>
                </div>
                <div className="text-white">
                  <p className="text-3xl font-bold mb-1">20+</p>
                  <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold">Varian Rasa</p>
                </div>
                <div className="text-white">
                  <p className="text-3xl font-bold mb-1">1k+</p>
                  <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold">Happy Buyers</p>
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
                src="https://images.unsplash.com/photo-1541696490-8744a5db7f7c?q=80&w=2670&auto=format&fit=crop" 
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
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-around gap-8 relative z-10">
          <div className="flex items-center gap-4 text-white">
            <UtensilsCrossed className="w-8 h-8 opacity-70" />
            <span className="font-bold text-lg">Dibuat Fresh Setiap Hari</span>
          </div>
          <div className="flex items-center gap-4 text-white">
            <Star className="w-8 h-8 opacity-70" />
            <span className="font-bold text-lg">Kualitas Rasa Premium</span>
          </div>
          <div className="flex items-center gap-4 text-white">
            <Package className="w-8 h-8 opacity-70" />
            <span className="font-bold text-lg">Siap Makan & Frozen</span>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 flex items-center justify-center pointer-events-none">
           <span className="text-9xl font-black text-white whitespace-nowrap">DIMSANA PREMIUM HIGH QUALITY</span>
        </div>
      </section>

      {/* Tentang Kami Section */}
      <section id="tentang" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="order-2 md:order-1 relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative z-10"
              >
                <img 
                  src="https://images.unsplash.com/photo-1563245391-45607340620c?q=80&w=2574&auto=format&fit=crop" 
                  alt="About Dimsana" 
                  className="rounded-[4rem] shadow-2xl skew-y-3"
                />
              </motion.div>
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-orange-100 rounded-full -z-0 blur-3xl opacity-50" />
              <div className="absolute h-full w-full border-4 border-dashed border-orange-200 top-10 left-10 rounded-[4rem] -z-10" />
            </div>

            <div className="order-1 md:order-2">
              <span className="text-orange-600 font-black uppercase tracking-[0.3em] text-sm mb-4 block">Cerita Kami</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">Kualitas Premium <br /> dalam Setiap Gigitan</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Dimsana adalah UMKM kuliner yang berfokus pada penyajian dimsum berkualitas dengan cita rasa autentik. Berawal dari usaha rumahan, Dimsana hadir dengan komitmen untuk memberikan produk yang tidak hanya lezat, tetapi juga higienis dan terjangkau.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-12">
                Setiap dimsum dibuat menggunakan bahan pilihan dan melalui proses produksi yang terjaga, sehingga menghasilkan rasa yang konsisten dan memuaskan di setiap momen.
              </p>

              <div className="grid grid-cols-2 gap-8">
                <div className="bg-orange-50 p-8 rounded-3xl border border-orange-100 group hover:bg-orange-600 transition-all duration-300">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-orange-600 mb-4 group-hover:bg-white/20 group-hover:text-white">
                    <UtensilsCrossed />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2 group-hover:text-white">Visi</h4>
                  <p className="text-gray-600 text-sm group-hover:text-orange-50 underline decoration-orange-300 underline-offset-4 decoration-2">Menjadi pilihan utama dimsum lokal yang dikenal karena kelezatannya.</p>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm group hover:border-orange-600 transition-all duration-300">
                  <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-4 group-hover:bg-orange-600 group-hover:text-white">
                    <CheckCircle2 />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Misi</h4>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span> Higienis & Berkualitas</li>
                    <li className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span> Tanpa Pengawet</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu / Produk Section */}
      <section id="menu" className="py-24 bg-[#FDFCFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading 
            subtitle="Cicipi beragam varian dimsum favorit pelanggan kami yang dibuat dengan resep rahasia dan bahan terbaik."
          >
            Varian Menu Dimsana
          </SectionHeading>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
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
            <ProductCard 
              title="Fruit Tea"
              description="Minuman teh buah segar yang manis dan menyegarkan, sangat cocok disajikan dengan dimsum."
              image={fruitTeaImg}
              tag="Segar"
            />
          </div>

          <div className="mt-20 bg-orange-50 rounded-[3rem] p-12 md:p-16 border border-orange-100 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
              <h3 className="text-3xl font-bold mb-6">Keunggulan Produk Kami</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  "Tanpa Pengawet",
                  "Diproduksi Higienis",
                  "Bahan Berkualitas",
                  "Siap Makan & Frozen"
                ].map((item, id) => (
                  <div key={id} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center text-white text-[10px]">✓</div>
                    <span className="font-semibold text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-4">
               <div className="text-center p-6 bg-white rounded-3xl shadow-sm border border-orange-100">
                  <Soup className="w-10 h-10 text-orange-600 mx-auto mb-2" />
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Authentic</p>
               </div>
               <div className="text-center p-6 bg-white rounded-3xl shadow-sm border border-orange-100">
                  <Soup className="w-10 h-10 text-orange-600 mx-auto mb-2" />
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Premium</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Galeri Section */}
      <section id="galeri" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading 
            subtitle="Kami menghadirkan dimsum dengan tampilan yang menggugah selera dan kualitas yang terjaga di setiap prosesnya."
          >
            Momen Lezat Bersama Dimsana
          </SectionHeading>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 row-span-2">
              <img src="https://images.unsplash.com/photo-1541696490-8744a5db7f7c?q=80&w=2670&auto=format&fit=crop" className="w-full h-full object-cover rounded-3xl shadow-lg transform hover:scale-[1.02] transition-transform duration-500" alt="Galeri 1" />
            </div>
            <div className="col-span-1">
              <img src="https://images.unsplash.com/photo-1496116218417-1a781b1c416c?q=80&w=2670&auto=format&fit=crop" className="w-full aspect-square object-cover rounded-3xl shadow-lg transform hover:scale-[1.02] transition-transform duration-500" alt="Galeri 2" />
            </div>
            <div className="col-span-1">
              <img src="https://images.unsplash.com/photo-1563245391-45607340620c?q=80&w=2574&auto=format&fit=crop" className="w-full aspect-square object-cover rounded-3xl shadow-lg transform hover:scale-[1.02] transition-transform duration-500" alt="Galeri 3" />
            </div>
            <div className="col-span-2">
              <img src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=2670&auto=format&fit=crop" className="w-full h-48 object-cover rounded-3xl shadow-lg transform hover:scale-[1.02] transition-transform duration-500" alt="Galeri 4" />
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

      {/* Kontak Section */}
      <section id="kontak" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-gray-900 rounded-[4rem] overflow-hidden shadow-2xl relative">
            <div className="grid md:grid-cols-2">
              <div className="p-12 md:p-20 text-white relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Hubungi Kami <br /> untuk Pesanan</h2>
                <p className="text-gray-400 mb-12 text-lg leading-relaxed">Siap melayani pesanan harian, stok rumah tangga (frozen), hingga kebutuhan katering acara spesial Anda.</p>

                <div className="space-y-10">
                  <div className="flex items-start gap-6">
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

              <div className="bg-white p-12 md:p-20">
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">Nama Lengkap</label>
                    <input 
                      type="text" 
                      placeholder="Masukkan nama Anda"
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-orange-600 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">Nomor Telepon</label>
                    <input 
                      type="tel" 
                      placeholder="Contoh: 0812xxxx"
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-orange-600 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">Pesan / Pesanan</label>
                    <textarea 
                      rows={4}
                      placeholder="Ketikkan pesan atau daftar pesanan Anda..."
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-orange-600 outline-none transition-all resize-none"
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
