
import React, { useState } from 'react';
import { Calendar, MapPin, Clock, ArrowRight, PlayCircle, Star, Heart, Music, Mic, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
// Need to import Users icon
import { Users } from 'lucide-react';

const PAST_EDITIONS = [
    {
        year: "2024",
        theme: "The Power of Love",
        location: "ShantiKshetra Premgiri Ashram, Karjat",
        description: "Over 5000 youth gathered to experience the transformative power of unconditional love. A day filled with joy, devotion, and a collective pledge to serve humanity.",
        color: "bg-[#F47C20]"
    },
    {
        year: "2023",
        theme: "Igniting the Inner Light",
        location: "Mumbai",
        description: "A profound session focusing on self-discovery and finding one's true purpose. Participants learned techniques to connect with their inner core.",
        color: "bg-[#FDB913]"
    }
];

const WHAT_TO_EXPECT = [
    {
        icon: <Heart size={32} className="text-[#F47C20]" />,
        title: "Divine Darshan",
        desc: "Experience the profound presence of Maitreya Dadashreeji."
    },
    {
        icon: <Music size={32} className="text-[#FDB913]" />,
        title: "Soulful Music",
        desc: "Immerse yourself in devotional music that touches the soul."
    },
    {
        icon: <Mic size={32} className="text-[#936FB1]" />,
        title: "Wisdom Sessions",
        desc: "Gain clarity on life's biggest questions through direct interaction."
    },
    {
        icon: <Users size={32} className="text-[#00A651]" />, 
        title: "Global Community",
        desc: "Connect with like-minded youth from across the world."
    }
];

const MeetMyMaitreya: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

    return (
        <div className="min-h-screen bg-gray-50 animate-fade-in">
            
            {/* 1. Hero Section - Updated with Gradient */}
            <div className="relative h-[500px] md:h-[600px] overflow-hidden flex items-center justify-center text-center text-white bg-gradient-to-br from-[#001D4A] to-[#2563EB]">
                {/* Decorative background elements matching Home card */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#FDB913]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

                <div className="relative z-20 px-4 max-w-4xl mx-auto">
                    <span className="inline-block py-1 px-3 border border-[#FDB913] text-[#FDB913] rounded-full text-sm font-bold uppercase tracking-widest mb-4 backdrop-blur-sm">
                        The Annual Gathering
                    </span>
                    <h1 className="font-lemon text-5xl md:text-7xl mb-6 text-[#FDB913] drop-shadow-lg">
                        Meet My Maitreya
                    </h1>
                    <p className="text-xl md:text-2xl font-light opacity-90 leading-relaxed text-blue-100">
                        A celebration of Love, Friendship, and Transformation.
                    </p>
                </div>
            </div>

            {/* 2. Overview */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <h2 className="font-lemon text-3xl md:text-4xl text-[#333] mb-8">About The Event</h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-10">
                        <strong>Meet My Maitreya (MMM)</strong> is not just an event; it is an experience. Held annually, it marks a time when seekers, youth, and volunteers from around the globe come together to celebrate their connection with the Divine Friend, Maitreya Dadashreeji.
                    </p>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        It is a day of joy, heartfelt conversations, and deep spiritual insights. Whether you are seeking answers, peace, or simply a sense of belonging, MMM welcomes you with open arms.
                    </p>
                </div>
            </section>

            {/* 3. Navigation Tabs */}
            <div className="sticky top-20 z-30 bg-white shadow-sm border-y border-gray-100">
                <div className="container mx-auto px-4 flex justify-center space-x-8">
                    <button 
                        onClick={() => setActiveTab('upcoming')}
                        className={`py-4 px-2 border-b-4 font-bold transition-colors ${activeTab === 'upcoming' ? 'border-[#F47C20] text-[#F47C20]' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
                    >
                        Upcoming MMM
                    </button>
                    <button 
                        onClick={() => setActiveTab('past')}
                        className={`py-4 px-2 border-b-4 font-bold transition-colors ${activeTab === 'past' ? 'border-[#936FB1] text-[#936FB1]' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
                    >
                        Past Editions
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                
                {/* UPCOMING SECTION */}
                {activeTab === 'upcoming' && (
                    <div className="animate-fade-in space-y-20">
                        
                        {/* Event Details Card */}
                        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">
                            <div className="md:w-1/2 bg-[#FDB913] p-12 text-[#333] flex flex-col justify-center">
                                <span className="uppercase font-bold tracking-widest text-sm mb-2 opacity-70">Next Edition</span>
                                <h3 className="font-lemon text-4xl md:text-5xl mb-6">MMM 2025</h3>
                                <div className="space-y-4 text-lg font-medium">
                                    <div className="flex items-center">
                                        <Calendar className="mr-3" /> August 2025 (Dates TBA)
                                    </div>
                                    <div className="flex items-center">
                                        <MapPin className="mr-3" /> ShantiKshetra Premgiri Ashram, Karjat
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="mr-3" /> Full Day Event
                                    </div>
                                </div>
                                <button className="mt-8 bg-[#333] text-white px-8 py-3 rounded-full font-bold hover:bg-black transition shadow-lg w-fit">
                                    Notify Me When Registration Opens
                                </button>
                            </div>
                            <div className="md:w-1/2 relative min-h-[300px] bg-[#333] flex items-center justify-center">
                                <Star size={100} className="text-[#FDB913] animate-pulse" />
                            </div>
                        </div>

                        {/* What to Expect */}
                        <div>
                            <h3 className="text-center font-lemon text-3xl text-[#333] mb-12">What to Expect</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {WHAT_TO_EXPECT.map((item, idx) => (
                                    <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-50 text-center hover:-translate-y-2 transition duration-300">
                                        <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                            {item.icon}
                                        </div>
                                        <h4 className="font-bold text-xl mb-3">{item.title}</h4>
                                        <p className="text-gray-500 text-sm">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Registration / Notify Form */}
                        <div className="bg-[#936FB1] rounded-3xl p-10 md:p-16 text-white text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
                            
                            <div className="relative z-10 max-w-2xl mx-auto">
                                <h3 className="font-lemon text-3xl mb-4">Be The First To Know</h3>
                                <p className="mb-8 opacity-90 text-lg">
                                    Registration for MMM 2025 hasn't opened yet. Join the waitlist to get priority access and updates.
                                </p>
                                <form className="flex flex-col sm:flex-row gap-4">
                                    <input 
                                        type="email" 
                                        placeholder="Enter your email address" 
                                        className="flex-1 px-6 py-4 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#FDB913]"
                                    />
                                    <button className="bg-[#FDB913] text-[#333] font-bold px-8 py-4 rounded-xl hover:bg-yellow-400 transition shadow-lg">
                                        Join Waitlist
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Gallery Preview */}
                        <div>
                            <div className="flex justify-between items-end mb-8">
                                <h3 className="font-lemon text-3xl text-[#333]">Glimpses of Joy</h3>
                                <button className="text-[#F47C20] font-bold flex items-center hover:underline">
                                    View Full Gallery <ArrowRight size={16} className="ml-2" />
                                </button>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[1, 2, 3, 4].map((i) => {
                                    const colors = ['bg-[#F47C20]', 'bg-[#FDB913]', 'bg-[#936FB1]', 'bg-[#4EB8B9]'];
                                    return (
                                        <div key={i} className={`aspect-square rounded-xl overflow-hidden group ${colors[i % 4]} flex items-center justify-center opacity-80 hover:opacity-100 transition`}>
                                            <Heart size={48} className="text-white" />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                    </div>
                )}

                {/* PAST EDITIONS SECTION */}
                {activeTab === 'past' && (
                    <div className="animate-fade-in max-w-5xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {PAST_EDITIONS.map((edition) => (
                                <div key={edition.year} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col hover:-translate-y-2 transition duration-300">
                                    <div className={`relative h-64 overflow-hidden flex items-center justify-center ${edition.color}`}>
                                        <Star size={80} className="text-white opacity-50" />
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-[#333]">
                                            MMM {edition.year}
                                        </div>
                                    </div>
                                    <div className="p-8 flex-1 flex flex-col">
                                        <h3 className="font-lemon text-2xl text-[#333] mb-2">{edition.theme}</h3>
                                        <div className="flex items-center text-sm text-gray-500 font-medium mb-4">
                                            <MapPin size={16} className="mr-2 text-[#936FB1]" /> {edition.location}
                                        </div>
                                        <p className="text-gray-600 mb-6 flex-1 line-clamp-3">{edition.description}</p>
                                        
                                        <Link 
                                            to={`/meet-my-maitreya/${edition.year}`} 
                                            className="block w-full text-center border-2 border-[#F47C20] text-[#F47C20] font-bold py-3 rounded-xl hover:bg-[#F47C20] hover:text-white transition uppercase text-sm tracking-wide"
                                        >
                                            Explore Full Edition
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default MeetMyMaitreya;
