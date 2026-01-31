
import React, { useState } from 'react';
import { MapPin, Search, Filter, Calendar as CalendarIcon, Users, ChevronDown, X, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CLUBS_DATA, EVENTS_DATA } from '../constants';
import StartChapterModal from '../components/StartChapterModal';

const Clubs: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState<'members' | 'alpha'>('members');
    const [isStartChapterModalOpen, setIsStartChapterModalOpen] = useState(false);

    // Filter & Sort
    const filteredClubs = CLUBS_DATA.filter(club => 
        club.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        club.location.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => {
        if (sortOption === 'members') return b.members - a.members;
        if (sortOption === 'alpha') return a.name.localeCompare(b.name);
        return 0;
    });

    const getClubColor = (id: string) => {
        const colors = ['bg-[#F47C20]', 'bg-[#FDB913]', 'bg-[#936FB1]', 'bg-[#4EB8B9]', 'bg-[#00A651]'];
        return colors[parseInt(id) % colors.length];
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-12 pb-20">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-8">
                     <div>
                        <h1 className="text-4xl font-lemon text-[#FDB913] mb-2">Global Chapters</h1>
                        <p className="text-gray-500">Connect with a YGPT family near you.</p>
                     </div>
                     <button 
                        onClick={() => setIsStartChapterModalOpen(true)}
                        className="hidden md:block bg-[#F47C20] text-white px-6 py-2 rounded-lg font-bold shadow-lg hover:bg-orange-600 transition"
                    >
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
                                    <div className={`h-48 relative flex items-center justify-center ${getClubColor(club.id)}`}>
                                        <Users size={64} className="text-white opacity-50" />
                                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-gray-700 flex items-center shadow-sm">
                                            <Users size={12} className="mr-1"/> {club.members}
                                        </div>
                                    </div>
                                    <div className="p-5 flex-1 flex flex-col">
                                        <h3 className="font-bold text-lg text-gray-800 mb-1">{club.name}</h3>
                                        <div className="flex items-center text-gray-500 text-sm mb-4">
                                            <MapPin size={14} className="mr-1" /> {club.location}
                                        </div>
                                        <Link to={`/clubs/${club.id}`} className="mt-auto w-full border border-[#FDB913] text-[#FDB913] font-bold py-2 rounded-lg hover:bg-[#FDB913] hover:text-white transition text-center block">
                                            View Details
                                        </Link>
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
                            <Link to="/events" className="w-full block text-center mt-5 bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold py-2 rounded-lg text-xs uppercase tracking-wide transition">
                                View Full Calendar
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Start a Chapter Modal */}
            <StartChapterModal 
                isOpen={isStartChapterModalOpen}
                onClose={() => setIsStartChapterModalOpen(false)}
            />
        </div>
    );
};

export default Clubs;
