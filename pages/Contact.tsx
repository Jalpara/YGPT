
import React, { useState } from 'react';
import { HandHeart, Handshake, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';
import { submitContactForm } from '../services/contactService';

const INTERESTS = ['Event Management', 'Social Media', 'Content Creation', 'Tree Plantation', 'Teaching'] as const;

const Contact: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'volunteer' | 'partner' | 'contact'>('volunteer');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [volunteerEmail, setVolunteerEmail] = useState('');
    const [interests, setInterests] = useState<string[]>([]);
    const [whyJoin, setWhyJoin] = useState('');
    const [organization, setOrganization] = useState('');
    const [contactPerson, setContactPerson] = useState('');
    const [role, setRole] = useState('');
    const [partnershipType, setPartnershipType] = useState('Corporate CSR');
    const [proposal, setProposal] = useState('');
    const [name, setName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [formSuccess, setFormSuccess] = useState<string | null>(null);

    const switchTab = (tab: 'volunteer' | 'partner' | 'contact') => {
        setActiveTab(tab);
        setFormError(null);
        setFormSuccess(null);
    };

    const beginSubmission = () => {
        setSubmitting(true);
        setFormError(null);
        setFormSuccess(null);
    };

    const handleVolunteerSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (submitting) return;
        beginSubmission();

        try {
            await submitContactForm({ type: 'volunteer', firstName, lastName, email: volunteerEmail, interests, whyJoin });
            setFirstName('');
            setLastName('');
            setVolunteerEmail('');
            setInterests([]);
            setWhyJoin('');
            setFormSuccess('Your volunteer application has been submitted.');
        } catch (error) {
            setFormError(error instanceof Error ? error.message : 'Failed to submit');
        } finally {
            setSubmitting(false);
        }
    };

    const handlePartnerSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (submitting) return;
        beginSubmission();

        try {
            await submitContactForm({ type: 'partner', organization, contactPerson, role, partnershipType, proposal });
            setOrganization('');
            setContactPerson('');
            setRole('');
            setPartnershipType('Corporate CSR');
            setProposal('');
            setFormSuccess('Your partnership inquiry has been submitted.');
        } catch (error) {
            setFormError(error instanceof Error ? error.message : 'Failed to submit');
        } finally {
            setSubmitting(false);
        }
    };

    const handleContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (submitting) return;
        beginSubmission();

        try {
            await submitContactForm({ type: 'contact', name, email: contactEmail, subject, message });
            setName('');
            setContactEmail('');
            setSubject('');
            setMessage('');
            setFormSuccess('Your message has been sent.');
        } catch (error) {
            setFormError(error instanceof Error ? error.message : 'Failed to submit');
        } finally {
            setSubmitting(false);
        }
    };

    const renderStatus = () => (
        <>
            {formError && <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{formError}</p>}
            {formSuccess && <p role="status" className="rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-700">{formSuccess}</p>}
        </>
    );

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
                    <form onSubmit={handleVolunteerSubmit} className="space-y-6 animate-fade-in">
                        <h3 className="text-2xl font-lemon text-[#00A651] mb-4">Volunteer Application</h3>
                        {renderStatus()}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                                <input value={firstName} onChange={(event) => setFirstName(event.target.value)} required type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#00A651] outline-none transition" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                                <input value={lastName} onChange={(event) => setLastName(event.target.value)} required type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#00A651] outline-none transition" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                            <input value={volunteerEmail} onChange={(event) => setVolunteerEmail(event.target.value)} required type="email" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#00A651] outline-none transition" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Area of Interest</label>
                            <div className="flex flex-wrap gap-4">
                                {INTERESTS.map((interest) => (
                                    <label key={interest} className="flex items-center space-x-2 bg-white border border-gray-200 px-4 py-2 rounded-full cursor-pointer hover:border-[#00A651] transition">
                                        <input
                                            checked={interests.includes(interest)}
                                            onChange={(event) => setInterests((current) => (
                                                event.target.checked
                                                    ? [...current, interest]
                                                    : current.filter((item) => item !== interest)
                                            ))}
                                            type="checkbox"
                                            className="rounded text-[#00A651] focus:ring-[#00A651]"
                                        />
                                        <span className="text-sm">{interest}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Why do you want to join YGPT?</label>
                            <textarea value={whyJoin} onChange={(event) => setWhyJoin(event.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 h-32 resize-none focus:ring-2 focus:ring-[#00A651] outline-none transition"></textarea>
                        </div>
                        <button disabled={submitting} className="w-full bg-[#00A651] text-white font-bold py-4 rounded-lg hover:bg-green-700 transition shadow-lg transform hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-70">
                            {submitting ? 'Submitting...' : 'Submit Application'}
                        </button>
                    </form>
                );
            case 'partner':
                return (
                    <form onSubmit={handlePartnerSubmit} className="space-y-6 animate-fade-in">
                        <h3 className="text-2xl font-lemon text-[#936FB1] mb-4">Partnership Inquiry</h3>
                        {renderStatus()}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Organization Name</label>
                            <input value={organization} onChange={(event) => setOrganization(event.target.value)} required type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#936FB1] outline-none transition" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Contact Person</label>
                                <input value={contactPerson} onChange={(event) => setContactPerson(event.target.value)} required type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#936FB1] outline-none transition" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Role/Title</label>
                                <input value={role} onChange={(event) => setRole(event.target.value)} type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#936FB1] outline-none transition" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Partnership Type</label>
                            <select value={partnershipType} onChange={(event) => setPartnershipType(event.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#936FB1] outline-none transition">
                                <option>Corporate CSR</option>
                                <option>Educational Institution</option>
                                <option>NGO Collaboration</option>
                                <option>Event Sponsorship</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Proposal Message</label>
                            <textarea value={proposal} onChange={(event) => setProposal(event.target.value)} required className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 h-32 resize-none focus:ring-2 focus:ring-[#936FB1] outline-none transition"></textarea>
                        </div>
                        <button disabled={submitting} className="w-full bg-[#936FB1] text-white font-bold py-4 rounded-lg hover:bg-purple-700 transition shadow-lg transform hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-70">
                            {submitting ? 'Submitting...' : 'Send Proposal'}
                        </button>
                    </form>
                );
            case 'contact':
            default:
                return (
                    <form onSubmit={handleContactSubmit} className="space-y-6 animate-fade-in">
                        <h3 className="text-2xl font-lemon text-[#F47C20] mb-4">General Inquiry</h3>
                        {renderStatus()}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Your Name</label>
                                <input value={name} onChange={(event) => setName(event.target.value)} required type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#F47C20] outline-none transition" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                                <input value={contactEmail} onChange={(event) => setContactEmail(event.target.value)} required type="email" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#F47C20] outline-none transition" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                            <input value={subject} onChange={(event) => setSubject(event.target.value)} required type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#F47C20] outline-none transition" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                            <textarea value={message} onChange={(event) => setMessage(event.target.value)} required className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 h-32 resize-none focus:ring-2 focus:ring-[#F47C20] outline-none transition"></textarea>
                        </div>
                        <button disabled={submitting} className="w-full bg-[#F47C20] text-white font-bold py-4 rounded-lg hover:bg-orange-600 transition shadow-lg transform hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-70">
                            {submitting ? 'Submitting...' : 'Send Message'}
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
                                onClick={() => switchTab('volunteer')}
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
                                onClick={() => switchTab('partner')}
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
                                onClick={() => switchTab('contact')}
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
                                <div className="flex items-center"><Mail size={16} className="mr-3 text-[#FDB913]"/> info@ygpt.in</div>
                                <div className="flex items-center"><Phone size={16} className="mr-3 text-[#FDB913]"/> +91 9136992712</div>
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
