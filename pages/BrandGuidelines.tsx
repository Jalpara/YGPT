import React, { useState } from 'react';
import { Download, Check, Copy } from 'lucide-react';
import { BRAND_COLORS } from '../constants';
import Logo from '../components/Logo';

const BrandGuidelines: React.FC = () => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const handleCopyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-brand-dark text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-lemon mb-4 tracking-wide text-brand-yellow">
            Brand Identity
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light">
            The visual language of Youth For Global Peace and Transformation.
            Consistency is key to our mission.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10">
        {/* Logo Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-12 animate-fade-in-up">
          <div className="flex flex-col md:flex-row items-start justify-between mb-8 border-b pb-8">
            <div>
              <h2 className="text-3xl font-lemon text-brand-orange mb-2">Our Logo</h2>
              <p className="text-gray-500">The primary symbol of our movement. Use it with pride.</p>
            </div>
            <button className="mt-4 md:mt-0 bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-bold text-sm transition flex items-center border border-gray-300">
              <Download size={18} className="mr-2" /> Download Brand Kit (.zip)
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Light Background */}
            <div className="bg-white rounded-xl p-16 flex items-center justify-center border-2 border-dashed border-gray-200">
              <div className="text-center transform scale-150">
                <Logo stacked={true} variant="dark" />
                <p className="mt-8 text-xs font-mono text-gray-400">Primary Logo (Light BG)</p>
              </div>
            </div>
            {/* Dark Background */}
            <div className="bg-brand-dark rounded-xl p-16 flex items-center justify-center border border-brand-dark">
              <div className="text-center transform scale-150">
                <Logo stacked={true} variant="light" />
                <p className="mt-8 text-xs font-mono text-gray-500">Reverse Logo (Dark BG)</p>
              </div>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 border-l-4 border-brand-orange bg-orange-50/50 rounded-r-lg">
              <h4 className="font-bold text-sm uppercase mb-1 text-gray-800">Clear Space</h4>
              <p className="text-xs text-gray-600">
                Always maintain at least 20% padding relative to the logo size around the mark to ensure
                visibility and impact.
              </p>
            </div>
            <div className="p-4 border-l-4 border-brand-yellow bg-yellow-50/50 rounded-r-lg">
              <h4 className="font-bold text-sm uppercase mb-1 text-gray-800">Minimum Size</h4>
              <p className="text-xs text-gray-600">
                The logo should never be rendered smaller than 32px in height for digital applications to
                preserve legibility.
              </p>
            </div>
            <div className="p-4 border-l-4 border-brand-purple bg-purple-50/50 rounded-r-lg">
              <h4 className="font-bold text-sm uppercase mb-1 text-gray-800">Usage</h4>
              <p className="text-xs text-gray-600">
                Use the multi-colored version on white/light backgrounds. Use the all-white version on dark
                imagery or solid colors.
              </p>
            </div>
          </div>
        </section>

        {/* Colors Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-lemon text-brand-purple mb-8 pb-4 border-b">Color Palette</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BRAND_COLORS.map((color) => (
              <div
                key={color.name}
                className="group cursor-pointer"
                onClick={() => handleCopyColor(color.hex)}
              >
                <div
                  className="h-40 rounded-t-xl w-full transition-transform transform group-hover:-translate-y-1 relative shadow-inner flex items-center justify-center"
                  style={{ backgroundColor: color.hex }}
                >
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-bold flex items-center bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                      {copiedColor === color.hex ? (
                        <Check size={16} className="mr-1" />
                      ) : (
                        <Copy size={16} className="mr-1" />
                      )}
                      {copiedColor === color.hex ? 'Copied!' : 'Copy Hex'}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded text-xs font-bold shadow-sm uppercase">
                    {color.hex}
                  </div>
                </div>
                <div className="bg-white border border-t-0 border-gray-100 rounded-b-xl p-5 shadow-sm group-hover:shadow-md transition">
                  <h3 className="font-bold text-lg mb-3 flex items-center justify-between text-gray-800">
                    {color.name}
                    <span
                      className="w-4 h-4 rounded-full border border-gray-200"
                      style={{ backgroundColor: color.hex }}
                    ></span>
                  </h3>
                  <div className="space-y-2 text-xs text-gray-500 font-mono bg-gray-50 p-3 rounded border border-gray-100">
                    <div className="flex justify-between">
                      <span>RGB</span> <span className="text-gray-800 font-semibold">{color.rgb}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>CMYK</span> <span className="text-gray-800 font-semibold">{color.cmyk}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>PMS</span> <span className="text-gray-800 font-semibold">{color.pantone}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-lemon text-brand-teal mb-8 pb-4 border-b">Typography</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Headline Font */}
            <div>
              <div className="mb-4">
                <span className="bg-brand-dark text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                  Headlines
                </span>
              </div>
              <h3 className="text-5xl font-lemon text-brand-dark mb-2">Lemon Milk</h3>
              <p className="text-gray-500 mb-6 text-sm">
                Used for main titles, navigation, and impactful statements. It captures our youthful and
                bold spirit. Always uppercase.
              </p>

              <div className="bg-gray-100 p-8 rounded-xl font-lemon text-gray-800 break-words tracking-widest leading-relaxed border border-gray-200">
                ABCDEFGHIJKLM<br />NOPQRSTUVWXYZ<br />
                <span className="text-gray-400">0123456789</span>
              </div>
            </div>

            {/* Body Font */}
            <div>
              <div className="mb-4">
                <span className="bg-brand-dark text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                  Body Copy
                </span>
              </div>
              <h3 className="text-5xl font-sans font-bold text-brand-dark mb-2">Montserrat</h3>
              <p className="text-gray-500 mb-6 text-sm">
                Used for all body text, subtitles, and UI elements. Geometric, legible, and friendly.
              </p>

              <div className="bg-gray-100 p-8 rounded-xl font-sans text-gray-800 break-words leading-relaxed border border-gray-200 space-y-2">
                <p>
                  <span className="font-bold text-brand-orange">Bold (700):</span> The quick brown fox jumps
                  over the lazy dog.
                </p>
                <p>
                  <span className="font-medium text-brand-yellow">Medium (500):</span> The quick brown fox
                  jumps over the lazy dog.
                </p>
                <p>
                  <span className="font-light text-brand-purple">Light (300):</span> The quick brown fox jumps
                  over the lazy dog.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BrandGuidelines;
