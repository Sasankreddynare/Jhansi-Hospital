import React, { useState, useEffect, useRef } from 'react';
import { 
  HeartPulse, 
  Clock, 
  Sparkles, 
  RotateCcw, 
  Tv, 
  ListVideo, 
  MonitorPlay, 
  ExternalLink, 
  Eye, 
  Activity, 
  Shield, 
  Info, 
  Phone, 
  MapPin, 
  Youtube, 
  Settings, 
  Sliders,
  CheckCircle2,
  Video,
  Play,
  Heart,
  ChevronLeft,
  ChevronRight,
  X,
  Image as ImageIcon
} from 'lucide-react';

const galleryMain = new URL('../assets/images/Gallery-main.jpeg', import.meta.url).href;
const gallery1 = new URL('../assets/images/Gallery-1.jpeg', import.meta.url).href;
const gallery2 = new URL('../assets/images/Gallery-2.jpeg', import.meta.url).href;
const gallery3 = new URL('../assets/images/Gallery-3.jpeg', import.meta.url).href;
const gallery4 = new URL('../assets/images/Gallery-4.jpeg', import.meta.url).href;
const gallery5 = new URL('../assets/images/Gallery-5.jpeg', import.meta.url).href;

const GALLERY_PHOTOS = [
  {
    src: galleryMain,
    title: "Sri Jhansi Hospital Premises",
    desc: "Our primary clinical facilities located beside Tirupati Bypass Road, Piler, featuring ample parking and accessible patient entry.",
    category: "Infrastructure"
  },
  {
    src: gallery1,
    title: "Advanced Physiotherapy Center",
    desc: "State-of-the-art orthopaedic and stroke rehabilitation unit equipped with electrotherapy and mechanized mobility training systems.",
    category: "Rehabilitation"
  },
  {
    src: gallery2,
    title: "High-Precision Diagnostic Labs",
    desc: "Fully computerized clinical pathology, biochemistry, and hormone analysis suite for accurate diagnosis and prompt reports.",
    category: "Diagnostics"
  },
  {
    src: gallery3,
    title: "Cohesive & Clean Patient Wards",
    desc: "Hygienic general and semi-private inpatient wards designed with clinical precision for patient comfort and 24/7 care monitoring.",
    category: "Wards & Inpatients"
  },
  {
    src: gallery4,
    title: "Outpatient Specialist Consulting Chamber",
    desc: "Dedicated medical chambers for expert consultation with our chief orthopaedic specialists and consulting neurologists.",
    category: "Consultations"
  },
  {
    src: gallery5,
    title: "Emergency Ortho Care & Treatment Unit",
    desc: "Emergency dressing and immediate trauma triage center fully equipped with modern medical devices and sterile tools.",
    category: "Trauma Care"
  }
];

export default function GalleryView() {
  const [videoUrl, setVideoUrl] = useState(() => {
    const saved = localStorage.getItem('sri_jhansi_hospital_video_url');
    if (!saved || saved.includes('mixkit.co') || saved.startsWith('blob:') || saved.includes('y3YFpXv7o6s')) {
      return 'https://res.cloudinary.com/durqgsig/video/upload/v1784649439/video_about_hospital_feelzg.mp4';
    }
    return saved;
  });

  const [toastMessage, setToastMessage] = useState('');
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);

  // Sync state when localStorage changes externally
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

  const isYouTubeUrl = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be') || url.includes('youtube-nocookie.com');
  };

  const getYouTubeEmbedUrl = (url: string) => {
    let videoId = 'y3YFpXv7o6s'; // default video
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      videoId = match[2];
    }
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&rel=0&controls=1`;
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhoto === null) return;
    setActivePhoto((prev) => (prev !== null && prev > 0 ? prev - 1 : GALLERY_PHOTOS.length - 1));
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhoto === null) return;
    setActivePhoto((prev) => (prev !== null && prev < GALLERY_PHOTOS.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="space-y-12 py-4 text-left">
      
      {/* HEADER SECTION */}
      <div className="text-center max-w-3xl mx-auto mb-2 space-y-3">
        <h2 className="text-2xl md:text-3.5xl font-sans tracking-tight font-extrabold text-slate-900 dark:text-white">
          Sri Jhansi Hospital Gallery
        </h2>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          Watch our verified infrastructure walkthrough video and browse through photos of our advanced ortho rehab, state-of-the-art labs, and patient recovery facilities.
        </p>
      </div>

      {/* TOAST SYSTEM INDICATOR */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-teal-550 text-white font-semibold text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-teal-500 animate-slide-in">
          <Activity size={13} className="animate-spin" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* VIRTUAL THEATRE CENTERED LAYOUT */}
      <div className="max-w-4xl mx-auto w-full flex flex-col gap-6">
        
        {/* THEATRE PLAYER CONTAINER */}
        <div className="relative rounded-3xl overflow-hidden aspect-video bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-xl flex items-center justify-center">
          
          {/* Conditional Player rendering */}
          {isYouTubeUrl(videoUrl) ? (
            <iframe
              title="Sri Jhansi Hospital Facility Tour & Doctors Showcase"
              src={getYouTubeEmbedUrl(videoUrl)}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          ) : (
            <video
              ref={videoRef}
              src={videoUrl}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain"
            />
          )}
        </div>
      </div>

      {/* CLINICAL PHOTO GALLERY SECTION */}
      <div className="max-w-6xl mx-auto pt-4 space-y-8">
        <div className="border-t border-slate-200/60 dark:border-slate-800/60 pt-10 text-center max-w-2xl mx-auto space-y-2">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-widest text-teal-600 dark:text-teal-400 uppercase bg-teal-50 dark:bg-teal-950/30 px-3 py-1 rounded-md">
            Clinical Facilities
          </span>
          <h3 className="text-xl md:text-2xl font-sans tracking-tight font-extrabold text-slate-900 dark:text-white uppercase">
            On-Premises Infrastructure Photos
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Verified photos showing high-quality infrastructure, specialized trauma care units, diagnostic systems, and rehab spaces.
          </p>
        </div>

        {/* 3x2 Grid for Gallery-*.jpeg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_PHOTOS.map((photo, idx) => (
            <div 
              key={idx}
              onClick={() => setActivePhoto(idx)}
              className="group bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/85 rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-750 transition-all duration-350 cursor-pointer flex flex-col text-left"
            >
              {/* Image box with overlay */}
              <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-950">
                <img 
                  src={photo.src}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-350 flex items-end p-4">
                  <span className="text-[10px] font-mono font-bold uppercase text-white bg-slate-950/80 px-2.5 py-1 rounded-md tracking-wider flex items-center gap-1.5 backdrop-blur-xs">
                    <Eye size={12} />
                    View Details
                  </span>
                </div>
                <span className="absolute top-3 left-3 bg-teal-600 text-white text-[9px] font-mono font-black tracking-wider uppercase px-2 py-1 rounded-md shadow-xs">
                  {photo.category}
                </span>
              </div>

              {/* Text Area */}
              <div className="p-5 flex-grow flex flex-col justify-between space-y-1.5">
                <h4 className="font-sans font-bold text-slate-900 dark:text-white text-[13px] md:text-sm uppercase tracking-tight group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  {photo.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                  {photo.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {activePhoto !== null && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActivePhoto(null)}
        >
          {/* Main frame */}
          <div 
            className="relative max-w-4xl w-full bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden flex flex-col shadow-2xl animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close trigger */}
            <button 
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-950/60 hover:bg-slate-950 text-white border border-slate-800 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Navigation Left */}
            <button 
              onClick={handlePrevPhoto}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-slate-950/60 hover:bg-slate-950 text-white border border-slate-800 transition-colors cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Navigation Right */}
            <button 
              onClick={handleNextPhoto}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-slate-950/60 hover:bg-slate-950 text-white border border-slate-800 transition-colors cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>

            {/* Large Image container */}
            <div className="aspect-video w-full bg-slate-950 flex items-center justify-center">
              <img 
                src={GALLERY_PHOTOS[activePhoto].src}
                alt={GALLERY_PHOTOS[activePhoto].title}
                referrerPolicy="no-referrer"
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Details overlay bar */}
            <div className="p-6 bg-slate-950/95 border-t border-slate-900 text-left space-y-2">
              <span className="inline-flex items-center gap-1 text-[9px] font-mono font-black text-teal-400 uppercase tracking-widest bg-teal-950/50 px-2 py-1 rounded-md">
                {GALLERY_PHOTOS[activePhoto].category}
              </span>
              <h4 className="text-base font-sans font-black text-white uppercase tracking-tight">
                {GALLERY_PHOTOS[activePhoto].title}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                {GALLERY_PHOTOS[activePhoto].desc}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
