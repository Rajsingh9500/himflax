// admin/src/pages/Occasions.jsx
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { fetchOccasions, createOccasion, updateOccasion, deleteOccasion, toggleOccasionLive } from '../api/occasions';
import toast from 'react-hot-toast';
import { HiPlus, HiPencil, HiTrash, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

const occasionSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  emoji: z.string().optional().or(z.literal('')),
  title: z.string().min(1, 'Title is required'),
  message: z.string().min(1, 'Message is required'),
  ctaText: z.string().optional().or(z.literal('')),
  ctaLink: z.string().optional().or(z.literal('')),
  ctaColor: z.string().default('primary-600'),
  isLive: z.boolean().default(false),
});

const PRESETS = [
  { name: 'Diwali', emoji: '🪔', title: 'Happy Diwali!', message: 'Wishing you a festival of lights filled with joy and prosperity.', ctaText: 'View Offers', ctaColor: 'orange-500' },
  { name: 'Christmas', emoji: '🎄', title: 'Merry Christmas!', message: 'Wishing you joy, peace, and good health this holiday season.', ctaText: 'Holiday Specials', ctaColor: 'red-600' },
  { name: 'New Year', emoji: '🎆', title: 'Happy New Year!', message: 'Here is to a brilliant new year ahead filled with success.', ctaText: 'Our Vision', ctaColor: 'primary-600' },
];

export default function Occasions() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOccasion, setEditingOccasion] = useState(null);

  const { data: response, isLoading } = useQuery({
    queryKey: ['occasions'],
    queryFn: fetchOccasions,
  });

  const occasions = response?.data || [];

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(occasionSchema),
    defaultValues: {
      emoji: '🎉',
      ctaColor: 'primary-600',
      isLive: false,
    }
  });

  const createMutation = useMutation({
    mutationFn: createOccasion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['occasions'] });
      toast.success('Occasion created successfully');
      closeModal();
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Failed to create'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateOccasion(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['occasions'] });
      toast.success('Occasion updated successfully');
      closeModal();
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Failed to update'),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteOccasion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['occasions'] });
      toast.success('Occasion deleted successfully');
    },
  });

  const toggleLiveMutation = useMutation({
    mutationFn: toggleOccasionLive,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['occasions'] });
      toast.success('Occasion live status updated');
    },
  });

  const openModal = (occasion = null) => {
    if (occasion) {
      setEditingOccasion(occasion);
      reset({
        ...occasion,
        emoji: occasion.emoji || '',
        ctaText: occasion.ctaText || '',
        ctaLink: occasion.ctaLink || '',
      });
    } else {
      setEditingOccasion(null);
      reset({
        name: '', emoji: '🎉', title: '', message: '', ctaText: '', ctaLink: '', ctaColor: 'primary-600', isLive: false,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingOccasion(null);
    reset();
  };

  const applyPreset = (preset) => {
    Object.keys(preset).forEach(key => setValue(key, preset[key]));
  };

  const onSubmit = (data) => {
    if (editingOccasion) {
      updateMutation.mutate({ id: editingOccasion._id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  if (isLoading) return <div>Loading occasions...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-secondary-900">Manage Occasions</h2>
        <button onClick={() => openModal()} className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-primary-500 transition-colors">
          <HiPlus className="w-5 h-5" /> Add Occasion
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {occasions.map((occ) => (
          <div key={occ._id} className={`bg-white rounded-2xl p-6 border-2 transition-all ${occ.isLive ? 'border-primary-500 shadow-glow' : 'border-secondary-200 shadow-sm'}`}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{occ.emoji}</span>
                <div>
                  <h3 className="font-bold text-secondary-900">{occ.name}</h3>
                  {occ.isLive && <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-primary-100 text-primary-700 uppercase tracking-widest mt-1">Live Now</span>}
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => openModal(occ)} className="p-1.5 text-secondary-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg"><HiPencil className="w-4 h-4" /></button>
                <button onClick={() => { if(window.confirm('Delete?')) deleteMutation.mutate(occ._id); }} className="p-1.5 text-secondary-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><HiTrash className="w-4 h-4" /></button>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="text-sm font-bold text-secondary-900 mb-1">{occ.title}</div>
              <p className="text-sm text-secondary-500 line-clamp-2">{occ.message}</p>
            </div>

            <button
              onClick={() => toggleLiveMutation.mutate(occ._id)}
              className={`w-full py-2 rounded-xl text-sm font-bold transition-all ${occ.isLive ? 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200' : 'bg-primary-50 text-primary-600 hover:bg-primary-100'}`}
            >
              {occ.isLive ? 'Deactivate' : 'Make Live'}
            </button>
          </div>
        ))}
        {occasions.length === 0 && <div className="col-span-full p-10 text-center text-secondary-500 bg-white rounded-2xl border border-secondary-200">No occasions created yet.</div>}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-secondary-950/40 backdrop-blur-sm" onClick={closeModal} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="flex items-center justify-between p-6 border-b border-secondary-100">
                <h3 className="text-xl font-bold text-secondary-900">{editingOccasion ? 'Edit Occasion' : 'Create Occasion'}</h3>
                <button onClick={closeModal} className="p-2 text-secondary-400 hover:text-secondary-600 rounded-lg hover:bg-secondary-100"><HiX className="w-5 h-5" /></button>
              </div>
              <div className="p-6 overflow-y-auto">
                
                {!editingOccasion && (
                  <div className="mb-6">
                    <p className="text-xs font-bold text-secondary-500 uppercase tracking-wider mb-2">Quick Presets</p>
                    <div className="flex flex-wrap gap-2">
                      {PRESETS.map((p) => (
                        <button key={p.name} type="button" onClick={() => applyPreset(p)} className="px-3 py-1.5 rounded-lg border border-secondary-200 text-sm font-semibold text-secondary-700 hover:border-primary-500 hover:bg-primary-50 transition-all">
                          {p.emoji} {p.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <form id="occasionForm" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-secondary-700 mb-1">Internal Name *</label>
                      <input type="text" {...register('name')} placeholder="e.g. Diwali 2024" className="w-full px-4 py-2 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-secondary-700 mb-1">Emoji</label>
                      <input type="text" {...register('emoji')} className="w-full px-4 py-2 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-bold text-secondary-700 mb-1">Popup Title *</label>
                      <input type="text" {...register('title')} className="w-full px-4 py-2 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" />
                      {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-bold text-secondary-700 mb-1">Popup Message *</label>
                      <textarea {...register('message')} rows={3} className="w-full px-4 py-2 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" />
                      {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-secondary-700 mb-1">CTA Text</label>
                      <input type="text" {...register('ctaText')} className="w-full px-4 py-2 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-secondary-700 mb-1">CTA Link</label>
                      <input type="text" {...register('ctaLink')} className="w-full px-4 py-2 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" />
                    </div>
                    <div className="col-span-2 flex items-center gap-3 pt-4">
                      <input type="checkbox" id="isLive" {...register('isLive')} className="w-5 h-5 text-primary-600 rounded border-secondary-300 focus:ring-primary-500" />
                      <label htmlFor="isLive" className="text-sm font-bold text-secondary-700">Make Live Now (deactivates others)</label>
                    </div>
                  </div>
                </form>
              </div>
              <div className="p-6 border-t border-secondary-100 bg-secondary-50 flex justify-end gap-3">
                <button type="button" onClick={closeModal} className="px-6 py-2 rounded-xl font-bold text-secondary-600 hover:bg-secondary-200 transition-colors">Cancel</button>
                <button type="submit" form="occasionForm" disabled={createMutation.isPending || updateMutation.isPending} className="px-6 py-2 rounded-xl font-bold bg-primary-600 text-white hover:bg-primary-500 transition-colors disabled:opacity-50">
                  {editingOccasion ? 'Update Occasion' : 'Create Occasion'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
