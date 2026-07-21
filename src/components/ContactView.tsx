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
  AlertTriangle,
  MessageSquare
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
          Reach our emergency trauma desks, locate our physical rehabilitation gym on Tirupati Road, or schedule an OPD slot.
        </p>
      </div>

      {/* CORE CONTACT CARDS & ACTIONS */}
      <section className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-850">
          <div>
            <h3 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Choose Your Preferred Connection Mode
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Avoid navigating complex forms or waiting for generic emails. Select any of the instant clinical channels below to chat or speak directly with our team.
            </p>
          </div>
          <button 
            onClick={onUpdateContactClick}
            className="p-2 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-350 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors shrink-0"
            title="Configure Helpline Numbers"
          >
            <Settings size={15} />
          </button>
        </div>

        {/* 1. WhatsApp Card */}
        <div className="bg-emerald-50/40 dark:bg-[#061e1b]/30 border border-emerald-100/50 dark:border-emerald-950/45 p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-300 hover:shadow-xs text-left">
          <div className="flex gap-4 items-start md:items-center flex-grow">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-650 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-200/30 dark:border-emerald-900/40 shadow-xs">
              <MessageSquare size={22} className="fill-emerald-100/10" />
            </div>
            <div className="space-y-1">
              <h4 className="font-sans font-bold text-slate-900 dark:text-white text-sm md:text-base tracking-tight uppercase">
                WhatsApp Direct Support
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium max-w-2xl">
                Instant message inquiries for general clinic support, pediatric vaccination schedules, GFC therapies, or uploading digital prescriptions directly to our dispensary desk.
              </p>
            </div>
          </div>
          <div className="shrink-0">
            <a 
              href={`https://wa.me/${desk1Phone.replace(/[^0-9]/g, '') || '919440571584'}?text=Hi%20Sri%20Jhansi%20Hospital%20Piler%2C%20I%20would%20like%20to%20consult%20a%20specialist.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold uppercase tracking-wider text-[11px] rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer whitespace-nowrap"
            >
              <MessageSquare size={13} className="fill-white/10" />
              <span>Open WhatsApp Chat</span>
            </a>
          </div>
        </div>

        {/* 2. Voice Call Card */}
        <div className="bg-blue-50/40 dark:bg-[#091f3d]/20 border border-blue-100/50 dark:border-blue-950/45 p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-300 hover:shadow-xs text-left">
          <div className="flex gap-4 items-start md:items-center flex-grow">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-200/30 dark:border-blue-900/40 shadow-xs">
              <Phone size={22} />
            </div>
            <div className="space-y-1">
              <h4 className="font-sans font-bold text-slate-900 dark:text-white text-sm md:text-base tracking-tight uppercase">
                Direct Voice Call Desk
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium max-w-2xl">
                Direct voice assistance for immediate doctor OPD slot inquiries, roadside emergency ambulance tracking, free bedside nursing collection protocols, or specialist reference bookings.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a 
              href={`tel:${desk1Phone}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold uppercase tracking-wider text-[11px] rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer whitespace-nowrap"
            >
              <Phone size={12} />
              <span>Call Primary Desk</span>
            </a>
            <a 
              href={`tel:${desk2Phone}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-extrabold uppercase tracking-wider text-[11px] rounded-xl shadow-sm transition-all cursor-pointer whitespace-nowrap"
            >
              <Phone size={12} />
              <span>Call Secondary Desk</span>
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
                  2-279, Sri Jhansi Hospital Complex,<br />
                  Tirupati Road, Pileru,<br />
                  Andhra Pradesh - 517214
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
                  <strong>Outpatient (OPD) Consultations:</strong> Mon - Sun (9:00 AM - 6:00 PM)<br />
                  <strong>Physiotherapy Gym Sessions:</strong> Mon - Sun (8:00 AM - 8:00 PM)
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
              href="https://maps.google.com/?q=Sri+Jhansi+Hospital+Complex+Tirupati+Road+Pileru+Andhra+Pradesh"
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
