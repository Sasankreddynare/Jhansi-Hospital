import React, { useState } from 'react';
import { 
  HeartPulse, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Activity, 
  Users,
  Briefcase,
  Search,
  Filter,
  ArrowUpRight
} from 'lucide-react';
import { DOCTORS } from '../data';

interface AboutViewProps {
  onNavigate: (page: string) => void;
}

export default function AboutView({ onNavigate }: AboutViewProps) {
  // Highlight Dr. Dinesh as the main rehabilitation head
  const directorDoc = DOCTORS.find(d => d.id === 'dinesh-kumar-reddy') || DOCTORS[0];
  const [doctorSearchQuery, setDoctorSearchQuery] = useState('');
  const [doctorSpecialtyFilter, setDoctorSpecialtyFilter] = useState('All');

  return (
    <div className="space-y-16 py-6 text-left">
      
      {/* 1. DIRECTOR BIOGRAPHY - HIGH TRUST FEATURE */}
      <section className="bg-slate-100 dark:bg-slate-900/50 rounded-3xl p-6 md:p-10 border border-slate-200/80 dark:border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-[40px] pointer-events-none"></div>
        
        <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
          {/* Doctor Avatar/Image with Fallback */}
          <div className="relative shrink-0 w-28 h-28 sm:w-40 sm:h-40">
            {directorDoc.imageUrl ? (
              <img 
                src={directorDoc.imageUrl} 
                alt={directorDoc.name}
                className="w-full h-full object-cover rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback to initials on error
                  e.currentTarget.style.display = 'none';
                  const sibling = e.currentTarget.nextElementSibling as HTMLElement;
                  if (sibling) sibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div 
              style={{ display: directorDoc.imageUrl ? 'none' : 'flex' }}
              className="w-full h-full rounded-2xl bg-gradient-to-tr from-[#0A4D8C] to-teal-500 flex items-center justify-center text-white font-extrabold text-2xl sm:text-4xl shadow-md uppercase"
            >
              {directorDoc.name.replace('Dr. ', '').split(' ').slice(0, 2).map(n => n[0]).join('')}
            </div>
          </div>

          <div className="space-y-4 flex-1">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest">Director & Chief Specialist</span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">{directorDoc.name}</h3>
              <p className="text-xs font-bold text-[#0A4D8C] dark:text-blue-400 uppercase tracking-wide">{directorDoc.role}</p>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {directorDoc.qualification.split(',').map((q, idx) => (
                <span key={idx} className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800 px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase font-mono shadow-xs">
                  {q.trim()}
                </span>
              ))}
              <span className="bg-teal-500/15 text-teal-700 dark:text-teal-300 border border-teal-500/20 px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase font-mono">
                Ex-SVIMS & BIRRD Specialist
              </span>
              <span className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Visit: {directorDoc.schedule || 'Monday - Saturday'}
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

            <div className="pt-4 flex justify-start">
              <a 
                href={`https://wa.me/919440571584?text=Hi%20Sri%20Jhansi%20Hospital%20Piler%2C%20I%20would%20like%2520to%2520consult%2520with%2520${encodeURIComponent(directorDoc.name)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#00a884] hover:bg-[#008f72] text-white px-5 py-2.5 rounded-xl text-[11px] font-extrabold uppercase tracking-widest transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-98"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>Consult on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OUR INTERACTIVE CONSULTANTS BOARD */}
      <section className="space-y-6">
        <div className="space-y-1.5">
          <span className="text-[10px] font-mono font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest">Consulting Board</span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">Our Board of Consultant Doctors</h3>
          <p className="text-xs text-slate-500 leading-normal max-w-2xl">
            Sri Jhansi leverages a stellar, credentialed board of on-call specialist surgeons and general physicians to secure multi-disciplinary medical accuracy.
          </p>
        </div>

        {/* Doctor Search & Specialty Filters Bar */}
        <div className="bg-slate-50 dark:bg-[#061424] p-4 rounded-2xl border border-slate-200/80 dark:border-blue-950/60 flex flex-col md:flex-row items-center justify-between gap-4 text-left">
          {/* Search query box */}
          <div className="relative w-full md:max-w-xs">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Search size={14} />
            </span>
            <input
              type="text"
              placeholder="Search doctor name or role..."
              value={doctorSearchQuery}
              onChange={(e) => setDoctorSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-teal-500 font-semibold"
            />
          </div>

          {/* Badges row */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <span className="text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider flex items-center gap-1 shrink-0">
              <Filter size={11} />
              Filter Specialty:
            </span>
            {['All', 'Ortho', 'Neuro', 'Physician'].map((spec) => {
              const isSelected = doctorSpecialtyFilter === spec;
              return (
                <button
                  key={spec}
                  onClick={() => setDoctorSpecialtyFilter(spec)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 dark:bg-[#0a1e33] text-white shadow-xs'
                      : 'bg-white dark:bg-slate-900 text-slate-500 hover:text-slate-800 dark:hover:text-white border border-slate-250/60 dark:border-slate-800'
                  }`}
                >
                  {spec === 'All' ? 'All Specialties' : spec}
                </button>
              );
            })}
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {DOCTORS.filter((doc) => {
            if (doc.id === 'dinesh-kumar-reddy') return false;
            const matchesSearch = doc.name.toLowerCase().includes(doctorSearchQuery.toLowerCase()) || 
                                  doc.role.toLowerCase().includes(doctorSearchQuery.toLowerCase());
            const matchesSpecialty = doctorSpecialtyFilter === 'All' || 
                                     doc.role.toLowerCase().includes(doctorSpecialtyFilter.toLowerCase()) ||
                                     doc.specialty.toLowerCase().includes(doctorSpecialtyFilter.toLowerCase());
            return matchesSearch && matchesSpecialty;
          }).map((doc) => (
            <div 
              key={doc.id}
              className="bg-white dark:bg-[#061424] p-6 rounded-3xl border border-slate-200/80 dark:border-blue-950/60 shadow-xs hover:shadow-md transition-all duration-300 relative overflow-hidden flex flex-col justify-between min-h-[180px]"
            >
              <div className="space-y-4">
                {/* Top Row - Avatar + Credentials Header */}
                <div className="flex items-center gap-4 text-left">
                  <div className="relative shrink-0 w-20 h-20 sm:w-24 sm:h-24">
                    {doc.imageUrl ? (
                      <img 
                        src={doc.imageUrl} 
                        alt={doc.name}
                        className="w-full h-full object-cover rounded-2xl border border-slate-200 dark:border-blue-950/60 shadow-xs"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const sibling = e.currentTarget.nextElementSibling as HTMLElement;
                          if (sibling) sibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div 
                      style={{ display: doc.imageUrl ? 'none' : 'flex' }}
                      className="w-full h-full rounded-2xl bg-gradient-to-tr from-blue-600 to-teal-500 flex items-center justify-center text-white font-extrabold text-lg shadow-md uppercase"
                    >
                      {doc.name.replace('Dr. ', '').split(' ').slice(0, 2).map(n => n[0]).join('')}
                    </div>
                  </div>

                  <div className="flex-1">
                    <h4 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">{doc.name}</h4>
                    <p className="text-xs font-bold text-blue-700 dark:text-teal-400 mt-1 uppercase tracking-wider">{doc.role}</p>
                  </div>
                </div>

                {/* Qualifications & Fellowship details formatted beautifully */}
                <div className="flex flex-wrap gap-1.5 pt-1 text-left">
                  {doc.qualification.split(',').map((q, idx) => (
                    <span key={idx} className="bg-blue-500/5 dark:bg-[#0A4D8C]/15 text-blue-700 dark:text-blue-300 px-2.5 py-1 rounded-lg text-[10px] font-extrabold font-sans tracking-wide uppercase border border-blue-500/10">
                      {q.trim()}
                    </span>
                  ))}
                  {doc.fellowship && (
                    <span className="bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-400 border border-teal-100/40 dark:border-teal-900/30 px-2.5 py-1 rounded-lg text-[10px] font-extrabold font-sans tracking-wide uppercase">
                      {doc.fellowship.replace('Fellowship in ', '')}
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-850 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-left">
                <span className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[10px] font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse shrink-0"></span>
                  Visit: {doc.schedule || 'Monday - Saturday'}
                </span>
                <a 
                  href={`https://wa.me/919440571584?text=Hi%20Sri%20Jhansi%20Hospital%20Piler%2C%20I%20would%20like%20to%20consult%2520with%2520${encodeURIComponent(doc.name)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#00a884] hover:bg-[#008f72] text-white px-4 py-2.5 rounded-xl text-[10px] font-extrabold uppercase tracking-widest transition-all shadow-md text-center flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>Consult on WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
