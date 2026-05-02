// admin/src/pages/Applications.jsx
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchApplications, updateApplicationStatus } from '../api/applications';
import { fetchJobs } from '../api/jobs';
import DataTable from '../components/ui/DataTable';
import toast from 'react-hot-toast';
import { HiOutlineExternalLink } from 'react-icons/hi';

const statusColors = {
  pending: 'bg-yellow-50 text-yellow-700',
  reviewing: 'bg-blue-50 text-blue-700',
  shortlisted: 'bg-green-50 text-green-700',
  rejected: 'bg-red-50 text-red-600',
};

function Applications() {
  const [filterJob, setFilterJob] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [page, setPage] = useState(1);
  const qc = useQueryClient();

  const params = { page, limit: 10 };
  if (filterJob) params.jobId = filterJob;
  if (filterStatus) params.status = filterStatus;

  const { data, isLoading } = useQuery({ queryKey: ['applications', params], queryFn: () => fetchApplications(params) });
  const { data: jobsData } = useQuery({ queryKey: ['allJobsForFilter'], queryFn: () => fetchJobs({ limit: 100 }) });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }) => updateApplicationStatus(id, status),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['applications'] }); toast.success('Status updated'); },
    onError: (err) => toast.error(err.response?.data?.message || 'Update failed'),
  });

  const applications = data?.data || [];
  const pagination = data?.pagination || {};
  const allJobs = jobsData?.data || [];

  const columns = [
    { header: 'Name', render: (r) => <span className="font-medium text-secondary-900">{r.name}</span> },
    { header: 'Email', accessor: 'email' },
    { header: 'Job Applied', render: (r) => r.jobId?.title || 'N/A' },
    { header: 'Date', render: (r) => new Date(r.appliedAt).toLocaleDateString() },
    { header: 'Status', render: (r) => (
      <select aria-label="Update Application Status" value={r.status} onChange={(e) => statusMutation.mutate({ id: r._id, status: e.target.value })} className={`px-3 py-1.5 rounded-xl text-xs font-bold border border-transparent cursor-pointer transition-all focus:ring-2 focus:ring-primary-500/20 ${statusColors[r.status] || ''}`}>
        {['pending', 'reviewing', 'shortlisted', 'rejected'].map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
      </select>
    )},
    { header: 'Resume', render: (r) => (
      <a href={`http://localhost:5000${r.resumeUrl}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-50 text-primary-700 hover:bg-primary-100 text-xs font-bold transition-all">
        View <HiOutlineExternalLink className="w-4 h-4" />
      </a>
    )},
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3">
        <select aria-label="Filter by Job" value={filterJob} onChange={(e) => { setFilterJob(e.target.value); setPage(1); }} className="px-4 py-2.5 rounded-xl border border-secondary-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500">
          <option value="">All Jobs</option>
          {allJobs.map((j) => <option key={j._id} value={j._id}>{j.title}</option>)}
        </select>
        <select aria-label="Filter by Status" value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }} className="px-4 py-2.5 rounded-xl border border-secondary-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500">
          <option value="">All Statuses</option>
          {['pending', 'reviewing', 'shortlisted', 'rejected'].map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
      </div>

      {isLoading ? (
        <div className="space-y-3">{[1,2,3].map((i) => <div key={i} className="h-14 skeleton rounded-xl" />)}</div>
      ) : (
        <DataTable columns={columns} data={applications} emptyMessage="No applications found" />
      )}

      {pagination.pages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: pagination.pages }, (_, i) => (
            <button key={i} onClick={() => setPage(i + 1)} className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${page === i + 1 ? 'bg-primary-700 text-white' : 'bg-white text-secondary-600 border border-secondary-200 hover:bg-secondary-50'}`}>{i + 1}</button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Applications;
