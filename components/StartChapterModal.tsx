import React, { useState, useEffect } from 'react';
import { X, Send, Loader2 } from 'lucide-react';

interface StartChapterModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const StartChapterModal: React.FC<StartChapterModalProps> = ({ isOpen, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300);
            document.body.style.overflow = 'unset';
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isOpen && !isVisible) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        onClose();
        alert("Application Sent! We will contact you soon.");
    };

    return (
        <div 
            className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-500 ${isOpen ? 'bg-black/60 backdrop-blur-sm opacity-100' : 'bg-black/0 opacity-0 pointer-events-none'}`}
            onClick={onClose}
        >
            <div 
                className={`bg-white rounded-3xl shadow-2xl w-full max-w-lg relative flex flex-col max-h-[90vh] transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) transform ${isOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-8 opacity-0'}`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button Absolute */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 p-2 rounded-full text-gray-500 transition z-10"
                >
                    <X size={20} />
                </button>

                {/* Header */}
                <div className="px-8 pt-10 pb-4 text-center">
                     <h2 className="text-2xl md:text-3xl font-lemon text-[#F47C20] mb-3 tracking-wide">Start a YGPT Chapter</h2>
                     <p className="text-gray-500 text-sm md:text-base px-4">
                        Be the beacon of light in your community. Fill out this form to get started.
                     </p>
                </div>

                {/* Scrollable Form */}
                <div className="px-8 pb-10 pt-2 overflow-y-auto custom-scrollbar">
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1.5 tracking-widest">Full Name</label>
                            <input 
                                type="text" 
                                required 
                                className="w-full px-4 py-3.5 rounded-xl bg-[#333] border-2 border-transparent text-white placeholder-gray-500 focus:ring-0 focus:border-[#F47C20] transition-all outline-none font-medium" 
                                placeholder="Your Name" 
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1.5 tracking-widest">Email</label>
                                <input 
                                    type="email" 
                                    required 
                                    className="w-full px-4 py-3.5 rounded-xl bg-[#333] border-2 border-transparent text-white placeholder-gray-500 focus:ring-0 focus:border-[#F47C20] transition-all outline-none font-medium" 
                                    placeholder="Email Address" 
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1.5 tracking-widest">Phone</label>
                                <input 
                                    type="tel" 
                                    className="w-full px-4 py-3.5 rounded-xl bg-[#333] border-2 border-transparent text-white placeholder-gray-500 focus:ring-0 focus:border-[#F47C20] transition-all outline-none font-medium" 
                                    placeholder="Phone Number" 
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1.5 tracking-widest">Proposed Location</label>
                            <input 
                                type="text" 
                                required 
                                className="w-full px-4 py-3.5 rounded-xl bg-[#333] border-2 border-transparent text-white placeholder-gray-500 focus:ring-0 focus:border-[#F47C20] transition-all outline-none font-medium" 
                                placeholder="City, University, or Organization" 
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1.5 tracking-widest">Why do you want to start a chapter?</label>
                            <textarea 
                                required 
                                className="w-full px-4 py-3.5 h-32 rounded-xl bg-[#333] border-2 border-transparent text-white placeholder-gray-500 focus:ring-0 focus:border-[#F47C20] transition-all outline-none resize-none font-medium" 
                                placeholder="Tell us your vision..."
                            ></textarea>
                        </div>
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full bg-[#F47C20] text-white font-bold py-4 rounded-xl hover:bg-orange-600 transition-all shadow-lg hover:shadow-[#F47C20]/30 transform hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-70 disabled:transform-none mt-2"
                        >
                            {isSubmitting ? <Loader2 className="animate-spin" /> : <Send size={20} />} 
                            {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default StartChapterModal;