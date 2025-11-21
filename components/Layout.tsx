
import React from 'react';
import { X, Check } from 'lucide-react';

// --- GENERIC SECTION WRAPPER ---
interface SectionProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const SectionWrapper: React.FC<SectionProps> = ({ children, className = "", onClick }) => (
  <section 
    onClick={onClick}
    className={`mb-12 animate-in slide-in-from-bottom-4 duration-700 ${className}`}
  >
    {children}
  </section>
);

// --- GENERIC MODAL ---
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  bgClass?: string;
  hideCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  children, 
  className = "", 
  bgClass = "bg-white dark:bg-gray-900", 
  hideCloseButton = false 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
        <div 
          className={`${bgClass} rounded-3xl w-full shadow-2xl relative animate-in zoom-in-95 duration-200 overflow-hidden ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
            {!hideCloseButton && (
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 text-gray-500 hover:text-red-500 transition-colors z-50"
                >
                    <X className="w-5 h-5" />
                </button>
            )}
            {children}
        </div>
    </div>
  );
};
