// admin/src/pages/Jobs.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchJobs, toggleJob, deleteJob } from '../api/jobs';
import DataTable from '../components/ui/DataTable';
import toast from 'react-hot-toast';
import { HiPlus, HiPencil, HiTrash, HiEye, HiEyeOff, HiSearch } from 'react-icons/hi';

function Jobs() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({ queryKey: ['adminJobs', page], queryFn: () => fetchJobs({ page, limit: 10 }) });

  const toggleMutation = useMutation({ mutationFn: toggleJob, onSuccess: () => { qc.invalidateQueries({ queryKey: ['adminJobs'] }); toast.success('Job status updated'); } });
  const deleteMutation = useMutation({ mutationFn: deleteJob, onSuccess: () => { qc.invalidateQueries({ queryKey: ['adminJobs'] }); toast.success('Job deleted'); setConfirmDelete(null); } });

  const jobs = (data?.data || []).filter((j) => !search || j.title.toLowerCase().includes(search.toLowerCase()));
  const pagination = data?.pagination || {};

  const columns = [
    { header: 'Title', render: (r) => <span className="font-medium text-secondary-900 max-w-[200px] truncate block">{r.title}</span> },
    { header: 'Location', accessor: 'location' },
    { header: 'Type', render: (r) => <span className="px-2 py-1 rounded-lg bg-primary-50 text-primary-700 text-xs font-medium">{r.type}</span> },
    { header: 'Experience', accessor: 'experience' },
    { header: 'Deadline', render: (r) => new Date(r.lastDate).toLocaleDateString() },
    { header: 'Active', render: (r) => <span className={`px-2 py-1 rounded-lg text-xs font-medium ${r.isActive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>{r.isActive ? 'Yes' : 'No'}</span> },
    { header: 'Actions', render: (r) => (
      <div className="flex items-center gap-2">
        <Link to={`/jobs/edit/${r._id}`} className="p-1.5 rounded-lg hover:bg-secondary-50 text-secondary-400 hover:text-primary-600 transition-colors"><HiPencil className="w-4 h-4" /></Link>
        <button onClick={() => toggleMutation.mutate(r._id)} className="p-1.5 rounded-lg hover:bg-secondary-50 text-secondary-400 hover:text-amber-600 transition-colors">{r.isActive ? <HiEyeOff className="w-4 h-4" /> : <HiEye className="w-4 h-4" />}</button>
        <button onClick={() => setConfirmDelete(r._id)} className="p-1.5 rounded-lg hover:bg-red-50 text-secondary-400 hover:text-red-600 transition-colors"><HiTrash className="w-4 h-4" /></button>
      </div>
    )},
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400 w-4 h-4" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search jobs..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-secondary-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500" />
        </div>
        <Link to="/jobs/add" className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-700 text-white text-sm font-medium rounded-xl hover:bg-primary-800 transition-all shadow-lg shadow-primary-700/25">
          <HiPlus className="w-4 h-4" /> Add Job
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-3">{[1,2,3].map((i) => <div key={i} className="h-14 skeleton rounded-xl" />)}</div>
      ) : (
        <DataTable columns={columns} data={jobs} emptyMessage="No jobs found" />
      )}

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: pagination.pages }, (_, i) => (
            <button key={i} onClick={() => setPage(i + 1)} className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${page === i + 1 ? 'bg-primary-700 text-white' : 'bg-white text-secondary-600 border border-secondary-200 hover:bg-secondary-50'}`}>{i + 1}</button>
          ))}
        </div>
      )}

      {/* Delete Confirm Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-lg font-semibold text-secondary-900 mb-2">Confirm Delete</h3>
            <p className="text-sm text-secondary-500 mb-6">Are you sure you want to delete this job? It will be deactivated.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setConfirmDelete(null)} className="px-4 py-2 text-sm font-medium text-secondary-600 hover:bg-secondary-50 rounded-xl">Cancel</button>
              <button onClick={() => deleteMutation.mutate(confirmDelete)} className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-xl hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Jobs;
