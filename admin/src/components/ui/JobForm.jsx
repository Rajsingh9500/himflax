// admin/src/components/ui/JobForm.jsx
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { HiX, HiPlus, HiOutlineCheck } from 'react-icons/hi';

const jobSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  department: z.string().min(2, 'Department is required'),
  location: z.string().min(2, 'Location is required'),
  type: z.enum(['Full-time', 'Part-time', 'Contract', 'Remote']),
  experience: z.string().min(1, 'Experience is required'),
  salary: z.string().optional(),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  lastDate: z.string().min(1, 'Last date is required'),
  isActive: z.boolean().default(true),
});

export default function JobForm({ initialData = null, onSubmit, loading, onCancel }) {
  const [skills, setSkills] = useState(initialData?.skills || []);
  const [skillInput, setSkillInput] = useState('');

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(jobSchema),
    defaultValues: initialData ? {
      ...initialData,
      lastDate: new Date(initialData.lastDate).toISOString().split('T')[0],
    } : { isActive: true, type: 'Full-time' },
  });

  useEffect(() => {
    if (initialData) {
      reset({ ...initialData, lastDate: new Date(initialData.lastDate).toISOString().split('T')[0] });
      setSkills(initialData.skills || []);
    }
  }, [initialData, reset]);

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleFormSubmit = (data) => { onSubmit({ ...data, skills }); };

  const inputClass = "w-full px-5 py-3.5 rounded-xl border border-secondary-200 bg-secondary-50 text-secondary-900 text-sm font-medium placeholder:text-secondary-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all";

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8 bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-sm border border-secondary-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label htmlFor="title" className="block text-sm font-bold text-secondary-900 mb-2 uppercase tracking-wide">Job Title *</label>
          <input id="title" {...register('title')} className={inputClass} placeholder="e.g. Senior Frontend Developer" />
          {errors.title && <p className="text-red-500 text-xs mt-1.5 font-bold">{errors.title.message}</p>}
        </div>
        <div>
          <label htmlFor="department" className="block text-sm font-bold text-secondary-900 mb-2 uppercase tracking-wide">Department *</label>
          <input id="department" {...register('department')} className={inputClass} placeholder="e.g. Engineering" />
          {errors.department && <p className="text-red-500 text-xs mt-1.5 font-bold">{errors.department.message}</p>}
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-bold text-secondary-900 mb-2 uppercase tracking-wide">Location *</label>
          <input id="location" {...register('location')} className={inputClass} placeholder="e.g. New York, NY" />
          {errors.location && <p className="text-red-500 text-xs mt-1.5 font-bold">{errors.location.message}</p>}
        </div>
        <div>
          <label htmlFor="type" className="block text-sm font-bold text-secondary-900 mb-2 uppercase tracking-wide">Job Type *</label>
          <select id="type" {...register('type')} className={inputClass}>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Remote">Remote</option>
          </select>
          {errors.type && <p className="text-red-500 text-xs mt-1.5 font-bold">{errors.type.message}</p>}
        </div>
        <div>
          <label htmlFor="experience" className="block text-sm font-bold text-secondary-900 mb-2 uppercase tracking-wide">Experience *</label>
          <input id="experience" {...register('experience')} className={inputClass} placeholder="e.g. 3-5 Years" />
          {errors.experience && <p className="text-red-500 text-xs mt-1.5 font-bold">{errors.experience.message}</p>}
        </div>
        <div>
          <label htmlFor="salary" className="block text-sm font-bold text-secondary-900 mb-2 uppercase tracking-wide">Salary (Optional)</label>
          <input id="salary" {...register('salary')} className={inputClass} placeholder="e.g. $100k - $130k" />
        </div>
      </div>

      <div>
        <label htmlFor="skillInput" className="block text-sm font-bold text-secondary-900 mb-2 uppercase tracking-wide">Skills Required</label>
        <div className="flex gap-2">
          <input id="skillInput" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleAddSkill(e)} className={inputClass} placeholder="e.g. React.js (Press Add)" />
          <button type="button" onClick={handleAddSkill} className="px-6 py-3.5 bg-secondary-900 text-white rounded-xl font-bold hover:bg-secondary-800 transition-colors flex items-center gap-2">
            <HiPlus /> Add
          </button>
        </div>
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 p-4 rounded-2xl bg-secondary-50 border border-secondary-100">
            {skills.map((skill) => (
              <span key={skill} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-secondary-200 rounded-lg text-sm font-bold text-secondary-700 shadow-sm">
                {skill}
                <button type="button" onClick={() => removeSkill(skill)} className="text-secondary-400 hover:text-red-500"><HiX /></button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-bold text-secondary-900 mb-2 uppercase tracking-wide">Job Description *</label>
        <textarea id="description" {...register('description')} rows={6} className={`${inputClass} resize-none`} placeholder="Detailed responsibilities and requirements..." />
        {errors.description && <p className="text-red-500 text-xs mt-1.5 font-bold">{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label htmlFor="lastDate" className="block text-sm font-bold text-secondary-900 mb-2 uppercase tracking-wide">Application Deadline *</label>
          <input id="lastDate" type="date" {...register('lastDate')} className={inputClass} />
          {errors.lastDate && <p className="text-red-500 text-xs mt-1.5 font-bold">{errors.lastDate.message}</p>}
        </div>
        <div className="flex items-center">
          <label className="flex items-center gap-3 cursor-pointer group mt-6">
            <div className="relative">
              <input type="checkbox" {...register('isActive')} className="sr-only peer" />
              <div className="w-14 h-7 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
            </div>
            <span className="text-sm font-bold text-secondary-900 uppercase tracking-wide group-hover:text-primary-600 transition-colors">Publish Job Immediately</span>
          </label>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 pt-8 border-t border-secondary-100">
        <button type="button" onClick={onCancel} className="px-8 py-4 rounded-xl font-bold text-secondary-600 hover:bg-secondary-100 transition-colors">
          Cancel
        </button>
        <button type="submit" disabled={loading} className="px-8 py-4 rounded-xl font-bold bg-primary-600 text-white hover:bg-primary-500 shadow-glow disabled:opacity-50 flex items-center gap-2 transition-colors">
          <HiOutlineCheck className="w-5 h-5" />
          {loading ? 'Saving...' : initialData ? 'Update Job' : 'Create Job'}
        </button>
      </div>
    </form>
  );
}
