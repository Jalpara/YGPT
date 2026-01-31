
import React, { useState } from 'react';
import { MapPin, Calendar as CalendarIcon, Clock, Search, Filter, Grid, List, ChevronLeft, ChevronRight, ChevronDown, ExternalLink, X } from 'lucide-react';
import { EVENTS_DATA } from '../constants';
import { Event } from '../types';
import EventDetailsModal from '../components/EventDetailsModal';

const Events: React.FC = () => {
    const [viewMode, setViewMode] = useState<'grid' | 'list' | 'calendar'>('calendar');
    const [filterType, setFilterType] = useState<'All' | 'Online' | 'Offline'>('All');
    const [sortOption, setSortOption] = useState<'date-asc' | 'date-desc' | 'alpha'>('date-asc');
    const [searchTerm, setSearchTerm] = useState('');
    const [calendarDate, setCalendarDate] = useState(new Date());
    
    // Modal state
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleOpenModal = (event: Event) => {
        setSelectedEvent(event);
        setIsModalVisible(true);
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
            const dateObj = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), i);
            const currentDateStr = dateObj.toISOString().split('T')[0];
            
            // Get existing events
            let dayEvents = sortedEvents.filter(e => e.date === currentDateStr);

            // Recursively add Weekly Prayer on Thursdays if not present in the static list for this date
            if (dateObj.getDay() === 4) { // 4 is Thursday
                const hasPrayer = dayEvents.some(e => e.title === 'Weekly Global Prayer');
                if (!hasPrayer) {
                    dayEvents.push({
                        id: `prayer-${currentDateStr}`,
                        title: 'Weekly Global Prayer',
                        date: currentDateStr,
                        time: '10:30 PM IST',
                        location: 'YouTube Live',
                        type: 'Online',
                        description: 'Join us every Thursday for a powerful session of collective prayer and meditation to send positive vibrations to the world. Link: https://youtu.be/0lpi7-xAc7g'
                    });
                }
            }
            
            // Filter again if needed based on current view filters (e.g. if user selected "Offline" only, don't show online prayer)
            if (filterType !== 'All') {
                dayEvents = dayEvents.filter(e => e.type === filterType);
            }

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
                                className={`text-[10px] md:text-xs px-1 py-0.5 rounded truncate font-medium cursor-pointer hover:text-white transition ${
                                    ev.title === 'Weekly Global Prayer' 
                                    ? 'bg-[#936FB1]/10 text-[#936FB1] hover:bg-[#936FB1]' 
                                    : 'bg-[#F47C20]/10 text-[#F47C20] hover:bg-[#F47C20]'
                                }`}
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

                {/* Reusable Event Details Modal */}
                <EventDetailsModal 
                    event={selectedEvent} 
                    isOpen={isModalVisible} 
                    onClose={handleCloseModal} 
                />
            </div>
        </div>
    );
}

export default Events;
