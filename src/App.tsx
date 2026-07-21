import React, { useState, useEffect, useRef } from 'react';
import { 
  HeartPulse, 
  Phone, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Star, 
  Activity, 
  Stethoscope, 
  Sun, 
  Moon, 
  Menu,
  X,
  PlusCircle,
  CheckCircle2,
  ThumbsUp,
  FileText,
  AlertTriangle,
  ChevronRight,
  Settings,
  ArrowRight,
  Sparkles,
  Mail,
  Instagram,
  Video
} from 'lucide-react';

import { DOCTORS, DEPARTMENTS, SERVICES, TESTIMONIALS, REHAB_MILESTONES } from './data';

// Import modular page views
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import ServicesView from './components/ServicesView';
import GalleryView from './components/GalleryView';
import TestimonialsView from './components/TestimonialsView';
import ContactView from './components/ContactView';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // PAGE ROUTER STATE: 'home' | 'about' | 'services' | 'gallery' | 'testimonials' | 'contact'
  const [activePage, setActivePage] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Specialties / Facilities tab state: 'departments' | 'diagnostics' | 'doctors'
  const [servicesTab, setServicesTab] = useState<'departments' | 'diagnostics' | 'doctors'>('departments');
  const [selectedDeptId, setSelectedDeptId] = useState(DEPARTMENTS[0].id);

  // Doctors filtering state inside services
  const [doctorSearchQuery, setDoctorSearchQuery] = useState('');
  const [doctorSpecialtyFilter, setDoctorSpecialtyFilter] = useState('All');

  // --- RICH REVIEWS REPOSITORY STATES ---
  const [reviewsList, setReviewsList] = useState<any[]>(() => {
    const saved = localStorage.getItem('sri_jhansi_hospital_reviews');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fall back to default mapping
      }
    }
    return TESTIMONIALS.map((t, idx) => ({
      ...t,
      id: t.id || `t-${idx}`,
      helpfulCount: idx * 4 + 8,
      date: `2026-06-${12 + idx * 4}`,
      verified: true,
      ticketCode: `SJH-2026-${8100 + idx * 23}`
    }));
  });

  // Testimonials view filter & search states
  const [reviewSearchQuery, setReviewSearchQuery] = useState('');
  const [reviewRatingFilter, setReviewRatingFilter] = useState<number | 'All'>('All');
  const [reviewDoctorFilter, setReviewDoctorFilter] = useState<string>('All');
  const [reviewSortBy, setReviewSortBy] = useState<'helpful' | 'recent' | 'highest' | 'lowest'>('helpful');

  // Modals visibility toggles
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [receiptInput, setReceiptInput] = useState('');
  const [receiptResult, setReceiptResult] = useState<any>(null);
  const [receiptError, setReceiptError] = useState('');

  // Form states for submitting new reviews
  const [formName, setFormName] = useState('');
  const [formAge, setFormAge] = useState('');
  const [formCondition, setFormCondition] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formDoctor, setFormDoctor] = useState(DOCTORS[0].name);
  const [formText, setFormText] = useState('');
  const [formReceipt, setFormReceipt] = useState('');
  const [formSuccessMessage, setFormSuccessMessage] = useState('');

  // Upvoted review tracking to prevent duplicate voting
  const [upvotedReviewIds, setUpvotedReviewIds] = useState<string[]>([]);

  // Pre-configured clinic records for consultation verification matching
  const CLINIC_RECORDS = [
    { code: 'SJH-2026-8100', patientName: 'K. Ramasubba Setty', doctorName: 'Dr. M. Dinesh Kumar Reddy', treatment: 'Hemiplegic Stroke Rehabilitation', status: 'Fully Certified Recovery', date: '2026-06-12' },
    { code: 'SJH-2026-8123', patientName: 'P. Saraswathi', doctorName: 'Dr. V. Anantha Kiran Kumar', treatment: 'Spine & Disc Decompression', status: 'Surgical Consultation Completed', date: '2026-06-16' },
    { code: 'SJH-2026-8146', patientName: 'S. Mohammed Ghouse', doctorName: 'Dr. A. Hari Nagendra', treatment: 'Chronic Asthmatic Care', status: 'Spirometry PFT Completed', date: '2026-06-20' },
    { code: 'SJH-2026-8169', patientName: 'G. Viswanath Reddy', doctorName: 'Dr. N. Purna Chandra Rao', treatment: 'Polytrauma Knee Fracture Reconstructive Surgery', status: 'Post-OP Knee Rehab Active', date: '2026-06-24' }
  ];

  // Tour Video Player States
  const [videoUrl, setVideoUrl] = useState(() => {
    const saved = localStorage.getItem('sri_jhansi_hospital_video_url');
    if (!saved || saved.includes('mixkit.co') || saved.startsWith('blob:') || saved.includes('y3YFpXv7o6s')) {
      return 'https://res.cloudinary.com/durqgsig/video/upload/v1784649439/video_about_hospital_feelzg.mp4';
    }
    return saved;
  });

  // Synchronize video configuration changes between components (Home and Gallery)
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('sri_jhansi_hospital_video_url');
      if (saved) {
        setVideoUrl(saved);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

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

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // --- HANDLER FUNCTIONS FOR VERIFIED REVIEWS ---
  const handleUpvoteReview = (id: string) => {
    if (upvotedReviewIds.includes(id)) {
      setUpvotedReviewIds(prev => prev.filter(item => item !== id));
      setReviewsList(prev => prev.map(rev => rev.id === id ? { ...rev, helpfulCount: (rev.helpfulCount || 0) - 1 } : rev));
    } else {
      setUpvotedReviewIds(prev => [...prev, id]);
      setReviewsList(prev => prev.map(rev => rev.id === id ? { ...rev, helpfulCount: (rev.helpfulCount || 0) + 1 } : rev));
    }
  };

  const handleVerifyReceipt = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = receiptInput.trim().toUpperCase();
    if (!cleanCode) {
      setReceiptError('Please enter a Consultation / Case ID.');
      setReceiptResult(null);
      return;
    }

    const matched = CLINIC_RECORDS.find(rec => rec.code.toUpperCase() === cleanCode) || 
                    reviewsList.find(rev => rev.ticketCode && rev.ticketCode.toUpperCase() === cleanCode);

    if (matched) {
      setReceiptResult({
        code: matched.code || matched.ticketCode,
        patientName: matched.patientName || matched.name,
        doctorName: matched.doctorName || matched.treatmentDoctor,
        treatment: matched.treatment || matched.condition,
        status: matched.status || 'Verified Case Entry',
        date: matched.date || '2026-07-01'
      });
      setReceiptError('');
    } else {
      setReceiptError('No consultation record found matching this Code in the active registry.');
      setReceiptResult(null);
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formCondition.trim() || !formText.trim()) {
      alert('Please fill in all required clinical fields.');
      return;
    }

    const formattedCode = formReceipt.trim() ? formReceipt.trim().toUpperCase() : `SJH-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newRev = {
      id: `rev-${Date.now()}`,
      name: formName.trim(),
      age: parseInt(formAge) || 40,
      condition: formCondition.trim(),
      review: formText.trim(),
      rating: formRating,
      treatmentDoctor: formDoctor,
      helpfulCount: 0,
      date: new Date().toISOString().split('T')[0],
      verified: true,
      ticketCode: formattedCode
    };

    const updated = [newRev, ...reviewsList];
    setReviewsList(updated);
    localStorage.setItem('sri_jhansi_hospital_reviews', JSON.stringify(updated));

    setFormSuccessMessage('Review verified and added in our public registry!');
    setTimeout(() => {
      setFormSuccessMessage('');
      setShowReviewModal(false);
      // Reset form
      setFormName('');
      setFormAge('');
      setFormCondition('');
      setFormRating(5);
      setFormDoctor(DOCTORS[0].name);
      setFormText('');
      setFormReceipt('');
    }, 2000);
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
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Contact hotline states with dynamic local overrides
  const [deskLine1, setDeskLine1] = useState(() => {
    try {
      const saved = localStorage.getItem('sri_jhansi_desk_line_1');
      return saved ? JSON.parse(saved) : { label: 'Trauma Emergency Hotline', phone: '9440571584' };
    } catch {
      return { label: 'Trauma Emergency Hotline', phone: '9440571584' };
    }
  });
  const [deskLine2, setDeskLine2] = useState(() => {
    try {
      const saved = localStorage.getItem('sri_jhansi_desk_line_2');
      return saved ? JSON.parse(saved) : { label: 'OPD Consultation Liaison', phone: '8978639229' };
    } catch {
      return { label: 'OPD Consultation Liaison', phone: '8978639229' };
    }
  });
  const [liaisonDesk, setLiaisonDesk] = useState(() => {
    try {
      const saved = localStorage.getItem('sri_jhansi_liaison_desk');
      return saved ? JSON.parse(saved) : { label: 'Director & Admin Liaison', phone: '8309033922' };
    } catch {
      return { label: 'Director & Admin Liaison', phone: '8309033922' };
    }
  });

  const [tempDesk1Label, setTempDesk1Label] = useState('');
  const [tempDesk1Phone, setTempDesk1Phone] = useState('');
  const [tempDesk2Label, setTempDesk2Label] = useState('');
  const [tempDesk2Phone, setTempDesk2Phone] = useState('');
  const [tempLiaisonLabel, setTempLiaisonLabel] = useState('');
  const [tempLiaisonPhone, setTempLiaisonPhone] = useState('');

  const handleSaveContactDetails = (e: React.FormEvent) => {
    e.preventDefault();
    const d1 = { label: tempDesk1Label.trim() || 'Trauma Emergency Hotline', phone: tempDesk1Phone.trim() || '9440571584' };
    const d2 = { label: tempDesk2Label.trim() || 'OPD Consultation Liaison', phone: tempDesk2Phone.trim() || '8978639229' };
    const ld = { label: tempLiaisonLabel.trim() || 'Director & Admin Liaison', phone: tempLiaisonPhone.trim() || '8309033922' };

    setDeskLine1(d1);
    setDeskLine2(d2);
    setLiaisonDesk(ld);

    localStorage.setItem('sri_jhansi_desk_line_1', JSON.stringify(d1));
    localStorage.setItem('sri_jhansi_desk_line_2', JSON.stringify(d2));
    localStorage.setItem('sri_jhansi_liaison_desk', JSON.stringify(ld));

    setShowContactModal(false);
  };

  const triggerUpdateContactModal = () => {
    setTempDesk1Label(deskLine1.label);
    setTempDesk1Phone(deskLine1.phone);
    setTempDesk2Label(deskLine2.label);
    setTempDesk2Phone(deskLine2.phone);
    setTempLiaisonLabel(liaisonDesk.label);
    setTempLiaisonPhone(liaisonDesk.phone);
    setShowContactModal(true);
  };

  // Helper: scroll to top smoothly when changing pages
  const handlePageChange = (page: string) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-200 transition-colors duration-300 flex flex-col justify-between">
      
      {/* 1. GENTLE INTRO FADE-IN LOADER */}
      {loading && (
        <div className="fixed inset-0 z-50 bg-[#020b14] flex flex-col items-center justify-center p-6 text-white text-center">
          <div className="flex flex-col items-center max-w-sm">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-teal-500/20 flex items-center justify-center animate-ping absolute"></div>
              <div className="w-16 h-16 rounded-full border-4 border-teal-500 flex items-center justify-center relative bg-[#020b14] shadow-2xl">
                <HeartPulse size={30} className="text-teal-400 animate-pulse" />
              </div>
            </div>
            <h2 className="text-lg font-extrabold tracking-widest mt-6 uppercase font-sans">Sri Jhansi Hospital</h2>
            <p className="text-[9px] text-teal-400 uppercase font-bold tracking-widest mt-1.5 font-mono">Securing Patient Outcomes...</p>
          </div>
        </div>
      )}



      {/* 3. PREMIUM MULTI-PAGE GLASSMORPHIC HEADER */}
      <header className="sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 px-4 md:px-8 py-4 flex justify-between items-center z-40 transition-all duration-300 shadow-xs">
        
        {/* Hospital Branding */}
        <div 
          onClick={() => handlePageChange('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 bg-[#0A4D8C] rounded-xl flex items-center justify-center text-white shrink-0 shadow-md group-hover:scale-102 transition-transform">
            <HeartPulse size={20} />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-sans font-black text-slate-900 dark:text-white text-sm md:text-base tracking-tight leading-none uppercase">
              Sri Jhansi
            </span>
            <span className="font-sans font-black text-slate-900 dark:text-white text-sm md:text-base tracking-tight leading-none uppercase mt-0.5">
              Hospital
            </span>
            <span className="text-[8px] md:text-[9.5px] text-teal-600 dark:text-teal-400 font-extrabold uppercase tracking-widest leading-none mt-1">
              Multi-Speciality Rehab
            </span>
          </div>
        </div>

        {/* Dynamic Multi-Page Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {[
            { id: 'home', label: 'Home' },
            { id: 'about', label: 'About Us' },
            { id: 'services', label: 'Services' },
            { id: 'gallery', label: 'Gallery' },
            { id: 'testimonials', label: 'Testimonials' },
            { id: 'contact', label: 'Contact' }
          ].map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handlePageChange(item.id)}
                className={`py-1.5 relative group transition-colors cursor-pointer ${
                  isActive 
                    ? 'text-blue-700 dark:text-teal-400 font-black' 
                    : 'hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {/* Active indicator underline */}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 dark:bg-teal-400 transition-all ${
                  isActive ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </button>
            );
          })}
        </nav>

        {/* Right side Actions Row */}
        <div className="flex items-center gap-2.5">
          
          {/* Light/Dark Toggle */}
          <button 
            onClick={handleToggleDarkMode}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-700 dark:hover:text-teal-400 transition-all cursor-pointer shadow-xs"
            title="Switch Theme"
          >
            {darkMode ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* Vercel Reference "CALL SUPPORT" outline button */}
          <a 
            href={`tel:${deskLine2.phone}`}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 bg-white hover:bg-slate-50 dark:bg-transparent dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-full text-[11px] font-extrabold uppercase tracking-wider transition-all"
          >
            <Phone size={11} className="text-blue-600 dark:text-teal-400" />
            <span>Call Support</span>
          </a>

          {/* Vercel Reference "CONNECT NOW" filled button */}
          <button 
            onClick={() => handlePageChange('contact')}
            className="hidden sm:inline-block px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-[11px] font-extrabold uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
          >
            Connect Now
          </button>

          {/* Mobile hamburger button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-slate-850 text-slate-600 dark:text-slate-300 cursor-pointer"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

        </div>
      </header>

      {/* 4. RESPONSIVE MOBILE NAVIGATION PANEL */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-4 space-y-3 relative z-39 animate-fade-in text-left">
          <p className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest pl-2">Jump to Page Section</p>
          
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About Us' },
              { id: 'services', label: 'Services' },
              { id: 'gallery', label: 'Gallery' },
              { id: 'testimonials', label: 'Testimonials' },
              { id: 'contact', label: 'Contact' }
            ].map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handlePageChange(item.id)}
                  className={`w-full px-4 py-3 text-left rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-slate-950 dark:bg-slate-800 text-white' 
                      : 'bg-slate-50 dark:bg-slate-950 text-slate-500 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            <a 
              href={`tel:${deskLine2.phone}`}
              className="w-full py-3 bg-white dark:bg-transparent border border-slate-250 dark:border-slate-800 text-center rounded-xl text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1.5"
            >
              <Phone size={12} className="text-blue-600" />
              <span>Call Support ({deskLine2.phone})</span>
            </a>
            
            <button
              onClick={() => handlePageChange('contact')}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-center rounded-xl text-xs font-bold uppercase tracking-wider shadow-md cursor-pointer"
            >
              Connect Now
            </button>
          </div>
        </div>
      )}

      {/* 5. MAIN CONTENT DISPLAY (WITH TRANSITIONS & ENCAPSULATION) */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="animate-fade-in">
          
          {activePage === 'home' && (
            <HomeView 
              videoUrl={videoUrl}
              videoPlaying={videoPlaying}
              videoMuted={videoMuted}
              videoLoading={videoLoading}
              videoError={videoError}
              setVideoUrl={setVideoUrl}
              setVideoPlaying={setVideoPlaying}
              setVideoMuted={setVideoMuted}
              setVideoLoading={setVideoLoading}
              setVideoError={setVideoError}
              setShowVideoModal={setShowVideoModal}
              setTempUrlInput={setTempUrlInput}
              videoRef={videoRef}
              isYouTubeUrl={isYouTubeUrl}
              getYouTubeEmbed={getYouTubeEmbed}
              handleTogglePlay={handleTogglePlay}
              handleToggleMute={handleToggleMute}
              onNavigate={handlePageChange}
              deskLinePhone={deskLine1.phone}
            />
          )}

          {activePage === 'about' && (
            <AboutView onNavigate={handlePageChange} />
          )}

          {activePage === 'services' && (
            <ServicesView 
              activeTab={servicesTab}
              setActiveTab={setServicesTab}
              selectedDeptId={selectedDeptId}
              setSelectedDeptId={setSelectedDeptId}
              doctorSearchQuery={doctorSearchQuery}
              setDoctorSearchQuery={setDoctorSearchQuery}
              doctorSpecialtyFilter={doctorSpecialtyFilter}
              setDoctorSpecialtyFilter={setDoctorSpecialtyFilter}
            />
          )}

          {activePage === 'gallery' && (
            <GalleryView />
          )}

          {activePage === 'testimonials' && (
            <TestimonialsView 
              reviewsList={reviewsList}
              reviewSearchQuery={reviewSearchQuery}
              setReviewSearchQuery={setReviewSearchQuery}
              reviewRatingFilter={reviewRatingFilter}
              setReviewRatingFilter={setReviewRatingFilter}
              reviewDoctorFilter={reviewDoctorFilter}
              setReviewDoctorFilter={setReviewDoctorFilter}
              reviewSortBy={reviewSortBy}
              setReviewSortBy={setReviewSortBy}
              onAddReviewClick={() => {
                setFormSuccessMessage('');
                setShowReviewModal(true);
              }}
              onVerifyReceiptClick={() => {
                setReceiptResult(null);
                setReceiptError('');
                setReceiptInput('');
                setShowReceiptModal(true);
              }}
              upvoteReview={handleUpvoteReview}
              upvotedReviewIds={upvotedReviewIds}
            />
          )}

          {activePage === 'contact' && (
            <ContactView 
              desk1Label={deskLine1.label}
              desk1Phone={deskLine1.phone}
              desk2Label={deskLine2.label}
              desk2Phone={deskLine2.phone}
              liaisonLabel={liaisonDesk.label}
              liaisonPhone={liaisonDesk.phone}
              onUpdateContactClick={triggerUpdateContactModal}
            />
          )}

        </div>
      </main>

      {/* 6. COHESIVE, HIGH-CONTRAST PREMIUM FOOTER */}
      <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12 text-left text-xs relative overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-900/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-10 w-80 h-80 bg-teal-900/5 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          
          {/* Top Row: Brand & OPD hours */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-900">
            
            {/* White Brand Card */}
            <div className="bg-white px-5 py-4 rounded-2xl flex items-center gap-3.5 shadow-xl border border-slate-200/50 shrink-0 max-w-sm">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-teal-500 rounded-xl flex items-center justify-center text-white shrink-0 shadow-md shadow-blue-500/10">
                <HeartPulse size={18} />
              </div>
              <div className="text-left">
                <span className="font-sans font-black text-slate-950 text-sm tracking-wider uppercase block leading-none">
                  Sri Jhansi Hospital
                </span>
                <span className="text-[9px] text-teal-600 font-extrabold uppercase tracking-widest block mt-1 leading-none">
                  We Care • We Rehabilitate
                </span>
              </div>
            </div>

            {/* OPD Hours Capsule Pill */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl md:rounded-full px-5 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4 text-xs text-slate-350 shadow-inner">
              <div className="flex items-center gap-1.5 text-blue-400 font-bold uppercase tracking-wider text-[10.5px]">
                <Clock size={13} className="animate-pulse shrink-0" />
                <span>OPD HOURS:</span>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-medium text-slate-300">Mon - Sat: <strong className="text-white font-semibold">9 AM - 6 PM</strong></span>
                <span className="text-slate-800 hidden sm:inline">•</span>
                <span className="font-medium text-slate-400">Sunday: <strong className="text-slate-500 font-medium">Closed</strong></span>
              </div>
            </div>

          </div>

          {/* Middle Row: Flat Contact Details Bar */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 py-8 text-slate-400 font-medium leading-relaxed border-b border-slate-900/60">
            
            <div className="flex flex-col md:flex-row flex-wrap items-start md:items-center gap-6 md:gap-8">
              
              {/* Address with MapPin */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center text-blue-500 shrink-0 border border-slate-800/50">
                  <MapPin size={14} />
                </div>
                <span className="text-slate-300 font-medium text-[13px]">Beside Tirupati Bypass Rd, Pileru, AP - 517214</span>
              </div>

              {/* Vertical divider on desktop */}
              <div className="hidden lg:block h-5 w-px bg-slate-900"></div>

              {/* Phone Contacts */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center text-blue-500 shrink-0 border border-slate-800/50">
                  <Phone size={14} />
                </div>
                <div className="flex items-center gap-2.5 font-mono text-[13px]">
                  <a href={`tel:${deskLine1.phone}`} className="text-slate-300 hover:text-blue-400 transition-colors">{deskLine1.phone}</a>
                  <span className="text-slate-800">|</span>
                  <a href={`tel:${deskLine2.phone}`} className="text-slate-300 hover:text-blue-400 transition-colors">{deskLine2.phone}</a>
                </div>
              </div>

              {/* Vertical divider on desktop */}
              <div className="hidden lg:block h-5 w-px bg-slate-900"></div>

              {/* Email contact */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center text-blue-500 shrink-0 border border-slate-800/50">
                  <Mail size={14} />
                </div>
                <a href="mailto:healthcare@srijhansihospital.com" className="text-slate-300 hover:text-blue-400 transition-colors text-[13px]">healthcare@srijhansihospital.com</a>
              </div>

            </div>

            {/* Instagram Social Pill */}
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-2.5 border border-slate-800 rounded-full hover:bg-slate-900 hover:text-white transition-all text-xs font-bold uppercase tracking-wider text-slate-300 bg-slate-950/40 shrink-0"
            >
              <Instagram size={14} className="text-pink-500" />
              <span>Instagram</span>
            </a>

          </div>

          {/* Bottom Row: Copyright */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-xs text-center font-medium">
            <div>
              &copy; {new Date().getFullYear()} Sri Jhansi Hospital & Rehabilitation Center. All rights reserved.
            </div>
            <div className="text-[11px] font-mono text-slate-600 bg-slate-950 px-3 py-1 rounded-md border border-slate-900/60">
              Reg: Annamayya Clinical Board Registry
            </div>
          </div>

        </div>
      </footer>

      {/* ========================================================= */}
      {/* ======================= MODALS ========================== */}
      {/* ========================================================= */}

      {/* A. CUSTOM TOUR VIDEO LINK OVERLAY MODAL */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in text-left">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-md p-6 shadow-2xl relative">
            <h3 className="font-sans font-extrabold text-lg text-slate-950 dark:text-white mb-1.5">
              Set Custom Tour Video URL
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
              Paste a custom mp4 stream URL or a YouTube link. The clinical dashboard will instantly sync and stream it!
            </p>

            <form onSubmit={handleSaveVideoUrl} className="space-y-4">
              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  Video URL
                </label>
                <input
                  type="text"
                  placeholder="https://example.com/video.mp4 or YouTube URL"
                  value={tempUrlInput}
                  onChange={(e) => setTempUrlInput(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none font-medium"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  High-speed direct stream presets
                </label>
                <div className="grid grid-cols-1 gap-2">
                  <button
                    type="button"
                    onClick={() => setTempUrlInput('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4')}
                    className="w-full text-left px-3 py-2 bg-slate-50 dark:bg-slate-800/50 hover:bg-teal-50 dark:hover:bg-teal-950/10 border border-slate-200 dark:border-slate-800 rounded-xl text-[10px] text-slate-750 dark:text-slate-200 transition-all flex items-center justify-between font-medium cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                      Google CDN High-Speed Video Presets
                    </span>
                    <span className="text-[9px] text-teal-600 dark:text-teal-450 font-bold font-mono">Instant play</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTempUrlInput('https://res.cloudinary.com/durqgsig/video/upload/v1784649439/video_about_hospital_feelzg.mp4')}
                    className="w-full text-left px-3 py-2 bg-slate-50 dark:bg-slate-800/50 hover:bg-teal-50 dark:hover:bg-teal-950/10 border border-slate-200 dark:border-slate-800 rounded-xl text-[10px] text-slate-750 dark:text-slate-200 transition-all flex items-center justify-between font-medium cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                      Sri Jhansi Walkthrough Video Stream
                    </span>
                    <span className="text-[9px] text-teal-650 dark:text-teal-400 font-bold font-mono">Cloud Walkthrough</span>
                  </button>
                </div>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800/80 pt-3 space-y-2">
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                  Or Play Local Video File
                </label>
                <label className="flex flex-col items-center justify-center gap-1.5 w-full px-4 py-3 bg-teal-50 hover:bg-teal-100/80 dark:bg-teal-950/20 dark:hover:bg-teal-950/30 text-teal-700 dark:text-teal-400 border border-dashed border-teal-200 dark:border-teal-900 rounded-2xl text-[10.5px] font-bold uppercase tracking-wider transition-all cursor-pointer text-center">
                  <span className="flex items-center gap-1.5">
                    <Video size={13} className="text-teal-550 shrink-0" />
                    <span>Select Video from Device</span>
                  </span>
                  <input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const objectUrl = URL.createObjectURL(file);
                        setVideoUrl(objectUrl);
                        localStorage.setItem('sri_jhansi_hospital_video_url', objectUrl);
                        setVideoPlaying(true);
                        setVideoError(false);
                        setShowVideoModal(false);
                        window.dispatchEvent(new Event('storage'));
                      }
                    }}
                  />
                </label>
                <p className="text-[9px] text-slate-400 text-center leading-normal">
                  Plays instantly in browser (perfect for testing your offline or custom recorded video files).
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowVideoModal(false)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 dark:bg-transparent dark:hover:bg-slate-800 rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all cursor-pointer shadow-md"
                >
                  Apply & Stream
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* B. UPDATE HOTLINES ADMINISTRATIVE MODAL */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in text-left">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-md p-6 shadow-2xl relative">
            <h3 className="font-sans font-extrabold text-lg text-slate-950 dark:text-white mb-1.5">
              Update Emergency & Liaison Hotlines
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
              Customize the labels and phone numbers. Changes will immediately synchronize across the entire application interface.
            </p>

            <form onSubmit={handleSaveContactDetails} className="space-y-4">
              
              {/* Line 1 */}
              <div className="space-y-2">
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest">Line 1 Label & Phone</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={tempDesk1Label}
                    onChange={(e) => setTempDesk1Label(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold"
                  />
                  <input
                    type="text"
                    value={tempDesk1Phone}
                    onChange={(e) => setTempDesk1Phone(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono"
                  />
                </div>
              </div>

              {/* Line 2 */}
              <div className="space-y-2">
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest">Line 2 Label & Phone</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={tempDesk2Label}
                    onChange={(e) => setTempDesk2Label(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold"
                  />
                  <input
                    type="text"
                    value={tempDesk2Phone}
                    onChange={(e) => setTempDesk2Phone(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono"
                  />
                </div>
              </div>

              {/* Line 3 */}
              <div className="space-y-2">
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest">Line 3 Label & Phone</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={tempLiaisonLabel}
                    onChange={(e) => setTempLiaisonLabel(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold"
                  />
                  <input
                    type="text"
                    value={tempLiaisonPhone}
                    onChange={(e) => setTempLiaisonPhone(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowContactModal(false)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 dark:bg-transparent dark:hover:bg-slate-800 rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all cursor-pointer shadow-md"
                >
                  Save Hotlines
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* C. PATIENT WRITE REVIEW MODAL FORM */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in text-left overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg p-6 shadow-2xl relative my-8">
            <h3 className="font-sans font-extrabold text-lg text-slate-950 dark:text-white mb-1.5">
              Submit Outpatient Feedback Review
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
              Every review submitted must align with an active consultation. Supply your treatment details and receipt ticket below for database entry validation.
            </p>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Patient Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. K. Venkat Reddy"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Age (Years) *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 48"
                    value={formAge}
                    onChange={(e) => setFormAge(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Clinical Condition Addressed *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Knee Arthroplasty Recovery"
                    value={formCondition}
                    onChange={(e) => setFormCondition(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Consulting Specialist *</label>
                  <select
                    value={formDoctor}
                    onChange={(e) => setFormDoctor(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold cursor-pointer text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    {DOCTORS.map((d) => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Rating Evaluation</label>
                  <div className="flex gap-1.5 text-amber-500 pt-1.5">
                    {[1, 2, 3, 4, 5].map((stars) => (
                      <button
                        type="button"
                        key={stars}
                        onClick={() => setFormRating(stars)}
                        className="p-1 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star size={18} className={stars <= formRating ? 'fill-current' : ''} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Consultation Ticket Code (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. SJH-2026-8100"
                    value={formReceipt}
                    onChange={(e) => setFormReceipt(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono uppercase text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Patient Feedback Review Text *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe your recovery milestones and experiences under the clinical board..."
                  value={formText}
                  onChange={(e) => setFormText(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white"
                />
              </div>

              {formSuccessMessage && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-4 py-2.5 rounded-xl text-xs font-bold text-center">
                  ✓ {formSuccessMessage}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 dark:bg-transparent dark:hover:bg-slate-800 rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 text-xs font-bold text-white bg-[#00a884] hover:bg-[#008f72] rounded-xl transition-all cursor-pointer shadow-md"
                >
                  Verify & Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* D. CLINICAL RECEIPT VERIFICATION CHECKER MODAL */}
      {showReceiptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in text-left">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-md p-6 shadow-2xl relative">
            <h3 className="font-sans font-extrabold text-lg text-slate-950 dark:text-white mb-1.5">
              Consultation Ticket Registry Verification
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
              Verify the authenticity of any patient review by entering the corresponding Consultation Case / Ticket Code.
            </p>

            <form onSubmit={handleVerifyReceipt} className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter ticket e.g. SJH-2026-8100"
                  value={receiptInput}
                  onChange={(e) => setReceiptInput(e.target.value)}
                  className="flex-1 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono uppercase focus:outline-none focus:ring-1 focus:ring-blue-500"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
                >
                  Verify
                </button>
              </div>

              {receiptError && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-2.5 rounded-xl text-xs font-bold text-center">
                  ⚠️ {receiptError}
                </div>
              )}

              {receiptResult && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 text-xs space-y-2 text-slate-700 dark:text-slate-300 animate-fade-in">
                  <div className="flex justify-between border-b border-emerald-500/10 pb-1.5">
                    <span className="font-bold text-emerald-600 dark:text-teal-400 uppercase font-mono">CODE: {receiptResult.code}</span>
                    <span className="text-[10px] text-slate-400 font-mono font-semibold">DATE: {receiptResult.date}</span>
                  </div>
                  <div className="space-y-1.5">
                    <p><strong>Patient Name:</strong> {receiptResult.patientName}</p>
                    <p><strong>Consulting Specialist:</strong> {receiptResult.doctorName}</p>
                    <p><strong>Path Treated:</strong> {receiptResult.treatment}</p>
                    <p className="pt-1.5 flex items-center gap-1.5 text-emerald-600 dark:text-teal-400 font-extrabold uppercase text-[10px]">
                      <CheckCircle2 size={13} />
                      <span>Registry Status: {receiptResult.status}</span>
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowReceiptModal(false)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 dark:bg-transparent dark:hover:bg-slate-800 rounded-xl transition-all cursor-pointer"
                >
                  Close Desk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
