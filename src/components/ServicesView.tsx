import React from 'react';
import { 
  HeartPulse, 
  Stethoscope, 
  Activity, 
  Award, 
  CheckCircle2, 
  Search, 
  Filter, 
  ArrowUpRight 
} from 'lucide-react';
import { DOCTORS, DEPARTMENTS, SERVICES } from '../data';

interface ServicesViewProps {
  activeTab: 'departments' | 'diagnostics' | 'doctors';
  setActiveTab: (tab: 'departments' | 'diagnostics' | 'doctors') => void;
  selectedDeptId: string;
  setSelectedDeptId: (id: string) => void;
  doctorSearchQuery: string;
  setDoctorSearchQuery: (query: string) => void;
  doctorSpecialtyFilter: string;
  setDoctorSpecialtyFilter: (filter: string) => void;
}

export default function ServicesView({
  activeTab,
  setActiveTab,
  selectedDeptId,
  setSelectedDeptId,
  doctorSearchQuery,
  setDoctorSearchQuery,
  doctorSpecialtyFilter,
  setDoctorSpecialtyFilter
}: ServicesViewProps) {
  
  const activeDepartmentDetails = DEPARTMENTS.find(d => d.id === selectedDeptId) || DEPARTMENTS[0];

  return (
    <div className="space-y-10 py-4 text-left">
      
      {/* SECTION HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-6 space-y-2">
        <span className="text-[10px] uppercase font-black tracking-widest text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40 px-3 py-1.5 rounded-full border border-teal-100/40 dark:border-teal-900/30">Explore Facilities</span>
        <h2 className="text-2xl md:text-3.5xl font-sans tracking-tight font-extrabold text-slate-900 dark:text-white">
          Clinical Registry & Available Services
        </h2>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          We consolidated all our specialties, diagnostic setups, & consulting panel information so you can find exactly what you need with zero clutter.
        </p>
      </div>

      {/* MAIN THREE TABS SELECTOR */}
      <div className="flex justify-center mb-8 border-b border-slate-200 dark:border-slate-800 max-w-lg mx-auto gap-2 p-1 bg-slate-50 dark:bg-slate-950/40 rounded-xl">
        <button
          onClick={() => setActiveTab('departments')}
          className={`flex-1 py-2.5 text-xs md:text-sm font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'departments' 
              ? 'bg-white dark:bg-slate-800 text-blue-700 dark:text-teal-400 shadow-xs border-b-2 border-blue-600 dark:border-teal-400' 
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
          }`}
        >
          <Stethoscope size={14} />
          <span>Specialties</span>
        </button>
        <button
          onClick={() => setActiveTab('diagnostics')}
          className={`flex-1 py-2.5 text-xs md:text-sm font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'diagnostics' 
              ? 'bg-white dark:bg-slate-800 text-blue-700 dark:text-teal-400 shadow-xs border-b-2 border-blue-600 dark:border-teal-400' 
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
          }`}
        >
          <Activity size={14} />
          <span>Diagnostics</span>
        </button>
        <button
          onClick={() => setActiveTab('doctors')}
          className={`flex-1 py-2.5 text-xs md:text-sm font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'doctors' 
              ? 'bg-white dark:bg-slate-800 text-blue-700 dark:text-teal-400 shadow-xs border-b-2 border-blue-600 dark:border-teal-400' 
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
          }`}
        >
          <Award size={14} />
          <span>Consultants ({DOCTORS.length})</span>
        </button>
      </div>

      {/* TAB 1 CONTENT: SPECIALTY DEPARTMENTS */}
      {activeTab === 'departments' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in text-left">
          
          {/* Left sidebar selection list */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Select Division Specialty</p>
            
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 lg:overflow-x-visible">
              {DEPARTMENTS.map((dept) => {
                const isSelected = dept.id === selectedDeptId;
                return (
                  <button
                    key={dept.id}
                    onClick={() => setSelectedDeptId(dept.id)}
                    className={`px-4 py-3.5 rounded-xl border text-xs font-bold uppercase tracking-wider text-left transition-all flex items-center gap-3 shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 dark:bg-[#0a1e33] text-white border-slate-900 shadow-md ring-1 ring-teal-500/20'
                        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-250/50 dark:border-slate-800 hover:border-teal-500/20 hover:text-blue-700 dark:hover:text-teal-400'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full shrink-0 ${isSelected ? 'bg-teal-400 animate-pulse' : 'bg-slate-350 dark:bg-slate-700'}`}></span>
                    <span>{dept.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Details Panel */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900/40 p-6 md:p-8 rounded-3xl border border-slate-200/80 dark:border-blue-950/40 shadow-xs relative overflow-hidden flex flex-col justify-between min-h-[400px]">
            <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/5 rounded-full blur-[40px] pointer-events-none"></div>
            
            <div className="space-y-6">
              {/* Specialty Header */}
              <div className="flex items-start justify-between gap-4 flex-wrap sm:flex-nowrap">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-teal-400 rounded-2xl flex items-center justify-center shrink-0 border border-blue-100/40 dark:border-blue-950/60 shadow-inner">
                    <Stethoscope size={22} />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-white leading-tight">
                      {activeDepartmentDetails.name}
                    </h3>
                    <span className="inline-block text-[9px] text-teal-600 dark:text-teal-400 font-extrabold uppercase tracking-widest mt-1 bg-teal-500/10 px-2 py-0.5 rounded-md">
                      Sri Jhansi Specialised Division
                    </span>
                  </div>
                </div>
              </div>

              {/* Specialty Description */}
              <p className="text-slate-600 dark:text-slate-300 text-xs md:text-sm leading-relaxed">
                {activeDepartmentDetails.description}
              </p>

              {/* Checklist Sub-grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                
                {/* Symptoms Checklist */}
                <div className="space-y-3 bg-slate-50 dark:bg-slate-950/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-850">
                  <h4 className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest">⚠️ Common Symptoms Addressed</h4>
                  <ul className="space-y-2">
                    {activeDepartmentDetails.symptoms.map((sym, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-450 animate-pulse shrink-0"></span>
                        <span>{sym}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Features Checklist */}
                <div className="space-y-3 bg-slate-50 dark:bg-slate-950/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-850">
                  <h4 className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest">🛠️ Clinical Offerings</h4>
                  <ul className="space-y-2">
                    {activeDepartmentDetails.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                        <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>

            {/* Specialty Action Bar */}
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-left">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Need Specialty Guidance?</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Coordinate timings with our clinical desk directly.</p>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                <a 
                  href={`https://wa.me/919440571584?text=Hi%20Sri%20Jhansi%20Hospital%20Piler%2C%20I%20would%20like%20to%20consult%20with%20the%20${encodeURIComponent(activeDepartmentDetails.name)}%20desk.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#00a884] hover:bg-[#008f72] text-white px-4 py-2.5 rounded-xl text-[11px] font-extrabold uppercase tracking-wide transition-all shadow-md flex items-center gap-1.5"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>Inquire Specialty</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 2 CONTENT: DIAGNOSTIC & LAB SERVICES */}
      {activeTab === 'diagnostics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in text-left">
          {SERVICES.map((serv) => (
            <div 
              key={serv.id}
              className="bg-white dark:bg-[#061424] p-6 rounded-3xl border border-slate-200/80 dark:border-blue-950/60 hover:border-teal-500/40 dark:hover:border-teal-500/30 transition-all duration-300 flex flex-col justify-between group shadow-xs hover:shadow-md"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-teal-400 flex items-center justify-center border border-blue-100/40 dark:border-blue-950/60 shadow-inner group-hover:scale-105 transition-transform">
                    <Activity size={18} />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm md:text-base font-extrabold text-slate-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-teal-400 transition-colors">{serv.name}</h4>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1 font-bold">Sri Jhansi Diagnostics</p>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  {serv.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-850 flex items-center justify-between text-xs">
                <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  On-site active
                </span>
                <a 
                  href={`https://wa.me/919440571584?text=Hi%20Sri%20Jhansi%20Hospital%20Piler%2C%20I%20would%20like%20to%20inquire%20about%20the%20${encodeURIComponent(serv.name)}%20facility.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00a884] dark:text-teal-400 font-extrabold hover:underline flex items-center gap-1 group/link"
                >
                  <span>Inquire via WhatsApp</span>
                  <ArrowUpRight size={13} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3 CONTENT: DETAILED DOCTOR TEAM */}
      {activeTab === 'doctors' && (
        <div className="space-y-8 animate-fade-in">
          
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
                    {spec === 'All' ? 'All Specialities' : spec}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Doctors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DOCTORS.filter((doc) => {
              const matchesSearch = doc.name.toLowerCase().includes(doctorSearchQuery.toLowerCase()) || 
                                    doc.role.toLowerCase().includes(doctorSearchQuery.toLowerCase());
              const matchesSpecialty = doctorSpecialtyFilter === 'All' || 
                                       doc.role.toLowerCase().includes(doctorSpecialtyFilter.toLowerCase()) ||
                                       doc.specialty.toLowerCase().includes(doctorSpecialtyFilter.toLowerCase());
              return matchesSearch && matchesSpecialty;
            }).map((doc) => (
              <div 
                key={doc.id}
                className="bg-white dark:bg-[#061424] p-6 rounded-3xl border border-slate-200/80 dark:border-blue-950/60 shadow-xs hover:shadow-md transition-all duration-300 relative overflow-hidden flex flex-col justify-between min-h-[220px]"
              >
                <div className="space-y-4">
                  {/* Top Row - Avatar + Credentials Header */}
                  <div className="flex items-center gap-4 text-left">
                    <div className="relative shrink-0">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-teal-500 flex items-center justify-center text-white font-extrabold text-sm shadow-md uppercase">
                        {doc.name.replace('Dr. ', '').split(' ').slice(0, 2).map(n => n[0]).join('')}
                      </div>
                      <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center" title="OPD Available Today">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
                      </span>
                    </div>

                    <div className="flex-1">
                      <h4 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">{doc.name}</h4>
                      <p className="text-xs font-bold text-blue-700 dark:text-teal-400 mt-1 uppercase tracking-wider">{doc.role}</p>
                    </div>
                  </div>

                  {/* Qualifications & Fellowship details formatted beautifully */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
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
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] font-mono">OPD Hours: Mon - Sat (9am - 6pm)</span>
                  <a 
                    href={`https://wa.me/919440571584?text=Hi%20Sri%20Jhansi%20Hospital%20Piler%2C%20I%20would%20like%20to%20consult%2520with%2520${encodeURIComponent(doc.name)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#00a884] hover:bg-[#008f72] text-white px-4 py-2 rounded-xl text-[10px] font-extrabold uppercase tracking-widest transition-all shadow-md text-center flex items-center justify-center gap-1 shrink-0 cursor-pointer"
                  >
                    <span>Consult on WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}
