
import React, { useState, useEffect } from 'react';
import { Zap, Lock, ChevronRight, ChevronLeft, Coins as CoinsIcon, Play, Terminal, Feather, FlaskConical, Calculator, BrainCircuit, Repeat, List as ListIcon, WifiOff, DownloadCloud, X } from 'lucide-react';

// Components
import { CodeEditor } from './components/CodeEditor';
import { APIEFlipCards, AbstractionDragDrop, OOPGallery, ClassGenerator } from './components/MVPComponents';
import { GameHeader } from './components/GameHeader';
import { SectionWrapper } from './components/Layout';
import { LoreBlock, MascotIntro, QuizSection, VideoSection } from './components/ContentWidgets';
import { LevelUpModal, BadgeModal, AboutModal, AvatarModal } from './components/GameModals';
import { QuestZone, QuestCard } from './components/QuestSystem';
import { useInstallPrompt, InstallBanner } from './components/InstallPrompt';

// Data & Types
import { BADGES, APIE_LORE, MVP_QUIZ, PYTHON_QUESTS, CHAPTER_2_CHALLENGES } from './constants';
import { GameState, Badge, WidgetType, Quest } from './types';

// --- CHAPTER METADATA ---
const CHAPTER_META = [
  { 
    id: 0, 
    title: "Python Basics", 
    subtitle: "Getting Started", 
    cost: 0, 
    reqLevel: 1 
  },
  { 
    id: 1, 
    title: "The OOP Awakening", 
    subtitle: "Enter the world of Objects", 
    cost: 50, 
    reqLevel: 2 
  }
];

// --- STORAGE HELPERS ---
const STORAGE_KEYS = {
    GAME_STATE: 'cod3g_gamestate_v1',
    CHAPTERS: 'cod3g_chapters_v1',
    AVATAR: 'cod3g_avatar_v1',
    THEME: 'cod3g_theme_v1'
};

const getRandomAvatar = () => {
    const seed = Math.random().toString(36).substring(7);
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
};

const App: React.FC = () => {
  // --- GAME STATE ENGINE ---
  const [gameState, setGameState] = useState<GameState>(() => {
      const saved = localStorage.getItem(STORAGE_KEYS.GAME_STATE);
      return saved ? JSON.parse(saved) : {
        level: 1,
        xp: 0,
        maxXp: 100,
        coins: 0,
        streak: 0,
        badges: [],
        completedQuestIds: [],
        questProgress: {},
        widgetState: {}
      };
  });

  // Chapter State
  const [currentChapter, setCurrentChapter] = useState(0);
  const [unlockedChapters, setUnlockedChapters] = useState<number[]>(() => {
      const saved = localStorage.getItem(STORAGE_KEYS.CHAPTERS);
      return saved ? JSON.parse(saved) : [0];
  });

  // Settings State
  const [darkMode, setDarkMode] = useState(() => {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME);
      return saved ? JSON.parse(saved) : false;
  });
  
  const [userAvatar, setUserAvatar] = useState(() => {
      const saved = localStorage.getItem(STORAGE_KEYS.AVATAR);
      return saved || getRandomAvatar();
  });

  const [isMockMode, setIsMockMode] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  // UI Overlays
  const [levelUpModal, setLevelUpModal] = useState(false);
  const [badgeModal, setBadgeModal] = useState<Badge | null>(null);
  const [aboutModal, setAboutModal] = useState(false);
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);
  const [xpFloat, setXpFloat] = useState<{val: number, visible: boolean}>({val: 0, visible: false});

  // Section States
  const [videoWatched, setVideoWatched] = useState(false);

  // Install Prompt Hook
  const { isInstallable, installApp, showBanner, setShowBanner } = useInstallPrompt();

  // --- PERSISTENCE EFFECTS ---
  useEffect(() => {
      localStorage.setItem(STORAGE_KEYS.GAME_STATE, JSON.stringify(gameState));
  }, [gameState]);

  useEffect(() => {
      localStorage.setItem(STORAGE_KEYS.CHAPTERS, JSON.stringify(unlockedChapters));
  }, [unlockedChapters]);

  useEffect(() => {
      localStorage.setItem(STORAGE_KEYS.AVATAR, userAvatar);
  }, [userAvatar]);

  useEffect(() => {
      localStorage.setItem(STORAGE_KEYS.THEME, JSON.stringify(darkMode));
      if (darkMode) {
          document.documentElement.classList.add('dark');
      } else {
          document.documentElement.classList.remove('dark');
      }
  }, [darkMode]);

  // Network Listener
  useEffect(() => {
      const handleStatusChange = () => {
          const online = navigator.onLine;
          setIsOnline(online);
          if (!online) setIsMockMode(true); // Force Mock Mode offline
      };
      window.addEventListener('online', handleStatusChange);
      window.addEventListener('offline', handleStatusChange);
      return () => {
          window.removeEventListener('online', handleStatusChange);
          window.removeEventListener('offline', handleStatusChange);
      };
  }, []);

  // --- GAME LOGIC HANDLERS ---

  const getMultiplier = (streak: number) => {
      // 1 + (0.1 * streak), max streak 5 means max 1.5x multiplier
      return 1 + (Math.min(streak, 5) * 0.1);
  };

  const addXp = (baseAmount: number, reason?: string) => {
      setGameState(prev => {
          const currentStreak = Math.min(prev.streak + 1, 5);
          const multiplier = getMultiplier(currentStreak);
          const finalXp = Math.round(baseAmount * multiplier);
          const finalCoins = Math.ceil((baseAmount > 10 ? 5 : 1) * multiplier);

          setXpFloat({val: finalXp, visible: true});
          setTimeout(() => setXpFloat(prev => ({...prev, visible: false})), 1500);

          let newXp = prev.xp + finalXp;
          let newLevel = prev.level;
          let newMax = prev.maxXp;
          let leveledUp = false;

          // Use while loop to handle multiple level ups at once (e.g. via cheat)
          while (newXp >= newMax) {
              newXp = newXp - newMax;
              newLevel += 1;
              newMax = Math.floor(newMax * 1.5);
              leveledUp = true;
          }

          if (leveledUp) {
              setTimeout(() => setLevelUpModal(true), 500);
          }

          return {
              ...prev,
              xp: newXp,
              level: newLevel,
              maxXp: newMax,
              coins: prev.coins + finalCoins,
              streak: currentStreak
          };
      });
  };

  const handleFail = () => {
      if (gameState.streak > 0) {
          setGameState(prev => ({ ...prev, streak: 0 }));
          // Optional: Toast or shake effect here
      }
  };

  const unlockBadge = (id: string) => {
      if (gameState.badges.includes(id)) return;
      const badge = BADGES.find(b => b.id === id);
      if (badge) {
          setGameState(prev => ({...prev, badges: [...prev.badges, id]}));
          setBadgeModal(badge);
      }
  };

  const unlockChapter = (index: number) => {
      const chapter = CHAPTER_META[index];
      if (gameState.coins >= chapter.cost && gameState.level >= chapter.reqLevel) {
          setGameState(prev => ({
              ...prev,
              coins: prev.coins - chapter.cost
          }));
          setUnlockedChapters(prev => [...prev, index]);
          addXp(50, "Chapter Unlocked!");
      }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleQuizComplete = () => {
      // Now handled by handleQuestComplete wrapper in Chapter 2
  };

  const handleVideoComplete = () => {
      if(!videoWatched) {
          setVideoWatched(true);
      }
  }

  const handleQuestComplete = (xp: number, reward: string, questId: number) => {
      if (gameState.completedQuestIds.includes(questId)) return;

      setGameState(prev => ({
          ...prev,
          completedQuestIds: [...prev.completedQuestIds, questId]
      }));

      addXp(xp, reward || "Quest Complete");
      
      // Simple logic to unlock a badge on the first quest
      if (reward.includes("Badge")) {
          const badgeId = reward.includes("Words") ? 'python_novice' : reward.includes("Judge") ? 'logic_wizard' : 'loop_lord';
          setTimeout(() => unlockBadge(badgeId), 500);
      }
  };

  const handleQuestCodeChange = (questId: number, newCode: string) => {
      setGameState(prev => ({
          ...prev,
          questProgress: {
              ...prev.questProgress,
              [questId]: { code: newCode }
          }
      }));
  };

  const handleWidgetUpdate = (widgetId: string, data: any) => {
      setGameState(prev => ({
          ...prev,
          widgetState: {
              ...prev.widgetState,
              [widgetId]: data
          }
      }));
  };

  // --- RENDER CONTENT HELPERS ---

  // CHAPTER 1: PYTHON BASICS (REVAMPED - LAYMAN TONE)
  const renderChapter1 = () => {
    // Using 'as const' to ensure types match Quest['type']
    const ZONE_CONFIG = [
        { type: 'print' as const, title: "Printing", icon: <Feather className="text-pink-500" />, lore: ["Computers are pretty quiet unless you tell them to speak.", "In Python, we use `print()` to show text on the screen."] },
        { type: 'var' as const, title: "Saving Data", icon: <FlaskConical className="text-green-500" />, lore: ["Imagine you have a moving box. You write 'Kitchen' on the side. That is a Variable.", "It is a label that holds data so you can use it later."] },
        { type: 'math' as const, title: "Math", icon: <Calculator className="text-blue-500" />, lore: ["At its core, your computer is just a super powerful calculator.", "Python handles all the math for you faster than you can blink."] },
        { type: 'logic' as const, title: "Logic", icon: <BrainCircuit className="text-purple-500" />, lore: ["Code needs to make decisions. 'If it rains, take an umbrella.'", "We use `if` statements to tell the computer what to do."] },
        { type: 'loop' as const, title: "Repetition", icon: <Repeat className="text-orange-500" />, lore: ["Don't repeat yourself. Use a Loop to let the computer do the heavy lifting.", "Do it once, tell Python to repeat it 50 times."] },
        { type: 'list' as const, title: "Collections", icon: <ListIcon className="text-yellow-500" />, lore: ["Instead of making 10 different variables for a shopping list, put them in one `List`.", "It keeps your data organized and ready to access."] }
    ];

    const renderZone = (index: number) => {
        const zone = ZONE_CONFIG[index];
        let isLocked = false;
        if (index > 0) {
            const prevZoneType = ZONE_CONFIG[index - 1].type;
            const prevZoneQuests = PYTHON_QUESTS.filter(q => q.type === prevZoneType);
            const allPrevCompleted = prevZoneQuests.every(q => gameState.completedQuestIds.includes(q.id));
            if (!allPrevCompleted) isLocked = true;
        }

        return (
            <QuestZone 
                key={zone.type}
                title={zone.title} 
                icon={zone.icon}
                lore={zone.lore}
                isLocked={isLocked}
            >
                {PYTHON_QUESTS.filter(q => q.type === zone.type).map(q => (
                    <QuestCard 
                        key={q.id} 
                        quest={q} 
                        onComplete={(xp, reward) => handleQuestComplete(xp, reward, q.id)}
                        isPriorCompleted={gameState.completedQuestIds.includes(q.id)}
                        onFail={handleFail}
                        isMockMode={isMockMode}
                        savedCode={gameState.questProgress[q.id]?.code || q.codeTemplate}
                        onCodeChange={(c) => handleQuestCodeChange(q.id, c)}
                    />
                ))}
            </QuestZone>
        );
    };

    return (
        <div className="animate-in fade-in duration-500">
            <SectionWrapper>
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-black mb-4 dark:text-white">Intro to Python</h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                        Hey! Welcome to Python. This is where we start. No magic, just logic. 
                        We'll cover the absolute basics to get you coding in minutes.
                    </p>
                </div>
            </SectionWrapper>

            {/* LORE BLOCK 1: THE STANCE */}
            <LoreBlock text={[
                "Welcome to the Digital Dojo. Here, we don't trade in punches and kicks, but in logic and syntax. Coding is the closest thing to magic we have in the real world. You write a spell (code), and the universe (the computer) obeys. But like any martial art, you must start with the stance before you can throw a fireball.",
                "Python is our chosen style -- clean, efficient, and powerful. In this first section, we strip away the noise. We aren't building a skyscraper yet; we are laying the first brick. We are simply teaching the computer to acknowledge our existence. It seems trivial to make a screen say 'Hello', but it is the spark that lights the engine. Every complex AI, every game, every website started with a single line of output. Focus on the syntax. Precision is key."
            ]} />

            {renderZone(0)} {/* Printing */}
            {renderZone(1)} {/* Variables */}

            {/* LORE BLOCK 2: THE ENGINE */}
            <LoreBlock text={[
                "The Processor's Heartbeat. Deep down, beneath the sleek interfaces and colorful graphics, your computer is just a glorified calculator. It crunches numbers at speeds the human mind cannot comprehend. But raw calculation is useless without direction. This is where you come in.",
                "You are the conductor. You tell the math where to go. You define the variables -- the containers that hold your digital stuff. Think of variables like lockers in a gym. You assign a locker to a user, put their gear inside, and lock it. Later, you don't need to know what's inside; you just need the locker number (the variable name).",
                "When we combine this storage with mathematical operations, we unlock the ability to simulate physics, calculate scores, and model economies. It is the bedrock of all game mechanics."
            ]} />

            {renderZone(2)} {/* Math */}
            {renderZone(3)} {/* Logic */}

            {/* LORE BLOCK 3: AUTOMATION */}
            <LoreBlock text={[
                "The Art of Automation. If you had to do a pushup every time a player scored a point, you'd get tired fast. If you had to write a line of code for every single enemy in a game, you'd never finish building it. This is why we have Control Flow: Loops and Collections.",
                "A loop is your infinite stamina. It allows you to define a task once -- 'Spawn Enemy' -- and repeat it a thousand times without typing a thousand lines. It is efficiency incarnate. And where do we put those thousand enemies? In a List.",
                "A List is your army formation. It keeps your data organized, indexed, and ready for battle. Mastering these tools means you stop working *for* the computer, and the computer starts working *for* you."
            ]} />

            {renderZone(4)} {/* Loops */}
            {renderZone(5)} {/* Lists */}

            <SectionWrapper>
                 <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-8 rounded-3xl text-center text-white shadow-2xl">
                     <h3 className="text-2xl font-black mb-4">Chapter Complete</h3>
                     <p className="mb-6 text-gray-300">Nice work! You've got the basics down. Now, let's see how we use this stuff to build actual objects in the next chapter.</p>
                     <button 
                        onClick={() => setCurrentChapter(1)}
                        className="bg-white text-black px-8 py-3 rounded-full font-black hover:scale-105 transition-transform"
                     >
                         START CHAPTER 2
                     </button>
                 </div>
            </SectionWrapper>
        </div>
    );
  };

  // CHAPTER 2: OOP AWAKENING
  const renderChapter2 = () => {
    // Helpers for Mock Mode Data
    const absQuest = CHAPTER_2_CHALLENGES.find(c => c.id === 101)!;
    const inhQuest = CHAPTER_2_CHALLENGES.find(c => c.id === 103)!;

    // Code State for Ch2
    const absCode = gameState.questProgress[absQuest.id]?.code || (isMockMode ? absQuest.codeTemplate : absQuest.fullCode);
    const inhCode = gameState.questProgress[inhQuest.id]?.code || (isMockMode ? inhQuest.codeTemplate : inhQuest.fullCode);

    return (
        <div className="animate-in fade-in duration-500">
            {/* 1. MASCOT INTRO */}
            <MascotIntro />

            {/* 2. LORE: THE SHIFT */}
            <LoreBlock text={[
                "Welcome to the Academy, Hero. You've mastered the Iron of basic syntax, but now you must learn to build *life*.",
                APIE_LORE[0], 
                "In the procedural world (Chapter 1), you wrote lists of commands. Here, we build 'Classes' -- blueprints for reality."
            ]} />

            {/* 3. FLIP CARDS (THE PILLARS) */}
            <SectionWrapper>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-black text-lg italic bg-gray-900 text-white dark:bg-white dark:text-gray-900 px-4 py-2 rounded-lg transform -skew-x-6 shadow-lg">
                        THE 4 PILLARS
                    </h2>
                </div>
                <APIEFlipCards onEarnXp={addXp} onUnlockBadge={unlockBadge} />
            </SectionWrapper>

            {/* 4. LORE: ABSTRACTION */}
            <LoreBlock text={[
                "Let's start with **Abstraction**. It is the art of simplification.",
                APIE_LORE[2],
                APIE_LORE[3],
                "Below is a `Hero` class. You don't need to know how `attack()` calculates physics. You just call it."
            ]} />

            {/* 5. CODE: ABSTRACTION */}
            <SectionWrapper className="bg-gradient-to-br from-blue-600 to-indigo-700 p-1 rounded-2xl shadow-xl transform hover:scale-[1.01] transition-transform">
                <div className="bg-gray-900 rounded-xl overflow-hidden">
                    <div className="p-3 bg-white/10 backdrop-blur flex justify-between items-center text-white">
                        <h3 className="font-bold text-sm flex items-center gap-2">
                            <Zap className="w-4 h-4 text-yellow-400 fill-current" /> Abstraction Quest
                        </h3>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full text-white font-bold ${gameState.completedQuestIds.includes(101) ? 'bg-gray-500' : 'bg-green-500'}`}>
                            {gameState.completedQuestIds.includes(101) ? 'Completed' : '+5 XP'}
                        </span>
                    </div>
                    <div className="h-56">
                        <CodeEditor 
                            code={absCode}
                            onChange={(c) => handleQuestCodeChange(101, c)}
                            expectedOutput={absQuest.expected}
                            onComplete={() => handleQuestComplete(5, "Abstraction Mastered", 101)}
                            onFail={handleFail}
                            onResetCode={() => handleQuestCodeChange(101, isMockMode ? absQuest.codeTemplate : absQuest.fullCode)}
                            taskDescription="Run the hero greeting"
                            mini={true}
                            isMockMode={isMockMode}
                            template={isMockMode ? absQuest.codeTemplate : undefined}
                            solution={isMockMode ? absQuest.solution : undefined}
                        />
                    </div>
                </div>
            </SectionWrapper>

            {/* 6. LORE: ENCAPSULATION */}
            <LoreBlock text={[
                "Next is **Encapsulation**. A hero does not reveal their weakness to the world.",
                APIE_LORE[4],
                "In the drag-and-drop mission below, decide which data should be Public (visible to all) and which should be Private (hidden)."
            ]} />

            {/* 7. DRAG MISSION */}
            <SectionWrapper>
                <AbstractionDragDrop 
                    onEarnXp={(xp, msg) => handleQuestComplete(xp, msg || "Drag Drop Win", 102)} 
                    onUnlockBadge={unlockBadge} 
                    onFail={handleFail} 
                    savedState={gameState.widgetState['ch2_drag']}
                    onSaveState={(data) => handleWidgetUpdate('ch2_drag', data)}
                />
            </SectionWrapper>

            {/* 8. LORE: INHERITANCE */}
            <LoreBlock text={[
                "Now, **Inheritance**. Why build a new warrior from scratch when you can base it on a legend?",
                APIE_LORE[6],
                APIE_LORE[7],
                "In the code below, the `Mage` class inherits from `Hero`. It gets the `move` method for free!"
            ]} />

            {/* 9. CODE: INHERITANCE */}
            <SectionWrapper className="bg-gradient-to-br from-green-600 to-emerald-700 p-1 rounded-2xl shadow-xl">
                <div className="bg-gray-900 rounded-xl overflow-hidden">
                    <div className="p-3 bg-white/10 backdrop-blur flex justify-between items-center text-white">
                        <h3 className="font-bold text-sm flex items-center gap-2">
                            <Terminal className="w-4 h-4 text-white" /> Inheritance Lab
                        </h3>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full text-white font-bold ${gameState.completedQuestIds.includes(103) ? 'bg-gray-500' : 'bg-green-500'}`}>
                            {gameState.completedQuestIds.includes(103) ? 'Completed' : '+10 XP'}
                        </span>
                    </div>
                    <div className="h-64">
                        <CodeEditor 
                            code={inhCode}
                            onChange={(c) => handleQuestCodeChange(103, c)}
                            expectedOutput={inhQuest.expected}
                            onComplete={() => handleQuestComplete(10, "Inheritance Learned", 103)}
                            onFail={handleFail}
                            onResetCode={() => handleQuestCodeChange(103, isMockMode ? inhQuest.codeTemplate : inhQuest.fullCode)}
                            taskDescription="Observe Inheritance"
                            mini={true}
                            isMockMode={isMockMode}
                            template={isMockMode ? inhQuest.codeTemplate : undefined}
                            solution={isMockMode ? inhQuest.solution : undefined}
                        />
                    </div>
                </div>
            </SectionWrapper>

            {/* 10. GALLERY */}
            <SectionWrapper>
                <div className="flex items-center justify-between mb-2 px-2">
                    <h3 className="font-black text-gray-500 uppercase tracking-wider text-xs">CLASS GALLERY</h3>
                    <span className="text-xs text-purple-500 font-bold">Collect All 3 for Bonus!</span>
                </div>
                <OOPGallery onEarnXp={addXp} onUnlockBadge={unlockBadge} />
            </SectionWrapper>

            {/* 11. LORE: POLYMORPHISM */}
            <LoreBlock text={[
                "Finally, **Polymorphism**. The ability to change form.",
                APIE_LORE[8],
                "It allows us to write flexible code. A function can accept any object that has a `speak()` method, regardless of whether it's a Dragon, a Cat, or a Robot."
            ]} />

            {/* 12. GAME CARD QUIZ */}
            <QuizSection 
                onComplete={() => {
                    handleQuestComplete(25, "Quiz Master", 105);
                    unlockBadge('code_ninja');
                }} 
                onFail={handleFail}
                question="What does the Cat say?" 
                code={`class Cat:\n  def sound(self):\n    print("Meow")\n\nCat().sound()`}
                answer="Meow"
                savedState={gameState.widgetState['ch2_quiz']}
                onSaveState={(data) => handleWidgetUpdate('ch2_quiz', data)}
            />

            {/* 13. FINAL EXAM - No ID, bonus repetition allowed or could restrict too */}
            <QuizSection 
                onComplete={() => handleQuestComplete(30, "Final Exam Passed", 1051)} 
                onFail={handleFail}
                question="Identify the Concept" 
                code={`class Dog(Animal):\n    pass\n\n# Dog inherits from Animal`}
                answer="Inheritance"
                savedState={gameState.widgetState['ch2_quiz_final']}
                onSaveState={(data) => handleWidgetUpdate('ch2_quiz_final', data)}
            />

            {/* 14. BUILDER */}
            <LoreBlock text={[
                "You have studied the scrolls. You have practiced the forms. Now, enter the Workshop.",
                "Use the generator below to draft up to 3 custom Classes. Name them, give them purpose, and bring them to life."
            ]} />
            <SectionWrapper>
                <ClassGenerator 
                    onEarnXp={(xp, msg) => handleQuestComplete(xp, msg || "Builder Master", 106)} 
                    onUnlockBadge={unlockBadge} 
                    savedState={gameState.widgetState['ch2_builder']}
                    onSaveState={(data) => handleWidgetUpdate('ch2_builder', data)}
                />
            </SectionWrapper>

            {/* 15. VIDEO */}
            <VideoSection 
                onWatch={() => {
                    setVideoWatched(true);
                    handleQuestComplete(15, "Video Watcher", 107);
                }} 
                watched={gameState.completedQuestIds.includes(107)} 
            />
        </div>
    );
  };

  const activeMeta = CHAPTER_META[currentChapter];
  const isUnlocked = unlockedChapters.includes(currentChapter);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#0f172a] text-gray-100' : 'bg-indigo-50 text-gray-900'} font-sans text-base pb-24`}>
      
      {!isOnline && (
          <div className="bg-red-500 text-white text-xs font-bold text-center py-1 px-4 flex items-center justify-center gap-2">
              <WifiOff className="w-3 h-3" /> Offline Mode - Progress will be saved locally.
          </div>
      )}

      {/* 🏆 STICKY GAME HEADER */}
      <GameHeader 
        darkMode={darkMode} 
        toggleTheme={toggleTheme} 
        onOpenAbout={() => setAboutModal(true)} 
        gameState={gameState} 
        xpFloat={xpFloat} 
        userAvatar={userAvatar}
        onOpenAvatar={() => setAvatarModalOpen(true)}
        isInstallable={isInstallable}
        onInstall={installApp}
      />

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-12">
        
        {/* 📖 CHAPTER HEADER */}
        <div className="text-center py-12 mb-4 animate-in fade-in slide-in-from-top-8 duration-1000">
            <div className="flex items-center justify-center gap-4 mb-6">
                <span className="inline-block px-5 py-2 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-black tracking-[0.2em] uppercase shadow-xl transform hover:scale-105 transition-transform">
                    Chapter {currentChapter + 1}
                </span>
                {!isUnlocked && <Lock className="w-6 h-6 text-gray-400" />}
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tighter mb-4 leading-[0.9]">
                {activeMeta.title.split(' ').slice(0, -1).join(' ')} <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                    {activeMeta.title.split(' ').pop()}
                </span>
            </h1>
            <p className="text-gray-700 dark:text-gray-300 font-bold text-xl">
                {activeMeta.subtitle}
            </p>
            <div className="h-1.5 w-24 bg-gray-900 dark:bg-white mx-auto mt-8 rounded-full opacity-20"></div>
        </div>

        {/* CONTENT ROUTER */}
        {isUnlocked ? (
            <>
                {currentChapter === 0 && renderChapter1()}
                {currentChapter === 1 && renderChapter2()}
            </>
        ) : (
            // LOCKED STATE
            <SectionWrapper>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-3xl p-8 text-center border-2 border-gray-200 dark:border-gray-700 shadow-inner">
                    <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Lock className="w-8 h-8 text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-black mb-2">Chapter Locked</h2>
                    <p className="text-gray-500 mb-8">Complete previous challenges and earn enough coins to unlock this chapter.</p>
                    
                    <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto mb-8">
                        <div className={`p-4 rounded-xl border-2 ${gameState.level >= activeMeta.reqLevel ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-red-500 bg-red-50 dark:bg-red-900/20'}`}>
                            <div className="text-xs font-bold uppercase text-gray-500 mb-1">Required Level</div>
                            <div className={`text-2xl font-black ${gameState.level >= activeMeta.reqLevel ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>
                                {activeMeta.reqLevel}
                            </div>
                            <div className={`text-xs font-bold mt-1 ${gameState.level >= activeMeta.reqLevel ? 'text-green-600' : 'text-red-600'}`}>
                                {gameState.level >= activeMeta.reqLevel ? '✅ Ready' : '❌ Too Low'}
                            </div>
                        </div>
                        <div className={`p-4 rounded-xl border-2 ${gameState.coins >= activeMeta.cost ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-red-500 bg-red-50 dark:bg-red-900/20'}`}>
                            <div className="text-xs font-bold uppercase text-gray-500 mb-1">Cost</div>
                            <div className={`text-2xl font-black flex items-center justify-center gap-1 ${gameState.coins >= activeMeta.cost ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>
                                {activeMeta.cost} <CoinsIcon className="w-5 h-5 text-yellow-500 fill-current" />
                            </div>
                            <div className={`text-xs font-bold mt-1 ${gameState.coins >= activeMeta.cost ? 'text-green-600' : 'text-red-600'}`}>
                                {gameState.coins >= activeMeta.cost ? '✅ Affordable' : '❌ Too Expensive'}
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={() => unlockChapter(currentChapter)}
                        disabled={gameState.coins < activeMeta.cost || gameState.level < activeMeta.reqLevel}
                        className="w-full max-w-xs bg-gradient-to-r from-green-500 to-emerald-600 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 rounded-xl font-black text-lg shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        UNLOCK NOW
                    </button>
                </div>
            </SectionWrapper>
        )}

      </main>

      {/* 🦶 CHAPTER NAVIGATION FOOTER */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 p-4 z-30">
          <div className="max-w-2xl mx-auto flex justify-between items-center">
                <button 
                    onClick={() => setCurrentChapter(Math.max(0, currentChapter - 1))}
                    disabled={currentChapter === 0}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                    <ChevronLeft className="w-5 h-5" />
                    <span className="hidden sm:inline">Prev Chapter</span>
                </button>

                <div className="text-xs font-black tracking-widest text-gray-400 uppercase">
                    Page {currentChapter + 1} / {CHAPTER_META.length}
                </div>

                <button 
                    onClick={() => setCurrentChapter(Math.min(CHAPTER_META.length - 1, currentChapter + 1))}
                    disabled={currentChapter === CHAPTER_META.length - 1}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-white bg-gray-900 dark:bg-white dark:text-gray-900 hover:scale-105 disabled:opacity-30 disabled:scale-100 disabled:cursor-not-allowed transition-all shadow-lg"
                >
                    <span className="hidden sm:inline">Next Chapter</span>
                    <ChevronRight className="w-5 h-5" />
                </button>
          </div>
      </div>

      {/* 📲 INSTALL BANNER (FLOATING) */}
      <InstallBanner 
        show={showBanner} 
        onClose={() => setShowBanner(false)} 
        onInstall={installApp} 
      />

      {/* --- MODALS & OVERLAYS --- */}

      <LevelUpModal 
        isOpen={levelUpModal} 
        onClose={() => setLevelUpModal(false)} 
        level={gameState.level} 
      />

      <BadgeModal 
        badge={badgeModal} 
        onClose={() => setBadgeModal(null)} 
      />

      <AboutModal 
        isOpen={aboutModal} 
        onClose={() => setAboutModal(false)} 
        isMockMode={isMockMode}
        onToggleMockMode={() => setIsMockMode(!isMockMode)}
        isInstallable={isInstallable}
        onInstall={installApp}
        onCheat={(type) => {
            if (type === 'coins') {
                setGameState(prev => ({ ...prev, coins: prev.coins + 1000 }));
                addXp(0, ""); 
            } else {
                addXp(500, "Dev Cheat");
            }
        }}
      />

      <AvatarModal 
        isOpen={avatarModalOpen} 
        onClose={() => setAvatarModalOpen(false)} 
        currentAvatar={userAvatar} 
        onSelect={setUserAvatar}
      />

    </div>
  );
};

export default App;
