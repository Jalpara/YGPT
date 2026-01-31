import React, { useState } from 'react';
import { MapPin, Calendar as CalendarIcon, Clock, Lock, Mail, Phone, Map, Search, Filter, Trophy, Star, Award, Zap, HandHeart, Handshake, MessageCircle, CheckCircle, Grid, List, ChevronLeft, ChevronRight, X, ExternalLink, ChevronDown, Users } from 'lucide-react';
import { PROGRAMS_DATA, EVENTS_DATA, MOCK_USER_STATS, BADGES, LEADERBOARD } from '../constants';
import { Event } from '../types';

// Mock Data for Clubs
const CLUBS_DATA = [
    { id: '1', name: 'YGPT New York', location: 'New York, USA', members: 150, image: 'https://picsum.photos/400/300?random=101' },
    { id: '2', name: 'YGPT London', location: 'London, UK', members: 85, image: 'https://picsum.photos/400/300?random=102' },
    { id: '3', name: 'YGPT Berlin', location: 'Berlin, Germany', members: 120, image: 'https://picsum.photos/400/300?random=103' },
    { id: '4', name: 'YGPT Mumbai', location: 'Mumbai, India', members: 200, image: 'https://picsum.photos/400/300?random=104' },
    { id: '5', name: 'YGPT Toronto', location: 'Toronto, Canada', members: 60, image: 'https://picsum.photos/400/300?random=105' },
    { id: '6', name: 'YGPT Sydney', location: 'Sydney, Australia', members: 45, image: 'https://picsum.photos/400/300?random=106' },
];

export const About: React.FC = () => (
    <div className="min-h-screen">
        <div className="bg-[#333333] text-white py-20 text-center">
            <h1 className="font-lemon text-5xl text-[#FDB913] mb-4">About YGPT</h1>
            <p className="text-xl max-w-2xl mx-auto text-gray-300">Empowering Youth. Building Peace. Transforming Lives.</p>
        </div>
        <div className="container mx-auto px-4 py-16 space-y-20">
            {/* Mission/Vision */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl font-lemon text-[#F47C20] mb-4">Our Mission</h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                        To create a global network of conscious youth leaders who are grounded in inner peace and actively engaged in selfless service for the betterment of humanity.
                    </p>
                    <h2 className="text-3xl font-lemon text-[#4EB8B9] mb-4">Our Vision</h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        A world where every young person is a beacon of love, peace, and positive transformation.
                    </p>
                </div>
                <div className="rounded-xl overflow-hidden shadow-xl">
                    <img src="https://picsum.photos/800/600?grayscale" alt="Mission" className="w-full h-full object-cover" />
                </div>
            </div>

            {/* Founder Section */}
            <div className="bg-[#936FB1] rounded-3xl p-10 md:p-16 text-white shadow-2xl">
                <div className="flex flex-col md:flex-row items-center gap-10">
                    <div className="md:w-1/3 text-center">
                         <div className="w-48 h-48 bg-white/20 rounded-full mx-auto flex items-center justify-center mb-4">
                             <span className="font-serif text-6xl italic">M</span>
                         </div>
                         <h3 className="font-lemon text-2xl text-[#FDB913]">Maitreya Dadashreeji</h3>
                         <p className="text-sm uppercase tracking-widest opacity-80">Founder</p>
                    </div>
                    <div className="md:w-2/3">
                        <h2 className="font-serif italic text-3xl mb-6">"True transformation begins within."</h2>
                        <p className="text-lg leading-relaxed opacity-90 mb-6">
                            Maitreya Dadashreeji is a global humanitarian, transformation pioneer, and a doctor by profession. He founded YGPT with the vision to provide youth with the right direction and tools to handle life's challenges while contributing meaningfully to society.
                        </p>
                        <p className="text-lg leading-relaxed opacity-90">
                            His teachings simplify ancient spiritual wisdom into practical tools applicable to modern life, emphasizing love as the supreme transformative force.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export const Clubs: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState<'members' | 'alpha'>('members');

    // Filter & Sort
    const filteredClubs = CLUBS_DATA.filter(club => 
        club.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        club.location.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => {
        if (sortOption === 'members') return b.members - a.members;
        if (sortOption === 'alpha') return a.name.localeCompare(b.name);
        return 0;
    });

    return (
        <div className="min-h-screen bg-gray-50 pt-12 pb-20">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-8">
                     <div>
                        <h1 className="text-4xl font-lemon text-[#FDB913] mb-2">Global Chapters</h1>
                        <p className="text-gray-500">Connect with a YGPT family near you.</p>
                     </div>
                     <button className="hidden md:block bg-[#F47C20] text-white px-6 py-2 rounded-lg font-bold shadow-lg hover:bg-orange-600 transition">
                        Start a Chapter
                     </button>
                </div>

                {/* Map Section */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-2 mb-10 h-[300px] md:h-[400px] relative overflow-hidden group">
                     <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d50000000!2d0!3d0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus" 
                        width="100%" 
                        height="100%" 
                        style={{border:0, filter: 'grayscale(0.3)'}} 
                        allowFullScreen 
                        loading="lazy"
                        className="rounded-xl"
                    ></iframe>
                    <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg shadow-md border border-gray-100">
                        <p className="text-sm font-bold text-gray-700 flex items-center">
                            <MapPin size={16} className="text-[#F47C20] mr-2"/> {CLUBS_DATA.length} Active Chapters Worldwide
                        </p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content: Club Listings */}
                    <div className="lg:w-2/3 order-2 lg:order-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredClubs.map(club => (
                                <div key={club.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl transition group flex flex-col">
                                    <div className="h-48 overflow-hidden relative">
                                        <img src={club.image} alt={club.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-[#FDB913] flex items-center">
                                            <Users size={12} className="mr-1"/> {club.members}
                                        </div>
                                    </div>
                                    <div className="p-5 flex-1 flex flex-col">
                                        <h3 className="font-bold text-lg text-gray-800 mb-1">{club.name}</h3>
                                        <div className="flex items-center text-gray-500 text-sm mb-4">
                                            <MapPin size={14} className="mr-1" /> {club.location}
                                        </div>
                                        <button className="mt-auto w-full border border-[#FDB913] text-[#FDB913] font-bold py-2 rounded-lg hover:bg-[#FDB913] hover:text-white transition">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {filteredClubs.length === 0 && (
                                <div className="col-span-full text-center py-10 bg-white rounded-xl border border-dashed border-gray-200">
                                    <p className="text-gray-500">No clubs found matching your search.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar: Filters & Upcoming Events */}
                    <div className="lg:w-1/3 space-y-8 order-1 lg:order-2">
                        
                        {/* Filters & Sort */}
                        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                            <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                                <Filter className="mr-2 text-[#FDB913]" size={20}/> Find a Chapter
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Search</label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                        <input 
                                            type="text" 
                                            placeholder="City, University, Name..." 
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#FDB913] transition text-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Sort By</label>
                                    <div className="relative">
                                        <select 
                                            value={sortOption}
                                            onChange={(e) => setSortOption(e.target.value as any)}
                                            className="w-full pl-3 pr-8 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FDB913] cursor-pointer appearance-none"
                                        >
                                            <option value="members">Most Members</option>
                                            <option value="alpha">Alphabetical</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Upcoming Events Widget */}
                        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 sticky top-24">
                            <h3 className="font-lemon text-lg text-[#F47C20] mb-4 flex items-center">
                                <CalendarIcon className="mr-2" size={18}/> Upcoming Events
                            </h3>
                            <div className="space-y-4">
                                {EVENTS_DATA.slice(0, 3).map(event => (
                                    <div key={event.id} className="flex gap-3 items-start border-b border-gray-50 last:border-0 pb-3 last:pb-0">
                                        <div className="bg-gray-100 rounded-lg p-1.5 text-center min-w-[2.5rem]">
                                            <span className="block text-sm font-bold text-gray-800 leading-none">{new Date(event.date).getDate()}</span>
                                            <span className="block text-[9px] font-bold text-gray-500 uppercase">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800 text-sm leading-tight mb-1 hover:text-[#F47C20] cursor-pointer transition">{event.title}</h4>
                                            <p className="text-[10px] text-gray-500 flex items-center mb-1">
                                                <MapPin size={10} className="mr-1"/> {event.location}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-5 bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold py-2 rounded-lg text-xs uppercase tracking-wide transition">
                                View Full Calendar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const LMS: React.FC = () => {
    // Simulating logged-in state for the gamification demo
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
                <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl text-center">
                    <div className="w-20 h-20 bg-[#936FB1] rounded-full mx-auto flex items-center justify-center mb-6">
                        <Lock className="text-white w-10 h-10" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Transform with YGPT</h2>
                    <p className="text-gray-500 mb-8">Access exclusive courses on leadership and mindfulness.</p>
                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }}>
                        <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#936FB1] outline-none" />
                        <input type="password" placeholder="Password" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#936FB1] outline-none" />
                        <button className="w-full bg-[#936FB1] text-white py-3 rounded-lg font-bold hover:bg-purple-700 transition">Login to LMS</button>
                    </form>
                    <p className="mt-4 text-xs text-gray-400">
                        (Click Login to see the new Gamification Dashboard demo)
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Dashboard Header */}
            <div className="bg-[#936FB1] text-white pt-10 pb-20 px-4">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="flex items-center mb-6 md:mb-0">
                             <div className="w-20 h-20 bg-white rounded-full p-1 mr-6">
                                <img src="https://i.pravatar.cc/150?u=alex" alt="Profile" className="w-full h-full rounded-full object-cover" />
                             </div>
                             <div>
                                 <h1 className="text-3xl font-bold">Welcome back, {MOCK_USER_STATS.name}!</h1>
                                 <p className="opacity-90">Keep growing your inner light.</p>
                             </div>
                        </div>
                        <div className="flex gap-6 text-center">
                            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                                <span className="block text-2xl font-bold">{MOCK_USER_STATS.level}</span>
                                <span className="text-xs uppercase tracking-wider opacity-80">Level</span>
                            </div>
                            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                                <span className="block text-2xl font-bold">{MOCK_USER_STATS.streak} <span className="text-yellow-300 text-lg">🔥</span></span>
                                <span className="text-xs uppercase tracking-wider opacity-80">Day Streak</span>
                            </div>
                            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                                <span className="block text-2xl font-bold">{MOCK_USER_STATS.points}</span>
                                <span className="text-xs uppercase tracking-wider opacity-80">Points</span>
                            </div>
                        </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="mt-8 max-w-2xl">
                        <div className="flex justify-between text-xs font-bold uppercase mb-2">
                            <span>Level {MOCK_USER_STATS.level}</span>
                            <span>{MOCK_USER_STATS.points} / {MOCK_USER_STATS.nextLevelPoints} XP</span>
                        </div>
                        <div className="h-3 bg-black/20 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-[#FDB913] transition-all duration-1000" 
                                style={{ width: `${(MOCK_USER_STATS.points / MOCK_USER_STATS.nextLevelPoints) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Active Courses */}
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                                <Zap className="text-[#F47C20] mr-2" /> Continue Learning
                            </h3>
                            <div className="space-y-4">
                                <div className="border border-gray-100 p-4 rounded-lg flex justify-between items-center hover:bg-gray-50 transition">
                                    <div>
                                        <h4 className="font-bold text-gray-800">Mindfulness 101</h4>
                                        <p className="text-sm text-gray-500">Module 3: Breathwork Basics</p>
                                    </div>
                                    <button className="bg-[#936FB1] text-white px-4 py-2 rounded-lg text-sm font-bold">Resume</button>
                                </div>
                                <div className="border border-gray-100 p-4 rounded-lg flex justify-between items-center hover:bg-gray-50 transition">
                                    <div>
                                        <h4 className="font-bold text-gray-800">Leadership Fundamentals</h4>
                                        <p className="text-sm text-gray-500">Module 1: Empathy</p>
                                    </div>
                                    <button className="bg-[#936FB1] text-white px-4 py-2 rounded-lg text-sm font-bold">Resume</button>
                                </div>
                            </div>
                        </div>

                        {/* Badges Section */}
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                                <Award className="text-[#FDB913] mr-2" /> Your Badges
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {BADGES.map((badge) => (
                                    <div key={badge.id} className={`flex flex-col items-center p-4 rounded-lg text-center ${badge.earned ? 'bg-yellow-50 border border-yellow-100' : 'bg-gray-50 opacity-60 grayscale'}`}>
                                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 text-2xl">
                                            {/* Simple icon mapping based on string content for demo */}
                                            {badge.icon === 'Sun' && '☀️'}
                                            {badge.icon === 'Leaf' && '🌱'}
                                            {badge.icon === 'Users' && '🤝'}
                                            {badge.icon === 'Brain' && '🧠'}
                                        </div>
                                        <h4 className="font-bold text-sm mb-1">{badge.name}</h4>
                                        <p className="text-[10px] text-gray-500 leading-tight">{badge.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / Leaderboard */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                                <Trophy className="text-[#F47C20] mr-2" /> Leaderboard
                            </h3>
                            <div className="space-y-4">
                                {LEADERBOARD.map((entry) => (
                                    <div key={entry.rank} className={`flex items-center p-3 rounded-lg ${entry.name === MOCK_USER_STATS.name ? 'bg-purple-50 border border-purple-100' : ''}`}>
                                        <div className={`w-8 h-8 flex items-center justify-center font-bold rounded-full mr-3 ${
                                            entry.rank === 1 ? 'bg-[#FDB913] text-white' : 
                                            entry.rank === 2 ? 'bg-gray-300 text-white' :
                                            entry.rank === 3 ? 'bg-orange-200 text-white' : 'bg-gray-100 text-gray-500'
                                        }`}>
                                            {entry.rank}
                                        </div>
                                        <img src={entry.avatar} alt={entry.name} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm mr-3" />
                                        <div className="flex-1">
                                            <h4 className="font-bold text-sm text-gray-800">{entry.name}</h4>
                                            <p className="text-xs text-gray-500">{entry.points} XP</p>
                                        </div>
                                        {entry.rank <= 3 && <Star size={16} className="text-[#FDB913] fill-current" />}
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-6 text-sm text-gray-500 font-bold hover:text-[#936FB1]">View Full Rankings</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export const Programs: React.FC = () => (
    <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-lemon text-[#4EB8B9] mb-8">Our Programs</h1>
        <div className="space-y-12">
            {PROGRAMS_DATA.map((prog, idx) => (
                <div key={prog.id} className={`flex flex-col md:flex-row gap-8 items-center ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                    <div className="w-full md:w-1/2">
                        <img src={prog.image} alt={prog.title} className="rounded-xl shadow-lg w-full h-64 object-cover" />
                    </div>
                    <div className="w-full md:w-1/2">
                        <span className="text-xs font-bold bg-gray-100 px-2 py-1 rounded text-gray-500 uppercase">{prog.category}</span>
                        <h2 className="text-3xl font-bold mt-2 mb-4 text-gray-800">{prog.title}</h2>
                        <p className="text-gray-600 text-lg mb-6">{prog.description}</p>
                        <button className="bg-[#333333] text-white px-6 py-2 rounded font-bold hover:bg-black transition">View Details</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export const Events: React.FC = () => {
    const [viewMode, setViewMode] = useState<'grid' | 'list' | 'calendar'>('grid');
    const [filterType, setFilterType] = useState<'All' | 'Online' | 'Offline'>('All');
    const [sortOption, setSortOption] = useState<'date-asc' | 'date-desc' | 'alpha'>('date-asc');
    const [searchTerm, setSearchTerm] = useState('');
    const [calendarDate, setCalendarDate] = useState(new Date());
    
    // Modal state
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleOpenModal = (event: Event) => {
        setSelectedEvent(event);
        setTimeout(() => setIsModalVisible(true), 10);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setTimeout(() => setSelectedEvent(null), 300);
    };

    // Filter Logic
    const filteredEvents = EVENTS_DATA.filter(event => {
        const matchesType = filterType === 'All' || event.type === filterType;
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              event.location.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesType && matchesSearch;
    });

    // Sort Logic
    const sortedEvents = [...filteredEvents].sort((a, b) => {
        if (sortOption === 'date-asc') return new Date(a.date).getTime() - new Date(b.date).getTime();
        if (sortOption === 'date-desc') return new Date(b.date).getTime() - new Date(a.date).getTime();
        if (sortOption === 'alpha') return a.title.localeCompare(b.title);
        return 0;
    });

    // Calendar Helpers
    const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    const changeMonth = (increment: number) => {
        const newDate = new Date(calendarDate);
        newDate.setMonth(newDate.getMonth() + increment);
        setCalendarDate(newDate);
    };

    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(calendarDate);
        const firstDay = getFirstDayOfMonth(calendarDate);
        const days = [];
        
        // Empty slots
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-24 md:h-32 bg-gray-50 border border-gray-100"></div>);
        }

        // Days
        for (let i = 1; i <= daysInMonth; i++) {
            const currentDateStr = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), i).toISOString().split('T')[0];
            const dayEvents = sortedEvents.filter(e => e.date === currentDateStr);
            
            days.push(
                <div 
                    key={i} 
                    className="min-h-[6rem] md:min-h-[8rem] bg-white border border-gray-100 p-2 hover:bg-gray-50 transition relative group"
                >
                    <span className={`text-sm font-bold ${dayEvents.length > 0 ? 'text-[#F47C20]' : 'text-gray-400'}`}>{i}</span>
                    <div className="mt-1 space-y-1 overflow-y-auto max-h-[4.5rem] md:max-h-[6rem] scrollbar-hide">
                        {dayEvents.map(ev => (
                            <div 
                                key={ev.id} 
                                onClick={() => handleOpenModal(ev)}
                                className="text-[10px] md:text-xs bg-[#F47C20]/10 text-[#F47C20] px-1 py-0.5 rounded truncate font-medium cursor-pointer hover:bg-[#F47C20] hover:text-white transition"
                            >
                                {ev.title}
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        return (
            <div className="animate-fade-in">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-lemon text-xl md:text-2xl text-gray-800">
                        {calendarDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </h3>
                    <div className="flex space-x-2">
                        <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-gray-100 rounded-full transition"><ChevronLeft className="text-gray-600"/></button>
                        <button onClick={() => changeMonth(1)} className="p-2 hover:bg-gray-100 rounded-full transition"><ChevronRight className="text-gray-600"/></button>
                    </div>
                </div>
                <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                        <div key={d} className="bg-gray-50 p-2 text-center text-xs font-bold uppercase text-gray-500 tracking-wider">
                            {d}
                        </div>
                    ))}
                    {days}
                </div>
            </div>
        );
    };

    const renderGrid = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {sortedEvents.map(event => (
                <div key={event.id} className="flex flex-col bg-white border border-gray-100 shadow-lg rounded-xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
                    <div className="h-4 bg-[#F47C20] group-hover:h-5 transition-all"></div>
                    <div className="p-6 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-gray-100 rounded-lg p-2 text-center min-w-[3.5rem]">
                                <span className="block text-xl font-bold text-gray-800 leading-none">{new Date(event.date).getDate()}</span>
                                <span className="block text-[10px] font-bold text-gray-500 uppercase">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                            </div>
                            <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide ${
                                event.type === 'Online' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'
                            }`}>
                                {event.type}
                            </span>
                        </div>
                        
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{event.title}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">{event.description}</p>
                        
                        <div className="flex flex-col gap-2 text-xs text-gray-500 font-medium pt-4 border-t border-gray-100">
                            <div className="flex items-center"><Clock size={14} className="mr-2 text-[#F47C20]"/> {event.time}</div>
                            <div className="flex items-center"><MapPin size={14} className="mr-2 text-[#4EB8B9]"/> {event.location}</div>
                        </div>
                        
                        <button 
                            onClick={() => handleOpenModal(event)}
                            className="mt-4 w-full bg-white border border-[#333] text-[#333] px-4 py-2 rounded-lg font-bold text-sm hover:bg-[#333] hover:text-white transition"
                        >
                            Details
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderList = () => (
        <div className="space-y-4 animate-fade-in">
            {sortedEvents.map(event => (
                <div 
                    key={event.id} 
                    onClick={() => handleOpenModal(event)}
                    className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col md:flex-row items-center gap-6 hover:shadow-lg cursor-pointer transition group"
                >
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="text-center min-w-[4rem]">
                            <span className="block text-2xl font-lemon text-[#F47C20]">{new Date(event.date).getDate()}</span>
                            <span className="block text-xs font-bold text-gray-400 uppercase">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                        </div>
                        <div className="w-px h-10 bg-gray-200 hidden md:block"></div>
                    </div>
                    
                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-lg font-bold text-gray-800">{event.title}</h3>
                        <p className="text-sm text-gray-500 line-clamp-1">{event.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-4 justify-center md:justify-end text-sm text-gray-500 w-full md:w-auto">
                        <div className="flex items-center"><Clock size={16} className="mr-2 text-gray-400"/> {event.time}</div>
                        <div className="flex items-center"><MapPin size={16} className="mr-2 text-gray-400"/> {event.location}</div>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase self-center ${
                             event.type === 'Online' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'
                        }`}>
                            {event.type}
                        </span>
                    </div>

                    <button className="bg-gray-100 text-gray-600 group-hover:bg-[#F47C20] group-hover:text-white p-2 rounded-full transition">
                        <ChevronRight size={20} />
                    </button>
                </div>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 pt-12 pb-20">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-8">
                     <div>
                        <h1 className="text-4xl font-lemon text-[#F47C20] mb-2">Events Calendar</h1>
                        <p className="text-gray-500">Join us in spreading peace across the globe.</p>
                     </div>
                </div>
                
                {/* Control Bar */}
                <div className="bg-white p-4 rounded-2xl shadow-xl border border-gray-100 mb-10 sticky top-24 z-30 transition-all duration-300">
                    <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
                        
                        {/* Search, Filter, Sort Group */}
                        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto flex-1">
                            {/* Search */}
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                <input 
                                    type="text" 
                                    placeholder="Search events..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F47C20] focus:bg-white transition"
                                />
                            </div>

                            {/* Filters */}
                            <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-200">
                                {['All', 'Online', 'Offline'].map((type) => (
                                    <button 
                                        key={type}
                                        onClick={() => setFilterType(type as any)}
                                        className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                                            filterType === type 
                                            ? 'bg-[#F47C20] text-white shadow-md' 
                                            : 'text-gray-500 hover:text-gray-800'
                                        }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>

                             {/* Sort */}
                             <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                                    <Filter size={16} />
                                </div>
                                <select
                                    value={sortOption}
                                    onChange={(e) => setSortOption(e.target.value as any)}
                                    className="pl-10 pr-8 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#F47C20] appearance-none cursor-pointer hover:bg-white transition w-full sm:w-auto"
                                >
                                    <option value="date-asc">Upcoming First</option>
                                    <option value="date-desc">Newest First</option>
                                    <option value="alpha">Alphabetical</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                                    <ChevronDown size={14} />
                                </div>
                             </div>
                        </div>

                        {/* View Toggles */}
                        <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-200">
                            <button 
                                onClick={() => setViewMode('calendar')}
                                className={`p-2 rounded-lg transition-all ${viewMode === 'calendar' ? 'bg-white text-[#F47C20] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                                title="Calendar View"
                            >
                                <CalendarIcon size={20} />
                            </button>
                            <button 
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-[#F47C20] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                                title="Grid View"
                            >
                                <Grid size={20} />
                            </button>
                            <button 
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white text-[#F47C20] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                                title="List View"
                            >
                                <List size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content Display */}
                <div className="min-h-[500px]">
                    {sortedEvents.length === 0 && viewMode !== 'calendar' ? (
                         <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300 animate-fade-in">
                            <Filter size={48} className="mx-auto text-gray-300 mb-4" />
                            <h3 className="text-xl font-bold text-gray-500">No events found</h3>
                            <p className="text-gray-400">Try adjusting your search or filters.</p>
                        </div>
                    ) : (
                        <>
                            {viewMode === 'calendar' && renderCalendar()}
                            {viewMode === 'grid' && renderGrid()}
                            {viewMode === 'list' && renderList()}
                        </>
                    )}
                </div>

                {/* Event Details Modal */}
                {selectedEvent && (
                    <div 
                        className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isModalVisible ? 'opacity-100' : 'opacity-0'}`}
                        onClick={handleCloseModal}
                    >
                        <div 
                            className={`bg-white text-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden relative flex flex-col max-h-[90vh] transition-all duration-300 transform ${isModalVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}`}
                            onClick={(e) => e.stopPropagation()}
                        >
                             <div className="relative h-48 bg-gray-100 flex-shrink-0">
                                 <img src={`https://picsum.photos/800/400?random=${selectedEvent.id}`} alt="Event Cover" className="w-full h-full object-cover" />
                                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                 <button 
                                    onClick={handleCloseModal}
                                    className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 p-2 rounded-full text-white transition z-10"
                                >
                                    <X size={20} />
                                </button>
                                <div className="absolute bottom-4 left-6">
                                     <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide mb-2 inline-block ${
                                        selectedEvent.type === 'Online' ? 'bg-green-500 text-white' : 'bg-purple-500 text-white'
                                    }`}>
                                        {selectedEvent.type}
                                    </span>
                                    <h2 className="text-3xl font-lemon text-white drop-shadow-md">{selectedEvent.title}</h2>
                                </div>
                             </div>
                             
                             <div className="p-8 overflow-y-auto">
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                     <div className="flex items-start">
                                         <CalendarIcon className="text-[#F47C20] mr-4 mt-1" size={24} />
                                         <div>
                                             <p className="text-xs text-gray-400 uppercase font-bold">Date</p>
                                             <p className="text-lg font-bold">{new Date(selectedEvent.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                         </div>
                                     </div>
                                     <div className="flex items-start">
                                         <Clock className="text-[#F47C20] mr-4 mt-1" size={24} />
                                         <div>
                                             <p className="text-xs text-gray-400 uppercase font-bold">Time</p>
                                             <p className="text-lg font-bold">{selectedEvent.time}</p>
                                         </div>
                                     </div>
                                     <div className="flex items-start md:col-span-2">
                                         <MapPin className="text-[#4EB8B9] mr-4 mt-1" size={24} />
                                         <div>
                                             <p className="text-xs text-gray-400 uppercase font-bold">Location</p>
                                             <p className="text-lg font-bold">{selectedEvent.location}</p>
                                             {selectedEvent.type === 'Offline' && (
                                                <a href="#" className="text-[#4EB8B9] text-sm flex items-center hover:underline mt-1">
                                                    View on Map <ExternalLink size={12} className="ml-1" />
                                                </a>
                                             )}
                                         </div>
                                     </div>
                                 </div>

                                 <div className="mb-8">
                                     <h4 className="font-bold text-xl mb-3 border-b border-gray-100 pb-2 text-[#333]">About This Event</h4>
                                     <p className="text-gray-600 leading-relaxed text-lg">{selectedEvent.description}</p>
                                     <p className="text-gray-500 mt-4 leading-relaxed">
                                        Join us for an immersive experience designed to uplift your spirit and connect you with like-minded individuals. 
                                        Don't miss this opportunity to be part of the change.
                                     </p>
                                 </div>

                                 <div className="flex gap-4 mt-auto">
                                     <button className="flex-1 bg-[#F47C20] hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg transition transform hover:-translate-y-1">
                                         Register Now
                                     </button>
                                     <button className="px-6 py-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition font-bold text-gray-600">
                                         Share
                                     </button>
                                 </div>
                             </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export const Contact: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'volunteer' | 'partner' | 'contact'>('volunteer');

    const renderForm = () => {
        switch (activeTab) {
            case 'volunteer':
                return (
                    <form className="space-y-6 animate-fade-in">
                        <h3 className="text-2xl font-lemon text-[#00A651] mb-4">Volunteer Application</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#00A651] outline-none transition" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#00A651] outline-none transition" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                            <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#00A651] outline-none transition" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Area of Interest</label>
                            <div className="flex flex-wrap gap-4">
                                {['Event Management', 'Social Media', 'Content Creation', 'Tree Plantation', 'Teaching'].map((interest) => (
                                    <label key={interest} className="flex items-center space-x-2 bg-white border border-gray-200 px-4 py-2 rounded-full cursor-pointer hover:border-[#00A651] transition">
                                        <input type="checkbox" className="rounded text-[#00A651] focus:ring-[#00A651]" />
                                        <span className="text-sm">{interest}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Why do you want to join YGPT?</label>
                            <textarea className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 h-32 resize-none focus:ring-2 focus:ring-[#00A651] outline-none transition"></textarea>
                        </div>
                        <button className="w-full bg-[#00A651] text-white font-bold py-4 rounded-lg hover:bg-green-700 transition shadow-lg transform hover:-translate-y-1">
                            Submit Application
                        </button>
                    </form>
                );
            case 'partner':
                return (
                    <form className="space-y-6 animate-fade-in">
                        <h3 className="text-2xl font-lemon text-[#936FB1] mb-4">Partnership Inquiry</h3>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Organization Name</label>
                            <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#936FB1] outline-none transition" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Contact Person</label>
                                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#936FB1] outline-none transition" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Role/Title</label>
                                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#936FB1] outline-none transition" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Partnership Type</label>
                            <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#936FB1] outline-none transition">
                                <option>Corporate CSR</option>
                                <option>Educational Institution</option>
                                <option>NGO Collaboration</option>
                                <option>Event Sponsorship</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Proposal Message</label>
                            <textarea className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 h-32 resize-none focus:ring-2 focus:ring-[#936FB1] outline-none transition"></textarea>
                        </div>
                        <button className="w-full bg-[#936FB1] text-white font-bold py-4 rounded-lg hover:bg-purple-700 transition shadow-lg transform hover:-translate-y-1">
                            Send Proposal
                        </button>
                    </form>
                );
            case 'contact':
            default:
                return (
                    <form className="space-y-6 animate-fade-in">
                        <h3 className="text-2xl font-lemon text-[#F47C20] mb-4">General Inquiry</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Your Name</label>
                                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#F47C20] outline-none transition" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#F47C20] outline-none transition" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                            <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#F47C20] outline-none transition" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                            <textarea className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 h-32 resize-none focus:ring-2 focus:ring-[#F47C20] outline-none transition"></textarea>
                        </div>
                        <button className="w-full bg-[#F47C20] text-white font-bold py-4 rounded-lg hover:bg-orange-600 transition shadow-lg transform hover:-translate-y-1">
                            Send Message
                        </button>
                    </form>
                );
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-[#333333] text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="font-lemon text-5xl mb-6">Get Involved</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Whether you want to volunteer, partner with us, or just say hello, you are in the right place.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-20 pb-20">
                <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
                    {/* Sidebar / Tabs */}
                    <div className="md:w-1/3 bg-gray-100 border-r border-gray-200">
                        <div className="p-6 md:p-8 space-y-2">
                            <button 
                                onClick={() => setActiveTab('volunteer')}
                                className={`w-full flex items-center p-4 rounded-xl transition-all duration-300 ${
                                    activeTab === 'volunteer' 
                                    ? 'bg-white shadow-md text-[#00A651] translate-x-2 border-l-4 border-[#00A651]' 
                                    : 'text-gray-500 hover:bg-white/50 hover:text-gray-800'
                                }`}
                            >
                                <HandHeart size={24} className="mr-4" />
                                <div className="text-left">
                                    <span className="block font-bold">Volunteer</span>
                                    <span className="text-xs opacity-70">Join the movement</span>
                                </div>
                            </button>

                            <button 
                                onClick={() => setActiveTab('partner')}
                                className={`w-full flex items-center p-4 rounded-xl transition-all duration-300 ${
                                    activeTab === 'partner' 
                                    ? 'bg-white shadow-md text-[#936FB1] translate-x-2 border-l-4 border-[#936FB1]' 
                                    : 'text-gray-500 hover:bg-white/50 hover:text-gray-800'
                                }`}
                            >
                                <Handshake size={24} className="mr-4" />
                                <div className="text-left">
                                    <span className="block font-bold">Partner</span>
                                    <span className="text-xs opacity-70">Collaborate with us</span>
                                </div>
                            </button>

                            <button 
                                onClick={() => setActiveTab('contact')}
                                className={`w-full flex items-center p-4 rounded-xl transition-all duration-300 ${
                                    activeTab === 'contact' 
                                    ? 'bg-white shadow-md text-[#F47C20] translate-x-2 border-l-4 border-[#F47C20]' 
                                    : 'text-gray-500 hover:bg-white/50 hover:text-gray-800'
                                }`}
                            >
                                <MessageCircle size={24} className="mr-4" />
                                <div className="text-left">
                                    <span className="block font-bold">Contact</span>
                                    <span className="text-xs opacity-70">General inquiries</span>
                                </div>
                            </button>
                        </div>
                        
                        <div className="p-8 mt-auto hidden md:block">
                            <h4 className="font-bold text-gray-800 mb-4">Contact Info</h4>
                            <div className="space-y-4 text-sm text-gray-600">
                                <div className="flex items-center"><Mail size={16} className="mr-3 text-[#FDB913]"/> contact@ygpt.org</div>
                                <div className="flex items-center"><Phone size={16} className="mr-3 text-[#FDB913]"/> +1 (555) 123-4567</div>
                                <div className="flex items-center"><MapPin size={16} className="mr-3 text-[#FDB913]"/> 123 Peace Ave, Global City</div>
                            </div>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="md:w-2/3 p-8 md:p-12">
                        {renderForm()}
                    </div>
                </div>
            </div>
        </div>
    );
};