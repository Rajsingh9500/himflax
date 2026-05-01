// admin/src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { motion } from 'framer-motion';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login({ email, password });
      toast.success('Welcome back!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-950 p-4 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-600/20 rounded-full blur-[120px] animate-blob" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-500/20 rounded-full blur-[100px] animate-blob" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.02]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.95 }} 
        animate={{ opacity: 1, y: 0, scale: 1 }} 
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 mx-auto mb-6 flex items-center justify-center shadow-glow">
            <span className="text-3xl font-bold text-white tracking-wider">H</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome Back</h1>
          <p className="text-secondary-400 font-medium">Sign in to NexaCore CMS</p>
        </div>

        <div className="glass-dark rounded-[2.5rem] shadow-2xl p-8 sm:p-10 border border-white/10 backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-secondary-300 mb-2 uppercase tracking-wide">Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                className="w-full px-5 py-4 rounded-xl bg-secondary-900/50 border border-secondary-700 text-white placeholder:text-secondary-500 focus:bg-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all font-medium" 
                placeholder="admin@himflax.com" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-secondary-300 mb-2 uppercase tracking-wide">Password</label>
              <div className="relative">
                <input 
                  type={showPw ? 'text' : 'password'} 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  className="w-full px-5 py-4 rounded-xl bg-secondary-900/50 border border-secondary-700 text-white placeholder:text-secondary-500 focus:bg-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 pr-12 transition-all font-medium" 
                  placeholder="••••••••" 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPw(!showPw)} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary-400 hover:text-white transition-colors"
                >
                  {showPw ? <HiEyeOff className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full py-4 mt-2 bg-gradient-to-r from-primary-600 to-primary-500 text-white text-base font-bold rounded-xl hover:from-primary-500 hover:to-primary-400 transition-all disabled:opacity-50 shadow-glow"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
