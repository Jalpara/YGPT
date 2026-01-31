
import React, { useState, useRef } from 'react';
import { generateFanArt } from '../services/geminiService';
import { Sparkles, Image as ImageIcon, Loader2, Upload, X, Camera } from 'lucide-react';

const FanArtGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size too large. Please keep it under 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // Remove data URL prefix for API if needed, but Gemini usually handles it or we strip in service
        // The service provided expects the full data url or base64. 
        // Looking at service: it expects raw base64 data without prefix for inlineData.
        // But the service logic provided previously handles creating the `inlineData` object.
        // Let's pass the raw base64 string (stripping the data:image... part) to the service wrapper 
        // OR pass the whole thing if the service parses it.
        // Based on previous service code: `data: base64Image` implies we need the raw base64.
        
        const rawBase64 = base64String.split(',')[1];
        setUploadedImage(rawBase64);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearUploadedImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() && !uploadedImage) return;

    setIsGenerating(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const result = await generateFanArt(prompt, uploadedImage || undefined);
      if (result) {
        setGeneratedImage(result);
      } else {
        setError('Failed to generate image. Please try again.');
      }
    } catch (err) {
        setError('An error occurred while connecting to the creative muse.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-6 md:p-10 shadow-xl border border-purple-100">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-lemon text-[#936FB1] mb-2">AI Fan Art Studio</h2>
        <p className="text-gray-600">
          Describe a scene or upload a sketch, and let our AI bring your imagination to life.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2 space-y-6">
          <form onSubmit={handleGenerate} className="space-y-4">
            
            {/* Image Upload Area */}
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Reference Image (Optional)</label>
                {!uploadedImage ? (
                    <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-[#936FB1] hover:bg-purple-50/50 transition h-32"
                    >
                        <Camera className="text-gray-400 mb-2" size={24} />
                        <p className="text-xs text-gray-500 font-medium">Click to upload a sketch or photo</p>
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={handleImageUpload} 
                            accept="image/*" 
                            className="hidden" 
                        />
                    </div>
                ) : (
                    <div className="relative rounded-xl overflow-hidden border border-gray-200 h-32 bg-white flex items-center justify-center">
                        <img src={`data:image/png;base64,${uploadedImage}`} alt="Reference" className="h-full w-auto object-contain" />
                        <button 
                            type="button"
                            onClick={clearUploadedImage}
                            className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-red-500 transition"
                        >
                            <X size={16} />
                        </button>
                        <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded-full">
                            Reference Added
                        </div>
                    </div>
                )}
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Your Vision</label>
                <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={uploadedImage ? "Describe how to transform this image..." : "E.g., A diverse group of young people planting trees in a futuristic city, golden sunlight, watercolor style..."}
                className="w-full h-32 p-4 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-[#936FB1] focus:border-transparent resize-none outline-none"
                />
            </div>

            <button
              type="submit"
              disabled={isGenerating || (!prompt && !uploadedImage)}
              className="mt-4 w-full bg-[#936FB1] text-white py-3 px-6 rounded-lg font-bold flex items-center justify-center space-x-2 hover:bg-purple-700 transition disabled:opacity-50 shadow-lg transform active:scale-95"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="animate-spin" />
                  <span>Dreaming...</span>
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  <span>Generate Art</span>
                </>
              )}
            </button>
          </form>
          {error && <p className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 rounded-xl min-h-[400px] border border-gray-200 relative overflow-hidden shadow-inner">
          {generatedImage ? (
            <div className="relative w-full h-full group">
                <img 
                    src={generatedImage} 
                    alt="Generated Fan Art" 
                    className="w-full h-full object-contain"
                />
                <a 
                    href={generatedImage} 
                    download="ygpt-fan-art.png"
                    className="absolute bottom-4 right-4 bg-white text-gray-800 px-4 py-2 rounded-full font-bold shadow-lg opacity-0 group-hover:opacity-100 transition transform translate-y-2 group-hover:translate-y-0 flex items-center text-sm"
                >
                    <Upload size={16} className="mr-2" /> Download
                </a>
            </div>
          ) : (
            <div className="text-center text-gray-400 p-6">
                {isGenerating ? (
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 border-4 border-[#FDB913] border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="font-medium text-[#936FB1]">The AI is painting your vision...</p>
                        <p className="text-xs text-gray-400 mt-2">This may take a few seconds</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <div className="bg-white p-4 rounded-full mb-4 shadow-sm">
                            <ImageIcon size={32} className="text-gray-300" />
                        </div>
                        <p className="font-medium">Art will appear here</p>
                        <p className="text-sm opacity-60 max-w-xs mt-2">Upload a sketch or describe a scene to get started.</p>
                    </div>
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FanArtGenerator;
