
import React from 'react';
import { Terminal, Info, Sun, Moon, Edit2, DownloadCloud } from 'lucide-react';
import { GameState } from '../types';

interface HeaderProps {
  darkMode: boolean;
  toggleTheme: () => void;
  onOpenAbout: () => void;
  gameState: GameState;
  xpFloat: { val: number; visible: boolean };
  userAvatar: string;
  onOpenAvatar: () => void;
  isInstallable: boolean;
  onInstall: () => void;
}

export const GameHeader: React.FC<HeaderProps> = ({ 
  darkMode, 
  toggleTheme, 
  onOpenAbout, 
  gameState, 
  xpFloat,
  userAvatar,
  onOpenAvatar,
  isInstallable,
  onInstall
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#1e293b]/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="max-w-3xl mx-auto px-4 py-3">
          
          {/* Row 1: Brand & Settings */}
          <div className="flex items-center justify-between mb-3">
                {/* Logo */}
                <div className="flex items-center gap-2 group cursor-pointer select-none" onClick={onOpenAbout}>
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg shadow-lg transform -rotate-6 group-hover:rotate-0 transition-transform duration-300">
                        <Terminal className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-black tracking-tighter text-gray-800 dark:text-white leading-none">
                            Cod3<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">-G</span>
                        </h1>
                        <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 tracking-widest">GAMI-GUIDE BOOKS</span>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2">
                    {isInstallable && (
                        <button 
                            onClick={onInstall}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full text-white font-bold shadow-md hover:scale-105 transition-transform animate-pulse"
                            title="Install App"
                        >
                            <DownloadCloud className="w-4 h-4" />
                            <span className="hidden sm:inline">Install App</span>
                        </button>
                    )}
                    <button 
                        onClick={onOpenAbout}
                        className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/30 text-purple-600 dark:text-purple-400 transition-colors"
                        title="About Cod3-G"
                    >
                        <Info className="w-5 h-5" />
                    </button>
                    <button 
                        onClick={toggleTheme} 
                        className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-sm border border-gray-200 dark:border-gray-700" 
                        title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    >
                        {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
                    </button>
                </div>
          </div>

          {/* Row 2: Stats HUD */}
          <StatsHUD 
            gameState={gameState} 
            xpFloat={xpFloat} 
            userAvatar={userAvatar} 
            onOpenAvatar={onOpenAvatar} 
          />
      </div>
    </header>
  );
};

const StatsHUD: React.FC<{ 
    gameState: GameState, 
    xpFloat: { val: number, visible: boolean },
    userAvatar: string,
    onOpenAvatar: () => void
}> = ({ gameState, xpFloat, userAvatar, onOpenAvatar }) => {
  const [displayedStreak, setDisplayedStreak] = React.useState(gameState.streak);

  React.useEffect(() => {
      setDisplayedStreak(gameState.streak);
  }, [gameState.streak]);

  return (
    <div className="flex items-center justify-between bg-gray-50/80 dark:bg-gray-800/50 p-2 rounded-2xl border border-gray-200/60 dark:border-gray-700/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
            <div 
                className="relative group cursor-pointer"
                onClick={onOpenAvatar}
                title="Change Avatar"
            >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 p-0.5 shadow-md transition-all group-hover:ring-2 group-hover:ring-purple-500 group-hover:scale-105">
                    <img src={userAvatar} alt="Avatar" className="w-full h-full rounded-full bg-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white text-[7px] font-bold px-1 py-0.5 rounded-full border border-white dark:border-gray-800 shadow-sm leading-none z-10">
                    Lvl {gameState.level}
                </div>
                 {/* Edit Overlay */}
                 <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <Edit2 className="w-4 h-4 text-white" />
                 </div>
            </div>
            <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <span>XP {gameState.xp}/{gameState.maxXp}</span>
                    {xpFloat.visible && <span className="text-green-500 animate-bounce">+{xpFloat.val}</span>}
                </div>
                {/* XP Bar */}
                <div className="w-28 sm:w-36 h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
                    <div 
                        className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-500 ease-out relative"
                        style={{width: `${(gameState.xp / gameState.maxXp) * 100}%`}}
                    >
                        <div className="absolute inset-0 bg-white/30 w-full h-full animate-[shimmer_1s_infinite]"></div>
                    </div>
                </div>
            </div>
        </div>

        <div className="flex items-center gap-3 px-2">
            <div className="flex flex-col items-end">
                <div className="flex items-center gap-1 text-yellow-500 font-black text-sm drop-shadow-sm">
                    <img src="https://cdn-icons-png.flaticon.com/512/217/217853.png" className="w-4 h-4" alt="coin" />
                    {gameState.coins}
                </div>
            </div>
            <div className="w-px h-8 bg-gray-200 dark:bg-gray-700"></div>
            <div className="flex flex-col items-end">
                <div className="flex items-center gap-1 text-orange-500 font-bold text-sm drop-shadow-sm">
                    {/* Flame icon embedded SVG to avoid import issues in some environments */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.113.434-2.126 1.147-2.853a2.5 2.5 0 0 1 2.353 2.853Z"/></svg>
                    {displayedStreak}
                </div>
            </div>
        </div>
    </div>
  );
};
