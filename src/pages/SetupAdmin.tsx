import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Shield, CheckCircle, AlertCircle } from 'lucide-react';

export default function SetupAdmin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const createAdminAccount = async () => {
    setLoading(true);
    setError('');

    const adminEmail = 'goldcollarpartners@gmail.com';
    const adminPassword = 'GoldCollar2025!';

    try {
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: adminEmail,
        password: adminPassword,
        options: {
          data: {
            full_name: 'Gold Collar Admin'
          }
        }
      });

      if (signUpError) throw signUpError;

      if (authData.user) {
        const { error: profileError } = await supabase
          .from('admin_users')
          .insert([
            {
              id: authData.user.id,
              email: authData.user.email,
              full_name: 'Gold Collar Admin',
            },
          ]);

        if (profileError) {
          console.log('Profile creation note:', profileError.message);
        }

        setCredentials({ email: adminEmail, password: adminPassword });
        setSuccess(true);
      }
    } catch (err: any) {
      console.error('Setup error:', err);
      setError(err.message || 'Failed to create admin account');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#8b7355] to-[#6d5a42] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Created!</h1>
              <p className="text-gray-600">Your admin account has been set up successfully</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6 space-y-3">
              <h2 className="font-semibold text-gray-900 mb-3">Your Login Credentials:</h2>
              <div>
                <p className="text-sm text-gray-600">Email:</p>
                <p className="font-mono text-sm bg-white px-3 py-2 rounded border border-gray-200 mt-1">
                  {credentials.email}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Password:</p>
                <p className="font-mono text-sm bg-white px-3 py-2 rounded border border-gray-200 mt-1">
                  {credentials.password}
                </p>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-amber-800">
                <strong>Important:</strong> Save these credentials! You can change the password after logging in.
              </p>
            </div>

            <button
              onClick={() => navigate('/admin/login')}
              className="w-full bg-[#8b7355] text-white py-3 rounded-lg font-semibold hover:bg-[#6d5a42] transition-colors"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8b7355] to-[#6d5a42] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#8b7355]/10 rounded-full mb-4">
              <Shield className="w-8 h-8 text-[#8b7355]" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Setup</h1>
            <p className="text-gray-600">Create your admin account with one click</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-red-800 font-medium">Setup Failed</p>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          )}

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h2 className="font-semibold text-gray-900 mb-3">Admin Account Details:</h2>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Email: <span className="font-mono text-gray-900">goldcollarpartners@gmail.com</span></p>
              <p>Password: <span className="font-mono text-gray-900">GoldCollar2025!</span></p>
            </div>
            <p className="text-xs text-gray-500 mt-3">You can change this password after logging in</p>
          </div>

          <button
            onClick={createAdminAccount}
            disabled={loading}
            className="w-full bg-[#8b7355] text-white py-3 rounded-lg font-semibold hover:bg-[#6d5a42] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
          >
            {loading ? 'Creating Account...' : 'Create Admin Account'}
          </button>

          <p className="text-xs text-center text-gray-500">
            This is a one-time setup page. You can change your password after logging in.
          </p>
        </div>
      </div>
    </div>
  );
}
