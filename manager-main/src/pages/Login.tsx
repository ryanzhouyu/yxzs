import { useState, type FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ErrorState from '../components/ErrorState';
import PageHeader from '../components/PageHeader';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [username, setUsername] = useState('demo');
  const [password, setPassword] = useState('demo123');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const redirectTo = (location.state as { from?: string } | null)?.from || '/marketing';

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await login({ username, password });
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : '登录失败');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="app-page min-h-screen overflow-y-auto pb-10 vibrant-gradient-1">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60"></div>
      <PageHeader title="登录" hideRight className="animate-fade-in-up" />
      <main className="px-6 pt-28">
        <form 
          className="glass-card radius-card p-6 space-y-6 animate-fade-in-up" 
          style={{ animationDelay: '0.2s' }}
          onSubmit={handleSubmit}
        >
          <div className="text-center space-y-2 mb-6">
            <h2 className="title-1">欢迎回来</h2>
            <p className="text-white/60 text-sm">请登录您的账号以继续</p>
          </div>
          
          <div className="space-y-4">
            <div className={`relative transition-all duration-300 ${isUsernameFocused ? 'scale-105' : ''}`}>
              <label className="block text-sm mb-2 text-white/80">用户名</label>
              <div className={`relative rounded-2xl overflow-hidden ${isUsernameFocused ? 'border-primary active-glow' : 'border-white/10'}`}>
                <input
                  className="w-full bg-white/5 border border-transparent px-4 py-3 outline-none transition-all duration-300"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  onFocus={() => setIsUsernameFocused(true)}
                  onBlur={() => setIsUsernameFocused(false)}
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40">
                  <span className="material-symbols-outlined text-sm">person</span>
                </div>
              </div>
            </div>
            
            <div className={`relative transition-all duration-300 ${isPasswordFocused ? 'scale-105' : ''}`}>
              <label className="block text-sm mb-2 text-white/80">密码</label>
              <div className={`relative rounded-2xl overflow-hidden ${isPasswordFocused ? 'border-primary active-glow' : 'border-white/10'}`}>
                <input
                  className="w-full bg-white/5 border border-transparent px-4 py-3 outline-none transition-all duration-300"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40">
                  <span className="material-symbols-outlined text-sm">lock</span>
                </div>
              </div>
            </div>
          </div>
          
          {error ? (
            <ErrorState message={error} className="animate-fade-in-up" />
          ) : null}
          
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-full bg-primary font-semibold transition-all duration-300 hover:bg-primary/90 hover:scale-102 active:scale-98 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                <span>登录中...</span>
              </>
            ) : (
              <span>登录</span>
            )}
          </button>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="rounded bg-white/5 border-white/10" />
              <label htmlFor="remember" className="text-white/70">记住我</label>
            </div>
            <Link to="#" className="text-primary hover:underline">忘记密码？</Link>
          </div>
          
          <p className="text-sm text-white/70 text-center">
            还没有账号？ <Link to="/register" className="text-primary font-medium hover:underline">去注册</Link>
          </p>
        </form>
        
        <div className="mt-8 flex items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110">
            <span className="material-symbols-outlined">mail</span>
          </div>
          <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110">
            <span className="material-symbols-outlined">phone</span>
          </div>
          <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110">
            <span className="material-symbols-outlined">qr_code</span>
          </div>
        </div>
      </main>
    </div>
  );
}
