
import React, { useState, useEffect } from 'react';
import { ScrollText, Eye, Play } from 'lucide-react';
import { SectionWrapper } from './Layout';
import { MASCOT_MSG } from '../constants';
import { GamifiedProps } from '../types';

// --- LORE BLOCK ---
export const LoreBlock: React.FC<{ text: string[] }> = ({ text }) => (
  <SectionWrapper>
    <div className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-2xl shadow-sm border-l-4 border-yellow-500 dark:border-yellow-600 backdrop-blur-sm flex items-start gap-4">
        <div className="p-1.5 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg shrink-0 mt-0.5">
            <ScrollText className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
        </div>
        <div>
            <div className="prose dark:prose-invert max-w-none text-base leading-relaxed space-y-4 text-gray-700 dark:text-gray-300">
                {text.map((para, i) => (
                    <p key={i}>{para}</p>
                ))}
            </div>
        </div>
    </div>
  </SectionWrapper>
);

// --- MASCOT INTRO ---
export const MascotIntro: React.FC = () => (
    <SectionWrapper>
         <div className="flex items-start gap-4 animate-slide-in-left">
            <div className="w-16 h-16 shrink-0">
                <img src="https://api.dicebear.com/7.x/bottts/svg?seed=CodeBuddy" alt="Bot" className="w-full h-full drop-shadow-lg hover:scale-110 transition-transform" />
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl rounded-tl-none shadow-md border border-gray-200 dark:border-gray-700 relative">
                <h3 className="text-purple-600 font-black text-xs uppercase mb-1">Code Buddy</h3>
                <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
                    "{MASCOT_MSG.intro}"
                </p>
                <div className="absolute -left-2 top-4 w-4 h-4 bg-white dark:bg-gray-800 transform rotate-45 border-l border-b border-gray-200 dark:border-gray-700"></div>
            </div>
        </div>
    </SectionWrapper>
);

// --- QUIZ SECTION ---
interface QuizProps extends GamifiedProps {
  onComplete: () => void;
  question?: string;
  code?: string;
  answer?: string;
}

export const QuizSection: React.FC<QuizProps> = ({ 
    onComplete,
    onFail, 
    question = "Predict the output loot!", 
    code = "print('Hello World')", 
    answer = "hello world",
    savedState,
    onSaveState
}) => {
  const [quizInput, setQuizInput] = useState(savedState?.input || "");
  const [quizFeedback, setQuizFeedback] = useState<{msg: string, type: 'success' | 'error'} | null>(savedState?.feedback || null);

  const handleQuizSubmit = () => {
      let feedback = null;
      if (quizInput.trim().toLowerCase().includes(answer.toLowerCase())) {
          feedback = { msg: MASCOT_MSG.quizCorrect, type: 'success' as const };
          setQuizFeedback(feedback);
          onComplete();
      } else {
          feedback = { msg: MASCOT_MSG.quizWrong, type: 'error' as const };
          setQuizFeedback(feedback);
          if (onFail) onFail();
      }

      if (onSaveState) {
          onSaveState({ input: quizInput, feedback });
      }
  };

  // Persist input changes as they happen
  useEffect(() => {
      if (onSaveState && quizInput !== (savedState?.input || "")) {
          onSaveState({ input: quizInput, feedback: quizFeedback });
      }
  }, [quizInput, quizFeedback, onSaveState, savedState]);

  return (
    <SectionWrapper>
        <div className="relative group">
             <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition-opacity"></div>
             <div className="relative bg-white dark:bg-gray-800 p-6 rounded-2xl border-2 border-gray-100 dark:border-gray-700">
                 <div className="absolute -top-3 -right-3 bg-yellow-400 text-black font-black px-3 py-1 rounded-lg shadow-lg rotate-12 text-xs">
                     QUIZ TIME!
                 </div>
                 
                 <h3 className="font-black text-2xl mb-4 text-gray-800 dark:text-white flex items-center gap-2">
                     <Eye className="w-6 h-6 text-purple-500" /> {question}
                 </h3>
                 
                 <div className="bg-gray-100 dark:bg-black p-4 rounded-xl font-mono text-sm shadow-inner mb-4 text-gray-800 dark:text-gray-200 border-l-4 border-purple-500">
                     <pre>{code}</pre>
                 </div>
                 
                 <div className="flex flex-col sm:flex-row gap-3">
                     <input 
                        type="text" 
                        value={quizInput}
                        onChange={e => setQuizInput(e.target.value)}
                        placeholder="Type output..."
                        className="w-full flex-1 min-w-0 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white focus:border-purple-500 outline-none font-bold"
                     />
                     <button 
                        onClick={handleQuizSubmit}
                        title="Check Answer"
                        className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-black border-2 border-transparent shadow-[0_4px_0_rgb(107,33,168)] active:shadow-none active:translate-y-1 transition-all"
                     >
                         CHECK
                     </button>
                 </div>
                 {quizFeedback && (
                     <div className={`mt-4 p-3 rounded-lg font-bold text-center animate-bounce ${quizFeedback.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                         {quizFeedback.msg}
                     </div>
                 )}
            </div>
        </div>
    </SectionWrapper>
  );
};

// --- VIDEO SECTION ---
interface VideoProps {
  onWatch: () => void;
  watched: boolean;
}

export const VideoSection: React.FC<VideoProps> = ({ onWatch, watched }) => {
  const handleClick = () => {
      if (!watched) onWatch();
  };

  return (
    <SectionWrapper>
         <a 
            href="https://www.youtube.com/watch?v=pTB0EiLXUC8"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            title="Watch Video (+15 XP)"
            className="block relative group cursor-pointer rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-700"
        >
             <div className="aspect-video bg-black relative flex items-center justify-center">
                 <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent"></div>
                 <img src="https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Video Thumb" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                 
                 {/* Play Button */}
                 <div className="absolute w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform border-2 border-white/50">
                     <Play className="w-8 h-8 text-white fill-current ml-1" />
                 </div>
                 
                 {/* Reward Tag */}
                 {!watched && (
                     <div className="absolute top-4 right-4 bg-yellow-400 text-black font-bold text-xs px-3 py-1 rounded-full animate-bounce shadow-lg">
                         +15 XP REWARD
                     </div>
                 )}

                 <span className="absolute bottom-4 left-4 text-white font-black text-lg tracking-wide">OOP Power-Up ⚡</span>
             </div>
        </a>
    </SectionWrapper>
  );
};
