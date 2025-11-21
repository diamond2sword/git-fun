
import React, { useState, useEffect } from 'react';
import { DownloadCloud, X } from 'lucide-react';

// --- CUSTOM HOOK ---
export function useInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
      setShowBanner(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setIsInstallable(false);
      setShowBanner(false);
    }
  };

  return {
    isInstallable,
    installApp,
    showBanner,
    setShowBanner
  };
}

// --- BANNER COMPONENT ---
export const InstallBanner: React.FC<{
  show: boolean;
  onClose: () => void;
  onInstall: () => void;
}> = ({ show, onClose, onInstall }) => {
  if (!show) return null;
  
  return (
     <div className="fixed bottom-20 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-96 z-50 animate-in slide-in-from-bottom-10 duration-500">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 rounded-2xl shadow-2xl border border-white/20 flex items-center justify-between">
            <div className="flex items-center gap-3 text-white">
                <div className="bg-white/20 p-2 rounded-lg">
                    <DownloadCloud className="w-6 h-6" />
                </div>
                <div>
                    <h4 className="font-black text-sm uppercase tracking-wider">Install App</h4>
                    <p className="text-[10px] opacity-80">Add to home screen for offline play</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <button 
                    onClick={onClose}
                    className="p-2 hover:bg-white/20 rounded-full text-white/70 hover:text-white transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
                <button 
                    onClick={onInstall}
                    className="bg-white text-indigo-600 px-4 py-2 rounded-xl font-bold text-xs hover:scale-105 transition-transform shadow-lg"
                >
                    INSTALL
                </button>
            </div>
        </div>
    </div>
  );
};
