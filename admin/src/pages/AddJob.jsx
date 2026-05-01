// admin/src/pages/AddJob.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createJob } from '../api/jobs';
import JobForm from '../components/ui/JobForm';
import toast from 'react-hot-toast';

function AddJob() {
  const navigate = useNavigate();
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['adminJobs'] });
      toast.success('Job created successfully');
      navigate('/jobs');
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to create job');
    },
  });

  return (
    <JobForm 
      onSubmit={(data) => mutation.mutate(data)} 
      loading={mutation.isPending} 
      onCancel={() => navigate('/jobs')} 
    />
  );
}

export default AddJob;
