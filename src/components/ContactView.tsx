import React from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Settings, 
  Mail, 
  Compass, 
  ChevronRight,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

interface ContactViewProps {
  desk1Label: string;
  desk1Phone: string;
  desk2Label: string;
  desk2Phone: string;
  liaisonLabel: string;
  liaisonPhone: string;
  onUpdateContactClick: () => void;
}

export default function ContactView({
  desk1Label,
  desk1Phone,
  desk2Label,
  desk2Phone,
  liaisonLabel,
  liaisonPhone,
  onUpdateContactClick
}: ContactViewProps) {
  return (
    <div className="space-y-12 py-4 text-left">
      
      {/* HEADER SECTION */}
      <div className="text-center max-w-3xl mx-auto mb-6 space-y-2">
        <span className="text-[10px] uppercase font-black tracking-widest text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40 px-3 py-1.5 rounded-full border border-teal-100/40 dark:border-teal-900/30">Connect Now</span>
        <h2 className="text-2xl md:text-3.5xl font-sans tracking-tight font-extrabold text-slate-900 dark:text-white">
          Contact Helplines & Location Finder
        </h2>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          Reach our emergency trauma desks, locate our physical rehabilitation gym on Tirupati Bypass Road, or schedule an OPD slot.
        </p>
      </div>

      {/* CORE CONTACT CARDS & ACTIONS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Desk Line 1 - Primary Emergency */}
        <div className="bg-[#0A4D8C] dark:bg-slate-900/90 text-white p-6 rounded-3xl border border-blue-900/40 dark:border-slate-800 shadow-md flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/10 rounded-full blur-xl pointer-events-none"></div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 bg-white/10 text-teal-300 rounded-xl flex items-center justify-center border border-white/5 shadow-inner">
                <Phone size={18} className="animate-pulse" />
              </div>
              <span className="text-[8.5px] font-mono font-black uppercase bg-red-500 text-white px-2 py-0.5 rounded-md tracking-wider">
                Priority Red-Zone desk
              </span>
            </div>

            <div className="text-left">
              <span className="text-[10px] font-bold text-teal-300 uppercase tracking-widest font-mono">Helpline Line 1</span>
              <h4 className="text-base font-black uppercase tracking-wide mt-1 group-hover:text-teal-300 transition-colors">
                {desk1Label}
              </h4>
              <p className="text-xs text-blue-100 dark:text-slate-400 mt-1.5 font-medium leading-relaxed">
                Connect directly with the trauma intake surgeons on call for instant fractures & critical admissions.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-white/95">{desk1Phone}</span>
            <a 
              href={`tel:${desk1Phone}`}
              className="bg-teal-500 hover:bg-teal-400 text-white px-4 py-2 rounded-xl text-[10px] font-extrabold uppercase tracking-wider transition-all shadow-md cursor-pointer"
            >
              Dial Now
            </a>
          </div>
        </div>

        {/* Desk Line 2 - OPD Helpdesk */}
        <div className="bg-white dark:bg-[#061424] p-6 rounded-3xl border border-slate-200/80 dark:border-blue-950/60 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-teal-400 flex items-center justify-center border border-blue-100/40 dark:border-blue-950/60 shadow-inner group-hover:scale-105 transition-transform">
                <Phone size={18} />
              </div>
              <span className="text-[8.5px] font-mono font-black uppercase bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-teal-400 px-2.5 py-1 rounded-md tracking-wider">
                9am - 6pm Active
              </span>
            </div>

            <div className="text-left">
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest font-mono">Helpline Line 2</span>
              <h4 className="text-base font-black uppercase tracking-wide mt-1 text-slate-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-teal-400 transition-colors">
                {desk2Label}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 font-medium leading-relaxed">
                Book physical therapy session schedules, retrieve consultation records, or check diagnostic report status.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-850 flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">{desk2Phone}</span>
            <a 
              href={`tel:${desk2Phone}`}
              className="bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700 px-4 py-2 rounded-xl text-[10px] font-extrabold uppercase tracking-wider transition-all shadow-md cursor-pointer"
            >
              Dial Now
            </a>
          </div>
        </div>

        {/* Desk Line 3 - Liaison & Admin */}
        <div className="bg-white dark:bg-[#061424] p-6 rounded-3xl border border-slate-200/80 dark:border-blue-950/60 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-teal-400 flex items-center justify-center border border-blue-100/40 dark:border-blue-950/60 shadow-inner group-hover:scale-105 transition-transform">
                <Phone size={18} />
              </div>
              <button 
                onClick={onUpdateContactClick}
                className="p-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 text-slate-500 dark:text-teal-400 rounded-lg transition-all border border-slate-200 dark:border-slate-800"
                title="Click to update hotline details"
              >
                <Settings size={12} />
              </button>
            </div>

            <div className="text-left">
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest font-mono">Helpline Line 3</span>
              <h4 className="text-base font-black uppercase tracking-wide mt-1 text-slate-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-teal-400 transition-colors">
                {liaisonLabel}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 font-medium leading-relaxed">
                Reach Chief Specialist Dr. Dinesh Kumar Reddy for medicolegal services, corporate panels, or emergency admin escalations.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-850 flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">{liaisonPhone}</span>
            <a 
              href={`tel:${liaisonPhone}`}
              className="bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700 px-4 py-2 rounded-xl text-[10px] font-extrabold uppercase tracking-wider transition-all shadow-md cursor-pointer"
            >
              Dial Now
            </a>
          </div>
        </div>

      </section>

      {/* TWO COLUMN LOCATION FINDER & MAP EMBED */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
        
        {/* Left Column: Coordinates details */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900/40 p-6 md:p-8 rounded-3xl border border-slate-200/80 dark:border-blue-950/40 text-left space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest">Campus Coordinates</span>
            <h3 className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-white">Our Location & Hours</h3>
          </div>

          <div className="space-y-4">
            
            {/* Address */}
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-slate-950 text-blue-700 dark:text-teal-400 flex items-center justify-center shrink-0 border border-slate-200/40 dark:border-slate-800">
                <MapPin size={15} />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-sans">Physical Address</p>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                  Sri Jhansi Hospital (Ortho & Neuro Rehab),<br />
                  Tirupati Bypass Road, Piler Town,<br />
                  Annamayya District, Andhra Pradesh, PIN - 517214
                </p>
              </div>
            </div>

            {/* Timings */}
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-slate-950 text-blue-700 dark:text-teal-400 flex items-center justify-center shrink-0 border border-slate-200/40 dark:border-slate-800">
                <Clock size={15} />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-sans">Operational Timings</p>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                  <strong>Trauma Emergency Desk:</strong> 24 Hours / 7 Days<br />
                  <strong>Outpatient (OPD) Consultations:</strong> Mon - Sat (9:00 AM - 6:00 PM)<br />
                  <strong>Physiotherapy Gym Sessions:</strong> Mon - Sat (8:00 AM - 8:00 PM)
                </p>
              </div>
            </div>

            {/* Landmarks direction */}
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-slate-950 text-blue-700 dark:text-teal-400 flex items-center justify-center shrink-0 border border-slate-200/40 dark:border-slate-800">
                <Compass size={15} />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-sans">Landmarks Assistance</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  Located conveniently on the primary Tirupati-Anantapur Highway bypass corridor. Highly accessible for rapid ambulance maneuvers without town-traffic roadblocks.
                </p>
              </div>
            </div>

          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-teal-400 uppercase tracking-widest">
              <ShieldCheck size={14} className="shrink-0" />
              <span>Direct Driving Navigation</span>
            </div>
            <a 
              href="https://maps.google.com/?q=Sri+Jhansi+Hospital+Tirupati+Bypass+Road+Piler+Andhra+Pradesh"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 bg-[#0A4D8C] hover:bg-blue-800 text-white text-xs font-extrabold uppercase tracking-widest rounded-xl transition-all shadow-md text-center flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Open in Google Maps</span>
              <Compass size={12} />
            </a>
          </div>
        </div>

        {/* Right Column: Google Map Embed Frame */}
        <div className="lg:col-span-7">
          <div className="relative rounded-3xl overflow-hidden aspect-video lg:aspect-square lg:max-h-[500px] bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 shadow-lg">
            {/* IFrame map of Tirupati Bypass Road, Piler, Chittoor/Annamayya district */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15474.398642232964!2d78.931758!3d13.62145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb2909404094095%3A0x7d025b90f450f38b!2sPileru%2C%20Andhra%20Pradesh%20517214!5e0!3m2!1sen!2sin!4v1781790000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-2xl w-full h-full min-h-[300px]"
              title="Sri Jhansi Hospital Piler Location Map"
            ></iframe>
          </div>
        </div>

      </section>

    </div>
  );
}
