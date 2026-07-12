import React, { useState, useEffect, useRef } from 'react';
import { 
  HeartPulse, 
  Phone, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Star, 
  Activity, 
  Flame, 
  Compass, 
  Stethoscope, 
  Sun, 
  Moon, 
  ArrowRight,
  Sparkles,
  Info,
  ChevronRight,
  GraduationCap,
  Award,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Settings,
  Link2,
  AlertTriangle
} from 'lucide-react';
import { DOCTORS, DEPARTMENTS, SERVICES, TESTIMONIALS } from './data';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Minimal tab state: 'departments' | 'diagnostics' | 'doctors'
  const [activeTab, setActiveTab] = useState<'departments' | 'diagnostics' | 'doctors'>('departments');
  const [selectedDeptId, setSelectedDeptId] = useState(DEPARTMENTS[0].id);

  // Patient reviews slider index
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);

  // Hospital outside facade photograph
  const heroImgUrl = new URL('./assets/images/hospital_hero_bg_1781786432126.jpg', import.meta.url).href;
  const mapImgUrl = new URL('./assets/images/piler_hospital_map_1781790033646.jpg', import.meta.url).href;

  // Tour Video Player States
  const [videoUrl, setVideoUrl] = useState(() => {
    const saved = localStorage.getItem('sri_jhansi_hospital_video_url');
    if (!saved || saved.includes('mixkit.co')) {
      return 'https://www.youtube.com/watch?v=y3YFpXv7o6s';
    }
    return saved;
  });
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [videoMuted, setVideoMuted] = useState(true);
  const [videoLoading, setVideoLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [tempUrlInput, setTempUrlInput] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (videoPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [videoPlaying, videoUrl]);

  // Handle source changes - auto reset loading/error state & establish liveness timeout
  useEffect(() => {
    setVideoLoading(true);
    setVideoError(false);

    if (videoTimeoutRef.current) {
      clearTimeout(videoTimeoutRef.current);
      videoTimeoutRef.current = null;
    }

    if (videoUrl && !isYouTubeUrl(videoUrl)) {
      videoTimeoutRef.current = setTimeout(() => {
        const video = videoRef.current;
        if (video && (video.readyState < 3)) {
          console.log('Video loading timed out or stalled, prompting recovery.');
          setVideoError(true);
          setVideoLoading(false);
        }
      }, 5000);
    } else if (isYouTubeUrl(videoUrl)) {
      // YouTube handles its own states, auto-resolve loading on a short delay or iframe load
      const t = setTimeout(() => {
        setVideoLoading(false);
      }, 1500);
      return () => clearTimeout(t);
    }

    return () => {
      if (videoTimeoutRef.current) {
        clearTimeout(videoTimeoutRef.current);
      }
    };
  }, [videoUrl]);

  const handleTogglePlay = () => {
    setVideoPlaying(!videoPlaying);
  };

  const handleToggleMute = () => {
    setVideoMuted(!videoMuted);
  };

  const handleSaveVideoUrl = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const parsed = tempUrlInput.trim();
    if (parsed) {
      setVideoUrl(parsed);
      localStorage.setItem('sri_jhansi_hospital_video_url', parsed);
      setVideoPlaying(true);
    }
    setShowVideoModal(false);
  };

  const isYouTubeUrl = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be') || url.includes('youtube-nocookie.com');
  };

  const getYouTubeEmbed = (url: string) => {
    let videoId = '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      videoId = match[2];
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${videoMuted ? 1 : 0}&loop=1&playlist=${videoId}&controls=1` : url;
  };

  // Toggle Dark Theme
  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const stored = localStorage.getItem('sri_jhansi_dark_mode');
    if (stored === 'true') {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('sri_jhansi_dark_mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('sri_jhansi_dark_mode', 'false');
    }
  }, [darkMode]);

  // Gentle entry fade-in simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Contact hotline states
  const [deskLine1, setDeskLine1] = useState(() => {
    try {
      const saved = localStorage.getItem('sri_jhansi_desk_line_1');
      return saved ? JSON.parse(saved) : { label: 'Desk Line 1', phone: '9440571584' };
    } catch {
      return { label: 'Desk Line 1', phone: '9440571584' };
    }
  });
  const [deskLine2, setDeskLine2] = useState(() => {
    try {
      const saved = localStorage.getItem('sri_jhansi_desk_line_2');
      return saved ? JSON.parse(saved) : { label: 'Desk Line 2', phone: '8978639229' };
    } catch {
      return { label: 'Desk Line 2', phone: '8978639229' };
    }
  });
  const [liaisonDesk, setLiaisonDesk] = useState(() => {
    try {
      const saved = localStorage.getItem('sri_jhansi_liaison_desk');
      return saved ? JSON.parse(saved) : { label: 'Liaison Desk', phone: '8309033922' };
    } catch {
      return { label: 'Liaison Desk', phone: '8309033922' };
    }
  });

  const [showContactModal, setShowContactModal] = useState(false);
  const [tempDesk1Label, setTempDesk1Label] = useState('');
  const [tempDesk1Phone, setTempDesk1Phone] = useState('');
  const [tempDesk2Label, setTempDesk2Label] = useState('');
  const [tempDesk2Phone, setTempDesk2Phone] = useState('');
  const [tempLiaisonLabel, setTempLiaisonLabel] = useState('');
  const [tempLiaisonPhone, setTempLiaisonPhone] = useState('');

  const handleSaveContactDetails = (e: React.FormEvent) => {
    e.preventDefault();
    const d1 = { label: tempDesk1Label.trim() || 'Desk Line 1', phone: tempDesk1Phone.trim() || '9440571584' };
    const d2 = { label: tempDesk2Label.trim() || 'Desk Line 2', phone: tempDesk2Phone.trim() || '8978639229' };
    const ld = { label: tempLiaisonLabel.trim() || 'Liaison Desk', phone: tempLiaisonPhone.trim() || '8309033922' };

    setDeskLine1(d1);
    setDeskLine2(d2);
    setLiaisonDesk(ld);

    localStorage.setItem('sri_jhansi_desk_line_1', JSON.stringify(d1));
    localStorage.setItem('sri_jhansi_desk_line_2', JSON.stringify(d2));
    localStorage.setItem('sri_jhansi_liaison_desk', JSON.stringify(ld));

    setShowContactModal(false);
  };

  const handleNextReview = () => {
    setActiveReviewIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrevReview = () => {
    setActiveReviewIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  // Find currently active department details
  const activeDepartmentDetails = DEPARTMENTS.find(d => d.id === selectedDeptId) || DEPARTMENTS[0];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 antialiased overflow-x-hidden font-sans">
      
      {/* CLINICAL LOADING SCREEN */}
      {loading && (
        <div className="fixed inset-0 bg-[#0A4D8C] dark:bg-slate-950 z-50 flex flex-col justify-center items-center text-white" id="minimalLoader">
          <div className="flex flex-col items-center text-center px-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-teal-400/30 flex items-center justify-center animate-ping absolute"></div>
              <div className="w-16 h-16 rounded-full border-4 border-teal-500 flex items-center justify-center relative bg-[#0A4D8C] shadow-lg">
                <HeartPulse size={30} className="text-teal-400 animate-pulse" />
              </div>
            </div>
            <h2 className="text-lg font-bold tracking-tight mt-6 uppercase font-sans">Sri Jhansi Hospital</h2>
            <p className="text-[10px] text-teal-300 uppercase tracking-widest mt-1">Ortho & Neuro Rehabilitation</p>
            <p className="text-[9px] text-blue-200 mt-4 font-mono font-bold tracking-widest">PILER TOWN HUB</p>
          </div>
        </div>
      )}

      {/* TOP COMPACT HELPLINE ADVISORY */}
      <div className="bg-[#0A4D8C] text-white px-4 md:px-8 py-2 flex flex-col sm:flex-row justify-between items-center text-[11px] font-semibold tracking-wide border-b border-blue-900 shadow-sm relative z-20">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1"><Flame size={12} className="text-red-405 animate-pulse" /> 24/7 Trauma Emergency Support</span>
          <span className="opacity-40 hidden md:inline">|</span>
          <span className="hidden md:inline text-slate-200">Sri Jhansi Ortho & Neuro Rehabilitation Center</span>
        </div>
        <div className="flex items-center gap-4 mt-1 sm:mt-0">
          <a href={`tel:${deskLine1.phone}`} className="hover:underline flex items-center gap-1 text-teal-300">
            <Phone size={11} /> Dial Hotline: {deskLine1.phone}
          </a>
        </div>
      </div>

      {/* HEADER NAVBAR */}
      <header className="sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-250 dark:border-slate-800 px-4 md:px-8 py-4 flex justify-between items-center z-40 transition-colors duration-300 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gradient-to-tr from-[#0A4D8C] to-teal-500 rounded-xl flex items-center justify-center text-white shrink-0 shadow-md">
            <HeartPulse size={20} className="animate-pulse" />
          </div>
          <div>
            <span className="font-sans font-black text-slate-900 dark:text-white text-base md:text-lg tracking-tight leading-none uppercase block">
              Sri Jhansi Hospital
            </span>
            <span className="text-[9px] text-[#14B8A6] font-bold uppercase tracking-widest leading-none block mt-0.5">
              Multispeciality care &middot; Piler
            </span>
          </div>
        </div>

        {/* Minimal Navigation menu - Anchor links on single-page */}
        <nav className="hidden md:flex gap-6 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          <a href="#services-dashboard" className="hover:text-[#0A4D8C] dark:hover:text-teal-400 transition-colors">Our Services</a>
          <a href="#doctors" className="hover:text-[#0A4D8C] dark:hover:text-teal-400 transition-colors">Consultant Team</a>
          <a href="#testimonials" className="hover:text-[#0A4D8C] dark:hover:text-teal-400 transition-colors">Patient Reviews</a>
          <a href="#contact" className="hover:text-[#0A4D8C] dark:hover:text-teal-400 transition-colors">Location & Contact</a>
        </nav>

        <div className="flex items-center gap-3">
          {/* Light/Dark Toggle */}
          <button 
            onClick={handleToggleDarkMode}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-[#0A4D8C] dark:hover:text-teal-400 transition-all cursor-pointer"
            title="Switch Visual Theme"
            id="themeToggleBtn"
          >
            {darkMode ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* Call Primary Hub Button */}
          <a 
            href="tel:9440571584"
            className="bg-[#14B8A6] hover:bg-teal-605 text-white px-3 md:px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-md shadow-teal-500/10 flex items-center gap-1.5"
            id="headerCallBtn"
          >
            <Phone size={12} />
            <span className="hidden sm:inline">Call Representative</span>
          </a>
        </div>
      </header>

      {/* HERO SECTION - COMPACT & CREDIBLE */}
      <section className="relative py-8 md:py-16 bg-gradient-to-b from-white to-slate-100 dark:from-slate-900 dark:to-slate-950 transition-colors duration-300 border-b border-slate-200 dark:border-slate-850">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5 text-left">
              
              <div className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950/40 text-[#0A4D8C] dark:text-blue-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                <ShieldCheck size={13} className="text-teal-500" />
                Trusted Town Healthcare Hub
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-sans tracking-tight font-extrabold text-slate-900 dark:text-white leading-tight">
                Advanced <span className="text-[#0A4D8C] dark:text-teal-400">Multi-Speciality Care</span> & Specialist Rehabilitation
              </h1>

              <p className="text-slate-650 dark:text-slate-350 text-xs md:text-sm leading-relaxed max-w-2xl">
                Sri Jhansi Hospital (Ortho & Neuro Rehabilitation Center) provides highly coordinated 24-hour trauma support, bone fracture reductions, neurosurgeries, and clinical physical therapies. We focus on transparent clinical outcomes designed to restore health and independence for the Piler community.
              </p>

              {/* Direct Quick Info Boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-white/90 dark:bg-slate-900/90 p-3.5 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-2xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Clinical Board</span>
                  <span className="text-xs font-extrabold text-slate-800 dark:text-white">8+ Consultants</span>
                </div>
                <div className="bg-white/90 dark:bg-slate-900/90 p-3.5 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-2xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Trauma Response</span>
                  <span className="text-xs font-extrabold text-[#0A4D8C] dark:text-teal-400">24/7 Red Zone Bays</span>
                </div>
                <div className="bg-white/90 dark:bg-slate-900/90 p-3.5 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-2xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Location</span>
                  <span className="text-xs font-extrabold text-slate-800 dark:text-white">Tirupati Road, Piler</span>
                </div>
              </div>

              {/* Minimal Dial action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-3">
                <a 
                  href="tel:9440571584"
                  className="px-6 py-3.5 bg-[#0A4D8C] hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl text-center shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Phone size={13} />
                  Call Main Desk (9440571584)
                </a>
                <a 
                  href="https://wa.me/919440571584?text=Hi%20Sri%20Jhansi%20Hospital%20Piler%2C%20I%20have%20a%20clinical%20question."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 border-2 border-green-500/35 hover:border-green-500 text-green-600 dark:text-green-400 font-bold text-xs uppercase tracking-wider rounded-xl text-center transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  💬 Inquire on WhatsApp
                </a>
              </div>

            </div>

            {/* Right Hospital Tour Video Player */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <div className="relative max-w-md mx-auto">
                {/* Glowing subtle background card accent */}
                <div className="absolute inset-2 bg-gradient-to-tr from-[#0A4D8C] to-teal-500 rounded-3xl opacity-15 rotate-2 scale-102 blur-sm pointer-events-none"></div>
                <div className="relative bg-white dark:bg-slate-900 p-2.5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden">
                  
                  {/* Video Screen */}
                  <div className="rounded-2xl overflow-hidden aspect-video sm:aspect-square max-h-[360px] bg-slate-950 relative group/video shadow-inner flex items-center justify-center min-h-[300px]">
                    {videoError ? (
                      <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center p-6 text-center gap-4 z-20">
                        <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 animate-bounce">
                          <AlertTriangle size={24} />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold text-white">Stream Loading Blocked</h4>
                          <p className="text-[10px] text-slate-400 max-w-xs leading-relaxed">
                            The direct MP4 stream was blocked by browser sandbox or expired. Select an ultra-reliable YouTube preset or Google CDN video below.
                          </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 w-full max-w-xs pt-1">
                          <button
                            onClick={() => {
                              const newUrl = 'https://www.youtube.com/watch?v=y3YFpXv7o6s';
                              setVideoUrl(newUrl);
                              localStorage.setItem('sri_jhansi_hospital_video_url', newUrl);
                              setVideoError(false);
                              setVideoPlaying(true);
                            }}
                            className="flex-1 py-2 px-3 bg-[#0A4D8C] hover:bg-blue-800 text-white font-bold text-[10px] rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1"
                          >
                            <Play size={10} className="fill-white" />
                            YouTube Tour
                          </button>
                          <button
                            onClick={() => {
                              const newUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
                              setVideoUrl(newUrl);
                              localStorage.setItem('sri_jhansi_hospital_video_url', newUrl);
                              setVideoError(false);
                              setVideoPlaying(true);
                            }}
                            className="flex-1 py-2 px-3 bg-teal-600 hover:bg-teal-550 text-white font-bold text-[10px] rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1"
                          >
                            <HeartPulse size={10} />
                            Google CDN
                          </button>
                        </div>
                      </div>
                    ) : isYouTubeUrl(videoUrl) ? (
                      <iframe
                        src={getYouTubeEmbed(videoUrl)}
                        title="Sri Jhansi Hospital Youtube Video player"
                        className="w-full h-full border-0 absolute inset-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        onLoad={() => setVideoLoading(false)}
                      ></iframe>
                    ) : (
                      <video
                        ref={videoRef}
                        src={videoUrl}
                        className="w-full h-full object-cover"
                        loop
                        muted={videoMuted}
                        playsInline
                        autoPlay
                        preload="auto"
                        onLoadStart={() => setVideoLoading(true)}
                        onWaiting={() => setVideoLoading(true)}
                        onPlaying={() => setVideoLoading(false)}
                        onCanPlay={() => setVideoLoading(false)}
                        onLoadedData={() => setVideoLoading(false)}
                        onError={() => {
                          console.log('Video stream error, skipping loader');
                          setVideoError(true);
                          setVideoLoading(false);
                        }}
                      />
                    )}

                    {/* Loader Overlay */}
                    {videoLoading && !videoError && (
                      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md z-30 flex flex-col items-center justify-center gap-3">
                        <div className="relative flex items-center justify-center">
                          <div className="w-12 h-12 border-4 border-teal-500/30 border-t-teal-500 rounded-full animate-spin"></div>
                          <HeartPulse size={20} className="text-teal-400 absolute animate-pulse" />
                        </div>
                        <div className="text-center">
                          <p className="text-xs font-semibold text-white tracking-wide">Connecting Stream...</p>
                          <p className="text-[9px] text-slate-400 mt-1 font-mono">Buffered Range Accessing</p>
                        </div>
                      </div>
                    )}

                    {/* Dark gradient overlay for titles & quick-action buttons */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/45 pointer-events-none z-10"></div>

                    {/* Overlay header */}
                    <div className="absolute top-3 left-3 right-3 z-20 flex justify-between items-center pointer-events-none">
                      <div className="px-2.5 py-1 bg-teal-500/85 backdrop-blur-md text-white text-[9px] font-sans font-bold tracking-widest uppercase rounded-lg flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                        Hospital Tour Video
                      </div>
                      
                      <button 
                        onClick={() => {
                          setTempUrlInput(videoUrl);
                          setShowVideoModal(true);
                        }}
                        className="p-1.5 bg-black/60 hover:bg-[#0A4D8C] text-white hover:text-white rounded-lg transition-all cursor-pointer pointer-events-auto border border-white/10"
                        title="Click to paste another video or youtube link"
                      >
                        <Settings size={12} />
                      </button>
                    </div>

                    {/* Micro controls on top of video - Only for direct HTML5 MP4 */}
                    {!isYouTubeUrl(videoUrl) && (
                      <div className="absolute bottom-3 left-3 right-3 z-20 flex justify-between items-center pointer-events-auto">
                        <div className="flex gap-2">
                          <button
                            onClick={handleTogglePlay}
                            className="w-7 h-7 bg-white/90 hover:bg-white text-slate-900 rounded-full flex items-center justify-center shadow-md transition-all cursor-pointer"
                          >
                            {videoPlaying ? <Pause size={10} className="fill-slate-900" /> : <Play size={10} className="fill-slate-900 ml-0.5" />}
                          </button>
                          <button
                            onClick={handleToggleMute}
                            className="w-7 h-7 bg-black/65 hover:bg-black/80 text-white rounded-full flex items-center justify-center border border-white/10 transition-all cursor-pointer"
                          >
                            {videoMuted ? <VolumeX size={10} /> : <Volume2 size={10} />}
                          </button>
                        </div>

                        <span className="text-[9px] font-mono font-bold text-white/80 bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-xs">
                          {videoPlaying ? 'Looping' : 'Paused'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info Footer under Video */}
                  <div className="mt-3.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-850 flex items-center justify-between text-xs">
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Video Feed</p>
                      <button 
                        onClick={() => {
                          setTempUrlInput(videoUrl);
                          setShowVideoModal(true);
                        }}
                        className="font-extrabold text-slate-800 dark:text-white mt-0.5 flex items-center gap-1 hover:text-[#0A4D8C] dark:hover:text-teal-400 transition-colors cursor-pointer"
                      >
                        <Link2 size={11} className="text-teal-500" />
                        Update Video Link
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Orientation</p>
                      <p className="font-extrabold text-teal-600 dark:text-teal-400 mt-0.5">Live Facility Tour</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CORE CLINICAL DICTIONARY - MINIMAL SHOWCASE */}
      <section id="services-dashboard" className="py-16 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-teal-500 bg-teal-500/5 px-2.5 py-1 rounded-full">Explore Facilities</span>
            <h2 className="text-2xl md:text-3xl font-sans tracking-tight font-extrabold text-slate-900 dark:text-white">
              Clinical Registry & Available Services
            </h2>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
              We consolidated all our specialties, diagnostic setups, & consulting panel information so you can find exactly what you need with zero clutter.
            </p>
          </div>

          {/* MAIN THREE TABS SELECTOR */}
          <div className="flex justify-center mb-8 border-b border-slate-200 dark:border-slate-800 max-w-md mx-auto gap-2">
            <button
              onClick={() => setActiveTab('departments')}
              className={`flex-1 pb-3 text-xs md:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                activeTab === 'departments' 
                  ? 'border-[#0A4D8C] dark:border-teal-400 text-[#0A4D8C] dark:text-teal-400' 
                  : 'border-transparent text-slate-400 hover:text-slate-605'
              }`}
            >
              🩺 Specialties
            </button>
            <button
              onClick={() => setActiveTab('diagnostics')}
              className={`flex-1 pb-3 text-xs md:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                activeTab === 'diagnostics' 
                  ? 'border-[#0A4D8C] dark:border-teal-400 text-[#0A4D8C] dark:text-teal-400' 
                  : 'border-transparent text-slate-400 hover:text-slate-605'
              }`}
            >
              🔬 Diagnostics
            </button>
            <button
              onClick={() => setActiveTab('doctors')}
              className={`flex-1 pb-3 text-xs md:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                activeTab === 'doctors' 
                  ? 'border-[#0A4D8C] dark:border-teal-400 text-[#0A4D8C] dark:text-teal-400' 
                  : 'border-transparent text-slate-400 hover:text-slate-605'
              }`}
            >
              👨‍⚕️ Core Doctors ({DOCTORS.length})
            </button>
          </div>

          {/* TAB 1 CONTENT: SPECIALTY DEPARTMENTS */}
          {activeTab === 'departments' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in text-left">
              {DEPARTMENTS.map((dept) => (
                <div 
                  key={dept.id}
                  className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-805 flex items-center gap-4 hover:border-teal-500/40 dark:hover:border-teal-500/30 transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-[#0A4D8C] dark:text-teal-400 flex items-center justify-center shrink-0">
                    <Stethoscope size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">{dept.name}</h4>
                    <p className="text-[10px] text-slate-400 font-medium uppercase mt-0.5">Sri Jhansi Division</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2 CONTENT: DIAGNOSTIC & LAB SERVICES */}
          {activeTab === 'diagnostics' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-fade-in text-left">
              {SERVICES.map((serv) => (
                <div 
                  key={serv.id}
                  className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200/70 dark:border-slate-800/80 hover:bg-white dark:hover:bg-slate-900 hover:shadow-sm transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="w-8 h-8 rounded-xl bg-teal-100 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                        <Activity size={15} />
                      </div>
                      {serv.highlight && (
                        <span className="bg-blue-50 dark:bg-blue-900/20 text-[#0A4D8C] dark:text-blue-300 font-mono text-[9px] font-bold uppercase px-2 py-0.5 rounded">
                          {serv.highlight}
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{serv.name}</h4>
                      <p className="text-[11px] text-slate-400 uppercase tracking-widest mt-0.5 font-bold">{serv.category} Facility</p>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                      {serv.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Piler Branch Service Line</span>
                    <a href="tel:9440571584" className="text-[#0A4D8C] dark:text-teal-400 font-bold hover:underline">
                      Inquire Timings
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3 CONTENT: DETAILED DOCTOR TEAM (HIGH TRUST) */}
          {activeTab === 'doctors' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in text-left">
              {DOCTORS.map((doc) => (
                <div 
                  key={doc.id}
                  className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[220px]"
                >
                  <div className="space-y-4">
                    {/* Top Row */}
                    <div className="flex gap-4">
                      {/* Doctor Portrait Photo */}
                      {doc.imageUrl ? (
                        <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-slate-200/80 dark:border-slate-800 shadow-sm bg-slate-50">
                          <img 
                            src={doc.imageUrl} 
                            alt={doc.name} 
                            className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-2xl bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-base shrink-0 border border-teal-150/40 dark:border-teal-900/30">
                          {doc.name.split(' ').slice(-2).map(n => n[0]).join('')}
                        </div>
                      )}

                      <div>
                        <h4 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">{doc.name}</h4>
                        <p className="text-xs font-bold text-[#0A4D8C] dark:text-teal-400 mt-0.5">{doc.role}</p>
                      </div>
                    </div>

                    {/* Qualifications & Specialty details */}
                    <div className="space-y-2 text-xs">
                      <div className="flex items-start gap-1.5">
                        <GraduationCap size={13} className="text-slate-400 shrink-0 mt-0.5" />
                        <span className="text-slate-600 dark:text-slate-350 leading-normal">
                          <strong>Credentials:</strong> {doc.qualification}
                        </span>
                      </div>

                      {doc.fellowship && (
                        <div className="flex items-start gap-1.5">
                          <Award size={13} className="text-slate-400 shrink-0 mt-0.5" />
                          <span className="text-slate-505 dark:text-slate-400 leading-normal">
                            <strong>Fellowship:</strong> {doc.fellowship}
                          </span>
                        </div>
                      )}

                      {doc.experience && (
                        <p className="text-[11px] text-slate-400 leading-normal italic pl-4 border-l border-slate-200 dark:border-slate-800">
                          {doc.experience}
                        </p>
                      )}

                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal pt-1.5">
                        {doc.bio}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">OPD availability: Mon - Sat</span>
                    <a 
                      href="tel:9440571584"
                      className="text-[#0A4D8C] dark:text-teal-400 font-bold hover:underline flex items-center gap-0.5"
                    >
                      Dial Consultant Desk <ArrowRight size={12} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* COMPACT TESTIMONIAL QUOTE HIGHLIGHT */}
      <section id="testimonials" className="py-16 bg-slate-100 dark:bg-slate-950/60 transition-colors duration-300 border-t border-b border-slate-200 dark:border-slate-900">
        <div className="max-w-4xl mx-auto px-4">
          
          <div className="text-center mb-8">
            <span className="text-[9px] font-mono font-bold text-[#0A4D8C] dark:text-teal-400 uppercase tracking-widest">Local Recoveries verified</span>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
              Patient Outcomes in Piler Area
            </h3>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden text-left">
            
            {/* Decal Quote Icon */}
            <div className="absolute right-6 top-4 text-8xl font-serif text-teal-450/10 dark:text-teal-400/5 select-none font-black leading-none">
              “
            </div>

            <div className="flex flex-col sm:flex-row gap-6 items-start">
              
              <div className="shrink-0 w-16 h-16 rounded-2xl bg-teal-50 dark:bg-slate-800 flex flex-col items-center justify-center border border-teal-100 dark:border-slate-700 text-[#0A4D8C] dark:text-teal-400">
                <span className="text-lg font-black font-sans leading-none">
                  {TESTIMONIALS[activeReviewIdx].name.split(' ').slice(-1)[0][0]}
                </span>
                <span className="text-[9px] text-slate-400 mt-1 uppercase font-semibold">Age: {TESTIMONIALS[activeReviewIdx].age}</span>
              </div>

              <div className="flex-1 space-y-3">
                <div className="flex gap-1">
                  {[...Array(TESTIMONIALS[activeReviewIdx].rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-slate-700 dark:text-slate-350 text-xs md:text-sm font-medium italic leading-relaxed">
                  "{TESTIMONIALS[activeReviewIdx].review}"
                </p>

                <div className="pt-2">
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs">
                    {TESTIMONIALS[activeReviewIdx].name}
                  </h4>
                  <p className="text-[10.5px] text-teal-600 dark:text-teal-400 font-bold mt-0.5">
                    Recovered: {TESTIMONIALS[activeReviewIdx].condition}
                  </p>
                  <p className="text-[9.5px] text-slate-400 mt-0.5">
                    Treated under medical guidance of: <strong className="text-slate-600 dark:text-slate-200">{TESTIMONIALS[activeReviewIdx].treatmentDoctor}</strong>
                  </p>
                </div>
              </div>

            </div>

            {/* Slider triggers */}
            <div className="flex justify-between items-center mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[9.5px] text-slate-400 font-mono">Outcome {activeReviewIdx + 1} of {TESTIMONIALS.length} verified town charts</span>
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={handlePrevReview} 
                  className="p-1.5 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 cursor-pointer text-xs"
                >
                  &larr; Prev
                </button>
                <button 
                  onClick={handleNextReview} 
                  className="p-1.5 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 cursor-pointer text-xs"
                >
                  Next &rarr;
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* OUTSIDE CONTACT, EMERGENCY SUMMARY & MAPPED LANDMARKS */}
      <section id="contact" className="py-24 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-300 transition-colors duration-300 relative overflow-hidden text-left border-t border-slate-200 dark:border-slate-900">
        {/* Abstract futuristic glowing background circles */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/5 dark:bg-teal-500/[0.03] rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-500/5 dark:bg-blue-500/[0.03] rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          
          {/* Header section of Section */}
          <div className="mb-16 max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-sans text-slate-900 dark:text-white tracking-tight leading-tight">
              Location & <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-[#0A4D8C] dark:from-teal-400 dark:to-blue-400">Emergency Access</span>
            </h2>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 font-medium max-w-2xl leading-relaxed">
              Strategically positioned directly on the major Tirupati Bypass Highway in Piler for seamless trauma ingress, ambulance coordinates, and instant care accessibility.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Coordinates & Instructions column */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              <div className="space-y-4">
                
                {/* Physical Postal Address card */}
                <div className="bg-white dark:bg-slate-900/40 p-6 rounded-2xl border border-slate-200/85 dark:border-slate-900/80 hover:border-teal-200 dark:hover:border-slate-800 hover:shadow-md dark:hover:shadow-none transition-all duration-300 group shadow-xs">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0 border border-teal-100/60 dark:border-teal-500/10 group-hover:bg-teal-100 dark:group-hover:bg-teal-500/20 group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-all duration-300">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-sans">Postal & Physical Location</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                        2-279, Sri Jhansi Hospital Campus,<br />
                        Tirupati Road, Piler Town, Annamayya District, <br />
                        Andhra Pradesh - 517214, India.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Emergency Contact & Liaison Desk - Dial-capable */}
                <div className="bg-white dark:bg-slate-900/40 p-6 rounded-2xl border border-slate-200/85 dark:border-slate-900/80 hover:border-teal-200 dark:hover:border-slate-800 hover:shadow-md dark:hover:shadow-none transition-all duration-300 group shadow-xs">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0 border border-teal-100/60 dark:border-teal-500/10 group-hover:bg-teal-100 dark:group-hover:bg-teal-500/20 group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-all duration-300">
                      <Phone size={18} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-sans">Emergency & Liaison Hotlines</h4>
                        <button 
                          onClick={() => {
                            setTempDesk1Label(deskLine1.label);
                            setTempDesk1Phone(deskLine1.phone);
                            setTempDesk2Label(deskLine2.label);
                            setTempDesk2Phone(deskLine2.phone);
                            setTempLiaisonLabel(liaisonDesk.label);
                            setTempLiaisonPhone(liaisonDesk.phone);
                            setShowContactModal(true);
                          }}
                          className="text-slate-400 hover:text-teal-500 transition-colors p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                          title="Edit Hotlines"
                        >
                          <Settings size={14} />
                        </button>
                      </div>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mt-1.5">
                        Click below to initiate dial response:
                      </p>
                      
                      <div className="mt-3 flex flex-col gap-2">
                        <a 
                          href={`tel:${deskLine1.phone}`} 
                          className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 hover:bg-teal-50 dark:hover:bg-teal-950/30 border border-slate-200 dark:border-slate-900 hover:border-teal-200 dark:hover:border-teal-900 text-slate-705 dark:text-slate-300 hover:text-teal-700 dark:hover:text-teal-300 transition-all font-mono text-[11px] font-bold group/btn focus:outline-none"
                        >
                          <span className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-550 dark:bg-teal-400 animate-pulse"></span>
                            {deskLine1.label}
                          </span>
                          <span className="flex items-center gap-1.5 bg-white dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 text-teal-600 dark:text-teal-400 font-extrabold group-hover/btn:bg-[#0A4D8C] group-hover/btn:text-white transition-all">
                            {deskLine1.phone}
                          </span>
                        </a>

                        <a 
                          href={`tel:${deskLine2.phone}`} 
                          className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 hover:bg-teal-50 dark:hover:bg-teal-950/30 border border-slate-200 dark:border-slate-900 hover:border-teal-200 dark:hover:border-teal-900 text-slate-705 dark:text-slate-300 hover:text-teal-700 dark:hover:text-teal-300 transition-all font-mono text-[11px] font-bold group/btn focus:outline-none"
                        >
                          <span className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-550 dark:bg-teal-400"></span>
                            {deskLine2.label}
                          </span>
                          <span className="flex items-center gap-1.5 bg-white dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 text-teal-600 dark:text-teal-400 font-extrabold group-hover/btn:bg-[#0A4D8C] group-hover/btn:text-white transition-all">
                            {deskLine2.phone}
                          </span>
                        </a>

                        <a 
                          href={`tel:${liaisonDesk.phone}`} 
                          className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 hover:bg-teal-50 dark:hover:bg-teal-950/30 border border-slate-200 dark:border-slate-900 hover:border-teal-200 dark:hover:border-teal-900 text-slate-705 dark:text-slate-300 hover:text-teal-700 dark:hover:text-teal-300 transition-all font-mono text-[11px] font-bold group/btn focus:outline-none"
                        >
                          <span className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-555 dark:bg-teal-400"></span>
                            {liaisonDesk.label}
                          </span>
                          <span className="flex items-center gap-1.5 bg-white dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 text-teal-600 dark:text-teal-400 font-extrabold group-hover/btn:bg-[#0A4D8C] group-hover/btn:text-white transition-all">
                            {liaisonDesk.phone}
                          </span>
                        </a>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Timings Card */}
                <div className="bg-white dark:bg-slate-900/40 p-6 rounded-2xl border border-slate-200/85 dark:border-slate-900/80 hover:border-teal-200 dark:hover:border-slate-800 hover:shadow-md dark:hover:shadow-none transition-all duration-300 group shadow-xs">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0 border border-teal-100/60 dark:border-teal-500/10 group-hover:bg-teal-100 dark:group-hover:bg-teal-500/20 group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-all duration-300">
                      <Clock size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-sans">Op-Hours & Consultations</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                        OPD Consultations: Monday to Saturday (9:00 AM - 6:00 PM)<br />
                        Poly-Clinic & Trauma Response: <strong className="text-teal-600 dark:text-teal-400">Operational 24/7 Hours</strong>
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Immersive Google Map Container Card */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900/20 backdrop-blur-md rounded-3xl p-3 border border-slate-200 dark:border-slate-900 flex flex-col justify-between min-h-[440px] relative overflow-hidden group shadow-sm">
              
              {/* Actual Map frame wrapper - Live Interactive Google Map */}
              <div className="relative w-full flex-1 rounded-2xl overflow-hidden border border-slate-150 dark:border-slate-800/80 min-h-[300px] bg-slate-100 dark:bg-slate-950">
                <iframe
                  title="Sri Jhansi Hospital Live Google Map Location"
                  src="https://maps.google.com/maps?q=13.653722,78.950222&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="absolute inset-0 w-full h-full border-0 rounded-2xl opacity-90 dark:opacity-85 hover:opacity-100 transition-opacity duration-300"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>

                {/* Satellite imagery label badge floating */}
                <div className="absolute top-4 left-4 z-10 pointer-events-none">
                  <span className="text-[9px] font-mono font-bold tracking-widest bg-white/90 dark:bg-slate-950/95 backdrop-blur-md text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800/60 px-2.5 py-1 rounded-lg uppercase shadow-sm">
                    Live Interactive Map
                  </span>
                </div>
              </div>

              {/* Navigation Actions Panel */}
              <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-950/95 rounded-2xl border border-slate-150 dark:border-slate-900 mt-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="text-left font-sans flex-1">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Need Live Navigation Support?</h4>
                  <p className="text-[11px] text-slate-550 dark:text-slate-400 mt-0.5 leading-normal">
                    Located near the central bypass junction linking key regional highway coordinates. Accessible online or offline.
                  </p>
                </div>
                
                <a 
                  href="https://maps.app.goo.gl/Rxt5asZ9oNBiC5Vf6" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0A4D8C] hover:bg-blue-700 text-white font-bold text-[11px] uppercase tracking-wider py-3 px-5 rounded-xl transition-all duration-305 cursor-pointer shadow-lg hover:shadow-blue-900/20 shrink-0"
                >
                  <span>Open on Google Maps</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

            </div>

          </div>

          {/* Minimal Bottom Bar */}
          <div className="mt-20 pt-8 border-t border-slate-200 dark:border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-slate-450 dark:text-slate-500 font-medium font-sans">
            <p>&copy; {new Date().getFullYear()} Sri Jhansi Hospital & Specialized Ortho-Neuro Rehab. All rights reserved.</p>
            <p className="flex items-center gap-2">
              <span>Piler Town Branch, Annamayya Dist, AP</span>
            </p>
          </div>

        </div>
      </section>

      {/* UPDATE TOUR VIDEO LINK MODAL FORM */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in animate-duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-md p-6 shadow-2xl relative">
            <h3 className="font-sans font-extrabold text-lg text-slate-950 dark:text-white mb-2">
              Set Custom Tour Video URL
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
              Paste a custom hospital video URL or a YouTube watch/embed URL. The clinical dashboard will instantly stream it!
            </p>

             <form onSubmit={handleSaveVideoUrl} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  Video URL (Direct MP4, WebM, or YouTube Link)
                </label>
                <input
                  type="text"
                  placeholder="https://example.com/video.mp4 or YouTube URL"
                  value={tempUrlInput}
                  onChange={(e) => setTempUrlInput(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  Or select a high-speed direct stream preset
                </label>
                <div className="grid grid-cols-1 gap-2">
                  <button
                    type="button"
                    onClick={() => setTempUrlInput('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4')}
                    className="w-full text-left px-3 py-2 bg-slate-50 dark:bg-slate-800/50 hover:bg-teal-50 dark:hover:bg-teal-950/20 border border-slate-200 dark:border-slate-800 rounded-xl text-[11px] text-slate-700 dark:text-slate-200 transition-all flex items-center justify-between group"
                  >
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                      Google CDN High-Speed Video
                    </span>
                    <span className="text-[9px] text-teal-600 dark:text-teal-400 font-bold font-mono">Instant play</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTempUrlInput('https://www.youtube.com/watch?v=y3YFpXv7o6s')}
                    className="w-full text-left px-3 py-2 bg-slate-50 dark:bg-slate-800/50 hover:bg-teal-50 dark:hover:bg-teal-950/20 border border-slate-200 dark:border-slate-800 rounded-xl text-[11px] text-slate-700 dark:text-slate-200 transition-all flex items-center justify-between group"
                  >
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                      YouTube Facility Tour (Highly Reliable)
                    </span>
                    <span className="text-[9px] text-red-600 dark:text-red-400 font-bold font-mono">Recommended</span>
                  </button>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950/40 p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800 text-[10px] text-slate-500">
                💡 <strong>YouTube support:</strong> If you uploaded the video to YouTube, you can paste its link here and it will play instantly in the interactive player!
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowVideoModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 dark:bg-transparent dark:hover:bg-slate-800 rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-[#0A4D8C] hover:bg-blue-800 dark:bg-teal-600 dark:hover:bg-teal-550 rounded-xl transition-all cursor-pointer"
                >
                  Apply & Stream
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* UPDATE EMERGENCY CONTACT HOTLINES MODAL FORM */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in animate-duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg p-6 shadow-2xl relative">
            <h3 className="font-sans font-extrabold text-lg text-slate-950 dark:text-white mb-2">
              Update Emergency & Liaison Hotlines
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              Customize the labels and phone numbers of the clinical helpdesks. Changes will immediately synchronize across the entire application interface.
            </p>

            <form onSubmit={handleSaveContactDetails} className="space-y-4">
              {/* Desk Line 1 */}
              <div className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest font-mono">
                  Line 1 (Primary Emergency)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Label Name</label>
                    <input
                      type="text"
                      value={tempDesk1Label}
                      onChange={(e) => setTempDesk1Label(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={tempDesk1Phone}
                      onChange={(e) => setTempDesk1Phone(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Desk Line 2 */}
              <div className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest font-mono">
                  Line 2 (OPD Helpdesk)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Label Name</label>
                    <input
                      type="text"
                      value={tempDesk2Label}
                      onChange={(e) => setTempDesk2Label(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={tempDesk2Phone}
                      onChange={(e) => setTempDesk2Phone(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Liaison Desk */}
              <div className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest font-mono">
                  Line 3 (Liaison & Admin)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Label Name</label>
                    <input
                      type="text"
                      value={tempLiaisonLabel}
                      onChange={(e) => setTempLiaisonLabel(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={tempLiaisonPhone}
                      onChange={(e) => setTempLiaisonPhone(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 font-sans">
                <button
                  type="button"
                  onClick={() => setShowContactModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 dark:bg-transparent dark:hover:bg-slate-800 rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-[#0A4D8C] hover:bg-blue-800 dark:bg-teal-600 dark:hover:bg-teal-550 rounded-xl transition-all cursor-pointer shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
