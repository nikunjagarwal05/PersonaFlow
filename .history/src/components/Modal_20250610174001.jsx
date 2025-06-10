import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';

// Modal component for dialogs and popups
const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  const sizeClasses = { sm: 'max-w-md',
    md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl',
  };

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className={`w-full ${sizeClasses[size]} transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 text-left align-middle shadow-xl transition-all`}>
                <div className="flex items-center justify-between mb-6">
                  <Dialog.Title className="text-xl font-semibold text-gray-900 dark:text-white">
                    {title}
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
                  >
                    <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;