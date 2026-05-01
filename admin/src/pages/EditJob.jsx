// admin/src/pages/EditJob.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchJobById, updateJob } from '../api/jobs';
import JobForm from '../components/ui/JobForm';
import toast from 'react-hot-toast';

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({ queryKey: ['job', id], queryFn: () => fetchJobById(id) });

  const mutation = useMutation({
    mutationFn: (formData) => updateJob(id, formData),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['adminJobs'] });
      toast.success('Job updated successfully');
      navigate('/jobs');
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to update job');
    },
  });

  if (isLoading) {
    return <div className="bg-white rounded-2xl border border-secondary-100 p-6"><div className="space-y-4">{[1,2,3,4].map((i) => <div key={i} className="h-10 skeleton rounded-xl" />)}</div></div>;
  }

  return (
    <JobForm 
      initialData={data?.data} 
      onSubmit={(formData) => mutation.mutate(formData)} 
      loading={mutation.isPending} 
      onCancel={() => navigate('/jobs')}
    />
  );
}

export default EditJob;
