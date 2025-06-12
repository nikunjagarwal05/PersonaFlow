import React from 'react';

// About page: Explains the website and its main features in depth
const About = () => {
  return (
    <div className="min-h-screen bg-lightbg dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <section className="w-full py-16 bg-lightcard dark:bg-gray-800 border-b border-lightborder dark:border-gray-700 mb-10">
        <div className="max-w-3xl mx-auto px-4 flex flex-col items-center text-center">
          <span className="inline-block text-7xl mb-4">👋</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-accent dark:text-accent-light mb-4">Welcome to PersonaFlow</h1>
          <p className="text-lg text-gray-700 dark:text-gray-200 max-w-2xl mb-6">
            PersonaFlow is a modern, privacy-first user management tool designed for individuals and teams who want a simple, secure, and efficient way to manage user information—right in your browser.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-4xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Add Users Feature */}
        <div className="bg-white dark:bg-gray-800 card p-8 flex flex-col items-center text-center">
          <span className="text-5xl mb-3">📝</span>
          <h2 className="text-2xl font-bold text-accent dark:text-accent-light mb-2">Add Users</h2>
          <p className="text-gray-700 dark:text-gray-200">
            Quickly add new users to your local database with our intuitive form. Each entry is validated for accuracy, ensuring your records are always clean and reliable. Whether you're managing a team, a classroom, or your own contacts, adding users is fast, easy, and secure.
          </p>
        </div>
        {/* View Users Feature */}
        <div className="bg-white dark:bg-gray-800 card p-8 flex flex-col items-center text-center">
          <span className="text-5xl mb-3">📊</span>
          <h2 className="text-2xl font-bold text-accent dark:text-accent-light mb-2">View Users</h2>
          <p className="text-gray-700 dark:text-gray-200">
            Instantly browse, search, and filter your user list in a clear, tabular format. Edit or remove users as needed, and export your data for use elsewhere. PersonaFlow keeps your information organized and accessible, so you can focus on what matters most.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-2xl mx-auto px-4 py-12 text-center">
        <h3 className="text-2xl font-semibold mb-4 text-accent dark:text-accent-light">Ready to get started?</h3>
        <p className="text-gray-700 dark:text-gray-200 mb-6">
          Use the navigation above to add your first user or view your current list. All your data stays private and secure in your browser.
        </p>
        <span className="inline-block text-4xl">🚀</span>
      </section>
      
      <div className='flex flex-col items-end justify-end gap-2 border-t-2 border-[#243d52] p-8 bg-[#1b1e47a9]'>
        <p className='text-sm'>Visit the Translated website ?</p>
        <p onClick={() => window.location.href = 'https://persona-flow-git-translation-nikunj-agarwals-projects.vercel.app/'} className='text-white text-2xl border-2 border-white px-4 py-2 cursor-pointer rounded-2xl bg-[#2a4668] hover:bg-[#5d1c1c]'>Go to page</p>
      </div>
    </div>
  );
};

export default About; 