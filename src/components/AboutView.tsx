import React from 'react';
import { 
  HeartPulse, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Activity, 
  Users,
  Briefcase
} from 'lucide-react';
import { DOCTORS } from '../data';

interface AboutViewProps {
  onNavigate: (page: string) => void;
}

export default function AboutView({ onNavigate }: AboutViewProps) {
  // Highlight Dr. Dinesh as the main rehabilitation head
  const directorDoc = DOCTORS.find(d => d.id === 'dinesh-kumar-reddy') || DOCTORS[0];
  const otherKeyDocs = DOCTORS.filter(d => d.id !== 'dinesh-kumar-reddy').slice(0, 3);

  return (
    <div className="space-y-16 py-6 text-left">
      
      {/* 1. BRAND STORY & MISSION */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-1 bg-blue-50 dark:bg-[#061424] text-blue-700 dark:text-blue-300 px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
            <HeartPulse size={12} className="text-teal-500 shrink-0" />
            Our Legacy & Standards
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Caring for the Piler Community with <span className="text-blue-600 dark:text-teal-400">Clinical Excellence</span>
          </h2>
          
          <p className="text-slate-600 dark:text-slate-350 text-xs md:text-sm leading-relaxed font-medium">
            Sri Jhansi Hospital stands as Annamayya District's premier medical hub dedicated to Orthopaedic treatments, Neurological rehabilitation, and 24-hour trauma support. Our physical rehabilitation facility implements a multi-disciplinary approach, pairing orthopedic trauma surgery with advanced neural gait training and physiotherapy under the same roof.
          </p>

          <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
            Founded with a commitment to absolute clinical integrity, we maintain 100% transparency. Every case history and testimonial is linked to verifiable consultation records. We do not engage in misleading claims, ensuring patients from all across Andhra Pradesh receive honest, standard care.
          </p>

          {/* Grid of Core Values */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl flex gap-3">
              <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={16} />
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Patient-First Policy</h4>
                <p className="text-[11px] text-slate-450 mt-1">We optimize rehabilitation sessions to maximize independence, avoiding unnecessary diagnostic or surgical interventions.</p>
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl flex gap-3">
              <CheckCircle2 className="text-teal-500 shrink-0 mt-0.5" size={16} />
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Clinical Transparency</h4>
                <p className="text-[11px] text-slate-450 mt-1">All hospital billing receipts, doctor consultation tickets, and outcomes are stored in our secure administrative registry.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Image Placeholder Card */}
        <div className="lg:col-span-5">
          <div className="relative rounded-3xl overflow-hidden aspect-4/3 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2.5 shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80" 
              alt="Hospital waiting area" 
              className="w-full h-full object-cover rounded-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <span className="text-[9px] font-mono font-bold tracking-widest text-teal-400 uppercase">Sri Jhansi Campus</span>
              <h4 className="font-sans font-extrabold text-sm uppercase">Piler Town Modern Clinic Facility</h4>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DIRECTOR BIOGRAPHY - HIGH TRUST FEATURE */}
      <section className="bg-slate-100 dark:bg-slate-900/50 rounded-3xl p-6 md:p-10 border border-slate-200/80 dark:border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-[40px] pointer-events-none"></div>
        
        <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
          {/* Avatar Fallback initials / image if available */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-tr from-[#0A4D8C] to-teal-500 flex items-center justify-center text-white font-extrabold text-2xl sm:text-4xl shadow-md uppercase">
              {directorDoc.name.replace('Dr. ', '').split(' ').slice(0, 2).map(n => n[0]).join('')}
            </div>
            <span className="absolute bottom-1 right-1 bg-emerald-500 w-4 h-4 rounded-full border-2 border-slate-100 dark:border-slate-900"></span>
          </div>

          <div className="space-y-4 flex-1">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest">Director & Chief Specialist</span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">{directorDoc.name}</h3>
              <p className="text-xs font-bold text-[#0A4D8C] dark:text-blue-400 uppercase tracking-wide">{directorDoc.role}</p>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {directorDoc.qualification.split(',').map((q, idx) => (
                <span key={idx} className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-800 px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase font-mono shadow-xs">
                  {q.trim()}
                </span>
              ))}
              <span className="bg-teal-500/15 text-teal-700 dark:text-teal-300 border border-teal-500/20 px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase font-mono">
                Ex-SVIMS & BIRRD Specialist
              </span>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-xs md:text-sm leading-relaxed max-w-3xl">
              {directorDoc.bio}
            </p>

            {/* Specialties and affiliations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
              <div className="flex items-center gap-2 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                <span>Member of Bar Council of India & A.P. High Court</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                <span>Ex-Orthopedic Physical Therapist - SVIMS & BIRRD</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                <span>Fellowship in Ortho & Neuro Rehab (Apollo)</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                <span>Expertise in Complex Pediatric Fracture Alignment</span>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* 4. OTHER CONSULTANT PHYSICIANS */}
      <section className="space-y-6">
        <div className="space-y-1.5">
          <span className="text-[10px] font-mono font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest">Consulting Board</span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">Our Board of Consultant Doctors</h3>
          <p className="text-xs text-slate-500 leading-normal max-w-2xl">
            Sri Jhansi leverages a stellar, credentialed board of on-call specialist surgeons and general physicians to secure multi-disciplinary medical accuracy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
          {otherKeyDocs.map((doc) => (
            <div 
              key={doc.id}
              className="bg-white dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-500 flex items-center justify-center text-white font-black text-xs uppercase shadow-sm">
                    {doc.name.replace('Dr. ', '').split(' ').slice(0, 2).map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-900 dark:text-white leading-tight uppercase">{doc.name}</h4>
                    <p className="text-[9.5px] font-bold text-teal-600 dark:text-teal-400 uppercase mt-0.5">{doc.specialty}</p>
                  </div>
                </div>

                <p className="text-[10.5px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  {doc.bio}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-450 font-bold uppercase tracking-wider flex items-center justify-between">
                <span>{doc.qualification.split(',')[0]}</span>
                <button 
                  onClick={() => onNavigate('services')}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
