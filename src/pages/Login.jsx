import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ShieldAlert, LogIn } from 'lucide-react';

export default function Login() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginWithGoogle, currentUser } = useAuth();
  const navigate = useNavigate();

  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  async function handleGoogleLogin() {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
      navigate('/');
    } catch (err) {
      setError('Failed to log in with Google');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0D1117] py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-[#161b22] p-10 rounded-xl border border-gray-800 shadow-2xl">
        <div className="flex flex-col items-center">
          <ShieldAlert className="h-16 w-16 text-neon-green mb-4" />
          <h2 className="text-center text-3xl font-bold tracking-tight text-white font-mono">
            Cyber<span className="text-neon-green">LMS</span>
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400 font-mono">
            Personal Development Record & Tracker
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-red-900/50 p-4 border border-red-500/50">
            <p className="text-sm text-red-400 font-mono text-center">{error}</p>
          </div>
        )}

        <div className="mt-8 space-y-6">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="group relative flex w-full justify-center rounded-md bg-neon-green px-3 py-3 text-sm font-semibold text-black hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-green transition-all disabled:opacity-50 font-mono"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <LogIn className="h-5 w-5 group-hover:text-black/80" aria-hidden="true" />
            </span>
            {loading ? 'Authenticating...' : 'Sign in with Google'}
          </button>
        </div>

        <div className="mt-6">
          <p className="text-xs text-center text-gray-500 font-mono">
            Restricted access. Authorized personnel only.
          </p>
        </div>
      </div>
    </div>
  );
}
