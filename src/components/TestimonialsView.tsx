import React from 'react';
import { 
  Star, 
  CheckCircle2, 
  ThumbsUp, 
  PlusCircle, 
  Search, 
  Filter, 
  Award,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { DOCTORS } from '../data';

interface TestimonialsViewProps {
  reviewsList: any[];
  reviewSearchQuery: string;
  setReviewSearchQuery: (query: string) => void;
  reviewRatingFilter: number | 'All';
  setReviewRatingFilter: (filter: number | 'All') => void;
  reviewDoctorFilter: string;
  setReviewDoctorFilter: (filter: string) => void;
  reviewSortBy: 'helpful' | 'recent' | 'highest' | 'lowest';
  setReviewSortBy: (sortBy: 'helpful' | 'recent' | 'highest' | 'lowest') => void;
  onAddReviewClick: () => void;
  onVerifyReceiptClick: () => void;
  upvoteReview: (id: string) => void;
  upvotedReviewIds: string[];
}

export default function TestimonialsView({
  reviewsList,
  reviewSearchQuery,
  setReviewSearchQuery,
  reviewRatingFilter,
  setReviewRatingFilter,
  reviewDoctorFilter,
  setReviewDoctorFilter,
  reviewSortBy,
  setReviewSortBy,
  onAddReviewClick,
  onVerifyReceiptClick,
  upvoteReview,
  upvotedReviewIds
}: TestimonialsViewProps) {

  // Metrics calculations
  const totalReviews = reviewsList.length;
  const avgRating = (reviewsList.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews).toFixed(1);
  const verifiedCount = reviewsList.filter(r => r.verified).length;

  const ratingCounts = [5, 4, 3, 2, 1].map(stars => ({
    stars,
    count: reviewsList.filter(r => r.rating === stars).length,
    percentage: ((reviewsList.filter(r => r.rating === stars).length / totalReviews) * 100).toFixed(0)
  }));

  // Filtering logic
  const filteredReviews = reviewsList.filter((rev) => {
    const matchesSearch = 
      rev.name.toLowerCase().includes(reviewSearchQuery.toLowerCase()) ||
      rev.condition.toLowerCase().includes(reviewSearchQuery.toLowerCase()) ||
      rev.review.toLowerCase().includes(reviewSearchQuery.toLowerCase());
    
    const matchesRating = reviewRatingFilter === 'All' || rev.rating === Number(reviewRatingFilter);
    const matchesDoctor = reviewDoctorFilter === 'All' || rev.treatmentDoctor === reviewDoctorFilter;
    
    return matchesSearch && matchesRating && matchesDoctor;
  });

  // Sorting logic
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (reviewSortBy === 'helpful') {
      return (b.helpfulCount || 0) - (a.helpfulCount || 0);
    }
    if (reviewSortBy === 'recent') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    if (reviewSortBy === 'highest') {
      return b.rating - a.rating;
    }
    if (reviewSortBy === 'lowest') {
      return a.rating - b.rating;
    }
    return 0;
  });

  return (
    <div className="space-y-12 py-4 text-left">
      
      {/* HEADER SECTION */}
      <div className="text-center max-w-3xl mx-auto mb-6 space-y-2">
        <span className="text-[10px] uppercase font-black tracking-widest text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40 px-3 py-1.5 rounded-full border border-teal-100/40 dark:border-teal-900/30">Patient Stories</span>
        <h2 className="text-2xl md:text-3.5xl font-sans tracking-tight font-extrabold text-slate-900 dark:text-white">
          Verified Patient Experience & Reviews
        </h2>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          Sri Jhansi is built on medical authenticity. Here, 100% of the patient feedback is tied directly to legal clinical receipts registered in our outpatient directory.
        </p>
      </div>

      {/* RATINGS METRICS DASHBOARD */}
      <section className="bg-white dark:bg-[#061424] rounded-3xl border border-slate-200/80 dark:border-blue-950/60 p-6 md:p-8 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left">
        
        {/* Left Column: Big Stats */}
        <div className="md:col-span-4 text-center md:text-left space-y-4 md:border-r md:border-slate-100 dark:md:border-slate-800 md:pr-8">
          <div className="space-y-1">
            <div className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white flex items-baseline justify-center md:justify-start gap-1">
              <span>{avgRating}</span>
              <span className="text-sm font-bold text-slate-400">/ 5.0</span>
            </div>
            <div className="flex justify-center md:justify-start gap-1.5 text-amber-500">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={16} className="fill-current" />
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-slate-500 font-semibold leading-none">Based on {totalReviews} patient visits</p>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-teal-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md uppercase">
              <ShieldCheck size={12} />
              {verifiedCount} Verified Submissions
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <button
              onClick={onAddReviewClick}
              className="flex-1 py-2.5 px-4 bg-slate-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
            >
              <PlusCircle size={14} />
              <span>Write Review</span>
            </button>
            <button
              onClick={onVerifyReceiptClick}
              className="flex-1 py-2.5 px-4 bg-white hover:bg-slate-50 text-blue-700 border border-slate-200 dark:border-slate-800 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <FileText size={14} />
              <span>Verify Ticket</span>
            </button>
          </div>
        </div>

        {/* Right Column: Bars Grid */}
        <div className="md:col-span-8 space-y-3 pl-0 md:pl-4">
          <p className="text-[10px] font-bold text-slate-450 uppercase tracking-widest mb-2 font-mono">Rating Breakdown Distribution</p>
          {ratingCounts.map((rc) => (
            <div key={rc.stars} className="flex items-center gap-3">
              <span className="text-[11px] font-bold text-slate-500 w-3 font-mono">{rc.stars}</span>
              <Star size={12} className="text-amber-500 shrink-0 fill-current" />
              <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden">
                <div 
                  className="bg-amber-500 h-full rounded-full"
                  style={{ width: `${rc.percentage}%` }}
                ></div>
              </div>
              <span className="text-[10px] font-bold text-slate-400 w-8 text-right font-mono">{rc.count} ({rc.percentage}%)</span>
            </div>
          ))}
        </div>

      </section>

      {/* SEARCH AND FILTERS TOOLBAR */}
      <section className="bg-slate-50 dark:bg-[#061424] p-4 rounded-2xl border border-slate-250/50 dark:border-blue-950/50 text-left grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
        
        {/* Search bar */}
        <div className="sm:col-span-4 relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <Search size={14} />
          </span>
          <input
            type="text"
            placeholder="Search keywords or conditions..."
            value={reviewSearchQuery}
            onChange={(e) => setReviewSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-teal-500 font-semibold"
          />
        </div>

        {/* Doctor filter dropdown */}
        <div className="sm:col-span-3 text-left">
          <select
            value={reviewDoctorFilter}
            onChange={(e) => setReviewDoctorFilter(e.target.value)}
            className="w-full bg-white dark:bg-slate-900 text-xs text-slate-700 dark:text-white px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-teal-500 font-semibold cursor-pointer"
          >
            <option value="All">All Doctors (Filter)</option>
            {DOCTORS.map((d) => (
              <option key={d.id} value={d.name}>{d.name}</option>
            ))}
          </select>
        </div>

        {/* Rating filter dropdown */}
        <div className="sm:col-span-2 text-left">
          <select
            value={reviewRatingFilter}
            onChange={(e) => setReviewRatingFilter(e.target.value === 'All' ? 'All' : Number(e.target.value))}
            className="w-full bg-white dark:bg-slate-900 text-xs text-slate-700 dark:text-white px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-teal-500 font-semibold cursor-pointer"
          >
            <option value="All">All Ratings</option>
            <option value="5">5 Stars only</option>
            <option value="4">4 Stars & above</option>
          </select>
        </div>

        {/* Sort drop down */}
        <div className="sm:col-span-3 text-left">
          <select
            value={reviewSortBy}
            onChange={(e) => setReviewSortBy(e.target.value as any)}
            className="w-full bg-white dark:bg-slate-900 text-xs text-slate-700 dark:text-white px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-teal-500 font-semibold cursor-pointer"
          >
            <option value="helpful">Sort: Most Helpful</option>
            <option value="recent">Sort: Most Recent</option>
            <option value="highest">Sort: Highest Rated</option>
            <option value="lowest">Sort: Lowest Rated</option>
          </select>
        </div>

      </section>

      {/* REVIEWS RESULTS FEED */}
      <section className="space-y-6">
        {sortedReviews.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-2">
            <p className="text-sm font-bold text-slate-600 dark:text-white">No reviews found matching filters</p>
            <p className="text-xs text-slate-400">Try modifying your search text query, sorting filters, or select "All Doctors".</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sortedReviews.map((rev) => (
              <div 
                key={rev.id}
                className="bg-white dark:bg-[#061424] p-6 rounded-3xl border border-slate-200/80 dark:border-blue-950/60 hover:border-blue-600 dark:hover:border-teal-500/40 shadow-xs hover:shadow-md transition-all duration-300 text-left flex flex-col justify-between min-h-[220px]"
              >
                <div className="space-y-4">
                  
                  {/* Top row: Name/Age/Verified Badge */}
                  <div className="flex justify-between items-start gap-4 flex-wrap sm:flex-nowrap">
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">{rev.name}</h4>
                      <p className="text-[10px] text-slate-450 font-bold uppercase mt-0.5">{rev.age} Years • Patient</p>
                    </div>

                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <div className="flex gap-1 text-amber-500">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} size={12} className="fill-current" />
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1 text-[9px] font-extrabold tracking-wider text-emerald-600 dark:text-teal-400 bg-emerald-500/10 px-2 py-0.5 rounded uppercase">
                        <CheckCircle2 size={10} />
                        Verified Recovery
                      </span>
                    </div>
                  </div>

                  {/* Medical condition tag */}
                  <div className="inline-block bg-blue-500/5 dark:bg-[#0a1e33] text-blue-700 dark:text-blue-300 border border-blue-500/10 px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase font-sans tracking-wide">
                    🧬 Condition: {rev.condition}
                  </div>

                  {/* Review Text */}
                  <p className="text-xs md:text-sm text-slate-650 dark:text-slate-300 leading-relaxed font-medium italic">
                    "{rev.review}"
                  </p>

                </div>

                {/* Bottom Row: Doctor Tag + Helpful Upvote */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-850 flex items-center justify-between gap-4 flex-wrap text-xs">
                  <div className="flex items-center gap-1.5 text-slate-450 font-semibold uppercase text-[9.5px]">
                    <Award size={12} className="text-[#0A4D8C] dark:text-teal-400" />
                    <span>Specialist: {rev.treatmentDoctor}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">CODE: {rev.ticketCode}</span>
                    <button
                      onClick={() => upvoteReview(rev.id)}
                      disabled={upvotedReviewIds.includes(rev.id)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 transition-all cursor-pointer ${
                        upvotedReviewIds.includes(rev.id)
                          ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                          : 'bg-slate-50 hover:bg-teal-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-350 hover:text-blue-700 dark:hover:text-teal-400'
                      }`}
                    >
                      <ThumbsUp size={11} className={upvotedReviewIds.includes(rev.id) ? 'fill-current' : ''} />
                      <span>{rev.helpfulCount || 0} Helpful</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
