import { memo } from 'react';
import { motion } from 'framer-motion';

const StatCard = memo(function StatCard({ title, value, icon: Icon, trend, colorClass }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="bg-white rounded-[2rem] p-8 border border-secondary-100 shadow-sm hover:shadow-soft transition-all duration-300 relative overflow-hidden group"
    >
      <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-10 transition-transform duration-500 group-hover:scale-150 ${colorClass.replace('text-', 'bg-')}`} />
      
      <div className="flex justify-between items-start relative z-10">
        <div>
          <p className="text-sm font-bold text-secondary-500 uppercase tracking-wider mb-2">{title}</p>
          <p className="text-4xl font-bold text-secondary-900 tracking-tight">{value}</p>
        </div>
        <div className={`p-4 rounded-2xl ${colorClass.replace('text-', 'bg-').replace('-500', '-50')} ${colorClass}`}>
          <Icon className="w-8 h-8" />
        </div>
      </div>
      
      {trend && (
        <div className="mt-6 flex items-center gap-2 relative z-10">
          <span className={`text-sm font-bold px-2 py-1 rounded-lg ${trend > 0 ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
          <span className="text-sm font-medium text-secondary-400">from last month</span>
        </div>
      )}
    </motion.div>
  );
});

export default StatCard;
