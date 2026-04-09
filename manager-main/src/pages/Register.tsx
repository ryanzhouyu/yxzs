import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ErrorState from '../components/ErrorState';
import PageHeader from '../components/PageHeader';
import { useAuth } from '../contexts/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({
    username: '',
    password: '',
    nickname: '',
    hotel_name: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await register(form);
      navigate('/marketing', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : '注册失败');
    } finally {
      setSubmitting(false);
    }
  }

  const formFields = [
    { key: 'username', label: '用户名', icon: 'person' },
    { key: 'nickname', label: '昵称', icon: 'face' },
    { key: 'hotel_name', label: '酒店名称', icon: 'business' },
    { key: 'password', label: '密码', icon: 'lock', type: 'password' },
  ];

  return (
    <div className="app-page min-h-screen overflow-y-auto pb-10 vibrant-gradient-1">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60"></div>
      <PageHeader title="注册" hideRight className="animate-fade-in-up" />
      <main className="px-6 pt-28">
        <form 
          className="glass-card radius-card p-6 space-y-6 animate-fade-in-up" 
          style={{ animationDelay: '0.2s' }}
          onSubmit={handleSubmit}
        >
          <div className="text-center space-y-2 mb-6">
            <h2 className="title-1">创建账号</h2>
            <p className="text-white/60 text-sm">填写以下信息完成注册</p>
          </div>
          
          <div className="space-y-4">
            {formFields.map((field, index) => (
              <div 
                key={field.key} 
                className={`relative transition-all duration-300 ${focusedField === field.key ? 'scale-105' : ''}`}
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <label className="block text-sm mb-2 text-white/80">{field.label}</label>
                <div className={`relative rounded-2xl overflow-hidden ${focusedField === field.key ? 'border-primary active-glow' : 'border-white/10'}`}>
                  <input
                    type={field.type || 'text'}
                    className="w-full bg-white/5 border border-transparent px-4 py-3 outline-none transition-all duration-300"
                    value={form[field.key as keyof typeof form]}
                    onChange={(event) => setForm((current) => ({ ...current, [field.key]: event.target.value }))}
                    onFocus={() => setFocusedField(field.key)}
                    onBlur={() => setFocusedField(null)}
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40">
                    <span className="material-symbols-outlined text-sm">{field.icon}</span>
                  </div>
                </div>
              </div>
            ))}
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
                <span>注册中...</span>
              </>
            ) : (
              <span>注册</span>
            )}
          </button>
          
          <div className="flex items-center gap-2 text-sm text-white/70">
            <input type="checkbox" id="terms" className="rounded bg-white/5 border-white/10" />
            <label htmlFor="terms">我已阅读并同意 <Link to="#" className="text-primary hover:underline">服务条款</Link> 和 <Link to="#" className="text-primary hover:underline">隐私政策</Link></label>
          </div>
          
          <p className="text-sm text-white/70 text-center">
            已有账号？ <Link to="/login" className="text-primary font-medium hover:underline">去登录</Link>
          </p>
        </form>
        
        <div className="mt-8 flex items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
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
