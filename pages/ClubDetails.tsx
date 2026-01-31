
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Users, Calendar, Mail, Star, ArrowLeft, Send, MessageSquare, X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { CLUBS_DATA, EVENTS_DATA, PAST_ACTIVITIES } from '../constants';
import { Event } from '../types';
import EventDetailsModal from '../components/EventDetailsModal';

const ClubDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [club, setClub] = useState<any>(null);
    const [suggestion, setSuggestion] = useState('');

    // Activity Lightbox State
    const [activeActivityIndex, setActiveActivityIndex] = useState<number | null>(null);

    // Event Modal State
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [isEventModalVisible, setIsEventModalVisible] = useState(false);

    useEffect(() => {
        // Find club by ID, fallback to first if not found (for demo resilience)
        const foundClub = CLUBS_DATA.find(c => c.id === id) || CLUBS_DATA[0];
        setClub(foundClub);
        window.scrollTo(0, 0);
    }, [id]);

    if (!club) return <div>Loading...</div>;

    const clubEvents = EVENTS_DATA.slice(0, 2); // Mock specific events

    const handleSuggestEvent = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Thanks! We've received your suggestion: "${suggestion}"`);
        setSuggestion('');
    };

    const handleOpenEventModal = (event: Event) => {
        setSelectedEvent(event);
        setIsEventModalVisible(true);
    };

    const handleCloseEventModal = () => {
        setIsEventModalVisible(false);
        setTimeout(() => setSelectedEvent(null), 300);
    };

    const openLightbox = (index: number) => setActiveActivityIndex(index);
    const closeLightbox = () => setActiveActivityIndex(null);
    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (activeActivityIndex !== null) {
            setActiveActivityIndex((activeActivityIndex + 1) % PAST_ACTIVITIES.length);
        }
    };
    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (activeActivityIndex !== null) {
            setActiveActivityIndex((activeActivityIndex - 1 + PAST_ACTIVITIES.length) % PAST_ACTIVITIES.length);
        }
    };

    // Helper for hero color
    const getHeroGradient = (id: string) => {
        const gradients = [
            'from-[#F47C20] to-[#FDB913]',
            'from-[#4EB8B9] to-[#2563EB]',
            'from-[#936FB1] to-[#6B21A8]',
            'from-[#00A651] to-[#059669]'
        ];
        return gradients[parseInt(id) % gradients.length];
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Hero Section */}
            <div className={`h-80 relative overflow-hidden bg-gradient-to-r ${getHeroGradient(club.id)}`}>
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="absolute bottom-0 left-0 w-full p-8 pb-20 text-white">
                    <div className="container mx-auto">
                        <Link to="/clubs" className="inline-flex items-center text-white/80 hover:text-white mb-4 transition text-sm font-bold">
                            <ArrowLeft size={16} className="mr-2" /> Back to Clubs
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-lemon mb-2">{club.name}</h1>
                        <div className="flex flex-wrap items-center gap-6 text-sm font-medium opacity-90">
                            <span className="flex items-center"><MapPin size={18} className="mr-2 text-white"/> {club.location}</span>
                            <span className="flex items-center"><Users size={18} className="mr-2 text-white"/> {club.members} Members</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* About Card */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-[#FDB913] pl-3">About Our Chapter</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                {club.description || "Join us in our mission to create a peaceful and sustainable world. Our chapter is active in community service, meditation workshops, and youth leadership training."}
                            </p>
                            <div className="mt-6 flex flex-wrap gap-3">
                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase">Environment</span>
                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase">Meditation</span>
                                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold uppercase">Leadership</span>
                            </div>
                        </div>

                        {/* Past Activities Gallery */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-[#936FB1] pl-3">Recent Activities</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {PAST_ACTIVITIES.map((activity, index) => (
                                    <div 
                                        key={activity.id} 
                                        onClick={() => openLightbox(index)}
                                        className="relative group rounded-xl overflow-hidden h-48 cursor-pointer bg-gray-100 flex items-center justify-center"
                                    >
                                        <div className={`absolute inset-0 opacity-20 ${index % 2 === 0 ? 'bg-[#F47C20]' : 'bg-[#4EB8B9]'}`}></div>
                                        <ImageIcon size={48} className="text-gray-400" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center text-white">
                                            <h4 className="font-bold text-lg">{activity.title}</h4>
                                            <span className="text-xs uppercase tracking-widest">{activity.date}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Suggest Event Form */}
                        <div className="bg-gradient-to-br from-[#4EB8B9] to-teal-600 rounded-2xl shadow-lg p-8 text-white">
                            <div className="flex items-start mb-4">
                                <MessageSquare size={32} className="mr-4 mt-1 opacity-80" />
                                <div>
                                    <h2 className="text-2xl font-bold mb-1">Have an Idea?</h2>
                                    <p className="opacity-90">Suggest an event or initiative for our chapter.</p>
                                </div>
                            </div>
                            <form onSubmit={handleSuggestEvent} className="relative">
                                <textarea 
                                    value={suggestion}
                                    onChange={(e) => setSuggestion(e.target.value)}
                                    placeholder="I think we should organize a..."
                                    className="w-full bg-white/10 border border-white/30 rounded-xl p-4 text-white placeholder-white/50 focus:outline-none focus:bg-white/20 transition h-32 resize-none"
                                    required
                                ></textarea>
                                <button type="submit" className="absolute bottom-4 right-4 bg-white text-teal-700 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-100 transition flex items-center">
                                    Send <Send size={14} className="ml-2" />
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right Column / Sidebar */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Host Info */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 text-center relative overflow-hidden">
                            <div className="h-20 bg-[#F47C20] absolute top-0 left-0 w-full"></div>
                            <div className="relative z-10">
                                <div className="w-24 h-24 rounded-full border-4 border-white mx-auto shadow-md bg-white flex items-center justify-center text-3xl font-bold text-[#F47C20]">
                                    {club.lead?.name.charAt(0) || "L"}
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mt-3">{club.lead?.name || "Chapter Lead"}</h3>
                                <p className="text-[#F47C20] text-xs font-bold uppercase tracking-wide mb-3">Club Host</p>
                                <p className="text-gray-500 text-sm mb-6 italic">"{club.lead?.bio || "Dedicated to service and peace."}"</p>
                                <button className="w-full border border-gray-200 text-gray-600 py-2 rounded-lg font-bold text-sm hover:bg-gray-50 transition flex items-center justify-center">
                                    <Mail size={16} className="mr-2" /> Contact Host
                                </button>
                            </div>
                        </div>

                        {/* Join CTA */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                             <h3 className="font-bold text-gray-800 mb-4">Become a Member</h3>
                             <p className="text-sm text-gray-500 mb-6">Join {club.members} other youth leaders in {club.location.split(',')[0]} and start your journey.</p>
                             <button className="w-full bg-[#F47C20] text-white py-3 rounded-xl font-bold shadow-lg hover:bg-orange-600 transition transform hover:-translate-y-1">
                                Join This Chapter
                             </button>
                        </div>

                        {/* Upcoming Club Events */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                            <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                                <Calendar size={18} className="mr-2 text-[#FDB913]" /> Upcoming Events
                            </h3>
                            <div className="space-y-4">
                                {clubEvents.map(event => (
                                    <div 
                                        key={event.id} 
                                        onClick={() => handleOpenEventModal(event)}
                                        className="flex gap-3 border-b border-gray-50 last:border-0 pb-3 last:pb-0 cursor-pointer group hover:bg-gray-50 p-2 rounded-lg transition"
                                    >
                                        <div className="bg-gray-100 group-hover:bg-white rounded-lg p-2 text-center min-w-[3rem] h-fit transition-colors">
                                            <span className="block text-lg font-bold text-gray-800 leading-none">{new Date(event.date).getDate()}</span>
                                            <span className="block text-[10px] font-bold text-gray-500 uppercase">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-gray-800 group-hover:text-[#F47C20] transition">{event.title}</h4>
                                            <p className="text-xs text-gray-500 mt-1">{event.time}</p>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase mt-2 inline-block ${event.type === 'Online' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}`}>
                                                {event.type}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            {/* Reusable Event Modal */}
            <EventDetailsModal 
                event={selectedEvent}
                isOpen={isEventModalVisible}
                onClose={handleCloseEventModal}
            />

            {/* Activity Lightbox Placeholder */}
            {activeActivityIndex !== null && (
                <div 
                    className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex items-center justify-center animate-fade-in"
                    onClick={closeLightbox}
                >
                    <button 
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 text-white/70 hover:text-white p-2"
                    >
                        <X size={32} />
                    </button>
                    
                    <div 
                        className="max-w-xl text-center text-white px-8"
                        onClick={(e) => e.stopPropagation()} 
                    >
                        <div className="w-full h-64 bg-gray-800 rounded-xl flex items-center justify-center mb-6">
                            <ImageIcon size={64} className="text-gray-600" />
                        </div>
                        <h3 className="text-2xl font-lemon">{PAST_ACTIVITIES[activeActivityIndex].title}</h3>
                        <p className="text-white/60 uppercase tracking-widest text-sm mt-1">{PAST_ACTIVITIES[activeActivityIndex].date}</p>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ClubDetails;
