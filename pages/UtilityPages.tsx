
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { Download, Heart, Check, Copy, Users, Building, HeartHandshake, Smile, Utensils, Globe, Star, ChevronDown, ChevronUp, Upload, Filter, Palette, Image as ImageIcon } from 'lucide-react';
import { BRAND_COLORS, IMPACT_DATA, IMPACT_STATS } from '../constants';
import FanArtGenerator from '../components/FanArtGenerator';
import Logo from '../components/Logo';

export const BrandGuidelines: React.FC = () => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const handleCopyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
        {/* Header */}
        <div className="bg-[#333333] text-white py-20">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-lemon mb-4 tracking-wide text-[#FDB913]">Brand Identity</h1>
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
                        <h2 className="text-3xl font-lemon text-[#F47C20] mb-2">Our Logo</h2>
                        <p className="text-gray-500">The primary symbol of our movement. Use it with pride.</p>
                    </div>
                    <button className="mt-4 md:mt-0 bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-bold text-sm transition flex items-center border border-gray-300">
                        <Download size={18} className="mr-2"/> Download Brand Kit (.zip)
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
                    <div className="bg-[#333333] rounded-xl p-16 flex items-center justify-center border border-[#333333]">
                        <div className="text-center transform scale-150">
                            <Logo stacked={true} variant="light" />
                            <p className="mt-8 text-xs font-mono text-gray-500">Reverse Logo (Dark BG)</p>
                         </div>
                    </div>
                </div>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 border-l-4 border-[#F47C20] bg-orange-50/50 rounded-r-lg">
                        <h4 className="font-bold text-sm uppercase mb-1 text-gray-800">Clear Space</h4>
                        <p className="text-xs text-gray-600">Always maintain at least 20% padding relative to the logo size around the mark to ensure visibility and impact.</p>
                    </div>
                    <div className="p-4 border-l-4 border-[#FDB913] bg-yellow-50/50 rounded-r-lg">
                        <h4 className="font-bold text-sm uppercase mb-1 text-gray-800">Minimum Size</h4>
                        <p className="text-xs text-gray-600">The logo should never be rendered smaller than 32px in height for digital applications to preserve legibility.</p>
                    </div>
                    <div className="p-4 border-l-4 border-[#936FB1] bg-purple-50/50 rounded-r-lg">
                        <h4 className="font-bold text-sm uppercase mb-1 text-gray-800">Usage</h4>
                        <p className="text-xs text-gray-600">Use the multi-colored version on white/light backgrounds. Use the all-white version on dark imagery or solid colors.</p>
                    </div>
                </div>
            </section>

            {/* Colors Section */}
            <section className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-12">
                <h2 className="text-3xl font-lemon text-[#936FB1] mb-8 pb-4 border-b">Color Palette</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {BRAND_COLORS.map((color) => (
                        <div 
                            key={color.name} 
                            className="group cursor-pointer"
                            onClick={() => handleCopyColor(color.hex)}
                        >
                            <div className="h-40 rounded-t-xl w-full transition-transform transform group-hover:-translate-y-1 relative shadow-inner flex items-center justify-center" style={{ backgroundColor: color.hex }}>
                                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-white font-bold flex items-center bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                                        {copiedColor === color.hex ? <Check size={16} className="mr-1"/> : <Copy size={16} className="mr-1"/>}
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
                                    <span className="w-4 h-4 rounded-full border border-gray-200" style={{ backgroundColor: color.hex }}></span>
                                </h3>
                                <div className="space-y-2 text-xs text-gray-500 font-mono bg-gray-50 p-3 rounded border border-gray-100">
                                    <div className="flex justify-between"><span>RGB</span> <span className="text-gray-800 font-semibold">{color.rgb}</span></div>
                                    <div className="flex justify-between"><span>CMYK</span> <span className="text-gray-800 font-semibold">{color.cmyk}</span></div>
                                    <div className="flex justify-between"><span>PMS</span> <span className="text-gray-800 font-semibold">{color.pantone}</span></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Typography Section */}
            <section className="bg-white rounded-xl shadow-lg p-8 md:p-12">
                <h2 className="text-3xl font-lemon text-[#4EB8B9] mb-8 pb-4 border-b">Typography</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Headline Font */}
                    <div>
                        <div className="mb-4">
                            <span className="bg-[#333333] text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">Headlines</span>
                        </div>
                        <h3 className="text-5xl font-lemon text-[#333333] mb-2">Lemon Milk</h3>
                        <p className="text-gray-500 mb-6 text-sm">Used for main titles, navigation, and impactful statements. It captures our youthful and bold spirit. Always uppercase.</p>
                        
                        <div className="bg-gray-100 p-8 rounded-xl font-lemon text-gray-800 break-words tracking-widest leading-relaxed border border-gray-200">
                            ABCDEFGHIJKLM<br/>NOPQRSTUVWXYZ<br/>
                            <span className="text-gray-400">0123456789</span>
                        </div>
                    </div>

                    {/* Body Font */}
                    <div>
                        <div className="mb-4">
                            <span className="bg-[#333333] text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">Body Copy</span>
                        </div>
                        <h3 className="text-5xl font-sans font-bold text-[#333333] mb-2">Montserrat</h3>
                        <p className="text-gray-500 mb-6 text-sm">Used for all body text, subtitles, and UI elements. Geometric, legible, and friendly.</p>
                        
                        <div className="bg-gray-100 p-8 rounded-xl font-sans text-gray-800 break-words leading-relaxed border border-gray-200 space-y-2">
                            <p><span className="font-bold text-[#F47C20]">Bold (700):</span> The quick brown fox jumps over the lazy dog.</p>
                            <p><span className="font-medium text-[#FDB913]">Medium (500):</span> The quick brown fox jumps over the lazy dog.</p>
                            <p><span className="font-light text-[#936FB1]">Light (300):</span> The quick brown fox jumps over the lazy dog.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
  );
};

export const FanArtPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'trending' | 'newest' | 'top'>('trending');

    // Generating some varied aspect ratio placeholder heights for masonry feel
    const heights = ['h-64', 'h-80', 'h-56', 'h-72', 'h-64', 'h-96', 'h-56', 'h-72'];

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
             {/* Header - Standardized Style */}
             <div className="relative py-24 bg-[#936FB1] text-white overflow-hidden">
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
                                <h3 className="text-3xl font-lemon text-[#333333] mb-2 flex items-center">
                                    Community Showcase <Star size={24} className="ml-3 text-[#FDB913] fill-[#FDB913]" />
                                </h3>
                                <p className="text-gray-500">Inspiring artwork shared by YGPT members worldwide.</p>
                            </div>
                            <div className="flex gap-2 mt-4 md:mt-0 bg-white p-1 rounded-full border border-gray-200 shadow-sm">
                                {(['trending', 'newest', 'top'] as const).map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                                            activeTab === tab 
                                            ? 'bg-[#936FB1] text-white shadow' 
                                            : 'text-gray-500 hover:bg-gray-50'
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
                                const colors = ['bg-[#F47C20]', 'bg-[#FDB913]', 'bg-[#936FB1]', 'bg-[#4EB8B9]'];
                                return (
                                <div key={i} className="break-inside-avoid bg-white rounded-2xl shadow-md overflow-hidden group relative hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                    <div className={`w-full relative ${heights[idx % heights.length]} overflow-hidden ${colors[idx % 4]} flex items-center justify-center`}>
                                        <div className="absolute inset-0 bg-black/10 opacity-50"></div>
                                        <ImageIcon size={48} className="text-white opacity-50" />
                                        {/* Overlay Actions */}
                                        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <button className="p-2 bg-white/90 rounded-full shadow-sm hover:bg-white text-gray-600 hover:text-red-500 transition">
                                                <Heart size={16} />
                                            </button>
                                            <button className="p-2 bg-white/90 rounded-full shadow-sm hover:bg-white text-gray-600 hover:text-[#936FB1] transition">
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
                            )})}
                        </div>
                        
                        <div className="mt-16 text-center">
                            <button className="group border-2 border-[#936FB1] text-[#936FB1] px-10 py-3 rounded-full font-bold hover:bg-[#936FB1] hover:text-white transition uppercase tracking-wide text-sm flex items-center mx-auto">
                                Load More Artworks <ChevronDown size={16} className="ml-2 group-hover:translate-y-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const ImpactPage: React.FC = () => {
    const [selectedStatIndex, setSelectedStatIndex] = useState<number | null>(null);
    
    const getImpactIcon = (iconName: string) => {
        switch(iconName) {
            case 'Users': return <Users size={40} className="stroke-[1.5]" />;
            case 'Building': return <Building size={40} className="stroke-[1.5]" />;
            case 'HeartHandshake': return <HeartHandshake size={40} className="stroke-[1.5]" />;
            case 'Smile': return <Smile size={40} className="stroke-[1.5]" />;
            case 'Utensils': return <Utensils size={40} className="stroke-[1.5]" />;
            case 'Globe': return <Globe size={40} className="stroke-[1.5]" />;
            default: return <Star size={40} className="stroke-[1.5]" />;
        }
    };

    const getImpactColor = (idx: number) => {
        const colors = ['#F47C20', '#FDB913', '#936FB1', '#00A651', '#4EB8B9', '#2563EB'];
        return colors[idx % colors.length];
    }
    
    const getImpactBgColor = (idx: number) => {
        const colors = ['bg-orange-100', 'bg-yellow-100', 'bg-purple-100', 'bg-green-100', 'bg-teal-100', 'bg-blue-100'];
        return colors[idx % colors.length];
    }

    // Chart Configuration specific to each stat index
    const CHART_CONFIG = [
        {
            title: "Youth Seminar Attendance",
            desc: "Year-over-year growth in seminar participation.",
            data: [
                { name: '2020', value: 1200 },
                { name: '2021', value: 2500 },
                { name: '2022', value: 4500 },
                { name: '2023', value: 6000 },
                { name: '2024', value: 8000 },
            ],
            type: 'bar'
        },
        {
            title: "Partner Institutes Growth",
            desc: "Accumulative number of educational institutes reached.",
            data: [
                { name: '2020', value: 5 },
                { name: '2021', value: 15 },
                { name: '2022', value: 25 },
                { name: '2023', value: 32 },
                { name: '2024', value: 40 },
            ],
            type: 'area'
        },
        {
            title: "Sanitary Pads Distributed",
            desc: "Empowering women with hygiene essentials annually.",
            data: [
                { name: '2020', value: 2000 },
                { name: '2021', value: 5000 },
                { name: '2022', value: 9000 },
                { name: '2023', value: 12500 },
                { name: '2024', value: 16000 },
            ],
            type: 'area'
        },
        {
            title: "Cumulative Lives Impacted",
            desc: "Total number of lives touched through all our programs.",
            data: [
                { name: '2020', value: 15000 },
                { name: '2021', value: 35000 },
                { name: '2022', value: 60000 },
                { name: '2023', value: 85000 },
                { name: '2024', value: 100000 },
            ],
            type: 'area'
        },
        {
            title: "Families Supported (Food Banks)",
            desc: "Number of families provided with food rations.",
            data: [
                { name: '2020', value: 80 },
                { name: '2021', value: 95 },
                { name: '2022', value: 110 },
                { name: '2023', value: 125 },
                { name: '2024', value: 140 },
            ],
            type: 'bar'
        },
        {
            title: "Environmental Projects Breakdown",
            desc: "Distribution of Earth-focused initiatives.",
            data: [
                { name: 'Tree Plantation', value: 55 },
                { name: 'Clean-ups', value: 30 },
                { name: 'Awareness', value: 15 },
            ],
            type: 'pie'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
             
             {/* Hero Section */}
             <div className="bg-[#00A651] py-20 text-center relative overflow-hidden">
                 <div className="absolute inset-0 bg-black/10"></div>
                 <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-4xl md:text-5xl font-lemon text-white mb-4 drop-shadow-md">Our Impact</h1>
                    <p className="text-xl text-white/90 font-light max-w-2xl mx-auto">
                        Measuring the ripples of peace we create together. Click on the statistics below to see the detailed growth and reports.
                    </p>
                 </div>
             </div>

             <div className="container mx-auto px-4 -mt-10 relative z-20">
                 
                 {/* Top Stats Grid */}
                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                    {IMPACT_STATS.map((stat, idx) => {
                        const isSelected = selectedStatIndex === idx;
                        const color = getImpactColor(idx);
                        
                        return (
                            <div 
                                key={idx} 
                                onClick={() => setSelectedStatIndex(isSelected ? null : idx)}
                                className={`bg-white rounded-2xl p-6 shadow-xl flex flex-col items-center text-center cursor-pointer transition-all duration-300 transform ${
                                    isSelected 
                                    ? 'ring-4 ring-offset-2 scale-105' 
                                    : 'hover:-translate-y-1 hover:shadow-2xl'
                                }`}
                                style={{ borderColor: isSelected ? color : 'transparent' }}
                            >
                                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-colors ${getImpactBgColor(idx)}`} style={{ color: color }}>
                                    {getImpactIcon(stat.icon)}
                                </div>
                                <h3 className="text-3xl font-lemon mb-2" style={{ color: color }}>{stat.value}</h3>
                                <p className="text-xs font-bold text-gray-500 uppercase leading-tight">{stat.label}</p>
                                <div className={`mt-4 transition-transform duration-300 ${isSelected ? 'rotate-180' : ''}`}>
                                    <ChevronDown size={20} className="text-gray-300" />
                                </div>
                            </div>
                        );
                    })}
                 </div>

                 {/* Collapsible Chart Section */}
                 <div className={`transition-all duration-700 ease-in-out overflow-hidden ${selectedStatIndex !== null ? 'max-h-[800px] opacity-100 mb-20' : 'max-h-0 opacity-0 mb-0'}`}>
                    {selectedStatIndex !== null && (
                        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 relative">
                             <button 
                                onClick={() => setSelectedStatIndex(null)}
                                className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition text-gray-400 hover:text-gray-600"
                             >
                                 <ChevronUp size={24} />
                             </button>

                             <div className="mb-8">
                                <h3 className="text-3xl font-lemon mb-2" style={{ color: getImpactColor(selectedStatIndex) }}>
                                    {CHART_CONFIG[selectedStatIndex].title}
                                </h3>
                                <p className="text-gray-500 text-lg">
                                    {CHART_CONFIG[selectedStatIndex].desc}
                                </p>
                             </div>

                             <div className="h-[400px] w-full bg-gray-50 rounded-2xl p-4 border border-gray-100">
                                <ResponsiveContainer width="100%" height="100%">
                                    {CHART_CONFIG[selectedStatIndex].type === 'bar' ? (
                                        <BarChart data={CHART_CONFIG[selectedStatIndex].data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                            <YAxis axisLine={false} tickLine={false} />
                                            <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}} />
                                            <Bar dataKey="value" fill={getImpactColor(selectedStatIndex)} radius={[8, 8, 0, 0]} barSize={60} />
                                        </BarChart>
                                    ) : CHART_CONFIG[selectedStatIndex].type === 'pie' ? (
                                        <PieChart>
                                            <Pie
                                                data={CHART_CONFIG[selectedStatIndex].data}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={100}
                                                outerRadius={140}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {CHART_CONFIG[selectedStatIndex].data.map((entry: any, index: number) => (
                                                    <Cell key={`cell-${index}`} fill={[ '#4EB8B9', '#00A651', '#FDB913', '#F47C20'][index % 4]} />
                                                ))}
                                            </Pie>
                                            <Tooltip contentStyle={{borderRadius: '12px', border: 'none'}} />
                                        </PieChart>
                                    ) : (
                                        <AreaChart data={CHART_CONFIG[selectedStatIndex].data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                            <defs>
                                                <linearGradient id={`colorGradient-${selectedStatIndex}`} x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor={getImpactColor(selectedStatIndex)} stopOpacity={0.8}/>
                                                    <stop offset="95%" stopColor={getImpactColor(selectedStatIndex)} stopOpacity={0}/>
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                            <YAxis axisLine={false} tickLine={false} />
                                            <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}} />
                                            <Area 
                                                type="monotone" 
                                                dataKey="value" 
                                                stroke={getImpactColor(selectedStatIndex)} 
                                                fillOpacity={1} 
                                                fill={`url(#colorGradient-${selectedStatIndex})`} 
                                                strokeWidth={3}
                                            />
                                        </AreaChart>
                                    )}
                                </ResponsiveContainer>
                             </div>
                             
                             {/* Optional: Add a simple key/legend if Pie chart for better UX */}
                             {CHART_CONFIG[selectedStatIndex].type === 'pie' && (
                                 <div className="flex justify-center gap-6 mt-6">
                                     {CHART_CONFIG[selectedStatIndex].data.map((entry: any, index: number) => (
                                         <div key={index} className="flex items-center">
                                             <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: [ '#4EB8B9', '#00A651', '#FDB913', '#F47C20'][index % 4] }}></div>
                                             <span className="text-sm font-bold text-gray-600">{entry.name}</span>
                                         </div>
                                     ))}
                                 </div>
                             )}
                        </div>
                    )}
                 </div>

                 {/* Detailed Sections */}
                 <div className="space-y-24">
                     
                     {/* Menstrual Hygiene */}
                     <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2 relative group">
                            <div className="absolute inset-0 bg-[#F47C20] rounded-3xl transform translate-x-3 translate-y-3 transition group-hover:translate-x-2 group-hover:translate-y-2"></div>
                            <div className="relative rounded-3xl shadow-lg w-full z-10 bg-orange-100 h-64 flex items-center justify-center">
                                <HeartHandshake size={80} className="text-[#F47C20]" />
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <h2 className="text-3xl font-lemon text-[#F47C20] mb-6">Menstrual Hygiene – Taboo to Triumph!</h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                YGPT Team is a proponent of sound health and wellbeing. Our campaign to promote menstrual hygiene awareness has reached <strong>16,000+ underprivileged women</strong> across India who have received free sanitary pads since 2020.
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                This is an all year-round campaign empowering women with the knowledge for sound menstrual hygiene. YGPT has also supported in setting up a menstrual pad manufacturing unit in a remote village, Jambrung in Karjat, Maharashtra for the wellbeing of rural women.
                            </p>
                        </div>
                     </div>

                     {/* Green Initiatives */}
                     <div className="flex flex-col md:flex-row-reverse items-center gap-12">
                        <div className="md:w-1/2 relative group">
                            <div className="absolute inset-0 bg-[#FDB913] rounded-3xl transform -translate-x-3 translate-y-3 transition group-hover:-translate-x-2 group-hover:translate-y-2"></div>
                            <div className="relative rounded-3xl shadow-lg w-full z-10 bg-yellow-100 h-64 flex items-center justify-center">
                                <Building size={80} className="text-[#FDB913]" />
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <h2 className="text-3xl font-lemon text-[#FDB913] mb-6">Green Initiatives</h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                Team YGPT has collaborated with the Earth Embrace initiative, the Green initiative of the parent organization MaitriBodh Parivaar. The aim is to plant the seeds of environmental awareness amongst youth and grow the next generation of Green Earth champions.
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2">
                                <li>Tree plantation drives reversing Global Boiling</li>
                                <li>Clean-up drives in cities and beaches</li>
                                <li>Adoption of dilapidated green zones</li>
                                <li>Valuing Mother Earth seminars</li>
                            </ul>
                        </div>
                     </div>

                     {/* Food Donation */}
                     <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2 relative group">
                            <div className="absolute inset-0 bg-[#F47C20] rounded-3xl transform translate-x-3 translate-y-3 transition group-hover:translate-x-2 group-hover:translate-y-2"></div>
                            <div className="relative rounded-3xl shadow-lg w-full z-10 bg-orange-100 h-64 flex items-center justify-center">
                                <Utensils size={80} className="text-[#F47C20]" />
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <h2 className="text-3xl font-lemon text-[#F47C20] mb-6">Food Donation Drives</h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                YGPT has been carrying out food donation drives since its inception. Noteworthy amongst them is the massive drive carried out during Covid-19 lockdown period. Donning their good Samaritan hats, YGPT warriors fearlessly & selflessly served the needy.
                            </p>
                             <div className="bg-orange-50 p-6 rounded-xl border-l-4 border-[#F47C20]">
                                <p className="font-bold text-gray-800 text-lg mb-2">Impact Highlight:</p>
                                <p className="text-gray-700">More than 21,000 families in cities such as Amritsar, Mumbai, Pune, Delhi etc. were given ration enough to last for 21 days during the pandemic.</p>
                             </div>
                        </div>
                     </div>

                     {/* Youth Seminars */}
                     <div className="flex flex-col md:flex-row-reverse items-center gap-12">
                        <div className="md:w-1/2 relative group">
                            <div className="absolute inset-0 bg-[#FDB913] rounded-3xl transform -translate-x-3 translate-y-3 transition group-hover:-translate-x-2 group-hover:translate-y-2"></div>
                            <div className="relative rounded-3xl shadow-lg w-full z-10 bg-yellow-100 h-64 flex items-center justify-center">
                                <Users size={80} className="text-[#FDB913]" />
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <h2 className="text-3xl font-lemon text-[#FDB913] mb-6">Youth Transformational Seminars</h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                Youth and Transformation is at the heart of YGPT. Through our FREE seminars and workshops followed by handholding and guidance, we help the youth to grow as individuals holistically.
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                We frequently carry out seminars in several major universities such as Mumbai University, Lucknow University, Banaras Hindu University (BHU), Jawaharlal Nehru University (JNU), Government Medical College – Amritsar, VIIT – Pune, etc. More than <strong>8000 students</strong> have participated in these seminars and are experiencing transformation in their lives.
                            </p>
                        </div>
                     </div>

                     {/* International Peace Day */}
                     <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2 relative group">
                            <div className="absolute inset-0 bg-[#F47C20] rounded-3xl transform translate-x-3 translate-y-3 transition group-hover:translate-x-2 group-hover:translate-y-2"></div>
                            <div className="relative rounded-3xl shadow-lg w-full z-10 bg-orange-100 h-64 flex items-center justify-center">
                                <Globe size={80} className="text-[#F47C20]" />
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <h2 className="text-3xl font-lemon text-[#F47C20] mb-6">International Peace Day - #IamPEACE</h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                YGPT in collaboration with the global organization – International Spiritual Council of Transforming Humanity (ISCTH) celebrated International Peace Day on 21st September 2024.
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                This event themed #IamPEACE intended to bring together individuals, leaders, institutions and communities to reflect on the importance of peace in today's world. A great initiative that created a movement for Global Peace in various cities across India and internationally in Europe (Switzerland, Austria, Italy) having <strong>3000+ people</strong> to join.
                            </p>
                        </div>
                     </div>
                     
                     {/* Chinta Mukt Bharat */}
                     <div className="bg-[#312783] rounded-3xl p-10 md:p-16 text-white text-center shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                        
                        <div className="relative z-10 max-w-4xl mx-auto">
                            <h2 className="text-3xl md:text-5xl font-lemon mb-8 text-[#FDB913]">Support To Chinta Mukt Bharat 2032</h2>
                            <p className="text-lg md:text-xl leading-relaxed mb-8 opacity-90">
                                We are enabling youth to explore their passion, goals & dreams through transformational seminars and social activities for humanity. We provide a safe space for youth to transform into their natural self, accepting them without judgement and bringing out their best qualities.
                            </p>
                            <p className="text-lg md:text-xl leading-relaxed font-bold">
                                We are helping them to free themselves internally of blocks and biases accumulated from societal pressure which is the first step towards a stress-free state & the wider vision of <span className="text-[#FDB913] underline decoration-[#FDB913]">Chinta Mukt Bharat 2032</span>.
                            </p>
                        </div>
                     </div>

                 </div>
             </div>
        </div>
    )
}
