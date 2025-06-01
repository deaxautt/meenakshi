import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Mail, Lock, User, Phone, AlertCircle, Eye, EyeOff } from 'lucide-react';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const passwordRegex = {
    minLength: /.{8,}/,
    hasUpperCase: /[A-Z]/,
    hasLowerCase: /[a-z]/,
    hasNumber: /[0-9]/,
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/
  };

  const validatePassword = (password: string) => {
    const requirements = [
      { test: passwordRegex.minLength, message: 'At least 8 characters' },
      { test: passwordRegex.hasUpperCase, message: 'One uppercase letter' },
      { test: passwordRegex.hasLowerCase, message: 'One lowercase letter' },
      { test: passwordRegex.hasNumber, message: 'One number' },
      { test: passwordRegex.hasSpecialChar, message: 'One special character' }
    ];

    const failedRequirements = requirements
      .filter(req => !req.test.test(password))
      .map(req => req.message);

    return failedRequirements;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);

      // Validate password
      const failedRequirements = validatePassword(password);
      if (failedRequirements.length > 0) {
        setError(`Password must contain: ${failedRequirements.join(', ')}`);
        setLoading(false);
        return;
      }

      await signUp(email, password, fullName, mobile);
      navigate('/');
    } catch (err) {
      setError('Failed to create an account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center text-3xl font-bold text-primary">
          मीनाक्षी
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/signin" className="font-medium text-primary hover:text-primary-dark">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center gap-2">
              <AlertCircle size={20} />
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1 relative">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
                />
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>

            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                Mobile Number (Optional)
              </label>
              <div className="mt-1 relative">
                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="+91 1234567890"
                />
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 pl-10 pr-10 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.
              </p>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;