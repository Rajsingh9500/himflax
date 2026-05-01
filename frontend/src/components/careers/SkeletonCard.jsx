import { memo } from 'react';

const SkeletonCard = memo(function SkeletonCard() {
  return (
    <div className="bg-white rounded-[2rem] border border-secondary-100 p-8 space-y-6 shadow-sm min-h-[380px] flex flex-col justify-between">
      <div className="space-y-4">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-2 flex-1">
            <div className="h-8 w-3/4 bg-secondary-100 rounded-xl animate-pulse" />
            <div className="h-5 w-1/2 bg-secondary-50 rounded-xl animate-pulse" />
          </div>
          <div className="h-6 w-16 bg-secondary-50 rounded-lg animate-pulse" />
        </div>
        
        <div className="flex flex-wrap gap-3">
          <div className="h-9 w-28 bg-secondary-50 rounded-xl animate-pulse" />
          <div className="h-9 w-32 bg-secondary-50 rounded-xl animate-pulse" />
          <div className="h-9 w-24 bg-secondary-50 rounded-xl animate-pulse" />
        </div>
        
        <div className="space-y-2 pt-4">
          <div className="h-4 w-full bg-secondary-50 rounded-xl animate-pulse" />
          <div className="h-4 w-5/6 bg-secondary-50 rounded-xl animate-pulse" />
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-6 border-t border-secondary-100">
        <div className="h-5 w-32 bg-secondary-50 rounded-xl animate-pulse" />
        <div className="h-12 w-32 bg-secondary-100 rounded-full animate-pulse" />
      </div>
    </div>
  );
});

export default SkeletonCard;
