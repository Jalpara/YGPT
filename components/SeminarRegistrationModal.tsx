
import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Loader2 } from 'lucide-react';

interface SeminarRegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SeminarRegistrationModal: React.FC<SeminarRegistrationModalProps> = ({ isOpen, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            setIsSuccess(false);
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300);
            document.body.style.overflow = 'unset';
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSuccess(true);
        setTimeout(() => {
            onClose();
        }, 2000);
    };

    if (!isOpen && !isVisible) return null;

    return (
        <div 
            className={`fixed inset-0 z-[70] flex items-center justify-center p-4 transition-all duration-500 ${isOpen ? 'bg-black/60 backdrop-blur-sm opacity-100' : 'bg-black/0 opacity-0 pointer-events-none'}`}
            onClick={onClose}
        >
            <div 
                className={`bg-white rounded-3xl shadow-2xl w-full max-w-md relative transition-all duration-500 transform ${isOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-8 opacity-0'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 p-2 rounded-full text-gray-500 transition z-10"
                >
                    <X size={20} />
                </button>

                <div className="p-8">
                    {isSuccess ? (
                        <div className="text-center py-10">
                            <div className="w-20 h-20 bg-green-100 text-[#00A651] rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                                <CheckCircle size={40} />
                            </div>
                            <h3 className="font-lemon text-2xl text-gray-800 mb-2">You're All Set!</h3>
                            <p className="text-gray-500">Your attendance has been recorded successfully.</p>
                        </div>
                    ) : (
                        <>
                            <h2 className="font-lemon text-2xl text-[#F47C20] mb-2">Seminar Registration</h2>
                            <p className="text-sm text-gray-500 mb-6">Mark your attendance for the upcoming or ongoing session.</p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Full Name</label>
                                    <input required type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#F47C20]" placeholder="Enter your name" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email</label>
                                    <input required type="email" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#F47C20]" placeholder="your@email.com" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Institution / College</label>
                                    <input required type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#F47C20]" placeholder="University Name" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Select Session</label>
                                    <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#F47C20]">
                                        <option>Youth Development - Core Fundamentals</option>
                                        <option>Leadership Skills Workshop</option>
                                        <option>Emotional Intelligence Masterclass</option>
                                    </select>
                                </div>
                                
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="w-full bg-[#F47C20] text-white font-bold py-4 rounded-xl hover:bg-orange-600 transition shadow-lg mt-4 flex justify-center items-center"
                                >
                                    {isSubmitting ? <Loader2 className="animate-spin" /> : 'Register / Mark Attendance'}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SeminarRegistrationModal;
