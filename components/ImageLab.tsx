import React, { useState, useRef } from 'react';
import { Upload, Wand2, Image as ImageIcon, Download, Loader2 } from 'lucide-react';
import { editImageWithGemini } from '../services/geminiService';

export const ImageLab: React.FC = () => {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSourceImage(reader.result as string);
        setGeneratedImage(null); // Reset previous result
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!sourceImage || !prompt) return;

    setIsGenerating(true);
    try {
      const result = await editImageWithGemini(sourceImage, prompt);
      if (result) {
        setGeneratedImage(result);
      }
    } catch (error) {
      alert("Failed to edit image. Please ensure API key is valid and retry.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-2">
          <Wand2 className="w-8 h-8 text-purple-500" />
          Creative Asset Lab
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Use the "Nano Banana" (Gemini 2.5 Flash Image) engine to edit game assets or create visual aids for your coding projects.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div 
            className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl h-80 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors cursor-pointer relative overflow-hidden group"
            onClick={() => fileInputRef.current?.click()}
          >
            {sourceImage ? (
              <img src={sourceImage} alt="Source" className="w-full h-full object-contain" />
            ) : (
              <div className="text-center p-6">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Click to upload base image</p>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange} 
            />
            {sourceImage && (
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <p className="text-white font-bold">Change Image</p>
                </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Magic Prompt
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., 'Add a retro pixel art filter', 'Remove the background', 'Turn the cat into a robot'"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none h-24 resize-none"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={!sourceImage || !prompt.trim() || isGenerating}
            className={`w-full py-3 rounded-lg font-bold flex items-center justify-center space-x-2 transition-all ${
              !sourceImage || !prompt.trim() || isGenerating
                ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
            }`}
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                <span>Generate Edit</span>
              </>
            )}
          </button>
        </div>

        {/* Output Section */}
        <div className="border-2 border-gray-200 dark:border-gray-700 rounded-xl h-full min-h-[400px] bg-white dark:bg-gray-900 flex flex-col relative">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    Result
                </h3>
                {generatedImage && (
                     <a href={generatedImage} download="gemini-edit.png" className="text-purple-600 hover:text-purple-500">
                        <Download className="w-5 h-5" />
                     </a>
                )}
            </div>
            <div className="flex-1 flex items-center justify-center p-4 bg-gray-50 dark:bg-black/20">
                {generatedImage ? (
                    <img src={generatedImage} alt="Generated" className="max-w-full max-h-[500px] object-contain rounded shadow-lg" />
                ) : (
                    <div className="text-center text-gray-400">
                        <Wand2 className="w-16 h-16 mx-auto mb-4 opacity-20" />
                        <p>The magic happens here</p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};
