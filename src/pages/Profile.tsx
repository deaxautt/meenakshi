import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Phone, Camera, Check, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.full_name || '',
    email: user?.email || '',
    mobile: user?.mobile || '',
    avatar: user?.avatar_url || ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const failedRequirements = validatePassword(passwordData.newPassword);
    if (failedRequirements.length > 0) {
      setErrorMessage(`Password must contain: ${failedRequirements.join(', ')}`);
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      // TODO: Implement password change logic
      setSuccessMessage('Password changed successfully');
      setIsChangingPassword(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage('Failed to change password');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: Implement profile update logic
      setSuccessMessage('Profile updated successfully');
      setIsEditing(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">My Profile</h1>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Profile Header */}
            <div className="relative h-32 bg-gradient-to-r from-primary to-accent">
              <div className="absolute -bottom-12 left-8">
                <div className="relative">
                  <img
                    src={formData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.fullName)}&background=random`}
                    alt={formData.fullName}
                    className="w-24 h-24 rounded-full border-4 border-white"
                  />
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors">
                      <Camera size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-16 p-8">
              {successMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg"
                >
                  <Check size={20} />
                  {successMessage}
                </motion.div>
              )}

              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 flex items-center gap-2 text-red-600 bg-red-50 px-4 py-2 rounded-lg"
                >
                  <AlertCircle size={20} />
                  {errorMessage}
                </motion.div>
              )}

              {isChangingPassword ? (
                <form onSubmit={handlePasswordChange} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswords.current ? "text" : "password"}
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        className="w-full px-4 py-2 pl-10 pr-10 border rounded-lg focus:ring-2 focus:ring-primary/20"
                      />
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <button
                        type="button"
                        onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPasswords.current ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswords.new ? "text" : "password"}
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        className="w-full px-4 py-2 pl-10 pr-10 border rounded-lg focus:ring-2 focus:ring-primary/20"
                      />
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <button
                        type="button"
                        onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPasswords.new ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswords.confirm ? "text" : "password"}
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        className="w-full px-4 py-2 pl-10 pr-10 border rounded-lg focus:ring-2 focus:ring-primary/20"
                      />
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <button
                        type="button"
                        onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPasswords.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setIsChangingPassword(false);
                        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                        setErrorMessage('');
                      }}
                      className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                    >
                      Change Password
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-primary/20 disabled:bg-gray-50 disabled:text-gray-500"
                      />
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-primary/20 disabled:bg-gray-50 disabled:text-gray-500"
                      />
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mobile Number
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-primary/20 disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder="+91 1234567890"
                      />
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4">
                    <button
                      type="button"
                      onClick={() => setIsChangingPassword(true)}
                      className="text-primary hover:text-primary-dark"
                    >
                      Change Password
                    </button>

                    <div className="flex gap-4">
                      {isEditing ? (
                        <>
                          <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                          >
                            Save Changes
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setIsEditing(true)}
                          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                        >
                          Edit Profile
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;