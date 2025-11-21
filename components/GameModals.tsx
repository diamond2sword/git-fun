
import React, { useState } from 'react';
import { Trophy, Terminal, Check, Rocket, BookOpen, CreditCard, Users, UserCircle } from 'lucide-react';
import { Modal } from './Layout';
import { Badge } from '../types';

// --- LEVEL UP MODAL ---
export const LevelUpModal: React.FC<{ isOpen: boolean; onClose: () => void; level: number }> = ({ isOpen, onClose, level }) => (
    <Modal isOpen={isOpen} onClose={onClose} hideCloseButton bgClass="bg-transparent" className="shadow-none bg-transparent">
        <div className="bg-gradient-to-b from-yellow-300 to-orange-500 p-1 rounded-3xl w-full max-w-sm mx-auto">
            <div className="bg-white dark:bg-gray-900 rounded-[22px] p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                <Trophy className="w-24 h-24 mx-auto text-yellow-400 mb-4 drop-shadow-lg animate-bounce" />
                <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600 mb-2">LEVEL UP!</h2>
                <p className="text-gray-500 font-bold text-lg">You are now Level {level}</p>
                <div className="mt-8">
                    <button 
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                        }} 
                        className="w-full py-3 bg-black text-white rounded-xl font-bold text-lg hover:scale-105 transition-transform cursor-pointer relative z-10 shadow-xl" 
                    >
                        LET'S GOOO! 🚀
                    </button>
                </div>
            </div>
        </div>
    </Modal>
);

// --- BADGE MODAL ---
export const BadgeModal: React.FC<{ badge: Badge | null; onClose: () => void }> = ({ badge, onClose }) => (
    <Modal isOpen={!!badge} onClose={onClose} bgClass="bg-gray-900" className="max-w-xs border-2 border-purple-500 shadow-[0_0_50px_rgba(168,85,247,0.5)] text-center text-white">
        {badge && (
            <>
                <div className="text-6xl mb-4 animate-pulse">{badge.icon}</div>
                <div className="text-purple-400 font-bold tracking-widest text-xs uppercase mb-1">New Badge Unlocked</div>
                <h3 className="text-2xl font-black mb-2">{badge.name}</h3>
                <p className="text-gray-400 text-sm mb-6">{badge.desc}</p>
                <button onClick={onClose} className="px-6 py-2 bg-purple-600 hover:bg-purple-500 rounded-full font-bold text-sm transition-colors">
                    Awesome!
                </button>
            </>
        )}
    </Modal>
);

// --- AVATAR SELECTION MODAL ---
export const AvatarModal: React.FC<{ isOpen: boolean; onClose: () => void; onSelect: (url: string) => void; currentAvatar: string }> = ({ isOpen, onClose, onSelect, currentAvatar }) => {
  const seeds = ['Felix', 'Aneka', 'Bob', 'Shadow', 'Bear', 'Chill', 'Jack', 'Molly', 'Cuddles'];
  const getUrl = (seed: string) => `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-md">
       <div className="p-6">
         <div className="text-center mb-6">
             <div className="inline-block p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-2">
                <UserCircle className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
             </div>
             <h3 className="text-xl font-black text-gray-900 dark:text-white">Choose Your Identity</h3>
             <p className="text-sm text-gray-500 dark:text-gray-400">Select an avatar that matches your vibe.</p>
         </div>
         
         <div className="grid grid-cols-3 gap-4">
           {seeds.map(seed => {
             const url = getUrl(seed);
             const isSelected = currentAvatar === url;
             return (
               <button
                 key={seed}
                 onClick={() => { onSelect(url); onClose(); }}
                 className={`group relative p-1 rounded-xl border-2 transition-all duration-200 ${
                     isSelected 
                     ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 scale-105 ring-2 ring-purple-500/20' 
                     : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 hover:scale-105'
                 }`}
               >
                 <img src={url} alt={seed} className="w-full h-full rounded-lg bg-white dark:bg-gray-800" />
                 {isSelected && (
                     <div className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 bg-purple-600 text-white rounded-full p-1 shadow-sm">
                         <Check className="w-3 h-3" />
                     </div>
                 )}
               </button>
             )
           })}
         </div>
       </div>
    </Modal>
  );
};

// --- ABOUT MODAL ---
export const AboutModal: React.FC<{ 
    isOpen: boolean; 
    onClose: () => void;
    isMockMode: boolean;
    onToggleMockMode: () => void;
    isInstallable: boolean;
    onInstall?: () => void;
    onCheat?: (type: 'coins' | 'xp') => void;
}> = ({ isOpen, onClose, isMockMode, onToggleMockMode, isInstallable, onInstall, onCheat }) => {
    
    const [devClicks, setDevClicks] = useState(0);
    const [showDev, setShowDev] = useState(false);

    const handleFooterClick = () => {
        if (showDev) return;
        const newCount = devClicks + 1;
        setDevClicks(newCount);
        if (newCount >= 5) {
            setShowDev(true);
        }
    };

    return (
    <Modal isOpen={isOpen} onClose={onClose} hideCloseButton className="max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center z-10">
            <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl shadow-lg">
                    <Terminal className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white leading-none">Cod3-G</h2>
                    <span className="text-xs font-mono text-purple-500">(Code-G)</span>
                </div>
            </div>
            <button onClick={onClose} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 text-gray-500 hover:text-red-500 transition-colors">
                <Check className="w-5 h-5" />
            </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
            {/* Identity */}
            <div className="space-y-3">
                <h3 className="flex items-center gap-2 font-bold text-gray-900 dark:text-white text-lg">
                    <Rocket className="w-5 h-5 text-blue-500" /> The Digital Gym for Coders
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Cod3-G is an EdTech startup revolutionizing how you learn to code. Just like a gym membership gives you access to equipment, Cod3-G gives you 24/7 access to premium <strong>"Gami-Guide Books"</strong> and interactive challenges.
                </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-800">
                    <BookOpen className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mb-2" />
                    <h4 className="font-bold text-gray-800 dark:text-white text-sm mb-1">Visual Guides</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                        Complex concepts (like the SCRUM Model) broken down into easy visual aids.
                    </p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-2xl border border-green-100 dark:border-green-800">
                    <Trophy className="w-6 h-6 text-green-600 dark:text-green-400 mb-2" />
                    <h4 className="font-bold text-gray-800 dark:text-white text-sm mb-1">Gamification</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                        Earn XP, level up, and collect badges to stay motivated and retain knowledge.
                    </p>
                </div>
            </div>

            {/* Subscription Model */}
            <div className="space-y-3">
                <h3 className="flex items-center gap-2 font-bold text-gray-900 dark:text-white text-lg">
                    <CreditCard className="w-5 h-5 text-purple-500" /> Access & Pricing
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                    We operate on a flexible subscription model designed for your schedule.
                </p>
                <div className="flex flex-wrap gap-2">
                    {['Weekly', 'Monthly', 'Yearly'].map(plan => (
                        <span key={plan} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full text-xs font-bold border border-gray-200 dark:border-gray-700">
                            {plan} Pass
                        </span>
                    ))}
                </div>
            </div>

            {/* Community */}
            <div className="space-y-3">
                <h3 className="flex items-center gap-2 font-bold text-gray-900 dark:text-white text-lg">
                    <Users className="w-5 h-5 text-orange-500" /> Collaborative Learning
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Join a community of aspiring programmers. Share your code, compete in challenges, and help others debug their journey.
                </p>
            </div>
        </div>

        {/* Footer */}
        <div 
            className="bg-gray-50 dark:bg-gray-950 p-4 text-center border-t border-gray-200 dark:border-gray-800 rounded-b-3xl flex flex-col gap-2 select-none cursor-pointer"
            onClick={handleFooterClick}
        >
            <p className="text-xs text-gray-400 font-medium">
                Built with the IDT Model for Continuous Improvement.
            </p>
            
             {/* Toggle */}
            <div className="flex items-center justify-center gap-3 mt-2 pt-2 border-t border-gray-200 dark:border-gray-800" onClick={e => e.stopPropagation()}>
                <span className={`text-xs font-bold ${!isMockMode ? 'text-gray-400' : 'text-green-500'}`}>
                    Mock Mode
                </span>
                <button 
                    onClick={onToggleMockMode}
                    className={`w-10 h-5 rounded-full p-0.5 transition-colors ${isMockMode ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-700'}`}
                >
                    <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${isMockMode ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </button>
                <span className={`text-xs font-bold ${isMockMode ? 'text-gray-400' : 'text-blue-500'}`}>
                    Live API
                </span>
            </div>
             <p className="text-[10px] text-gray-400">
                {isMockMode ? "Running locally (No API Key required)" : "Running via Codapi (Requires Internet)"}
            </p>

            {/* HIDDEN DEV TOOLS */}
            {showDev && (
                <div className="mt-2 pt-4 border-t border-gray-200 dark:border-gray-800 animate-in fade-in slide-in-from-bottom-2">
                    <div className="text-xs font-black text-red-500 mb-2 uppercase tracking-widest">Dev Tools</div>
                    <div className="flex gap-3 justify-center flex-wrap">
                        <button 
                            onClick={(e) => { e.stopPropagation(); onCheat?.('coins'); }}
                            className="bg-yellow-500 text-black text-xs font-bold px-4 py-2 rounded-lg shadow-lg hover:bg-yellow-400 transition-colors"
                        >
                            +1000 Gold
                        </button>
                        <button 
                             onClick={(e) => { e.stopPropagation(); onCheat?.('xp'); }}
                            className="bg-purple-500 text-white text-xs font-bold px-4 py-2 rounded-lg shadow-lg hover:bg-purple-400 transition-colors"
                        >
                            +500 XP
                        </button>
                    </div>
                </div>
            )}
        </div>
    </Modal>
    );
};
