import React from 'react';
import { 
  HeartPulse, 
  ShieldCheck, 
  ArrowRight, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Settings, 
  AlertTriangle, 
  Activity,
  Phone,
  ArrowUpRight
} from 'lucide-react';

interface HomeViewProps {
  videoUrl: string;
  videoPlaying: boolean;
  videoMuted: boolean;
  videoLoading: boolean;
  videoError: boolean;
  setVideoUrl: (url: string) => void;
  setVideoPlaying: (playing: boolean) => void;
  setVideoMuted: (muted: boolean) => void;
  setVideoLoading: (loading: boolean) => void;
  setVideoError: (error: boolean) => void;
  setShowVideoModal: (show: boolean) => void;
  setTempUrlInput: (url: string) => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isYouTubeUrl: (url: string) => boolean;
  getYouTubeEmbed: (url: string) => string;
  handleTogglePlay: () => void;
  handleToggleMute: () => void;
  onNavigate: (page: string) => void;
  deskLinePhone: string;
}

export default function HomeView({
  videoUrl,
  videoPlaying,
  videoMuted,
  videoLoading,
  videoError,
  setVideoUrl,
  setVideoPlaying,
  setVideoMuted,
  setVideoLoading,
  setVideoError,
  setShowVideoModal,
  setTempUrlInput,
  videoRef,
  isYouTubeUrl,
  getYouTubeEmbed,
  handleTogglePlay,
  handleToggleMute,
  onNavigate,
  deskLinePhone
}: HomeViewProps) {
  return (
    <div className="space-y-16">
      {/* HERO SECTION - COMPACT, CREDIBLE & DYNAMIC */}
      <section className="relative py-12 md:py-24 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 transition-colors duration-300 border-b border-slate-250/30">
        {/* Glow accent decoration */}
        <div className="absolute top-0 right-1/4 w-[350px] h-[350px] bg-teal-500/5 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-[250px] h-[250px] bg-blue-500/5 rounded-full blur-[60px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              <div className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-[#061424] text-blue-700 dark:text-blue-300 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-100/60 dark:border-blue-950/80">
                <ShieldCheck size={14} className="text-teal-500 shrink-0 animate-pulse" />
                Trusted Regional Trauma Hub & Rehab Center
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans tracking-tight font-extrabold text-slate-900 dark:text-white leading-tight">
                Advanced <span className="text-blue-600 dark:text-teal-400">Multi-Speciality Care</span> & Specialist Rehabilitation
              </h1>

              <p className="text-slate-600 dark:text-slate-350 text-xs md:text-sm leading-relaxed max-w-2xl font-medium">
                Sri Jhansi Hospital (Ortho & Neuro Rehabilitation Center) provides highly coordinated 24-hour trauma support, bone fracture reductions, neurosurgeries, and clinical physical therapies. We focus on transparent clinical outcomes designed to restore health and independence for the Piler community.
              </p>

              {/* Quick Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-md">
                <a 
                  href="https://wa.me/919440571584?text=Hi%20Sri%20Jhansi%20Hospital%20Piler%2C%20I%20have%20an%20urgent%20question."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-[#00a884] hover:bg-[#008f72] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl text-center transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-98 flex-1"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>WhatsApp Inquire</span>
                </a>
                
                <button 
                  onClick={() => onNavigate('services')}
                  className="px-6 py-3.5 bg-slate-900 text-white border border-slate-700 dark:border-blue-900/60 font-bold text-xs uppercase tracking-wider rounded-xl text-center transition-all hover:bg-slate-800 flex items-center justify-center gap-1.5 flex-1 cursor-pointer"
                >
                  <span>Explore Services</span>
                  <ArrowRight size={13} />
                </button>
              </div>

            </div>

            {/* Right Hospital Tour Video Player */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <div className="relative max-w-md mx-auto">
                <div className="absolute inset-2 bg-gradient-to-tr from-blue-600 to-teal-500 rounded-3xl opacity-15 rotate-2 scale-102 blur-sm pointer-events-none"></div>
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
                            The direct MP4 stream was blocked or expired. Select an ultra-reliable YouTube preset or Google CDN video below.
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
                            className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1"
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
                        <p className="text-xs font-semibold text-white tracking-wide">Connecting Stream...</p>
                      </div>
                    )}

                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/45 pointer-events-none z-10"></div>

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
                        className="p-1.5 bg-black/60 hover:bg-blue-600 text-white rounded-lg transition-all cursor-pointer pointer-events-auto border border-white/10"
                        title="Click to paste another video URL"
                      >
                        <Settings size={12} />
                      </button>
                    </div>

                    {/* Micro controls for direct HTML5 MP4 */}
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

                        <span className="text-[9px] font-mono font-bold text-white/80 bg-black/40 px-2 py-0.5 rounded-md">
                          {videoPlaying ? 'Looping' : 'Paused'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>



      {/* CALL TO ACTION ACCENT */}
      <section className="max-w-4xl mx-auto py-6 text-center space-y-6">
        <h2 className="text-xl md:text-2xl font-bold font-sans text-slate-900 dark:text-white">Ready to consult with our specialists?</h2>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Coordinate timing slots or check availability of doctors directly over a chat with our administrative desk.
        </p>
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md"
          >
            Locate Clinic
          </button>
          <a 
            href={`tel:${deskLinePhone}`}
            className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold text-xs uppercase tracking-wider rounded-xl transition-all inline-flex items-center gap-2"
          >
            <Phone size={13} />
            <span>Call Support</span>
          </a>
        </div>
      </section>
    </div>
  );
}
