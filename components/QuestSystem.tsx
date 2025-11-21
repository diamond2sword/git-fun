
import React, { useState, useEffect } from 'react';
import { Quest } from '../types';
import { CodeEditor } from './CodeEditor';
import { CheckCircle, Star, Gift, Lock, ChevronDown, ChevronUp, MessageCircle, Puzzle, User, Box, ArrowLeftRight, Hash, Calculator, PieChart, Layers, TrafficCone, Circle, Repeat, Timer, XOctagon, List, PlusSquare, ScanLine, RefreshCw } from 'lucide-react';

interface QuestZoneProps {
  title: string;
  icon: React.ReactNode;
  lore: string[];
  children: React.ReactNode;
  isLocked?: boolean;
}

export const QuestZone: React.FC<QuestZoneProps> = ({ title, icon, lore, children, isLocked = false }) => {
  const [isOpen, setIsOpen] = useState(!isLocked);

  // If locked, force close. If unlocked, default open.
  useEffect(() => {
      if (isLocked) setIsOpen(false);
  }, [isLocked]);

  return (
    <div className={`mb-12 border-2 rounded-3xl overflow-hidden shadow-sm transition-colors ${isLocked ? 'bg-gray-100 dark:bg-gray-900/50 border-gray-200 dark:border-gray-800' : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800'}`}>
      <div 
        className={`p-6 flex items-start justify-between cursor-pointer transition-colors ${isLocked ? 'opacity-70 cursor-not-allowed' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
        onClick={() => !isLocked && setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-4">
            <div className={`p-3 rounded-2xl shadow-md text-2xl ${isLocked ? 'bg-gray-200 dark:bg-gray-800 grayscale' : 'bg-white dark:bg-gray-700'}`}>
                {isLocked ? <Lock className="w-6 h-6 text-gray-400" /> : icon}
            </div>
            <div>
                <h3 className={`text-2xl font-black uppercase tracking-tight ${isLocked ? 'text-gray-400' : 'text-gray-800 dark:text-white'}`}>{title}</h3>
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                    {isLocked ? 'Zone Locked' : 'Zone Unlocked'}
                </p>
            </div>
        </div>
        <div className="text-gray-400">
            {isLocked ? null : (isOpen ? <ChevronUp /> : <ChevronDown />)}
        </div>
      </div>

      {isOpen && !isLocked && (
          <div className="p-6 animate-in slide-in-from-top-4 duration-300">
            <div className="mb-8 prose dark:prose-invert max-w-none">
                {lore.map((text, i) => (
                    <p key={i} className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium border-l-4 border-purple-500 pl-4">
                        {text}
                    </p>
                ))}
            </div>
            <div className="grid gap-6">
                {children}
            </div>
          </div>
      )}
      
      {isLocked && (
          <div className="px-6 pb-6">
              <div className="bg-gray-200 dark:bg-gray-800 rounded-xl p-4 text-center text-sm font-bold text-gray-500 dark:text-gray-400">
                  Complete the previous zone to unlock these quests.
              </div>
          </div>
      )}
    </div>
  );
};

// --- QUEST VISUALIZER COMPONENT ---

const VisualizerContainer = ({ children }: { children?: React.ReactNode }) => (
    <div className="h-24 bg-gray-100 dark:bg-gray-900/50 rounded-lg mb-4 flex items-center justify-center border border-gray-200 dark:border-gray-800 relative overflow-hidden">
        {children}
    </div>
);

const QuestVisualizer: React.FC<{ type?: string, isCompleted: boolean }> = ({ type, isCompleted }) => {
    if (!type) return null;

    switch (type) {
        case 'chat-bubble':
            return (
                <VisualizerContainer>
                    {isCompleted ? (
                        <div className="relative animate-in zoom-in duration-500">
                            <MessageCircle className="w-12 h-12 text-blue-500 fill-blue-100" />
                            <div className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] px-2 rounded-full animate-bounce">Hello!</div>
                            <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-blue-600 font-bold typing-effect">
                                Hello!
                            </div>
                        </div>
                    ) : <MessageCircle className="w-8 h-8 text-gray-400" />}
                </VisualizerContainer>
            );
        
        case 'puzzle-snap':
            return (
                <VisualizerContainer>
                    <div className="flex items-center gap-1">
                        <div className={`bg-red-500 text-white p-2 rounded-l-lg transition-all duration-700 ${isCompleted ? 'translate-x-2' : '-translate-x-2'}`}>"Iron"</div>
                        <Puzzle className={`w-6 h-6 text-gray-400 z-10 ${isCompleted ? 'text-green-500 scale-125' : ''}`} />
                        <div className={`bg-yellow-500 text-white p-2 rounded-r-lg transition-all duration-700 ${isCompleted ? '-translate-x-2' : 'translate-x-2'}`}>"Man"</div>
                    </div>
                </VisualizerContainer>
            );

        case 'avatar-input':
            return (
                <VisualizerContainer>
                    <div className="flex flex-col items-center gap-2">
                        <div className={`p-2 rounded-full border-2 transition-all ${isCompleted ? 'bg-green-100 border-green-500 scale-110' : 'bg-gray-200 border-gray-300'}`}>
                            <User className={`w-6 h-6 ${isCompleted ? 'text-green-600' : 'text-gray-400'}`} />
                        </div>
                        {isCompleted && <span className="text-xs text-green-600 font-bold animate-pulse">"Welcome User!"</span>}
                    </div>
                </VisualizerContainer>
            );

        case 'variable-blocks':
            return (
                <VisualizerContainer>
                    <div className="flex items-center gap-4">
                        <div className="border-2 border-dashed border-gray-400 p-2 rounded text-xs font-mono text-gray-500">Variable: hero</div>
                        <div className={`transform transition-all duration-500 ${isCompleted ? 'translate-x-[-50px] scale-90 opacity-0' : ''}`}>
                            <Box className="w-6 h-6 text-purple-500" />
                        </div>
                        {isCompleted && (
                            <div className="bg-purple-500 text-white px-3 py-1 rounded shadow-lg animate-in zoom-in">
                                "Knight"
                            </div>
                        )}
                    </div>
                </VisualizerContainer>
            );

        case 'liquid-swap':
            return (
                <VisualizerContainer>
                    <div className="flex gap-8 relative">
                        <div className={`w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold transition-transform duration-1000 ${isCompleted ? 'translate-x-16' : ''}`}>A</div>
                        <div className={`w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold transition-transform duration-1000 ${isCompleted ? '-translate-x-16' : ''}`}>B</div>
                        {isCompleted && <ArrowLeftRight className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-gray-800 dark:text-white animate-spin-slow" />}
                    </div>
                </VisualizerContainer>
            );

        case 'number-morph':
            return (
                <VisualizerContainer>
                    <div className="flex items-center gap-4">
                        <div className={`transition-all duration-500 p-2 border rounded ${isCompleted ? 'opacity-0 scale-0' : 'opacity-100'}`}>
                            "5"
                        </div>
                        {isCompleted && (
                             <div className="flex items-center gap-2 animate-in slide-in-from-left-4">
                                <div className="w-8 h-8 bg-blue-600 text-white rounded flex items-center justify-center font-bold">5</div>
                                <div className="text-xl font-bold text-gray-400">+ 5 =</div>
                                <div className="text-2xl font-black text-green-500">10</div>
                             </div>
                        )}
                    </div>
                </VisualizerContainer>
            );

        case 'calculator':
            return (
                <VisualizerContainer>
                    <div className="flex items-center gap-4">
                        <Calculator className="w-8 h-8 text-gray-400" />
                        {isCompleted && (
                            <div className="font-mono text-xl bg-gray-800 text-green-400 px-4 py-1 rounded shadow-inner animate-pulse">
                                30
                            </div>
                        )}
                    </div>
                </VisualizerContainer>
            );

        case 'pizza-slice':
            return (
                <VisualizerContainer>
                    <div className="flex items-center gap-6">
                        <PieChart className={`w-10 h-10 text-orange-500 ${isCompleted ? 'opacity-50' : ''}`} />
                        {isCompleted && (
                             <div className="flex flex-col items-center animate-in zoom-in">
                                 <div className="w-8 h-8 rounded-full bg-orange-500 border-4 border-white dark:border-gray-900 shadow-lg"></div>
                                 <span className="text-[10px] font-bold mt-1">Remainder: 1</span>
                             </div>
                        )}
                    </div>
                </VisualizerContainer>
            );

        case 'power-stack':
             return (
                <VisualizerContainer>
                    <div className="flex items-end gap-1 h-16">
                        <div className="w-4 bg-blue-500 rounded-sm h-2"></div>
                        <div className={`w-4 bg-blue-500 rounded-sm h-4 transition-all delay-100 ${isCompleted ? 'h-4' : 'h-0 opacity-0'}`}></div>
                        <div className={`w-4 bg-blue-500 rounded-sm h-8 transition-all delay-200 ${isCompleted ? 'h-8' : 'h-0 opacity-0'}`}></div>
                        <div className={`w-4 bg-blue-500 rounded-sm h-16 transition-all delay-300 ${isCompleted ? 'h-16 bg-purple-500 shadow-lg' : 'h-0 opacity-0'}`}></div>
                    </div>
                </VisualizerContainer>
            );
        
        case 'logic-gate':
            return (
                <VisualizerContainer>
                     <div className="flex items-center gap-4">
                         <div className="bg-gray-800 p-2 rounded text-white font-mono text-xs">if 10 &gt; 5</div>
                         <TrafficCone className={`w-6 h-6 transition-colors duration-300 ${isCompleted ? 'text-green-500' : 'text-gray-300'}`} />
                         {isCompleted && <div className="text-green-600 font-bold animate-bounce">PASS!</div>}
                     </div>
                </VisualizerContainer>
            );

        case 'pair-dots':
            return (
                <VisualizerContainer>
                    <div className="flex gap-2">
                        {[1,2,3,4].map(i => (
                             <div key={i} className={`w-4 h-4 rounded-full transition-colors duration-500 ${isCompleted ? (i % 2 === 0 ? 'bg-green-500' : 'bg-green-500') : 'bg-gray-300'}`} />
                        ))}
                    </div>
                </VisualizerContainer>
            );

        case 'venn-diagram':
             return (
                <VisualizerContainer>
                    <div className="relative w-24 h-16 flex items-center justify-center">
                        <div className={`absolute left-0 w-12 h-12 rounded-full border-2 border-red-500 opacity-50 transition-all ${isCompleted ? 'translate-x-2 bg-red-100' : ''}`}></div>
                        <div className={`absolute right-0 w-12 h-12 rounded-full border-2 border-blue-500 opacity-50 transition-all ${isCompleted ? '-translate-x-2 bg-blue-100' : ''}`}></div>
                        {isCompleted && <CheckCircle className="relative z-10 w-6 h-6 text-purple-600 animate-in zoom-in" />}
                    </div>
                </VisualizerContainer>
            );

        case 'loop-tiles':
             return (
                <VisualizerContainer>
                    <div className="flex gap-2">
                        {[0, 1, 2].map(i => (
                            <div 
                                key={i} 
                                className={`w-8 h-8 rounded flex items-center justify-center border-2 font-bold transition-all duration-500 ${isCompleted ? 'bg-blue-500 border-blue-600 text-white scale-110' : 'border-gray-300 text-gray-300'}`}
                                style={{ transitionDelay: `${i * 200}ms` }}
                            >
                                {i}
                            </div>
                        ))}
                    </div>
                </VisualizerContainer>
            );

        case 'countdown':
             return (
                <VisualizerContainer>
                    <div className="flex items-center gap-2">
                        <Timer className="w-6 h-6 text-gray-400" />
                        {isCompleted ? (
                            <div className="font-mono text-2xl text-red-500 animate-ping">0</div>
                        ) : (
                            <div className="font-mono text-2xl text-gray-800 dark:text-white">3</div>
                        )}
                    </div>
                </VisualizerContainer>
            );

        case 'runner-stop':
             return (
                <VisualizerContainer>
                    <div className="relative w-full px-8">
                         <div className="h-1 bg-gray-300 w-full absolute top-1/2 left-0"></div>
                         <div className={`absolute top-1/2 w-4 h-4 bg-blue-500 rounded-full -translate-y-1/2 transition-all duration-1000 ${isCompleted ? 'left-[40%]' : 'left-0'}`}></div>
                         <div className="absolute top-1/2 left-1/2 -translate-y-1/2 h-8 w-1 bg-red-500"></div>
                    </div>
                </VisualizerContainer>
            );

        case 'fruit-basket':
             return (
                <VisualizerContainer>
                    <div className="flex flex-col items-center">
                        <div className="flex gap-1 mb-1">
                             <div className={`w-4 h-4 rounded-full bg-red-500 transition-all duration-500 ${isCompleted ? 'translate-y-8' : ''}`}></div>
                             <div className={`w-4 h-4 rounded-full bg-yellow-500 transition-all duration-700 ${isCompleted ? 'translate-y-8' : ''}`}></div>
                        </div>
                        <div className="w-16 h-8 border-2 border-b-8 border-orange-400 rounded-b-lg relative z-10 bg-white/50 dark:bg-black/50"></div>
                    </div>
                </VisualizerContainer>
            );
        
        case 'append-drop':
            return (
                <VisualizerContainer>
                    <div className="flex items-end gap-2">
                        <div className="w-8 h-8 bg-gray-200 rounded border border-gray-300"></div>
                        <div className={`w-8 h-8 bg-green-500 rounded border border-green-600 text-white flex items-center justify-center transition-all duration-700 ${isCompleted ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
                            <PlusSquare className="w-4 h-4" />
                        </div>
                    </div>
                </VisualizerContainer>
            );

        case 'list-highlight':
             return (
                <VisualizerContainer>
                    <div className="flex gap-1">
                        {['A', 'B', 'C'].map((l, i) => (
                             <div 
                                key={i} 
                                className={`w-8 h-8 border rounded flex items-center justify-center font-bold transition-colors duration-300 ${isCompleted ? 'bg-yellow-300 border-yellow-500 text-black' : 'bg-white border-gray-300 text-gray-400'}`}
                                style={{ transitionDelay: isCompleted ? `${i * 300}ms` : '0ms' }}
                             >
                                {l}
                             </div>
                        ))}
                        <ScanLine className={`w-6 h-6 ml-2 text-gray-400 transition-all duration-1000 ${isCompleted ? 'translate-x-0 opacity-100 text-green-500' : '-translate-x-4 opacity-0'}`} />
                    </div>
                </VisualizerContainer>
            );

        default:
            return null;
    }
};


interface QuestCardProps {
  quest: Quest;
  onComplete: (xp: number, reward: string) => void;
  onFail?: () => void;
  isPriorCompleted?: boolean;
  isMockMode?: boolean;
  savedCode: string;
  onCodeChange: (code: string) => void;
}

export const QuestCard: React.FC<QuestCardProps> = ({ 
  quest, 
  onComplete, 
  onFail, 
  isPriorCompleted = false, 
  isMockMode = true,
  savedCode,
  onCodeChange
}) => {
  const [isCompleted, setIsCompleted] = useState(isPriorCompleted);
  const [showReward, setShowReward] = useState(false);

  // Sync internal state if parent updates
  useEffect(() => {
      if (isPriorCompleted) {
          setIsCompleted(true);
      }
  }, [isPriorCompleted]);

  const handleSuccess = () => {
      if (!isCompleted) {
          setIsCompleted(true);
          setShowReward(true);
          onComplete(quest.xp, quest.reward);
      } else if (isPriorCompleted) {
          // Replaying logic (just visual success)
          setShowReward(true);
          // We don't call onComplete to avoid re-awarding XP
          setTimeout(() => setShowReward(false), 2000);
      }
  };

  return (
    <div className={`relative transition-all duration-500 ${isCompleted ? 'opacity-90' : 'opacity-100'}`}>
        {/* Quest Header */}
        <div className="flex items-center justify-between mb-2 px-2">
            <div className="flex items-center gap-2">
                <span className={`text-xs font-black px-2 py-0.5 rounded text-white ${isCompleted ? 'bg-green-500' : 'bg-gray-500'}`}>
                    Q-{quest.id}
                </span>
                <h4 className="font-bold text-gray-800 dark:text-white">{quest.title}</h4>
            </div>
            <div className={`flex items-center gap-1 text-xs font-bold ${isCompleted ? 'text-gray-400' : 'text-yellow-600 dark:text-yellow-400'}`}>
                <Star className="w-3 h-3 fill-current" /> {isCompleted ? 'Collected' : `${quest.xp} XP`}
            </div>
        </div>

        {/* Main Card */}
        <div className={`bg-gray-50 dark:bg-gray-950 rounded-2xl border-2 overflow-hidden transition-colors ${isCompleted ? 'border-green-500 dark:border-green-600 shadow-[0_0_15px_rgba(34,197,94,0.2)]' : 'border-gray-200 dark:border-gray-800'}`}>
            <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{quest.desc}</p>
                
                {/* VISUALIZER AREA */}
                <QuestVisualizer type={quest.visualType} isCompleted={isCompleted} />

                <div className="h-40 rounded-xl overflow-hidden shadow-inner border border-gray-300 dark:border-gray-700">
                    <CodeEditor 
                        code={savedCode}
                        onChange={onCodeChange}
                        expectedOutput={quest.expected}
                        onComplete={handleSuccess}
                        onFail={onFail}
                        onResetCode={() => onCodeChange(quest.codeTemplate)}
                        taskDescription={quest.title}
                        template={quest.codeTemplate}
                        solution={quest.solution}
                        mini={true}
                        isMockMode={isMockMode}
                    />
                </div>
            </div>

            {/* Reward Footer */}
            {showReward && (
                <div className="bg-green-100 dark:bg-green-900/30 p-3 flex items-center justify-between animate-in slide-in-from-bottom-2">
                    <div className="flex items-center gap-2 text-green-700 dark:text-green-400 font-bold text-sm">
                        {isPriorCompleted ? <RefreshCw className="w-4 h-4" /> : <Gift className="w-4 h-4" />}
                        <span>{isPriorCompleted ? "Replay Complete" : quest.reward}</span>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
            )}
            {!showReward && (
                <div className="bg-gray-100 dark:bg-gray-900/50 p-2 text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    {isPriorCompleted ? "Run Code to Replay" : "Run Code to Claim Reward"}
                </div>
            )}
        </div>
    </div>
  );
};