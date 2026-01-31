
import React, { useState, useEffect } from 'react';
import { Youtube, Video, X, ExternalLink, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotificationManager: React.FC = () => {
    const [activeNotification, setActiveNotification] = useState<'prayer' | 'seminar' | null>(null);

    const checkSchedule = () => {
        const now = new Date();
        const utcDay = now.getUTCDay();
        const utcHour = now.getUTCHours();
        const utcMinute = now.getUTCMinutes();

        // Convert UTC to IST (UTC + 5:30) roughly for logic check
        // Or simpler: check exact UTC times
        // Thursday 10:30 PM IST = 17:00 UTC
        // Saturday 10:00 AM IST = 04:30 UTC

        // Check for Thursday Prayer (Thursday 17:00 UTC - let's say active for 2 hours)
        if (utcDay === 4 && utcHour >= 17 && utcHour < 19) {
            setActiveNotification('prayer');
            return;
        }

        // Check for Seminar (Saturday 04:30 UTC to 06:30 UTC)
        if (utcDay === 6 && ((utcHour === 4 && utcMinute >= 30) || (utcHour === 5) || (utcHour === 6 && utcMinute <= 30))) {
            setActiveNotification('seminar');
            return;
        }

        // Default: No notification if not in time slot
        // Commenting out setActiveNotification(null) to allow manual testing override to persist for a bit
    };

    useEffect(() => {
        // Check initially
        checkSchedule();
        
        // Check every minute
        const interval = setInterval(checkSchedule, 60000);

        // Event listeners for test buttons
        const handleTestPrayer = () => setActiveNotification('prayer');
        const handleTestSeminar = () => setActiveNotification('seminar');

        window.addEventListener('test-notification-prayer', handleTestPrayer);
        window.addEventListener('test-notification-seminar', handleTestSeminar);

        return () => {
            clearInterval(interval);
            window.removeEventListener('test-notification-prayer', handleTestPrayer);
            window.removeEventListener('test-notification-seminar', handleTestSeminar);
        };
    }, []);

    if (!activeNotification) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[60] animate-fade-in-up max-w-sm w-full mx-auto px-4 md:px-0">
            {activeNotification === 'prayer' && (
                <div className="bg-[#936FB1] text-white p-4 rounded-2xl shadow-2xl border border-white/20 relative overflow-hidden backdrop-blur-md">
                    <div className="absolute top-0 right-0 p-2">
                        <button onClick={() => setActiveNotification(null)} className="text-white/70 hover:text-white transition">
                            <X size={16} />
                        </button>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="bg-white/20 p-3 rounded-full animate-pulse">
                            <Youtube size={24} />
                        </div>
                        <div>
                            <span className="text-xs font-bold bg-[#FDB913] text-[#333] px-2 py-0.5 rounded uppercase mb-1 inline-block">Live Now</span>
                            <h4 className="font-lemon text-lg leading-tight mb-1">Weekly Global Prayer</h4>
                            <p className="text-xs text-white/80 mb-3">Join us for collective peace meditation.</p>
                            <a 
                                href="https://youtu.be/0lpi7-xAc7g" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-xs font-bold bg-white text-[#936FB1] px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                            >
                                Join on YouTube <ExternalLink size={12} className="ml-2" />
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {activeNotification === 'seminar' && (
                <div className="bg-[#F47C20] text-white p-4 rounded-2xl shadow-2xl border border-white/20 relative overflow-hidden backdrop-blur-md">
                    <div className="absolute top-0 right-0 p-2">
                        <button onClick={() => setActiveNotification(null)} className="text-white/70 hover:text-white transition">
                            <X size={16} />
                        </button>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="bg-white/20 p-3 rounded-full animate-pulse">
                            <Video size={24} />
                        </div>
                        <div>
                            <span className="text-xs font-bold bg-white text-[#F47C20] px-2 py-0.5 rounded uppercase mb-1 inline-block">Live Seminar</span>
                            <h4 className="font-lemon text-lg leading-tight mb-1">Youth Development</h4>
                            <p className="text-xs text-white/80 mb-3">Interactive session in progress.</p>
                            <a 
                                href="https://zoom.us" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-xs font-bold bg-[#333] text-white px-4 py-2 rounded-lg hover:bg-black transition"
                            >
                                Join Zoom Meeting <ExternalLink size={12} className="ml-2" />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationManager;
