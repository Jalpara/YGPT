
import React, { useState } from 'react';
import { HandHeart, Handshake, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'volunteer' | 'partner' | 'contact'>('volunteer');

    const getHeroColorClass = () => {
        switch (activeTab) {
            case 'volunteer': return 'bg-[#00A651]';
            case 'partner': return 'bg-[#936FB1]';
            case 'contact': return 'bg-[#F47C20]';
            default: return 'bg-[#333333]';
        }
    };

    const getHeroContent = () => {
        switch (activeTab) {
            case 'volunteer': return { title: "Join The Movement", subtitle: "Become a volunteer and be the change you wish to see." };
            case 'partner': return { title: "Partner With Us", subtitle: "Let's collaborate to create a bigger impact together." };
            case 'contact': return { title: "Get in Touch", subtitle: "We'd love to hear from you. Reach out with any questions." };
            default: return { title: "Get Involved", subtitle: "Whether you want to volunteer, partner with us, or just say hello." };
        }
    };

    const content = getHeroContent();

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
            {/* Header - Dynamic Background */}
            <div className={`${getHeroColorClass()} text-white py-20 relative overflow-hidden transition-colors duration-500 ease-in-out`}>
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
                {/* Decorative background pattern */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                
                <div className="container mx-auto px-4 relative z-10 text-center animate-fade-in">
                    <h1 className="font-lemon text-5xl mb-6 drop-shadow-sm">{content.title}</h1>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto font-medium">
                        {content.subtitle}
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

export default Contact;
