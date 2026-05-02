// admin/src/pages/Dashboard.jsx
import { useEffect, useState, memo } from 'react';
import { getDashboardStats } from '../api/jobs';
import StatCard from '../components/ui/StatCard';
import { HiOutlineBriefcase, HiOutlineUserGroup, HiOutlineDocumentText, HiOutlineCheckCircle, HiOutlinePhotograph, HiOutlineStar } from 'react-icons/hi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';
import { motion } from 'framer-motion';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-secondary-900 border border-secondary-700 text-white p-4 rounded-xl shadow-glass-dark">
        <p className="font-bold text-sm mb-1">{label}</p>
        <p className="text-primary-400 font-medium text-sm">
          Applications: <span className="text-white">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getDashboardStats();
        setStats(response.data);
      } catch (error) {
        console.error('Failed to load stats', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white p-8 rounded-[2rem] border border-secondary-100 shadow-sm animate-pulse h-40">
            <div className="h-4 bg-secondary-200 rounded w-1/2 mb-4" />
            <div className="h-8 bg-secondary-200 rounded w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  const statCards = [
    { title: 'Total Jobs', value: stats?.totalJobs || 0, icon: HiOutlineBriefcase, colorClass: 'text-primary-600', trend: 12 },
    { title: 'Active Jobs', value: stats?.activeJobs || 0, icon: HiOutlineCheckCircle, colorClass: 'text-green-600', trend: 5 },
    { title: 'Total Applications', value: stats?.totalApplications || 0, icon: HiOutlineDocumentText, colorClass: 'text-purple-600', trend: 24 },
    { title: 'New This Week', value: stats?.newThisWeek || 0, icon: HiOutlineUserGroup, colorClass: 'text-accent-500', trend: 8 },
    { title: 'Active Banners', value: `${stats?.activeBanners || 0} / ${stats?.totalBanners || 0}`, icon: HiOutlinePhotograph, colorClass: 'text-blue-500', trend: 0 },
    { title: 'Live Occasion', value: stats?.activeOccasion || 'None', icon: HiOutlineStar, colorClass: 'text-orange-500', trend: 0 },
  ];

  return (
    <div className="space-y-10">
      {/* Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
        className="bg-gradient-to-r from-secondary-900 to-secondary-800 rounded-[2.5rem] p-10 relative overflow-hidden shadow-glass-dark"
      >
        <div className="absolute right-0 top-0 w-96 h-96 bg-primary-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="relative z-10 text-white">
          <h2 className="text-3xl font-bold mb-2 tracking-tight">Welcome back, Admin 👋</h2>
          <p className="text-secondary-400 text-lg font-medium">Here is what is happening with your job postings today.</p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <motion.div key={stat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-sm border border-secondary-100">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-bold text-secondary-900">Application Trends</h3>
            <p className="text-sm font-medium text-secondary-500">Number of applications received over the last 6 months</p>
          </div>
          <select aria-label="Select Date Range" className="px-4 py-2 bg-secondary-50 border border-secondary-200 rounded-xl text-sm font-bold text-secondary-700 focus:outline-none focus:border-primary-500">
            <option>Last 6 Months</option>
            <option>This Year</option>
          </select>
        </div>
        
        <div className="h-[400px] w-full">
          {stats?.applicationsPerJob?.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.applicationsPerJob} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="jobTitle" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="count" radius={[8, 8, 8, 8]}>
                  {stats.applicationsPerJob.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#6366f1' : '#c7d2fe'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-secondary-400">
              <HiOutlineDocumentText className="w-16 h-16 mb-4 text-secondary-200" />
              <p className="font-medium">No application data available yet</p>
            </div>
          )}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Application Status Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-secondary-100">
          <h3 className="text-xl font-bold text-secondary-900 mb-6">Application Status</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats?.applicationsByStatus || []}
                  dataKey="count"
                  nameKey="_id"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                >
                  {stats?.applicationsByStatus?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#6366f1', '#10b981', '#f59e0b', '#ef4444'][index % 4]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Jobs by Type Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-secondary-100">
          <h3 className="text-xl font-bold text-secondary-900 mb-6">Jobs by Type</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats?.jobsByType || []} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" axisLine={false} tickLine={false} hide />
                <YAxis dataKey="_id" type="category" axisLine={false} tickLine={false} width={100} tick={{ fontSize: 12, fontWeight: 600 }} />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="count" fill="#818cf8" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default memo(Dashboard);
