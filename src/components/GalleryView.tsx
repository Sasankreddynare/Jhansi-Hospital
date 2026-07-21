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
  Heart
} from 'lucide-react';

interface VideoChapter {
  time: string;
  seconds: number;
  title: string;
  description: string;
  doctor?: string;
  category: 'Infrastructure' | 'Specialist Consultation' | 'Diagnostics & Equipment' | 'Emergency Contact';
}

const TOUR_CHAPTERS: VideoChapter[] = [
  {
    time: "0:00",
    seconds: 0,
    title: "Intro & Clinical Premise",
    description: "Welcome to Sri Jhansi Multi-Speciality Ortho & Stroke Rehab Centre in Piler town.",
    category: "Infrastructure"
  },
  {
    time: "0:10",
    seconds: 10,
    title: "General Wards & Nursing Stations",
    description: "Overview of high-quality sanitation, clean lobbies, and active general wards.",
    category: "Infrastructure"
  },
  {
    time: "0:23",
    seconds: 23,
    title: "Orthopaedics & Physiotherapy",
    description: "Specialist consultation with Chief Doctor Dr. M. Dinesh Kumar Reddy (MPT Ortho).",
    doctor: "Dr. M. Dinesh Kumar Reddy",
    category: "Specialist Consultation"
  },
  {
    time: "0:32",
    seconds: 32,
    title: "Pulmonology & Asthmatic Care",
    description: "Clinical brief with General & Chest Physician Dr. Atla Hari Nagendra (Pulmonary).",
    doctor: "Dr. Atla Hari Nagendra",
    category: "Specialist Consultation"
  },
  {
    time: "0:56",
    seconds: 56,
    title: "Joint & Spine Surgery Triage",
    description: "Bone and Joint surgery briefing under Dr. N. Purnachandra Rao (MS Ortho, MS London).",
    doctor: "Dr. N. Purnachandra Rao",
    category: "Specialist Consultation"
  },
  {
    time: "1:15",
    seconds: 115,
    title: "Brain & Spine Neurosurgery",
    description: "Micro-decompression and neurological treatment under Dr. Anantha Kiran Kumar.",
    doctor: "Dr. Anantha Kiran Kumar",
    category: "Specialist Consultation"
  },
  {
    time: "2:00",
    seconds: 120,
    title: "Advanced Diagnostic Facilities",
    description: "Interactive tour of high-end CT scans, fully automated labs, and digital X-rays.",
    category: "Diagnostics & Equipment"
  },
  {
    time: "2:12",
    seconds: 132,
    title: "Address & 24/7 Intake Helpline",
    description: "Direct contact info, landmark guidance on Tirupati Bypass Road, and active hotlines.",
    category: "Emergency Contact"
  }
];

export default function GalleryView() {
  const [videoUrl, setVideoUrl] = useState(() => {
    const saved = localStorage.getItem('sri_jhansi_hospital_video_url');
    if (!saved || saved.includes('mixkit.co')) {
      return 'https://www.youtube.com/watch?v=y3YFpXv7o6s';
    }
    return saved;
  });

  const [activeChapter, setActiveChapter] = useState<number>(0);
  const [startSeconds, setStartSeconds] = useState<number>(0);
  const [showConfig, setShowConfig] = useState(false);
  const [inputUrl, setInputUrl] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  
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

  const getYouTubeEmbedUrl = (url: string, start: number) => {
    let videoId = 'y3YFpXv7o6s'; // default video
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      videoId = match[2];
    }
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&start=${start}&rel=0&controls=1`;
  };

  const handleChapterClick = (chapter: VideoChapter, index: number) => {
    setActiveChapter(index);
    setStartSeconds(chapter.seconds);
    
    if (!isYouTubeUrl(videoUrl) && videoRef.current) {
      videoRef.current.currentTime = chapter.seconds;
      videoRef.current.play().catch(() => {});
    }

    showToast(`Seeking to ${chapter.time} - ${chapter.title}`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 2500);
  };

  const handleSaveVideoUrl = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inputUrl.trim();
    if (!clean) return;

    setVideoUrl(clean);
    localStorage.setItem('sri_jhansi_hospital_video_url', clean);
    setStartSeconds(0);
    setActiveChapter(0);
    setShowConfig(false);
    setInputUrl('');
    showToast('Video Stream Synced successfully!');

    // Dispatch storage event to notify other components
    window.dispatchEvent(new Event('storage'));
  };

  const handleResetVideo = () => {
    const defaultUrl = 'https://www.youtube.com/watch?v=y3YFpXv7o6s';
    setVideoUrl(defaultUrl);
    localStorage.setItem('sri_jhansi_hospital_video_url', defaultUrl);
    setStartSeconds(0);
    setActiveChapter(0);
    setShowConfig(false);
    showToast('Reset to official hospital video.');
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="space-y-10 py-4 text-left">
      
      {/* HEADER SECTION */}
      <div className="text-center max-w-3xl mx-auto mb-2 space-y-3">
        <span className="inline-flex items-center gap-1 text-[10px] uppercase font-black tracking-widest text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40 px-3.5 py-1.5 rounded-full border border-teal-100/40 dark:border-teal-900/30">
          <Tv size={11} className="text-teal-500 animate-pulse" />
          Interactive Virtual Tour
        </span>
        <h2 className="text-2xl md:text-3.5xl font-sans tracking-tight font-extrabold text-slate-900 dark:text-white">
          Sri Jhansi Hospital Video Gallery
        </h2>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          Watch our verified infrastructure walkthrough, specialist clinic previews, and high-precision diagnostics labs at our Piler Town premises.
        </p>
      </div>

      {/* QUICK VIDEO STREAM SETTINGS ACTION ROW */}
      <div className="flex justify-end max-w-6xl mx-auto">
        <button
          onClick={() => {
            setInputUrl(videoUrl);
            setShowConfig(!showConfig);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border border-slate-200 dark:border-slate-800"
        >
          <Settings size={13} className={showConfig ? 'rotate-45' : ''} />
          <span>Change Video Stream</span>
        </button>
      </div>

      {/* EXPANDABLE VIDEO STREAM CONTROLLER FORM */}
      {showConfig && (
        <div className="max-w-3xl mx-auto p-5 bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-2xl shadow-xl animate-fade-in space-y-4">
          <div className="text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-1">
              Configure Video Source
            </h4>
            <p className="text-[11px] text-slate-500 leading-normal">
              Paste an external MP4 direct stream URL or any valid YouTube video link to showcase custom layouts.
            </p>
          </div>

          <form onSubmit={handleSaveVideoUrl} className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="https://youtube.com/watch?v=... or https://example.com/video.mp4"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                className="flex-grow bg-slate-50 dark:bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-850 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                required
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs whitespace-nowrap"
              >
                Sync Stream
              </button>
            </div>

            <div className="flex gap-2.5 pt-1.5">
              <button
                type="button"
                onClick={handleResetVideo}
                className="px-3.5 py-1.5 bg-slate-50 hover:bg-slate-100 dark:bg-transparent border border-slate-200 dark:border-slate-800 text-[10px] text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                Reset to Official Tour
              </button>
              <button
                type="button"
                onClick={() => setInputUrl('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4')}
                className="px-3.5 py-1.5 bg-slate-50 hover:bg-slate-100 dark:bg-transparent border border-slate-200 dark:border-slate-800 text-[10px] text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                Load Sample MP4 Presets
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TOAST SYSTEM INDICATOR */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-teal-550 text-white font-semibold text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-teal-500 animate-slide-in">
          <Activity size={13} className="animate-spin" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* VIRTUAL THEATRE & CHAPTER TIMELINE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
        
        {/* THEATRE PLAYER COLUMN */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          
          <div className="relative rounded-3xl overflow-hidden aspect-video bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-xl flex items-center justify-center">
            
            {/* Conditional Player rendering */}
            {isYouTubeUrl(videoUrl) ? (
              <iframe
                title="Sri Jhansi Hospital Promotional Tour"
                src={getYouTubeEmbedUrl(videoUrl, startSeconds)}
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
                className="w-full h-full object-cover"
              />
            )}

            {/* Float category indicator */}
            <span className="absolute top-4 left-4 bg-teal-600 backdrop-blur-md text-white text-[9px] font-black tracking-widest uppercase px-2.5 py-1 rounded-md z-10 flex items-center gap-1 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
              Live Video Stream
            </span>
          </div>

          {/* Current Video Info Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/85 dark:border-slate-800 p-5 rounded-3xl text-left space-y-3">
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 block">
                  NOW BROADCASTING
                </span>
                <h3 className="font-sans font-black text-slate-900 dark:text-white uppercase text-sm md:text-base tracking-tight flex items-center gap-2">
                  <Video size={16} className="text-teal-500" />
                  {isYouTubeUrl(videoUrl) ? "Official Clinical Showcase & Tour Video" : "Custom Direct Video stream File"}
                </h3>
              </div>
              <a 
                href={videoUrl} 
                target="_blank" 
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
                title="Open Source Video"
              >
                <ExternalLink size={14} />
              </a>
            </div>

            <p className="text-[11px] md:text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              This digital media asset provides an on-camera verification of the clinical infrastructure at Sri Jhansi Ortho & Stroke Rehabilitation Clinic. Managed directly under Chief Specialist <strong className="text-slate-800 dark:text-slate-200">Dr. M. Dinesh Kumar Reddy</strong>.
            </p>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap gap-4 text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider">
              <div className="flex items-center gap-1.5">
                <Clock size={11} className="text-teal-500" />
                <span>Duration: ~2:30 min</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Activity size={11} className="text-teal-500" />
                <span>Format: Direct HD Embed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield size={11} className="text-teal-500" />
                <span>Clinical Registry Certified</span>
              </div>
            </div>
          </div>

        </div>

        {/* TIMELINE CHAPTERS PANEL */}
        <div className="lg:col-span-5 flex flex-col gap-4 text-left">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/85 dark:border-slate-800 rounded-3xl p-5 shadow-xs flex flex-col h-[525px]">
            
            {/* Header */}
            <div className="pb-4 border-b border-slate-100 dark:border-slate-800 space-y-1">
              <h3 className="font-sans font-black text-slate-900 dark:text-white text-xs md:text-sm uppercase tracking-wider flex items-center gap-2">
                <ListVideo size={16} className="text-teal-500" />
                Interactive Chapter Guides
              </h3>
              <p className="text-[10px] text-slate-450 leading-normal font-medium">
                Click any medical segment below to fast-forward the player to that specific clinical showcase:
              </p>
            </div>

            {/* Chapters list */}
            <div className="flex-grow overflow-y-auto pr-1.5 pt-3 space-y-3.5 scrollbar-thin">
              {TOUR_CHAPTERS.map((chap, idx) => {
                const isActive = activeChapter === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleChapterClick(chap, idx)}
                    className={`w-full text-left p-3 rounded-2xl border transition-all flex gap-3.5 items-start cursor-pointer group relative ${
                      isActive 
                        ? 'bg-slate-950 border-slate-950 text-white shadow-md scale-[1.01]' 
                        : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-950/40 border-slate-100 dark:border-slate-850 text-slate-850 hover:border-slate-200 dark:hover:border-slate-800'
                    }`}
                  >
                    {/* Timestamp Bubble */}
                    <span className={`px-2 py-1.5 rounded-lg text-[9px] font-mono font-bold shrink-0 tracking-wider flex items-center justify-center min-w-[42px] leading-none ${
                      isActive 
                        ? 'bg-teal-500 text-slate-950 font-black' 
                        : 'bg-slate-200 dark:bg-slate-850 text-slate-600 dark:text-slate-400'
                    }`}>
                      {chap.time}
                    </span>

                    {/* Chapter Info */}
                    <div className="space-y-1 min-w-0 flex-grow">
                      <div className="flex justify-between items-start gap-1">
                        <h4 className={`text-[11.5px] font-extrabold uppercase tracking-tight truncate leading-snug ${
                          isActive ? 'text-teal-300' : 'text-slate-900 dark:text-slate-100 group-hover:text-blue-700 dark:group-hover:text-teal-400'
                        }`}>
                          {chap.title}
                        </h4>
                        
                        {/* Play Indicator Icon */}
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping shrink-0 mt-1"></span>
                        )}
                      </div>

                      <p className={`text-[10.5px] leading-relaxed font-medium line-clamp-2 ${
                        isActive ? 'text-slate-350' : 'text-slate-450 dark:text-slate-400'
                      }`}>
                        {chap.description}
                      </p>

                      {chap.doctor && (
                        <div className={`text-[9px] font-mono font-extrabold uppercase tracking-widest pt-1 flex items-center gap-1 ${
                          isActive ? 'text-teal-400' : 'text-slate-500'
                        }`}>
                          <span className="w-1 h-1 rounded-full bg-current"></span>
                          {chap.doctor}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick jump instruction */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
              <span className="inline-flex items-center gap-1.5 text-[9px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                <Sliders size={10} />
                Hover & Select any Chapter to Jump
              </span>
            </div>

          </div>
        </div>

      </div>



    </div>
  );
}
