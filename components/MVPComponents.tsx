
import React, { useState, useEffect } from 'react';
import { MVP_CARDS, DRAG_ITEMS, GALLERY_ITEMS } from '../constants';
import { Lock, Unlock, Zap, Trophy, Star, Shield, Sword, Coins, BookOpen, Code as CodeIcon, Info, X, RefreshCw, Plus } from 'lucide-react';
import { GamifiedProps } from '../types';

// --- SECTION 2: GAMIFIED FLIP CARDS ---
export const APIEFlipCards: React.FC<GamifiedProps> = ({ onEarnXp, onUnlockBadge }) => {
  const [readIds, setReadIds] = useState<string[]>([]);
  // Track the current view state for each card: 'name' | 'code' | 'desc'
  const [viewStates, setViewStates] = useState<Record<string, 'name' | 'code' | 'desc'>>({});

  const handleInteraction = (id: string) => {
    // XP Logic on first read
    if (!readIds.includes(id)) {
      setReadIds(prev => [...prev, id]);
      onEarnXp(10, "Concept Learned!");
      if (readIds.length + 1 === MVP_CARDS.length) {
          setTimeout(() => onUnlockBadge?.('api_master'), 1000);
      }
    }

    // Cycle Views: Name -> Code -> Desc -> Name
    setViewStates(prev => {
        const current = prev[id] || 'name';
        let next: 'name' | 'code' | 'desc' = 'name';
        if (current === 'name') next = 'code';
        else if (current === 'code') next = 'desc';
        else next = 'name';
        return { ...prev, [id]: next };
    });
  };

  return (
    <div className="space-y-4 my-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {MVP_CARDS.map(card => {
          const currentView = viewStates[card.id] || 'name';
          const isRead = readIds.includes(card.id);

          return (
            <div 
              key={card.id}
              className="h-48 w-full cursor-pointer group relative"
              onClick={() => handleInteraction(card.id)}
              title="Tap to learn"
            >
                <div className={`w-full h-full rounded-xl shadow-xl border-b-4 border-black/10 transition-all duration-300 overflow-hidden relative flex flex-col items-center justify-center p-3 text-center ${
                     currentView === 'name' 
                        ? `${card.colorClass} text-white` 
                        : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700'
                }`}>
                  
                  {/* STATE 1: NAME (DEFAULT) */}
                  {currentView === 'name' && (
                      <div className="animate-in fade-in zoom-in duration-300 flex flex-col items-center">
                          <span className="text-4xl mb-2 filter drop-shadow-md">{card.emoji}</span>
                          <h3 className="font-black text-lg uppercase tracking-tight">{card.title}</h3>
                          {!isRead && (
                              <div className="mt-2 bg-black/30 rounded-full px-2 py-1 text-[10px] text-yellow-400 flex items-center gap-1 animate-pulse">
                                  <Zap className="w-3 h-3 fill-current" /> TAP ME
                              </div>
                          )}
                          <span className="text-[10px] opacity-75 mt-2 flex items-center gap-1 font-mono">
                              Tap for Code
                          </span>
                      </div>
                  )}

                  {/* STATE 2: CODE REVEAL */}
                  {currentView === 'code' && (
                      <div className="animate-in fade-in zoom-in duration-300 w-full h-full flex flex-col justify-center">
                          <h4 className="font-bold text-gray-500 text-[10px] uppercase mb-2 flex items-center justify-center gap-1">
                              <CodeIcon className="w-3 h-3" /> {card.backTitle}
                          </h4>
                          <div className="bg-gray-100 dark:bg-black p-2 rounded-lg text-[10px] text-left w-full font-mono text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 shadow-inner">
                            {card.backCode}
                          </div>
                          <span className="text-[10px] text-purple-500 font-bold mt-3 flex items-center justify-center gap-1">
                              <Info className="w-3 h-3" /> Explain
                          </span>
                      </div>
                  )}

                  {/* STATE 3: EXPLANATION POPUP */}
                  {currentView === 'desc' && (
                       <div className="absolute inset-0 z-10 bg-white/95 dark:bg-gray-900/95 p-4 flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-300">
                           <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-full mb-2 shadow-sm">
                               <BookOpen className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                           </div>
                           <p className="text-sm font-bold text-gray-800 dark:text-gray-100 leading-snug">
                               {card.desc}
                           </p>
                           <button className="mt-3 text-[10px] text-gray-400 uppercase font-bold tracking-wider flex items-center gap-1 hover:text-red-400">
                               <X className="w-3 h-3" /> Close
                           </button>
                       </div>
                  )}
                  
                </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- SECTION 4: DRAG & DROP (Gamified) ---
export const AbstractionDragDrop: React.FC<GamifiedProps> = ({ onEarnXp, onUnlockBadge, onFail, savedState, onSaveState }) => {
  const [items, setItems] = useState(savedState?.items || DRAG_ITEMS);
  const [streak, setStreak] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{msg: string, type: 'success' | 'error'} | null>(null);

  // Persist state when items change
  useEffect(() => {
      if (onSaveState && items.length !== DRAG_ITEMS.length) {
          onSaveState({ items });
      }
  }, [items, onSaveState]);

  const handleMove = (target: 'show' | 'hide') => {
    if (!selectedId) return;
    const item = DRAG_ITEMS.find(i => i.id === selectedId);
    if (!item) return;

    if (item.correctZone === target) {
        const newItems = items.filter((i: any) => i.id !== selectedId);
        setItems(newItems);
        setStreak(s => s + 1);
        onEarnXp(15, "Secret Protected!");
        setFeedback({ msg: `Nice! +15 XP`, type: 'success' });
        
        if (newItems.length === 0) {
             setTimeout(() => onUnlockBadge?.('secret_keeper'), 1000);
        }
    } else {
        setStreak(0);
        setFeedback({ msg: `Oops! Streak Reset 💀`, type: 'error' });
        if (onFail) onFail();
    }
    setSelectedId(null);
    setTimeout(() => setFeedback(null), 1500);
  };

  return (
    <div className="my-6 p-4 bg-gray-900 rounded-2xl border border-gray-700 relative overflow-hidden text-gray-900 dark:text-white">
      {/* Background grid effect */}
      <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '10px 10px'}}></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-white text-sm">Mission: Protect Secrets</h3>
            <div className="flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full">
                <span className="text-orange-500 text-xs">🔥 Streak: {streak}</span>
            </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 mb-6 min-h-[50px]">
          {items.map((item: any) => (
             <button
               key={item.id}
               onClick={() => setSelectedId(item.id)}
               title={`Select ${item.label}`}
               className={`px-4 py-2 rounded-lg text-xs font-bold font-mono border-2 transition-all transform ${
                  selectedId === item.id 
                  ? 'bg-yellow-400 text-black border-yellow-500 scale-110 shadow-[0_0_15px_rgba(250,204,21,0.5)]' 
                  : 'bg-gray-800 border-gray-600 text-gray-300 hover:border-white'
               }`}
             >
               {item.label}
             </button>
          ))}
          {items.length === 0 && (
              <div className="text-center">
                  <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-2 animate-bounce" />
                  <span className="text-green-400 font-bold">Mission Complete!</span>
              </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button 
              onClick={() => handleMove('show')}
              title="Drop Public Data Here"
              className={`h-32 rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-4 transition-all ${
                  selectedId ? 'border-green-500 bg-green-900/20 animate-pulse' : 'border-gray-700'
              }`}
          >
              <span className="font-black text-green-500 text-lg tracking-widest">SHOW</span>
              <span className="text-[10px] text-green-300/50 uppercase">Public Data</span>
          </button>

          <button 
              onClick={() => handleMove('hide')}
              title="Drop Sensitive Data Here"
              className={`h-32 rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-4 transition-all ${
                  selectedId ? 'border-red-500 bg-red-900/20 animate-pulse' : 'border-gray-700'
              }`}
          >
              <span className="font-black text-red-500 text-lg tracking-widest">HIDE</span>
              <span className="text-[10px] text-red-300/50 uppercase">Sensitive Data</span>
          </button>
        </div>

        {feedback && (
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-3 rounded-xl shadow-2xl font-black text-white transform scale-110 animate-bounce z-50 ${
                feedback.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}>
                {feedback.msg}
            </div>
        )}
      </div>
    </div>
  );
};

// --- SECTION 6: TRADING CARDS GALLERY ---
export const OOPGallery: React.FC<GamifiedProps> = ({ onEarnXp }) => {
    const [collected, setCollected] = useState<string[]>([]);

    const handleCollect = (id: string) => {
        if (!collected.includes(id)) {
            setCollected([...collected, id]);
            onEarnXp(20, "Card Collected!");
        }
    };

    return (
        <div className="flex overflow-x-auto gap-4 pb-8 my-6 px-2 snap-x hide-scrollbar text-gray-900 dark:text-white">
            {GALLERY_ITEMS.map(item => {
                const isOwned = collected.includes(item.id);
                const borderColor = item.rarity === 'epic' ? 'border-purple-500' : item.rarity === 'rare' ? 'border-blue-500' : 'border-gray-300';
                const glow = item.rarity === 'epic' ? 'shadow-[0_0_20px_rgba(168,85,247,0.4)]' : '';

                return (
                <div key={item.id} className={`snap-center shrink-0 w-60 bg-gray-800 p-1 rounded-2xl border-4 ${borderColor} ${glow} relative`}>
                    <div className="bg-gray-900 rounded-xl h-full p-4 flex flex-col items-center text-center">
                        <div className="flex justify-between w-full text-[10px] font-bold uppercase text-gray-500 mb-2">
                            <span>{item.rarity}</span>
                            <span>#00{item.id.replace('g','')}</span>
                        </div>
                        
                        <div className={`w-24 h-24 rounded-full flex items-center justify-center text-5xl bg-gradient-to-br from-gray-700 to-gray-800 mb-4 border-2 border-white/10 ${isOwned ? '' : 'grayscale opacity-50'}`}>
                            {item.icon}
                        </div>
                        
                        <h4 className="font-black text-white text-lg mb-1">{item.title}</h4>
                        <div className="flex gap-2 mb-4 w-full justify-center">
                            <div className="flex items-center text-[10px] text-red-400 gap-1">
                                <Sword className="w-3 h-3" /> {item.stats.power}
                            </div>
                            <div className="flex items-center text-[10px] text-blue-400 gap-1">
                                <Shield className="w-3 h-3" /> {item.stats.defense}
                            </div>
                        </div>

                        <div className="w-full bg-black/50 p-2 rounded-lg text-left mb-4">
                            <pre className="text-[9px] font-mono text-green-400">{item.codeSnippet}</pre>
                        </div>

                        <button 
                            onClick={() => handleCollect(item.id)}
                            disabled={isOwned}
                            title={isOwned ? "Card Collected" : "Collect Card (+20 XP)"}
                            className={`w-full py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                                isOwned 
                                ? 'bg-gray-700 text-gray-400 cursor-default' 
                                : 'bg-yellow-400 hover:bg-yellow-300 text-black shadow-lg hover:-translate-y-1'
                            }`}
                        >
                            {isOwned ? 'COLLECTED' : (
                                <>
                                    <Coins className="w-3 h-3" /> GET CARD
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )})}
        </div>
    );
};

// --- SECTION 7: BUILD & EARN GENERATOR ---
export const ClassGenerator: React.FC<GamifiedProps> = ({ onEarnXp, onUnlockBadge, savedState, onSaveState }) => {
    const [clsName, setClsName] = useState("");
    const [actName, setActName] = useState("");
    const [msg, setMsg] = useState("");
    // Support up to 3 generated classes
    const [builtClasses, setBuiltClasses] = useState<string[]>(savedState?.classes || []);

    const handleGenerate = () => {
        if (!clsName || !actName || !msg || builtClasses.length >= 3) return;
        
        const code = `class ${clsName}:\n    def ${actName}(self):\n        print("${msg}")\n\n# Run it!\n${clsName}().${actName}()`;
        const newClasses = [...builtClasses, code];
        setBuiltClasses(newClasses);
        
        // Persist
        if (onSaveState) {
            onSaveState({ classes: newClasses });
        }

        // Reward Logic: First build gives quest reward, others give small bonus
        if (newClasses.length === 1) {
            onEarnXp(30, "Builder Master!");
            setTimeout(() => onUnlockBadge?.('builder'), 1500);
        } else {
            onEarnXp(10, "Extra Class Built!");
        }

        // Reset inputs
        setClsName("");
        setActName("");
        setMsg("");
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border-2 border-b-8 border-purple-600 my-6 relative text-gray-900 dark:text-white">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                WORKSHOP ({builtClasses.length}/3)
            </div>

            {builtClasses.length < 3 ? (
                <div className="grid gap-3 mb-4 mt-2">
                    <input 
                        type="text" 
                        placeholder="Class Name (e.g. Robot)" 
                        value={clsName}
                        onChange={e => setClsName(e.target.value)}
                        className="w-full bg-gray-100 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-3 text-sm font-bold text-center text-gray-900 dark:text-white focus:border-purple-500 outline-none transition-colors placeholder-gray-500"
                    />
                    <div className="flex gap-3">
                        <input 
                            type="text" 
                            placeholder="Action (e.g. fight)" 
                            value={actName}
                            onChange={e => setActName(e.target.value)}
                            className="w-1/2 bg-gray-100 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-3 text-sm font-bold text-center text-gray-900 dark:text-white focus:border-purple-500 outline-none placeholder-gray-500"
                        />
                        <input 
                            type="text" 
                            placeholder="Message" 
                            value={msg}
                            onChange={e => setMsg(e.target.value)}
                            className="w-1/2 bg-gray-100 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-3 text-sm font-bold text-center text-gray-900 dark:text-white focus:border-purple-500 outline-none placeholder-gray-500"
                        />
                    </div>
                    <button 
                        onClick={handleGenerate}
                        disabled={!clsName || !actName || !msg}
                        className="w-full py-3 rounded-xl font-black text-white shadow-xl transition-all transform bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        BUILD CLASS (+XP)
                    </button>
                </div>
            ) : (
                <div className="text-center py-4 mb-4">
                    <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-2 animate-bounce" />
                    <h3 className="text-xl font-black text-purple-600">Master Builder!</h3>
                    <p className="text-sm text-gray-500">You have constructed all 3 unique classes.</p>
                </div>
            )}
            
            {/* Render Generated Classes */}
            <div className="space-y-2 mt-4">
                {builtClasses.map((code, idx) => (
                    <div key={idx} className="p-3 bg-black rounded-xl border border-gray-800 animate-slide-in-left relative group">
                        <div className="absolute top-2 right-2 text-[9px] text-gray-600 font-bold">SLOT {idx + 1}</div>
                        <div className="text-[10px] text-gray-500 mb-1 font-mono">CLASS CODE:</div>
                        <pre className="text-xs font-mono text-green-400 whitespace-pre-wrap">{code}</pre>
                    </div>
                ))}
                {builtClasses.length > 0 && builtClasses.length < 3 && (
                     <div className="text-center mt-2 text-xs text-gray-400 font-bold animate-pulse">
                        Build {3 - builtClasses.length} more to complete the set!
                     </div>
                )}
            </div>
        </div>
    );
};
