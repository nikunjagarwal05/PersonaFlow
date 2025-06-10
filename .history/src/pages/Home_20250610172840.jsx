
import React, { useState, useEffect } from 'react';
import UserForm from '../components/UserForm';
import { addUserToLocalStorage, saveDraft, getDraft, clearDraft } from '../utils/localStorage';
import { useToast } from '../components/ToastContainer';
import { UserPlus, Users } from 'lucide-react';

const Home = () => {
  const { showToast } = useToast();
  const [draftData, setDraftData] = useState(getDraft());

  useEffect(() => {
    const draft = getDraft();
    if (draft) {
      setDraftData(draft);
    }
  }, []);

  const handleSubmit = (userData) => {
    try {
      const newUser = addUserToLocalStorage(userData);
      
      // Clear draft after successful submission
      clearDraft();
      setDraftData(null);
      
      showToast({
        type: 'success',
        title: 'User Added Successfully!',
        message: `${newUser.fullName} has been added to the database.`,
      });
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Error Adding User',
        message: 'There was an error adding the user. Please try again.',
      });
    }
  };

  const handleDraftSave = (formData) => {
    saveDraft(formData);
    setDraftData(formData);
  };

  return (
    <div className="min-h-screen bg-lightbg dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="p-4 bg-accent rounded-lg shadow-md">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Add New User
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Create a new user profile with our professional form interface. All data is validated and stored securely in your browser.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 text-center shadow-sm">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">Real-time</div>
            <div className="text-blue-600 dark:text-blue-400">Validation</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 text-center shadow-sm">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">Auto-save</div>
            <div className="text-green-600 dark:text-green-400">Draft System</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 text-center shadow-sm">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">Responsive</div>
            <div className="text-purple-600 dark:text-purple-400">Design</div>
          </div>
        </div>

        {/* Form Section */}
        <UserForm
          onSubmit={handleSubmit}
          onDraftSave={handleDraftSave}
          draftData={draftData}
        />
      </div>
    </div>
  );
};

export default Home;