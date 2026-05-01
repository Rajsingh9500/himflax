// admin/src/pages/Banners.jsx
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { fetchBanners, createBanner, updateBanner, deleteBanner } from '../api/banners';
import toast from 'react-hot-toast';
import { HiPlus, HiPencil, HiTrash, HiX, HiCheck } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

const bannerSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  subtitle: z.string().max(200).optional().or(z.literal('')),
  badgeText: z.string().max(50).optional().or(z.literal('')),
  ctaText: z.string().min(1, 'CTA text is required'),
  ctaLink: z.string().min(1, 'CTA link is required'),
  imageUrl: z.string().min(1, 'Image URL is required'),
  overlayTheme: z.enum(['blue', 'purple', 'dark', 'light', 'orange', 'green']).default('dark'),
  isActive: z.boolean().default(true),
  order: z.number().min(0, 'Order must be positive'),
});

export default function Banners() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);

  const { data: response, isLoading } = useQuery({
    queryKey: ['banners'],
    queryFn: fetchBanners,
  });

  const banners = response?.data || [];

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      isActive: true,
      overlayTheme: 'dark',
      order: 0,
    }
  });

  const createMutation = useMutation({
    mutationFn: createBanner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banners'] });
      toast.success('Banner created successfully');
      closeModal();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create banner');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateBanner(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banners'] });
      toast.success('Banner updated successfully');
      closeModal();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update banner');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBanner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banners'] });
      toast.success('Banner deleted successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete banner');
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: ({ id, isActive }) => updateBanner(id, { isActive: !isActive }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banners'] });
      toast.success('Banner status updated');
    },
  });

  const openModal = (banner = null) => {
    if (banner) {
      setEditingBanner(banner);
      reset({
        ...banner,
        subtitle: banner.subtitle || '',
        badgeText: banner.badgeText || '',
      });
    } else {
      setEditingBanner(null);
      reset({
        title: '', subtitle: '', badgeText: '', ctaText: '', ctaLink: '', imageUrl: '', overlayTheme: 'dark', isActive: true, order: banners.length,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingBanner(null);
    reset();
  };

  const onSubmit = (data) => {
    if (editingBanner) {
      updateMutation.mutate({ id: editingBanner._id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <div>Loading banners...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-secondary-900">Manage Banners</h2>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-primary-500 transition-colors"
        >
          <HiPlus className="w-5 h-5" />
          Add Banner
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-secondary-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-secondary-50 border-b border-secondary-200 text-sm font-semibold text-secondary-500 uppercase tracking-wider">
              <th className="p-4">Order</th>
              <th className="p-4">Image</th>
              <th className="p-4">Title</th>
              <th className="p-4">Theme</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary-100">
            {banners.length === 0 ? (
              <tr><td colSpan="6" className="p-8 text-center text-secondary-500">No banners found. Add one!</td></tr>
            ) : (
              banners.map((banner) => (
                <tr key={banner._id} className="hover:bg-secondary-50/50 transition-colors">
                  <td className="p-4 font-medium">{banner.order}</td>
                  <td className="p-4">
                    <img src={banner.imageUrl} alt={banner.title} className="w-20 h-12 object-cover rounded-md" />
                  </td>
                  <td className="p-4 font-semibold text-secondary-900">{banner.title}</td>
                  <td className="p-4"><span className="px-2 py-1 rounded bg-secondary-100 text-xs font-bold uppercase">{banner.overlayTheme}</span></td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleStatusMutation.mutate({ id: banner._id, isActive: banner.isActive })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${banner.isActive ? 'bg-green-500' : 'bg-secondary-300'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${banner.isActive ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </td>
                  <td className="p-4 text-right flex justify-end gap-2">
                    <button onClick={() => openModal(banner)} className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                      <HiPencil className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleDelete(banner._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <HiTrash className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-secondary-950/40 backdrop-blur-sm" onClick={closeModal} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="flex items-center justify-between p-6 border-b border-secondary-100">
                <h3 className="text-xl font-bold text-secondary-900">{editingBanner ? 'Edit Banner' : 'Add Banner'}</h3>
                <button onClick={closeModal} className="p-2 text-secondary-400 hover:text-secondary-600 rounded-lg hover:bg-secondary-100"><HiX className="w-5 h-5" /></button>
              </div>
              <div className="p-6 overflow-y-auto">
                <form id="bannerForm" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-secondary-700 mb-1">Title *</label>
                      <input type="text" {...register('title')} className="w-full px-4 py-2 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" />
                      {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-secondary-700 mb-1">Subtitle</label>
                      <input type="text" {...register('subtitle')} className="w-full px-4 py-2 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-secondary-700 mb-1">Badge Text</label>
                      <input type="text" {...register('badgeText')} className="w-full px-4 py-2 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-secondary-700 mb-1">Order *</label>
                      <input type="number" {...register('order', { valueAsNumber: true })} className="w-full px-4 py-2 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-secondary-700 mb-1">CTA Text *</label>
                      <input type="text" {...register('ctaText')} className="w-full px-4 py-2 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" />
                      {errors.ctaText && <p className="text-red-500 text-xs mt-1">{errors.ctaText.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-secondary-700 mb-1">CTA Link *</label>
                      <input type="text" {...register('ctaLink')} className="w-full px-4 py-2 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" />
                      {errors.ctaLink && <p className="text-red-500 text-xs mt-1">{errors.ctaLink.message}</p>}
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-bold text-secondary-700 mb-1">Image URL *</label>
                      <input type="text" {...register('imageUrl')} placeholder="https://..." className="w-full px-4 py-2 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" />
                      {errors.imageUrl && <p className="text-red-500 text-xs mt-1">{errors.imageUrl.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-secondary-700 mb-1">Overlay Theme</label>
                      <select {...register('overlayTheme')} className="w-full px-4 py-2 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none bg-white">
                        <option value="dark">Dark</option>
                        <option value="blue">Blue</option>
                        <option value="purple">Purple</option>
                        <option value="orange">Orange</option>
                        <option value="green">Green</option>
                        <option value="light">Light</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-3 pt-6">
                      <input type="checkbox" id="isActive" {...register('isActive')} className="w-5 h-5 text-primary-600 rounded border-secondary-300 focus:ring-primary-500" />
                      <label htmlFor="isActive" className="text-sm font-bold text-secondary-700">Active (Visible on site)</label>
                    </div>
                  </div>
                </form>
              </div>
              <div className="p-6 border-t border-secondary-100 bg-secondary-50 flex justify-end gap-3">
                <button type="button" onClick={closeModal} className="px-6 py-2 rounded-xl font-bold text-secondary-600 hover:bg-secondary-200 transition-colors">Cancel</button>
                <button type="submit" form="bannerForm" disabled={createMutation.isPending || updateMutation.isPending} className="px-6 py-2 rounded-xl font-bold bg-primary-600 text-white hover:bg-primary-500 transition-colors disabled:opacity-50">
                  {editingBanner ? 'Update Banner' : 'Create Banner'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
