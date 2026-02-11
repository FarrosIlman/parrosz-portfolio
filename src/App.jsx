import React, { useState, useEffect, useRef } from 'react';

// Custom Hook untuk animasi reveal yang halus dan organik
const useScrollReveal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(domRef.current);
        }
      },
      { threshold: 0.1 }
    );
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return [domRef, isVisible];
};

const App = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false); // State untuk Back to Top
  
  // --- LOGIKA TEMA OTOMATIS ---
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 400); // Muncul setelah scroll 400px
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const projects = [
    {
      id: "01",
      tag: "FLAGSHIP IMPLEMENTATION",
      title: "HOS-Pass: Smart Attendance",
      category: "Android Native Engineering",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800",
      desc: "Sistem otomasi presensi biometrik untuk SMA Negeri 4 Pekalongan menggunakan Face Recognition dan Geofencing secara real-time.",
      features: ["Face Recognition", "Geofencing", "Java Native"],
      color: "from-blue-600 to-indigo-600"
    },
    {
      id: "02",
      tag: "SYSTEM ARCHITECTURE",
      title: "Integrated School SIS (Sisfo)",
      category: "Web & Database Management",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      desc: "Pengembangan sistem informasi sekolah yang mengelola data akademik secara terpusat dengan optimasi database untuk efisiensi administrasi.",
      features: ["Database Optimization", "Automated Reporting", "Web SIS"],
      color: "from-slate-600 to-slate-800"
    },
    {
      id: "03",
      tag: "SECURITY & INTEGRITY",
      title: "Secured CBT System (Exampel)",
      category: "Software Security Development",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
      desc: "Pengembangan sistem ujian berbasis komputer (CBT) dengan proteksi tingkat lanjut untuk menjaga integritas akademik siswa.",
      features: ["Anti-Cheat Logic", "Session Lockdown", "Data Integrity"],
      color: "from-cyan-600 to-blue-600"
    },
    {
      id: "04",
      tag: "RESEARCH COLLABORATION",
      title: "Stunting Monitoring System",
      category: "Web Engineering",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
      desc: "Platform monitoring data tumbuh kembang anak untuk deteksi dini stunting berkolaborasi dengan tim riset dosen.",
      features: ["Data Tracking", "UI/UX Research", "Public Health"],
      color: "from-rose-600 to-orange-600"
    }
  ];

  return (
    <div className={`${isDark ? 'dark' : ''} transition-colors duration-500`}>
      <div className="min-h-screen bg-slate-50 dark:bg-[#121212] text-slate-900 dark:text-[#e2e8f0] font-sans selection:bg-blue-500/30 overflow-x-hidden transition-colors duration-500">
        
        {/* Glow Effect (Desktop Only) */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-0 dark:opacity-20 transition-opacity duration-700 hidden md:block" style={{ background: `radial-gradient(circle 600px at ${mousePos.x}px ${mousePos.y}px, rgba(30, 58, 138, 0.12), transparent 80%)` }} />

        {/* NAVIGATION */}
        <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrolled ? 'py-3 md:py-4 bg-white/80 dark:bg-[#1a1a1a]/95 backdrop-blur-md border-b border-black/5 dark:border-white/5 shadow-2xl' : 'py-4 md:py-8'}`}>
          <div className="container mx-auto px-6 md:px-16 flex justify-between items-center max-w-7xl">
            <div className="text-xs md:text-sm font-bold tracking-[0.4em] text-slate-900 dark:text-white uppercase">FARROS<span className="text-blue-600">.</span>ILMAN</div>
            <div className="flex items-center gap-4 md:gap-10">
              <div className="hidden md:flex items-center gap-12 text-[9px] font-bold uppercase tracking-[0.3em] text-slate-500">
                <a href="#work" className="hover:text-blue-600 dark:hover:text-white transition-colors">Works</a>
                <a href="#about" className="hover:text-blue-600 dark:hover:text-white transition-colors">Story</a>
                <a href="#awards" className="hover:text-blue-600 dark:hover:text-white transition-colors">Awards</a>
                <a href="mailto:rosilman000@gmail.com" className="hover:text-blue-600 dark:hover:text-white transition-colors">Contact</a>
              </div>
              <button onClick={toggleTheme} className="p-2 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 hover:scale-110 transition-all cursor-pointer">{isDark ? '☀️' : '🌙'}</button>
            </div>
          </div>
        </nav>

        {/* HERO SECTION */}
        <section className="pt-24 pb-12 md:pt-40 md:pb-24 flex flex-col justify-center px-6 md:px-16 relative h-auto max-w-7xl mx-auto">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              
              {/* KOLOM TEKS */}
              <div className="lg:col-span-8 order-2 lg:order-1">
                <div className="inline-flex items-center gap-3 mb-4 md:mb-8 animate-fade-in">
                  <span className="w-6 md:w-8 h-px bg-blue-600"></span>
                  <span className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] text-blue-500 font-bold">Digital Architect & Specialist</span>
                </div>
                <h1 className="text-4xl sm:text-6xl md:text-[5.5rem] font-black text-slate-900 dark:text-white leading-[1.1] md:leading-[1] tracking-tighter mb-6 md:mb-10 opacity-0 animate-fade-in-up">
                  Membangun <br className="hidden sm:block" /> 
                  Ekosistem <span className="italic font-light serif text-slate-400 dark:text-slate-500 text-3xl sm:text-5xl md:text-7xl">Teknologi Terpadu.</span>
                </h1>
                <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  <p className="text-sm md:text-lg text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed font-light">Junior Front-End & Android Developer yang berdedikasi menciptakan solusi digital yang efisien, stabil, dan berdampak nyata.</p>
                  <div className="flex gap-8 md:gap-10">
                    <div>
                      <div className="text-lg md:text-xl font-bold dark:text-white">1000+</div>
                      <div className="text-[8px] md:text-[9px] uppercase tracking-widest text-slate-500 font-bold">Active Users</div>
                    </div>
                    <div>
                      <div className="text-lg md:text-xl font-bold dark:text-white">5+</div>
                      <div className="text-[8px] md:text-[9px] uppercase tracking-widest text-slate-500 font-bold">Years Obsession</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* KOLOM FOTO PROFIL (BENTUK NON-KOTAK/BLOB) */}
              <div className="lg:col-span-4 order-1 lg:order-2 flex justify-center lg:justify-end animate-fade-in mb-6 md:mb-0">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/30 to-cyan-400/20 blur-3xl animate-pulse opacity-50"></div>
                  
                  <div className="relative w-44 h-44 md:w-64 md:h-64 group">
                    <div className={`
                      w-full h-full overflow-hidden transition-all duration-[2000ms] ease-in-out
                      rounded-[40%_60%_70%_30%/40%_50%_60%_40%] 
                      group-hover:rounded-[60%_40%_30%_70%/60%_30%_70%_40%]
                      border-2 border-white/10 dark:border-white/5 shadow-2xl
                    `}>
                      <img 
                        src="/me.webp" 
                        alt="Farros Profil" 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100" 
                      />
                    </div>

                    {/* Floating Status Badge (Mental-mental Bounce) */}
                    <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 bg-white/90 dark:bg-[#1a1a1a]/90 backdrop-blur-md p-2 md:p-3 rounded-2xl border border-black/5 dark:border-white/10 shadow-xl flex items-center gap-2 animate-bounce">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      <span className="text-[7px] md:text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-300 text-nowrap">Available Now</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* WORKS SECTION */}
        <section id="work" className="py-12 md:py-24 border-t border-black/5 dark:border-white/5">
          <div className="container mx-auto px-6 md:px-16 max-w-6xl">
            <div className="flex items-baseline justify-between mb-10 md:mb-24">
              <h2 className="text-2xl md:text-3xl font-bold dark:text-white tracking-tight">Karya Terpilih</h2>
              <span className="hidden sm:inline text-[9px] md:text-[10px] font-mono text-slate-500 dark:text-slate-600 uppercase tracking-widest">Implementation & Security</span>
            </div>
            <div className="space-y-12 md:space-y-48">
              {projects.map((proj, i) => ( <ProjectItem key={i} proj={proj} index={i} /> ))}
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-12 md:py-24 bg-slate-100 dark:bg-[#1a1a1a] border-y border-black/5 dark:border-white/5 relative">
          <div className="container mx-auto px-6 md:px-16 relative z-10 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              <div className="lg:col-span-7 space-y-10">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-600 mb-6">Journey & Background</h3>
                <div className="space-y-8 md:space-y-10">
                  <AboutItem title="Bachelor of Informatika" place="Univ. Muhammadiyah Pekajangan Pekalongan" year="GPA 3.88" desc="Lulus Cum Laude. Fokus pada pengembangan perangkat lunak." color="border-blue-600" />
                  <AboutItem title="Bangkit Academy" place="Mobile Development Path" year="Top 50 Capstone" desc="Mendalami Android (Kotlin) & terpilih sebagai 50 besar Capstone Nasional." color="border-orange-500" />
                  <div className="pt-2 space-y-8 md:space-y-10">
                    {[
                      { role: "IT Staff & Developer", place: "SMA Negeri 4 Kota Pekalongan", year: "2025 — Now", desc: "Mengelola arsitektur data & aplikasi biometrik HOS-Pass." },
                      { role: "Front-End Developer", place: "DISKOMINFO Kab. Batang", year: "2023", desc: "Digitalisasi layanan publik melalui antarmuka web responsif." }
                    ].map((exp, i) => ( <AboutItem key={i} {...exp} /> ))}
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit">
                <div className="bg-white dark:bg-[#222222] p-8 md:p-10 rounded-3xl border border-black/5 dark:border-white/10 shadow-xl transition-colors">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-600 mb-8 md:mb-10">Technical Expertise</h3>
                  <div className="space-y-8">
                    <SkillBlock title="Development" skills={['Kotlin', 'React', 'Laravel', 'CodeIgniter', 'Java Native', 'PHP']} />
                    <SkillBlock title="Tools & DB" skills={['Firebase', 'MySQL', 'PostgreSQL', 'Git', 'Android Studio', 'Visual Studio Code']} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AWARDS SECTION */}
        <section id="awards" className="py-12 md:py-24 border-b border-black/5 dark:border-white/5 px-6 md:px-16">
          <div className="container mx-auto max-w-6xl text-center lg:text-left">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] text-blue-600 mb-10 md:mb-16">Honors & Achievements</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <Award icon="🏆" title="Juara 2 LKS IT Software" rank="Kota Pekalongan (2021)" />
              <Award icon="📱" title="Juara 2 Mobile Challenge" rank="SMKDEV (2020)" />
              <Award icon="🥉" title="Juara 3 LKS IT App" rank="Kota Pekalongan (2020)" />
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-16 md:py-40 text-center px-6">
          <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.5em] text-blue-500 mb-6 uppercase">Available for Collaboration</p>
          <h2 className="text-3xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter mb-10 md:mb-20 leading-tight">Mari bicara tentang <br /> solusi teknologi Anda.</h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-16 text-sm md:text-xl font-light">
            <a href="mailto:rosilman000@gmail.com" className="border-b border-black/20 dark:border-white/20 hover:border-blue-500 transition-all pb-2 dark:text-white tracking-widest">Email Me</a>
            <a href="https://www.linkedin.com/in/farrosilman" target="_blank" rel="noreferrer" className="border-b border-black/20 dark:border-white/20 hover:border-blue-500 transition-all pb-2 dark:text-white tracking-widest">LinkedIn</a>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-8 md:py-12 border-t border-black/5 dark:border-white/5 px-6">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 max-w-7xl">
            <div className="text-[8px] md:text-[9px] font-mono text-slate-500 dark:text-slate-300 uppercase tracking-widest text-center md:text-left">© {new Date().getFullYear()} M. FARROS ILMAN HAQ — PEKALONGAN</div>
            <div className="text-[8px] md:text-[9px] font-mono text-slate-500 dark:text-slate-300 uppercase tracking-widest">STABILITY & SECURITY DRIVEN</div>
          </div>
        </footer>

        {/* BACK TO TOP BUTTON */}
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 z-[60] p-4 rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-500 group overflow-hidden ${
            showBackToTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
          }`}
        >
          <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10 flex flex-col items-center gap-1">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
            <span className="text-[7px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 text-nowrap">Top</span>
          </div>
        </button>

        <style dangerouslySetInnerHTML={{ __html: `
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&display=swap');
          body { font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; }
          .serif { font-family: 'Georgia', serif; }
          @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
          @keyframes fade-in-up { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
          .animate-fade-in { animation: fade-in 1s ease-out forwards; }
          .animate-fade-in-up { animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          html { scroll-behavior: smooth; }
          ::-webkit-scrollbar { width: 4px; }
          ::-webkit-scrollbar-thumb { background: #3b82f6; border-radius: 10px; }
        `}} />
      </div>
    </div>
  );
};

// HELPERS
const AboutItem = ({ title, place, year, desc, color = "border-black/10 dark:border-white/10" }) => (
  <div className={`group border-l-2 ${color} pl-5 md:pl-6 transition-all`}>
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1 gap-1 md:gap-4">
      <h4 className="text-base md:text-lg font-bold dark:text-white leading-tight">{title}</h4>
      <span className="text-[9px] font-mono text-blue-600 font-bold bg-blue-500/10 px-2 py-0.5 rounded w-fit">{year}</span>
    </div>
    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">{place}</p>
    <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 font-light leading-relaxed max-w-md">{desc}</p>
  </div>
);

const SkillBlock = ({ title, skills }) => (
  <div>
    <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">{title}</h5>
    <div className="flex flex-wrap gap-2">{skills.map(s => <span key={s} className="px-3 py-1 bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-400 text-[10px] rounded-md border border-black/5 dark:border-white/10">{s}</span>)}</div>
  </div>
);

const Award = ({ icon, title, rank }) => (
  <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-[#1a1a1a] border border-black/5 dark:border-white/5 transition-all text-center lg:text-left shadow-sm">
    <div className="text-2xl md:text-3xl mb-4 md:mb-6">{icon}</div>
    <h4 className="text-base md:text-lg font-bold dark:text-white mb-1 leading-tight">{title}</h4>
    <p className="text-[10px] uppercase font-bold text-blue-500 tracking-widest">{rank}</p>
  </div>
);

const ProjectItem = ({ proj, index }) => {
  const [ref, isVisible] = useScrollReveal();
  return (
    <div ref={ref} className={`flex flex-col lg:grid lg:grid-cols-12 gap-6 md:gap-16 items-center transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className={`w-full lg:col-span-7 ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
        <div className="relative group overflow-hidden rounded-2xl md:rounded-[2rem] bg-white dark:bg-[#1a1a1a] border border-black/5 dark:border-white/5 aspect-[16/10] shadow-sm transition-all duration-700">
          <img src={proj.image} alt={proj.title} className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10 flex flex-col justify-end p-5 md:p-10">
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
              <span className="text-[9px] font-mono text-blue-400 font-bold tracking-widest uppercase mb-1 md:mb-2 block">{proj.id} — {proj.tag}</span>
              <h3 className="text-xl md:text-3xl font-bold text-white mb-3 md:mb-4 leading-tight">{proj.title}</h3>
              <div className="flex gap-2 flex-wrap opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                 {proj.features.map(f => ( <span key={f} className="text-[8px] md:text-[9px] bg-white/10 backdrop-blur-md border border-white/20 px-2 py-0.5 md:py-1 rounded-full text-white/80">{f}</span> ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:col-span-5 px-1 md:px-0 text-left">
        <div className="inline-block px-3 py-1 rounded-md bg-black/5 dark:bg-white/10 text-slate-400 dark:text-slate-500 text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] mb-3 md:mb-8">{proj.tag}</div>
        <h3 className="text-lg md:text-3xl font-bold text-slate-900 dark:text-white mb-2 md:mb-6 leading-tight">{proj.category}</h3>
        <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 md:mb-12 font-light">{proj.desc}</p>
        <div className="flex items-center gap-4 dark:text-white text-[10px] font-bold tracking-[0.2em] uppercase group cursor-pointer transition-all">
          <span className="h-[1px] w-6 md:w-8 bg-blue-600 transition-all group-hover:w-12"></span> Detail Insight
        </div>
      </div>
    </div>
  );
};

export default App;