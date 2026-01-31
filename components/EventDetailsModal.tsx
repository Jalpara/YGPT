
import React, { useEffect, useState } from 'react';
import { X, Calendar as CalendarIcon, Clock, MapPin, ExternalLink, Video, Star } from 'lucide-react';
import { Event } from '../types';

interface EventDetailsModalProps {
    event: Event | null;
    isOpen: boolean;
    onClose: () => void;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ event, isOpen, onClose }) => {
    const [prayerCountdown, setPrayerCountdown] = useState<string>('');
    const [isPrayerJoinable, setIsPrayerJoinable] = useState(false);
    const [extractedLink, setExtractedLink] = useState<string | null>(null);
    
    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    // Link extraction
    useEffect(() => {
        if (event) {
            const urlRegex = /(https?:\/\/[^\s]+)/g;
            const match = event.description.match(urlRegex);
            if (match) {
                setExtractedLink(match[0]);
            } else {
                setExtractedLink(null);
            }
        }
    }, [event]);

    // Countdown logic for Weekly Global Prayer
    useEffect(() => {
        if (!event || event.title !== 'Weekly Global Prayer' || !isOpen) return;

        const updateCountdown = () => {
            let targetDate: Date;
            try {
                // Attempt to parse IST time string "10:30 PM IST" + YYYY-MM-DD
                const timeParts = event.time.match(/(\d+):(\d+)\s*(AM|PM)/i);
                if (timeParts) {
                    let hours = parseInt(timeParts[1]);
                    const minutes = parseInt(timeParts[2]);
                    const period = timeParts[3].toUpperCase();
                    
                    if (period === 'PM' && hours !== 12) hours += 12;
                    if (period === 'AM' && hours === 12) hours = 0;
                    
                    // Create ISO string with IST offset (+05:30)
                    // Assumption: event.date is YYYY-MM-DD
                    const isoString = `${event.date}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00+05:30`;
                    targetDate = new Date(isoString);
                } else {
                    // Fallback
                    targetDate = new Date(`${event.date} ${event.time}`);
                }
            } catch (e) {
                setPrayerCountdown('Check Schedule');
                return;
            }

            const now = new Date();
            const diff = targetDate.getTime() - now.getTime();
            const fiveMinutesMs = 5 * 60 * 1000;
            // Assume event lasts 1 hour for "Active" status before showing "Ended"
            const eventDurationMs = 60 * 60 * 1000; 

            if (diff > fiveMinutesMs) {
                setIsPrayerJoinable(false);
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const s = Math.floor((diff % (1000 * 60)) / 1000);
                
                let cd = 'Starts in ';
                if (days > 0) cd += `${days}d `;
                cd += `${h}h ${m}m ${s}s`;
                setPrayerCountdown(cd);
            } else if (diff <= fiveMinutesMs && diff > -eventDurationMs) {
                setIsPrayerJoinable(true);
                setPrayerCountdown("Join Now");
            } else {
                setIsPrayerJoinable(false);
                setPrayerCountdown("Event Ended");
            }
        };

        updateCountdown(); // Initial call
        const timer = setInterval(updateCountdown, 1000);
        
        return () => clearInterval(timer);
    }, [event, isOpen]);

    if (!event) return null;

    const isPrayer = event.title === 'Weekly Global Prayer';

    const handleJoinPrayer = () => {
        if (extractedLink) {
            window.open(extractedLink, '_blank');
        } else {
            // Fallback if no link found in description
            window.open('https://www.youtube.com/results?search_query=YGPT+Prayer', '_blank');
        }
    };

    return (
        <div 
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={onClose}
        >
            <div 
                className={`bg-white text-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden relative flex flex-col max-h-[90vh] transition-all duration-300 transform ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}`}
                onClick={(e) => e.stopPropagation()}
            >
                 <div className={`relative h-48 flex-shrink-0 flex items-center justify-center ${event.type === 'Online' ? 'bg-[#4EB8B9]' : 'bg-[#F47C20]'}`}>
                     <Star size={80} className="text-white opacity-20" />
                     <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 p-2 rounded-full text-white transition z-10"
                    >
                        <X size={20} />
                    </button>
                    <div className="absolute bottom-4 left-6">
                         <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide mb-2 inline-block ${
                            event.type === 'Online' ? 'bg-green-500 text-white' : 'bg-purple-500 text-white'
                        }`}>
                            {event.type}
                        </span>
                        <h2 className="text-3xl font-lemon text-white drop-shadow-md">{event.title}</h2>
                    </div>
                 </div>
                 
                 <div className="p-8 overflow-y-auto custom-scrollbar">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                         <div className="flex items-start">
                             <CalendarIcon className="text-[#F47C20] mr-4 mt-1" size={24} />
                             <div>
                                 <p className="text-xs text-gray-400 uppercase font-bold">Date</p>
                                 <p className="text-lg font-bold">{new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                             </div>
                         </div>
                         <div className="flex items-start">
                             <Clock className="text-[#F47C20] mr-4 mt-1" size={24} />
                             <div>
                                 <p className="text-xs text-gray-400 uppercase font-bold">Time</p>
                                 <p className="text-lg font-bold">{event.time}</p>
                             </div>
                         </div>
                         <div className="flex items-start md:col-span-2">
                             <MapPin className="text-[#4EB8B9] mr-4 mt-1" size={24} />
                             <div>
                                 <p className="text-xs text-gray-400 uppercase font-bold">Location</p>
                                 <p className="text-lg font-bold">{event.location}</p>
                                 {event.type === 'Offline' && (
                                    <a href="#" className="text-[#4EB8B9] text-sm flex items-center hover:underline mt-1">
                                        View on Map <ExternalLink size={12} className="ml-1" />
                                    </a>
                                 )}
                             </div>
                         </div>
                     </div>

                     <div className="mb-8">
                         <h4 className="font-bold text-xl mb-3 border-b border-gray-100 pb-2 text-[#333]">About This Event</h4>
                         <p className="text-gray-600 leading-relaxed text-lg">{event.description}</p>
                         <p className="text-gray-500 mt-4 leading-relaxed">
                            Join us for an immersive experience designed to uplift your spirit and connect you with like-minded individuals. 
                            Don't miss this opportunity to be part of the change.
                         </p>
                     </div>

                     <div className="flex gap-4 mt-auto">
                         {isPrayer ? (
                             <button 
                                className={`flex-1 py-4 rounded-xl font-bold text-lg shadow-lg transition transform flex items-center justify-center ${isPrayerJoinable ? 'bg-[#F47C20] hover:bg-orange-600 text-white hover:-translate-y-1' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                                disabled={!isPrayerJoinable}
                                onClick={handleJoinPrayer}
                             >
                                 {isPrayerJoinable ? (
                                     <>
                                        <Video size={20} className="mr-2" /> Join Now
                                     </>
                                 ) : (
                                     <>
                                        <Clock size={20} className="mr-2" /> {prayerCountdown}
                                     </>
                                 )}
                             </button>
                         ) : (
                             <button className="flex-1 bg-[#F47C20] hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg transition transform hover:-translate-y-1">
                                 Register Now
                             </button>
                         )}
                         
                         <button className="px-6 py-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition font-bold text-gray-600">
                             Share
                         </button>
                     </div>
                 </div>
            </div>
        </div>
    );
};

export default EventDetailsModal;
