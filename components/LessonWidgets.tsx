
import React, { useState, useEffect } from 'react';
import { WidgetType } from '../types';
import { Play, Terminal, Laptop, Globe, Box, Type, Hash, List, Braces, CheckCircle2, ArrowRight, GitMerge, RefreshCw, Code } from 'lucide-react';

interface WidgetProps {
  type: WidgetType;
}

export const LessonWidget: React.FC<WidgetProps> = ({ type }) => {
  const [activeTerm, setActiveTerm] = useState<string | null>(null);
  const [setupMode, setSetupMode] = useState<'local' | 'online'>('online');
  
  // Flowchart Logic
  const [fcSlotA, setFcSlotA] = useState<string | null>(null);
  const [fcSlotB, setFcSlotB] = useState<string | null>(null);
  const fcSolved = fcSlotA === "Print 'Boss'" && fcSlotB === "Print 'Grind'";

  // Loop Visualizer Logic
  const [loopStep, setLoopStep] = useState(0);
  const [isLoopPlaying, setIsLoopPlaying] = useState(false);

  useEffect(() => {
      let interval: any;
      if (isLoopPlaying) {
          interval = setInterval(() => {
              setLoopStep(prev => (prev + 1) % 5);
          }, 1000);
      }
      return () => clearInterval(interval);
  }, [isLoopPlaying]);

  // Function Builder Logic
  const [fnName, setFnName] = useState("my_function");
  const [fnParam, setFnParam] = useState("item");
  const [fnAction, setFnAction] = useState("print(item)");

  switch (type) {
    case WidgetType.START_ANIMATION:
      return (
        <div className="bg-primary-50 dark:bg-primary-900/20 p-6 rounded-xl border-2 border-primary-100 dark:border-primary-800 text-center my-6">
            <div className="text-6xl mb-4 animate-bounce">🐍</div>
            <h3 className="text-xl font-bold text-primary-700 dark:text-primary-300 mb-2">Ready?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Hit the green Run button to start.</p>
        </div>
      );

    case WidgetType.TERMS_EXPANDER:
      const terms = [
        { id: 'high', title: 'High-Level', desc: 'Reads like English. Not robot code.' },
        { id: 'inter', title: 'Interpreted', desc: 'Runs instantly. No waiting.' },
        { id: 'syntax', title: 'Syntax', desc: 'The rules. Python is super clean.' },
      ];
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-6">
          {terms.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTerm(activeTerm === t.id ? null : t.id)}
              className={`p-4 rounded-xl border transition-all text-left ${
                activeTerm === t.id 
                ? 'bg-blue-600 text-white border-blue-600 shadow-lg transform scale-105' 
                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-400'
              }`}
            >
              <h4 className="font-bold mb-1">{t.title}</h4>
              {activeTerm === t.id && <p className="text-xs opacity-90 animate-slide-in-left">{t.desc}</p>}
              {activeTerm !== t.id && <p className="text-xs text-gray-400">Tap to see</p>}
            </button>
          ))}
        </div>
      );

    case WidgetType.SETUP_TOGGLE:
      return (
        <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-xl flex mb-6 relative">
           <div className={`absolute top-1 bottom-1 w-1/2 bg-white dark:bg-gray-700 rounded-lg shadow transition-all duration-300 ${setupMode === 'online' ? 'left-1' : 'left-[calc(50%-4px)] translate-x-full'}`}></div>
           <button 
             onClick={() => setSetupMode('online')}
             className={`flex-1 z-10 py-3 text-sm font-bold flex items-center justify-center gap-2 ${setupMode === 'online' ? 'text-blue-600 dark:text-blue-300' : 'text-gray-500'}`}
           >
             <Globe className="w-4 h-4" /> Online
           </button>
           <button 
             onClick={() => setSetupMode('local')}
             className={`flex-1 z-10 py-3 text-sm font-bold flex items-center justify-center gap-2 ${setupMode === 'local' ? 'text-blue-600 dark:text-blue-300' : 'text-gray-500'}`}
           >
             <Laptop className="w-4 h-4" /> Local
           </button>
           
           <div className="absolute top-full left-0 right-0 mt-4 p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl">
             {setupMode === 'online' ? (
               <p className="text-sm text-gray-600 dark:text-gray-300">✅ No install.<br/>✅ Runs in browser.<br/>✅ Easy mode.</p>
             ) : (
               <p className="text-sm text-gray-600 dark:text-gray-300">1. Download it.<br/>2. Install it.<br/>3. Configure it.</p>
             )}
           </div>
        </div>
      );

    case WidgetType.DATA_TYPES:
      return (
        <div className="flex gap-4 overflow-x-auto pb-4 my-6 hide-scrollbar">
          {[
            { icon: Hash, label: 'Integer', ex: '5, 100' },
            { icon: Type, label: 'String', ex: '"Hello"' },
            { icon: Box, label: 'Float', ex: '3.14' },
            { icon: List, label: 'List', ex: '[1, 2]' },
          ].map((dt, i) => (
            <div key={i} className="min-w-[100px] bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center shadow-sm">
              <dt.icon className="w-6 h-6 text-purple-500 mb-2" />
              <span className="font-bold text-sm mb-1">{dt.label}</span>
              <span className="text-xs text-gray-400 font-mono bg-gray-100 dark:bg-black px-1 rounded">{dt.ex}</span>
            </div>
          ))}
        </div>
      );

    case WidgetType.OPERATOR_CARDS:
        return (
            <div className="flex justify-around my-6 bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl">
                <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600">+</div>
                    <div className="text-xs uppercase font-bold tracking-wider opacity-70">Add</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600">-</div>
                    <div className="text-xs uppercase font-bold tracking-wider opacity-70">Sub</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600">*</div>
                    <div className="text-xs uppercase font-bold tracking-wider opacity-70">Mul</div>
                </div>
                 <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600">/</div>
                    <div className="text-xs uppercase font-bold tracking-wider opacity-70">Div</div>
                </div>
            </div>
        );
    
    case WidgetType.FLOWCHART_PUZZLE:
        return (
            <div className={`bg-white dark:bg-gray-800 p-6 rounded-xl border-2 my-6 transition-colors ${fcSolved ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-200 dark:border-gray-700'}`}>
                <h4 className="font-bold mb-4 flex items-center gap-2">
                    <GitMerge className="w-5 h-5" /> Logic Repair
                </h4>
                <div className="flex flex-col items-center space-y-4">
                    <div className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg font-mono text-sm">if level {'>'} 9</div>
                    <div className="flex w-full justify-center gap-16 relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-4 bg-gray-300"></div>
                        <div className="absolute top-4 left-1/4 right-1/4 h-px bg-gray-300"></div>
                        <div className="flex flex-col items-center w-1/3">
                            <div className="h-4 w-px bg-gray-300"></div>
                            <span className="text-xs text-green-500 font-bold mb-1">Yes</span>
                            <button 
                                onClick={() => setFcSlotA(fcSlotA === "Print 'Boss'" ? null : "Print 'Boss'")}
                                className={`w-full p-2 border rounded-lg text-xs text-center ${fcSlotA ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border-blue-500' : 'border-dashed border-gray-400 text-gray-400 hover:bg-gray-50'}`}
                            >
                                {fcSlotA || "Select"}
                            </button>
                        </div>
                        <div className="flex flex-col items-center w-1/3">
                            <div className="h-4 w-px bg-gray-300"></div>
                            <span className="text-xs text-red-500 font-bold mb-1">No</span>
                            <button 
                                onClick={() => setFcSlotB(fcSlotB === "Print 'Grind'" ? null : "Print 'Grind'")}
                                className={`w-full p-2 border rounded-lg text-xs text-center ${fcSlotB ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border-blue-500' : 'border-dashed border-gray-400 text-gray-400 hover:bg-gray-50'}`}
                            >
                                {fcSlotB || "Select"}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center gap-2 mt-6">
                     {(!fcSlotA || !fcSlotB) && (
                         <>
                             <button onClick={() => !fcSlotA && setFcSlotA("Print 'Boss'")} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs hover:scale-105 transition">Option: Print 'Boss'</button>
                             <button onClick={() => !fcSlotB && setFcSlotB("Print 'Grind'")} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs hover:scale-105 transition">Option: Print 'Grind'</button>
                         </>
                     )}
                </div>
                {fcSolved && <p className="text-center text-green-600 font-bold mt-4 animate-bounce">Fixed! ✅</p>}
            </div>
        );

    case WidgetType.LOOP_VISUALIZER:
        return (
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 my-6 text-white font-mono relative overflow-hidden">
                <div className="absolute top-2 right-2 flex gap-2">
                     <button onClick={() => setIsLoopPlaying(!isLoopPlaying)} className="p-2 bg-green-600 rounded hover:bg-green-500 transition">
                         {isLoopPlaying ? <div className="w-3 h-3 bg-white rounded-sm" /> : <Play className="w-3 h-3 fill-current" />}
                     </button>
                </div>
                <div className="mb-4 text-gray-400 text-sm border-b border-gray-700 pb-2">
                    for i in range(5):
                </div>
                <div className="flex items-center justify-center gap-4">
                    <div className="text-center">
                        <div className="text-xs text-gray-500 mb-1">i</div>
                        <div className="text-4xl font-bold text-blue-400">{loopStep}</div>
                    </div>
                    <div className="h-12 w-px bg-gray-700"></div>
                    <div className="space-y-1 w-32">
                        {[0, 1, 2, 3, 4].map(n => (
                            <div key={n} className={`text-xs transition-all duration-300 ${loopStep === n ? 'text-green-400 font-bold scale-110 origin-left' : 'text-gray-600'}`}>
                                {loopStep === n ? '>' : ' '} print({n})
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );

    case WidgetType.FUNCTION_BUILDER:
        return (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 my-6 shadow-sm">
                <h4 className="font-bold mb-4 flex items-center gap-2 text-purple-600">
                    <Code className="w-5 h-5" /> Function Builder
                </h4>
                <div className="space-y-3 mb-4">
                    <div>
                        <label className="text-xs font-bold uppercase text-gray-500">Name</label>
                        <input type="text" value={fnName} onChange={e => setFnName(e.target.value)} className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded px-3 py-2 text-sm font-mono text-primary-600" />
                    </div>
                    <div>
                        <label className="text-xs font-bold uppercase text-gray-500">Input</label>
                        <input type="text" value={fnParam} onChange={e => setFnParam(e.target.value)} className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded px-3 py-2 text-sm font-mono text-orange-600" />
                    </div>
                </div>
                <div className="bg-gray-900 text-gray-300 p-4 rounded-lg font-mono text-sm relative">
                    <span className="text-purple-400">def</span> <span className="text-blue-400">{fnName}</span>({fnParam}):<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;{fnAction}
                </div>
            </div>
        );

    case WidgetType.FINAL_CHECKLIST:
      return (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800 my-6">
            <h3 className="font-bold text-green-800 dark:text-green-300 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" /> Skills
            </h3>
            <div className="grid grid-cols-2 gap-3">
                {['Logic', 'Loops', 'Variables', 'Functions'].map(skill => (
                    <div key={skill} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                            <ArrowRight className="w-3 h-3 text-white" />
                        </div>
                        {skill}
                    </div>
                ))}
            </div>
        </div>
      );

    default:
      return null;
  }
};
