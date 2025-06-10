// UserForm component: form for adding or editing a user, with validation and draft auto-save
// Props: initialData, onSubmit, onCancel, isEditing, onDraftSave, draftData


import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Calendar, Save, RotateCcw, FileText } from 'lucide-react';
import { useToast } from './ToastContainer';

const countryCodes = [
  { code: '+1', country: 'United States', flag: '🇺🇸' },
  { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+86', country: 'China', flag: '🇨🇳' },
  { code: '+81', country: 'Japan', flag: '🇯🇵' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+7', country: 'Russia', flag: '🇷🇺' },
  { code: '+55', country: 'Brazil', flag: '🇧🇷' },
];

const UserForm = ({ 
  initialData, 
  onSubmit, 
  onCancel, 
  isEditing = false,
  onDraftSave,
  draftData 
}) => {
  const { showToast } = useToast();
  // Form state
  const [formData, setFormData] = useState({
    fullName: initialData?.fullName || draftData?.fullName || '',
    email: initialData?.email || draftData?.email || '',
    countryCode: initialData?.countryCode || draftData?.countryCode || '+1',
    phoneNumber: initialData?.phoneNumber || draftData?.phoneNumber || '',
    dateOfBirth: initialData?.dateOfBirth || draftData?.dateOfBirth || '',
  });
  // Error state
  const [errors, setErrors] = useState({});
  // For field focus styling
  const [focusedField, setFocusedField] = useState('');

  // Auto-save draft for new users
  useEffect(() => {
    if (!isEditing && onDraftSave) {
      const hasData = Object.values(formData).some(value => value.trim() !== '');
      if (hasData) {
        const timer = setTimeout(() => {
          onDraftSave(formData);
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [formData, isEditing, onDraftSave]);

  // Field validation logic
  const validateField = (name, value) => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Full name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
      case 'email':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email';
        return '';
      case 'phoneNumber':
        if (!value.trim()) return 'Phone number is required';
        const phoneRegex = /^\d{10,15}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ''))) return 'Phone number must be 10-15 digits';
        return '';
      case 'dateOfBirth':
        if (!value) return 'Date of birth is required';
        const today = new Date();
        const birthDate = new Date(value);
        if (birthDate >= today) return 'Birth date must be in the past';
        return '';
      default:
        return '';
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle field blur (validation)
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
    setFocusedField('');
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast({
        type: 'error',
        title: 'Validation Error',
        message: 'Please fix the errors before submitting',
      });
      return;
    }
    onSubmit(formData);
  };

  // Handle form reset
  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      countryCode: '+1',
      phoneNumber: '',
      dateOfBirth: '',
    });
    setErrors({});
    showToast({
      type: 'info',
      title: 'Form Reset',
      message: 'All fields have been cleared',
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {isEditing ? 'Edit User' : 'Add New User'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {isEditing ? 'Update user information' : 'Fill in the details to add a new user'}
        </p>
        {!isEditing && draftData && Object.values(draftData).some(v => v) && (
          <div className="mt-4 flex items-center space-x-2 text-sm text-green-600 dark:text-green-400">
            <FileText className="w-4 h-4" />
            <span>Draft automatically saved</span>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              onFocus={() => setFocusedField('fullName')}
              onBlur={handleBlur}
              className={`w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                errors.fullName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } text-gray-900 dark:text-white`}
              placeholder="Enter full name"
            />
          </div>
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
          )}
        </div>
        {/* Email */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onFocus={() => setFocusedField('email')}
              onBlur={handleBlur}
              className={`w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } text-gray-900 dark:text-white`}
              placeholder="Enter email address"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>
        {/* Phone Number */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Phone Number
          </label>
          <div className="flex space-x-2">
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleInputChange}
              className="pl-2 pr-2 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
            >
              {countryCodes.map((c) => (
                <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
              ))}
            </select>
            <div className="relative flex-1">
              <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('phoneNumber')}
                onBlur={handleBlur}
                className={`w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                  errors.phoneNumber ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } text-gray-900 dark:text-white`}
                placeholder="Enter phone number"
              />
            </div>
          </div>
          {errors.phoneNumber && (
            <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>
          )}
        </div>
        {/* Date of Birth */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Date of Birth
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              onFocus={() => setFocusedField('dateOfBirth')}
              onBlur={handleBlur}
              className={`w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                errors.dateOfBirth ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } text-gray-900 dark:text-white`}
              placeholder="Select date of birth"
            />
          </div>
          {errors.dateOfBirth && (
            <p className="mt-1 text-sm text-red-500">{errors.dateOfBirth}</p>
          )}
        </div>
        {/* Form Actions */}
        <div className="flex items-center space-x-4 mt-8">
          <button
            type="submit"
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-md transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Save className="w-5 h-5" />
            <span>{isEditing ? 'Update User' : 'Add User'}</span>
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center space-x-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium px-6 py-3 rounded-md transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Reset</span>
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-md transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserForm; 