import { memo } from 'react';
import { HiOutlineMapPin, HiOutlineBriefcase, HiOutlineClock, HiOutlineCalendar, HiOutlineArrowRight } from 'react-icons/hi2';
import Button from '../ui/Button';

const JobCard = memo(function JobCard({ job, onApply }) {
  const deadline = new Date(job.lastDate);
  const isExpired = deadline < new Date();

  return (
    <div className="group bg-white rounded-[2rem] border border-secondary-100 p-8 hover:shadow-soft hover:border-primary-200 transition-all duration-300 relative overflow-hidden flex flex-col justify-between min-h-[380px]">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-bl-full -z-0 transition-transform duration-500 group-hover:scale-110 opacity-50" />
      
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
          <div>
            <h3 className="text-2xl font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors tracking-tight">{job.title}</h3>
            <p className="text-base font-medium text-secondary-500">{job.company}</p>
          </div>
          {isExpired && (
            <span className="px-3 py-1 bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-lg shrink-0 border border-red-100">
              Closed
            </span>
          )}
        </div>
        
        <div className="flex flex-wrap gap-3 mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary-50 text-secondary-700 text-xs font-bold border border-secondary-100">
            <HiOutlineMapPin className="w-3.5 h-3.5 text-primary-500" />
            {job.location}
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary-50 text-secondary-700 text-xs font-bold border border-secondary-100">
            <HiOutlineBriefcase className="w-3.5 h-3.5 text-accent-500" />
            {job.type}
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary-50 text-secondary-700 text-xs font-bold border border-secondary-100">
            <HiOutlineClock className="w-3.5 h-3.5 text-amber-500" />
            {job.experience}
          </span>
        </div>
        
        {job.salary && <p className="text-lg text-secondary-900 font-black mb-4">{job.salary}</p>}
        <p className="text-base text-secondary-500 leading-relaxed mb-6 line-clamp-2 font-medium">{job.description}</p>
        
        {job.skills?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {job.skills.map((s) => (
              <span key={s} className="px-3 py-1 bg-white border border-secondary-200 text-secondary-600 text-[10px] font-black uppercase tracking-widest rounded-lg">
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
      
      <div className="relative z-10 flex items-center justify-between pt-6 border-t border-secondary-100 mt-auto">
        <span className="flex items-center gap-2 text-xs font-bold text-secondary-400 uppercase tracking-wider">
          <HiOutlineCalendar className="w-3.5 h-3.5" />
          Deadline: {deadline.toLocaleDateString()}
        </span>
        <Button 
          variant="primary" 
          size="lg" 
          className="rounded-full shadow-glow-primary px-8" 
          onClick={() => onApply(job)} 
          disabled={isExpired}
          aria-label={`Apply for ${job.title}`}
        >
          {isExpired ? 'Closed' : (
            <span className="flex items-center gap-2">
              Apply Now <HiOutlineArrowRight className="w-4 h-4" />
            </span>
          )}
        </Button>
      </div>
    </div>
  );
});

export default JobCard;
