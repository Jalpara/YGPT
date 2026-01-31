
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, BookOpen, Globe, MapPin, Calendar, Search, Filter, X, Heart, Star, Facebook, Instagram, Twitter, Youtube, Mail, PlayCircle, Leaf, Building, HeartHandshake, Smile, Utensils, TrendingUp, Clock } from 'lucide-react';
import { SPOTLIGHT_CLUB, TESTIMONIALS, FEATURED_ITEMS, IMPACT_STATS } from '../constants';
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip, YAxis, CartesianGrid } from 'recharts';
import Logo from '../components/Logo';

// Local data for the interactive impact chart
const IMPACT_CHART_DATA: any = {
    lives: [
        { year: '2020', value: 10000 },
        { year: '2021', value: 25000 },
        { year: '2022', value: 50000 },
        { year: '2023', value: 75000 },
        { year: '2024', value: 100000 },
    ],
    clubs: [
        { year: '2020', value: 5 },
        { year: '2021', value: 25 },
        { year: '2022', value: 60 },
        { year: '2023', value: 95 },
        { year: '2024', value: 120 },
    ],
    trees: [
        { year: '2020', value: 5000 },
        { year: '2021', value: 25000 },
        { year: '2022', value: 150000 },
        { year: '2023', value: 350000 },
        { year: '2024', value: 500000 },
    ],
    pads: [
        { year: '2020', value: 2000 },
        { year: '2021', value: 5000 },
        { year: '2022', value: 9000 },
        { year: '2023', value: 12000 },
        { year: '2024', value: 16000 },
    ]
};

const Home: React.FC = () => {
  const [isClubModalOpen, setIsClubModalOpen] = useState(false);
  const [isClubModalVisible, setIsClubModalVisible] = useState(false);
  const [clubSearch, setClubSearch] = useState('');
  
  // State for the interactive chart
  const [impactTabNew, setImpactTabNew] = useState<'lives' | 'clubs' | 'trees' | 'pads'>('lives');

  // Config for chart section
  const activeChartDataNew = IMPACT_CHART_DATA[impactTabNew];
  let activeColorNew = '#F47C20';
  if (impactTabNew === 'clubs') activeColorNew = '#FDB913';
  if (impactTabNew === 'trees') activeColorNew = '#00A651';
  if (impactTabNew === 'pads') activeColorNew = '#936FB1';

  // Smooth modal closing logic
  const handleOpenModal = () => {
      setIsClubModalOpen(true);
      // Small timeout to allow render before adding opacity class
      setTimeout(() => setIsClubModalVisible(true), 10);
  };

  const handleCloseModal = () => {
      setIsClubModalVisible(false);
      // Wait for transition to finish before unmounting
      setTimeout(() => setIsClubModalOpen(false), 300);
  };

  const getImpactIconWithBg = (iconName: string, color: string) => {
      switch(iconName) {
          case 'Users': return <Users size={28} style={{color}} />;
          case 'Building': return <Building size={28} style={{color}} />;
          case 'HeartHandshake': return <HeartHandshake size={28} style={{color}} />;
          case 'Smile': return <Smile size={28} style={{color}} />;
          case 'Utensils': return <Utensils size={28} style={{color}} />;
          case 'Globe': return <Globe size={28} style={{color}} />;
          default: return <Star size={28} style={{color}} />;
      }
  }

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Hero Section (Vibrant & Professional) */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-white py-20">
        
        {/* Soft Background Elements */}
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#4EB8B9]/30 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
        <div className="absolute top-[10%] right-[-5%] w-[600px] h-[600px] bg-[#F47C20]/30 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-[30%] w-[600px] h-[600px] bg-[#FDB913]/30 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-4000"></div>
        
        {/* Subtle Pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] z-0"></div>

        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm animate-fade-in-down cursor-default">
              <span className="text-xs font-bold tracking-[0.15em] text-gray-500 uppercase">Youth for Peace. Youth for Change.</span>
          </div>

          {/* Heading - With Brand Colors */}
          <h1 className="font-lemon text-4xl sm:text-5xl md:text-6xl text-[#333] mb-8 leading-tight tracking-wide drop-shadow-sm">
            <span className="text-[#F47C20]">Youth</span> For <span className="text-[#fdb914]">Global</span> <span className="text-[#936FB1]">Peace</span> <br className="hidden md:block"/> and <span className="text-[#4EB8B9]">Transformation</span>
          </h1>
          
          {/* Subheading - Readable & Balanced */}
          <p className="text-gray-600 text-lg md:text-xl font-medium mb-12 max-w-3xl mx-auto leading-relaxed">
            Empowering the next generation to create a better world through self-discovery, community service, and holistic growth.
          </p>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link to="/get-involved" className="bg-[#F47C20] text-white px-8 py-3.5 rounded-full font-bold hover:bg-orange-600 transition shadow-lg hover:shadow-orange-200 hover:-translate-y-0.5 text-sm uppercase tracking-wider transform duration-200 min-w-[160px]">
              Get Involved
            </Link>
            <Link to="/impact" className="group bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-600 px-8 py-3.5 rounded-full font-bold hover:border-[#4EB8B9] hover:text-[#4EB8B9] transition text-sm uppercase tracking-wider transform duration-200 min-w-[160px] flex items-center justify-center">
              Our Impact <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Meet My Maitreya Section - Modified */}
      <section className="py-16 bg-white -mt-10 relative z-30">
        <div className="container mx-auto px-4">
            <div className="rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#001D4A] to-[#2563EB] relative transform hover:-translate-y-1 transition duration-500">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FDB913]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                <div className="flex flex-col items-center relative z-10 text-center p-12 md:p-20">
                    <div className="mb-6">
                        <span className="text-[#FDB913] font-lemon tracking-widest text-sm uppercase mb-2 block border border-[#FDB913] rounded-full px-4 py-1 inline-block">The Source of Inspiration</span>
                    </div>
                    
                    <h2 className="font-lemon text-4xl md:text-6xl text-[#FDB913] mb-8 leading-tight drop-shadow-lg">
                        Meet My Maitreya
                    </h2>
                    
                    <p className="text-lg md:text-xl text-blue-50 mb-10 leading-relaxed max-w-3xl mx-auto">
                        A profound annual event held every August where seekers from around the globe gather to experience the transformative presence of Maitreya Dadashreeji.
                    </p>
                    
                    <p className="text-blue-200 mb-10 italic text-2xl font-serif">
                        "Come, experience the source of limitless love."
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/meet-my-maitreya" className="bg-[#FDB913] text-[#001D4A] px-10 py-4 rounded-full font-bold hover:bg-yellow-400 transition shadow-lg flex items-center justify-center transform hover:scale-105 duration-200">
                            View Event Details <ArrowRight size={18} className="ml-2" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* 3. Founder Quote */}
      <section className="py-20 bg-[#936FB1] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
            <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-8 flex items-center justify-center">
                 <span className="font-serif text-4xl italic">M</span>
            </div>
            <blockquote className="font-serif italic text-3xl md:text-4xl leading-relaxed max-w-4xl mx-auto mb-8 text-white/90">
                "Love is the only way to transform yourself and the world around you. Be the source of love."
            </blockquote>
            <p className="font-lemon text-[#FDB913] text-xl mb-8">Maitreya Dadashreeji</p>
            <p className="text-sm opacity-80 uppercase tracking-widest mb-10">Founder & Visionary</p>
            <Link to="/founder" className="inline-block border border-white/40 hover:bg-white hover:text-[#936FB1] text-white px-8 py-2 rounded-full transition text-sm font-bold transform hover:scale-105 duration-200">
                Read Biography
            </Link>
        </div>
      </section>

      {/* 4. About YGPT (Updated per request) */}
      <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center gap-16 max-w-6xl mx-auto">
                  
                  {/* Left: Logo/Visual Representation */}
                  <div className="md:w-5/12 flex justify-center relative">
                       <div className="relative w-full max-w-md aspect-[4/3] bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center p-8">
                           {/* Using Logo Component */}
                           <div className="relative w-full h-full flex items-center justify-center">
                                {/* Removed animate-pulse from here as requested */}
                                <div className="absolute inset-0 bg-orange-400 rounded-full opacity-10"></div>
                                <Logo stacked={true} className="scale-125" />
                           </div>
                       </div>
                  </div>

                  {/* Right: Content */}
                  <div className="md:w-7/12">
                      <h2 className="font-lemon text-3xl md:text-4xl text-[#333333] mb-6 uppercase tracking-wide">Youth Transformation</h2>
                      
                      <div className="space-y-6 text-gray-600 leading-relaxed text-base md:text-lg">
                          <p>
                              Founded by Global Humanitarian and Transformation Pioneer, <strong>Maitreya Dadashreeji</strong>, YGPT is a youth-led initiative with a powerful vision: to empower, engage, and transform youth as catalysts for a positive global change.
                          </p>
                          <p>
                              YGPT has been a vibrant community of like-minded youth - students, professionals from various backgrounds united by a shared commitment to Humanity, Peace, and Mother Earth.
                          </p>
                      </div>
                      
                      <div className="mt-8">
                          <p className="font-bold text-[#333333] mb-2">We operate through 3 verticals:</p>
                          <ul className="text-gray-600 space-y-1 mb-8">
                              <li className="flex items-center"><span className="w-2 h-2 bg-[#F47C20] rounded-full mr-2"></span> Share Some Love</li>
                              <li className="flex items-center"><span className="w-2 h-2 bg-[#FDB913] rounded-full mr-2"></span> Youth Development</li>
                              <li className="flex items-center"><span className="w-2 h-2 bg-[#00A651] rounded-full mr-2"></span> Earth Embrace</li>
                          </ul>
                          
                          <div className="flex flex-wrap gap-4">
                            <Link to="/about" className="inline-block border-2 border-[#F47C20] text-[#F47C20] px-8 py-3 rounded-full font-bold hover:bg-[#F47C20] hover:text-white transition uppercase tracking-wider text-sm">
                                Read More
                            </Link>
                            {/* Changed button color to solid purple as requested */}
                            <Link to="/new" className="inline-flex items-center bg-[#936FB1] text-white border-2 border-[#936FB1] px-6 py-3 rounded-full font-bold hover:bg-[#7a5c93] hover:border-[#7a5c93] transition uppercase tracking-wider text-sm group shadow-md transform hover:-translate-y-0.5">
                                <Clock size={18} className="mr-2 group-hover:animate-spin-slow" /> New here? 60s Intro
                            </Link>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* 4.5 Our Verticals (Tabular Blocks) */}
      <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                  <h2 className="font-lemon text-3xl md:text-4xl text-[#333333]">Our Verticals</h2>
                  <p className="text-gray-500 mt-2">The three pillars of our mission to transform the world.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  
                  {/* Card 1: Share Some Love */}
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 flex flex-col">
                      <div className="h-3 bg-[#F47C20]"></div>
                      <div className="p-8 flex-1 flex flex-col items-center text-center">
                          <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mb-6 text-[#F47C20]">
                              <Heart size={40} fill="currentColor" />
                          </div>
                          <h3 className="font-lemon text-2xl text-[#333333] mb-4">Share Some Love</h3>
                          <p className="text-gray-600 mb-8 flex-1">
                              Spreading kindness and compassion through food drives, clothing donation, and humanitarian aid for the underprivileged.
                          </p>
                          <Link to="/share-some-love" className="text-[#F47C20] font-bold uppercase text-sm tracking-wider hover:underline flex items-center">
                              Learn More <ArrowRight size={16} className="ml-2" />
                          </Link>
                      </div>
                  </div>

                  {/* Card 2: Youth Development */}
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 flex flex-col">
                      <div className="h-3 bg-[#FDB913]"></div>
                      <div className="p-8 flex-1 flex flex-col items-center text-center">
                          <div className="w-20 h-20 bg-yellow-50 rounded-full flex items-center justify-center mb-6 text-[#FDB913]">
                              <Users size={40} />
                          </div>
                          <h3 className="font-lemon text-2xl text-[#333333] mb-4">Youth Development</h3>
                          <p className="text-gray-600 mb-8 flex-1">
                              Empowering future leaders through transformational seminars, leadership workshops, and mental wellness programs.
                          </p>
                          <Link to="/youth-development" className="text-[#FDB913] font-bold uppercase text-sm tracking-wider hover:underline flex items-center">
                              Learn More <ArrowRight size={16} className="ml-2" />
                          </Link>
                      </div>
                  </div>

                  {/* Card 3: Earth Embrace */}
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 flex flex-col">
                      <div className="h-3 bg-[#00A651]"></div>
                      <div className="p-8 flex-1 flex flex-col items-center text-center">
                          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 text-[#00A651]">
                              <Leaf size={40} />
                          </div>
                          <h3 className="font-lemon text-2xl text-[#333333] mb-4">Earth Embrace</h3>
                          <p className="text-gray-600 mb-8 flex-1">
                              Restoring our planet through large-scale tree plantations, beach clean-ups, and sustainable living initiatives.
                          </p>
                          <Link to="/earth-embrace" className="text-[#00A651] font-bold uppercase text-sm tracking-wider hover:underline flex items-center">
                              Learn More <ArrowRight size={16} className="ml-2" />
                          </Link>
                      </div>
                  </div>

              </div>
          </div>
      </section>

      {/* 5. Statistics / Impact (Redesigned Version) */}
      <section className="py-24 bg-gray-50 relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#F47C20] via-[#FDB913] to-[#00A651]"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-50 rounded-full blur-3xl opacity-60"></div>
            <div className="absolute top-1/2 left-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl opacity-60"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row gap-12 items-stretch">
                
                {/* Left: Metrics Grid */}
                <div className="lg:w-1/3 flex flex-col gap-6">
                    <div className="mb-4">
                        <span className="text-[#F47C20] font-bold text-sm uppercase tracking-widest mb-2 block">Real Time Impact</span>
                        <h2 className="text-4xl font-lemon text-gray-800 leading-tight">
                            Making A <br/>Difference
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 flex-1">
                        {IMPACT_STATS.slice(0, 4).map((stat, idx) => {
                             const colors = ['#F47C20', '#FDB913', '#936FB1', '#00A651'];
                             const bgColors = ['bg-orange-50', 'bg-yellow-50', 'bg-purple-50', 'bg-green-50'];
                             const color = colors[idx % 4];
                             const bg = bgColors[idx % 4];
                             
                             return (
                                <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mr-5 ${bg}`}>
                                        {getImpactIconWithBg(stat.icon, color)}
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-bold text-gray-800">{stat.value}</h4>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">{stat.label}</p>
                                    </div>
                                </div>
                             )
                        })}
                    </div>

                    {/* Report Button */}
                    <Link to="/impact" className="mt-2 bg-[#333] text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-black transition-all transform hover:-translate-y-1 flex items-center justify-center text-center">
                        Explore Detailed Impact Report <ArrowRight size={18} className="ml-2" />
                    </Link>
                </div>

                {/* Right: Main Chart Card */}
                <div className="lg:w-2/3 bg-white rounded-3xl shadow-xl border border-gray-100 p-8 flex flex-col">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-6">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                                <TrendingUp className="mr-3 text-gray-400" /> Yearly Growth
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">Tracking our reach and initiatives since inception.</p>
                        </div>
                        
                        <div className="bg-gray-100 p-1.5 rounded-xl flex flex-wrap justify-center gap-1">
                            {[
                                { id: 'lives', label: 'Lives', color: 'bg-[#F47C20]', text: 'text-[#F47C20]' },
                                { id: 'clubs', label: 'Clubs', color: 'bg-[#FDB913]', text: 'text-[#FDB913]' },
                                { id: 'trees', label: 'Trees', color: 'bg-[#00A651]', text: 'text-[#00A651]' },
                                { id: 'pads', label: 'Sanitary', color: 'bg-[#936FB1]', text: 'text-[#936FB1]' },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setImpactTabNew(tab.id as any)}
                                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all duration-300 ${
                                        impactTabNew === tab.id 
                                        ? `${tab.color} text-white shadow-md` 
                                        : 'text-gray-500 hover:bg-gray-200'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 w-full h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={activeChartDataNew} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorGradientNew" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={activeColorNew} stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor={activeColorNew} stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis 
                                    dataKey="year" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{fill: '#9ca3af', fontSize: 12, fontWeight: 600, dy: 10}} 
                                />
                                <YAxis 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{fill: '#9ca3af', fontSize: 12, fontWeight: 600, dx: -10}} 
                                />
                                <Tooltip 
                                    contentStyle={{ 
                                        borderRadius: '16px', 
                                        border: 'none', 
                                        boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.15)',
                                        padding: '12px'
                                    }}
                                    itemStyle={{ color: activeColorNew, fontWeight: 'bold' }}
                                    cursor={{ stroke: activeColorNew, strokeWidth: 2, strokeDasharray: '5 5' }}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="value" 
                                    stroke={activeColorNew} 
                                    strokeWidth={4}
                                    fillOpacity={1} 
                                    fill="url(#colorGradientNew)" 
                                    animationDuration={1500}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* 6. Clubs & Modal */}
      <section className="py-20 bg-[#FDB913] relative overflow-hidden">
          <div className="container mx-auto px-4 text-center relative z-10">
              <h2 className="font-lemon text-4xl text-[#333333] mb-6">Find Your Tribe</h2>
              <p className="text-[#333333]/80 text-lg max-w-2xl mx-auto mb-10 font-medium">
                  YGPT Clubs are safe spaces in universities and cities where youth gather to meditate, discuss big ideas, and plan social projects.
              </p>
              <button 
                onClick={handleOpenModal}
                className="bg-white text-[#FDB913] px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:bg-gray-50 transition transform hover:-translate-y-1 hover:scale-105 duration-200"
              >
                  Find Nearest Club
              </button>
          </div>
      </section>

      {/* Club Modal Overlay - Smooth Transition */}
      {isClubModalOpen && (
          <div 
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isClubModalVisible ? 'opacity-100' : 'opacity-0'}`}
          >
              <div 
                className={`bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative transition-all duration-300 transform ${isClubModalVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}
              >
                  <button 
                    onClick={handleCloseModal}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition"
                  >
                      <X size={24} />
                  </button>
                  <div className="p-8">
                      <h3 className="font-lemon text-2xl text-[#333333] mb-2">Locate a Chapter</h3>
                      <p className="text-gray-500 mb-6">Enter your city or university to connect.</p>
                      
                      <div className="relative mb-6">
                          <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
                          <input 
                            type="text" 
                            placeholder="e.g., London, Harvard, Mumbai..." 
                            value={clubSearch}
                            onChange={(e) => setClubSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FDB913] outline-none transition"
                          />
                      </div>

                      <div className="space-y-3">
                          <p className="text-xs font-bold text-gray-400 uppercase">Popular Locations</p>
                          {['New York City', 'Berlin', 'Mumbai'].map(city => (
                              <div key={city} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer border border-transparent hover:border-gray-100 transition duration-200">
                                  <div className="flex items-center">
                                      <MapPin size={16} className="text-[#F47C20] mr-2" />
                                      <span className="font-medium text-gray-700">{city}</span>
                                  </div>
                                  <ArrowRight size={16} className="text-gray-400" />
                              </div>
                          ))}
                      </div>

                      <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                          <Link to="/clubs" onClick={handleCloseModal} className="text-[#936FB1] font-bold text-sm hover:underline">
                              View All Chapters
                          </Link>
                      </div>
                  </div>
              </div>
          </div>
      )}

      {/* 7. Transform (LMS) Preview */}
      <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                  <div>
                      <h2 className="font-lemon text-3xl text-[#936FB1] mb-2">Transform Yourself</h2>
                      <p className="text-gray-600">Free courses designed for your personal evolution.</p>
                  </div>
                  <Link to="/transform" className="hidden md:block bg-[#936FB1] text-white px-6 py-2 rounded-lg font-bold hover:bg-purple-700 transition transform hover:scale-105 duration-200">
                      Access LMS
                  </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                      { title: "The Art of Stillness", time: "4 Weeks", level: "Beginner", color: "bg-purple-100" },
                      { title: "Conscious Leadership", time: "6 Weeks", level: "Intermediate", color: "bg-blue-100" },
                      { title: "Emotional Intelligence", time: "3 Weeks", level: "All Levels", color: "bg-orange-100" }
                  ].map((course, idx) => (
                      <div key={idx} className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl transition shadow-sm group">
                          {/* Replaced Image with Colored Div */}
                          <div className={`h-40 ${course.color} flex items-center justify-center transition duration-500 group-hover:scale-105`}>
                              <Users size={48} className="text-gray-400 opacity-50" />
                          </div>
                          <div className="p-6">
                              <div className="flex justify-between text-xs font-bold text-gray-400 uppercase mb-2">
                                  <span>{course.time}</span>
                                  <span>{course.level}</span>
                              </div>
                              <h3 className="font-bold text-lg text-[#333333] mb-4">{course.title}</h3>
                              <div className="w-full bg-gray-100 rounded-full h-1.5 mb-4">
                                  <div className="bg-[#936FB1] h-1.5 rounded-full" style={{ width: '0%' }}></div>
                              </div>
                              <span className="text-[#936FB1] font-bold text-sm cursor-pointer hover:underline">Start Learning</span>
                          </div>
                      </div>
                  ))}
              </div>
              <div className="mt-8 text-center md:hidden">
                  <Link to="/transform" className="bg-[#936FB1] text-white px-6 py-3 rounded-lg font-bold w-full block">Access LMS</Link>
              </div>
          </div>
      </section>

      {/* 8. Testimonials */}
      <section className="py-20 bg-[#333333] text-white">
          <div className="container mx-auto px-4">
              <h2 className="font-lemon text-3xl text-center text-[#F47C20] mb-16">Voices of YGPT</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {TESTIMONIALS.map((t, idx) => {
                      const colors = ['bg-[#F47C20]', 'bg-[#FDB913]', 'bg-[#4EB8B9]'];
                      const bgColor = colors[idx % 3];
                      return (
                      <div key={t.id} className="bg-[#444] p-8 rounded-2xl relative transition hover:-translate-y-1 hover:shadow-lg">
                          <div className="absolute -top-6 left-8">
                              {/* Replaced Avatar Image with Initials */}
                              <div className={`w-12 h-12 rounded-full border-2 border-white flex items-center justify-center font-bold text-white text-sm ${bgColor}`}>
                                  {getInitials(t.name)}
                              </div>
                          </div>
                          <div className="mb-4 text-[#FDB913]">
                              <Star size={16} fill="currentColor" className="inline mr-1" />
                              <Star size={16} fill="currentColor" className="inline mr-1" />
                              <Star size={16} fill="currentColor" className="inline mr-1" />
                              <Star size={16} fill="currentColor" className="inline mr-1" />
                              <Star size={16} fill="currentColor" className="inline mr-1" />
                          </div>
                          <p className="text-gray-300 italic mb-6 leading-relaxed">"{t.quote}"</p>
                          <div>
                              <h4 className="font-bold text-white">{t.name}</h4>
                              <p className="text-xs text-gray-400 uppercase tracking-wider">{t.role}</p>
                          </div>
                      </div>
                      )
                  })}
              </div>
          </div>
      </section>

      {/* 9. Featured Items / CTA */}
      <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
               <div className="bg-[#4EB8B9] rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                   <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                   
                   <div className="relative z-10 max-w-3xl mx-auto">
                       <h2 className="font-lemon text-3xl md:text-5xl mb-6">Ready to Transform?</h2>
                       <p className="text-xl opacity-90 mb-10">
                           Join thousands of youth across the globe in a journey of self-discovery and service. 
                           The world is waiting for your light.
                       </p>
                       <div className="flex flex-col sm:flex-row gap-4 justify-center">
                           <Link to="/get-involved" className="bg-white text-[#4EB8B9] px-8 py-4 rounded-full font-bold shadow-lg hover:bg-gray-100 transition transform hover:scale-105 duration-200">
                               Join the Movement
                           </Link>
                           <Link to="/contact" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition transform hover:scale-105 duration-200">
                               Contact Us
                           </Link>
                       </div>
                   </div>
               </div>
          </div>
      </section>
    </div>
  );
};

export default Home;
