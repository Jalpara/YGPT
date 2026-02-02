import React, { useState } from 'react';
import { Download, Heart, Star, ChevronDown, Palette, Image as ImageIcon } from 'lucide-react';
import FanArtGenerator from '../components/FanArtGenerator';

const FanArtPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'trending' | 'newest' | 'top'>('trending');

  // Generating some varied aspect ratio placeholder heights for masonry feel
  const heights = ['h-64', 'h-80', 'h-56', 'h-72', 'h-64', 'h-96', 'h-56', 'h-72'];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header - Standardized Style */}
      <div className="relative py-24 bg-brand-purple text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        {/* Standard Abstract Shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/20 rounded-full backdrop-blur-md text-white">
              <Palette size={48} />
            </div>
          </div>
          <h1 className="font-lemon text-4xl md:text-6xl mb-4">Member Creations</h1>
          <p className="text-xl md:text-2xl font-light opacity-90 max-w-2xl mx-auto">
            A gallery of hope, peace, and transformation.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 -mt-12 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
          {/* Generator Section */}
          <div className="mb-20">
            <FanArtGenerator />
          </div>

          {/* Gallery Section */}
          <div>
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-gray-200 pb-4">
              <div>
                <h3 className="text-3xl font-lemon text-brand-dark mb-2 flex items-center">
                  Community Showcase{' '}
                  <Star size={24} className="ml-3 text-brand-yellow fill-brand-yellow" />
                </h3>
                <p className="text-gray-500">Inspiring artwork shared by YGPT members worldwide.</p>
              </div>
              <div className="flex gap-2 mt-4 md:mt-0 bg-white p-1 rounded-full border border-gray-200 shadow-sm">
                {(['trending', 'newest', 'top'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                      activeTab === tab ? 'bg-brand-purple text-white shadow' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Masonry Layout Simulation */}
            <div className="columns-1 sm:columns-2 lg:columns-4 gap-6 space-y-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i, idx) => {
                const colors = ['bg-brand-orange', 'bg-brand-yellow', 'bg-brand-purple', 'bg-brand-teal'];
                return (
                  <div
                    key={i}
                    className="break-inside-avoid bg-white rounded-2xl shadow-md overflow-hidden group relative hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div
                      className={`w-full relative ${heights[idx % heights.length]} overflow-hidden ${
                        colors[idx % 4]
                      } flex items-center justify-center`}
                    >
                      <div className="absolute inset-0 bg-black/10 opacity-50"></div>
                      <ImageIcon size={48} className="text-white opacity-50" />
                      {/* Overlay Actions */}
                      <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="p-2 bg-white/90 rounded-full shadow-sm hover:bg-white text-gray-600 hover:text-red-500 transition">
                          <Heart size={16} />
                        </button>
                        <button className="p-2 bg-white/90 rounded-full shadow-sm hover:bg-white text-gray-600 hover:text-brand-purple transition">
                          <Download size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="p-4">
                      <h4 className="font-bold text-gray-800 text-sm mb-1 truncate">Vision of Peace #{i}</h4>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-xs text-gray-500">
                          <div className="w-5 h-5 rounded-full bg-gray-200 mr-2 overflow-hidden flex items-center justify-center text-[10px] font-bold text-gray-500">
                            A{i}
                          </div>
                          @artist_{i}
                        </div>
                        <span className="text-[10px] text-gray-400 flex items-center bg-gray-50 px-2 py-1 rounded-full">
                          <Heart size={10} className="mr-1 fill-gray-300" /> {10 + i * 5}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-16 text-center">
              <button className="group border-2 border-brand-purple text-brand-purple px-10 py-3 rounded-full font-bold hover:bg-brand-purple hover:text-white transition uppercase tracking-wide text-sm flex items-center mx-auto">
                Load More Artworks{' '}
                <ChevronDown size={16} className="ml-2 group-hover:translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FanArtPage;
