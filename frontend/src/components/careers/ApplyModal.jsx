import { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { HiOutlineXMark, HiOutlineArrowUpTray, HiOutlineDocumentText } from 'react-icons/hi2';
import toast from 'react-hot-toast';
import { submitApplication } from '../../api/jobs';
import Button from '../ui/Button';

const applySchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  coverLetter: z.string().max(2000).optional(),
});

const ApplyModal = memo(function ApplyModal({ job, onClose }) {
  const [resumeFile, setResumeFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({ 
    resolver: zodResolver(applySchema) 
  });

  const onSubmit = async (formData) => {
    if (!resumeFile) { 
      toast.error('Please upload your resume (PDF)'); 
      return; 
    }
    try {
      setSubmitting(true);
      const fd = new FormData();
      fd.append('jobId', job._id);
      fd.append('name', formData.name);
      fd.append('email', formData.email);
      if (formData.phone) fd.append('phone', formData.phone);
      if (formData.coverLetter) fd.append('coverLetter', formData.coverLetter);
      fd.append('resume', resumeFile);
      
      const res = await submitApplication(fd);
      toast.success(res.message || 'Application submitted!');
      onClose();
      reset();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full px-5 py-4 rounded-xl border border-secondary-200 bg-secondary-50/50 text-secondary-900 text-sm font-medium placeholder:text-secondary-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        className="absolute inset-0 bg-secondary-950/80 backdrop-blur-sm" 
        onClick={onClose} 
      />
      
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }} 
        animate={{ scale: 1, opacity: 1, y: 0 }} 
        exit={{ scale: 0.95, opacity: 0, y: 20 }} 
        className="relative bg-white rounded-[2.5rem] shadow-2xl max-w-xl w-full my-auto overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="sticky top-0 bg-white/80 backdrop-blur-md px-8 py-6 border-b border-secondary-100 flex justify-between items-center z-10">
          <div>
            <h2 id="modal-title" className="text-2xl font-bold text-secondary-900 mb-1">Apply for {job.title}</h2>
            <p className="text-sm font-medium text-secondary-500">{job.location} • {job.type}</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full bg-secondary-100 hover:bg-secondary-200 transition-colors text-secondary-600"
            aria-label="Close modal"
          >
            <HiOutlineXMark className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-8 max-h-[70vh] overflow-y-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-xs font-black uppercase tracking-widest text-secondary-900 mb-2 ml-1">Full Name *</label>
                <input id="name" {...register('name')} className={inputClass} placeholder="John Doe" />
                {errors.name && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase">{errors.name.message}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-black uppercase tracking-widest text-secondary-900 mb-2 ml-1">Email Address *</label>
                <input id="email" {...register('email')} type="email" className={inputClass} placeholder="john@example.com" />
                {errors.email && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase">{errors.email.message}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="block text-xs font-black uppercase tracking-widest text-secondary-900 mb-2 ml-1">Phone Number</label>
              <input id="phone" {...register('phone')} className={inputClass} placeholder="+91 XXXXX XXXXX" />
            </div>
            <div>
              <label htmlFor="coverLetter" className="block text-xs font-black uppercase tracking-widest text-secondary-900 mb-2 ml-1">Cover Letter</label>
              <textarea id="coverLetter" {...register('coverLetter')} rows={4} className={`${inputClass} resize-none`} placeholder="Why are you a great fit?" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-secondary-900 mb-2 ml-1">Resume (PDF, max 5MB) *</label>
              <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-2xl transition-colors ${resumeFile ? 'border-primary-500 bg-primary-50/10' : 'border-secondary-200 hover:bg-secondary-50'}`}>
                <div className="space-y-2 text-center">
                  <div className="mx-auto w-12 h-12 rounded-xl bg-secondary-100 flex items-center justify-center text-secondary-400 group-hover:text-primary-500 transition-colors">
                    {resumeFile ? <HiOutlineDocumentText className="w-6 h-6 text-primary-600" /> : <HiOutlineArrowUpTray className="w-6 h-6" />}
                  </div>
                  <div className="flex text-sm text-secondary-600 justify-center">
                    <label htmlFor="resume-upload" className="relative cursor-pointer rounded-md font-bold text-primary-600 hover:text-primary-500">
                      <span>{resumeFile ? 'Change file' : 'Upload a file'}</span>
                      <input id="resume-upload" type="file" accept=".pdf" className="sr-only" onChange={(e) => setResumeFile(e.target.files[0])} />
                    </label>
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-secondary-400">
                    {resumeFile ? resumeFile.name : 'PDF files only up to 5MB'}
                  </p>
                </div>
              </div>
            </div>
            <Button type="submit" variant="primary" size="lg" loading={submitting} className="w-full rounded-2xl shadow-glow-primary py-5">
              Submit Application
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
});

export default ApplyModal;
