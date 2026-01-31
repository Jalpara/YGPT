
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Users, Quote, Image as ImageIcon } from 'lucide-react';

const EDITION_DATA: Record<string, any> = {
    '2024': {
        year: '2024',
        theme: 'The Power of Love',
        location: 'ShantiKshetra Premgiri Ashram, Karjat',
        date: 'August 12, 2024',
        attendees: '5000+',
        description: 'MMM 2024 was a landmark event where thousands gathered to experience the tangible energy of unconditional love. The atmosphere was electric with devotion and the joy of reunion. Participants from over 15 countries joined hands to pledge for a world united by affection rather than divided by differences.',
        takeaways: [
            { title: "Love is Action", desc: "Love isn't just a feeling; it is the act of serving others without expectation. Every small act of kindness ripples out." },
            { title: "You are never alone", desc: "The Divine Friend is always walking beside you, guiding your every step through intuition and synchronicities." },
            { title: "Transformation is Now", desc: "Don't wait for a future moment. The decision to change happens in the present moment of awareness." }
        ],
        gallery: [
            "bg-[#F47C20]",
            "bg-[#FDB913]",
            "bg-[#936FB1]",
            "bg-[#4EB8B9]",
            "bg-[#00A651]",
            "bg-[#2563EB]"
        ],
        highlightQuote: "When you become love, you become the solution to every problem in the world.",
        heroColor: "bg-[#F47C20]"
    },
    '2023': {
        year: '2023',
        theme: 'Igniting the Inner Light',
        location: 'Mumbai',
        date: 'August 15, 2023',
        attendees: '3500+',
        description: 'Focused on self-discovery, MMM 2023 guided youth to look inward and find their own source of strength and guidance amidst a chaotic world. The sessions emphasized mental clarity and the power of silence.',
        takeaways: [
            { title: "Silence Speaks", desc: "In the silence of your heart, you will find the loudest answers. Daily meditation is the key." },
            { title: "Be the Light", desc: "Do not look for light outside; become the light for others through your conduct and character." },
            { title: "Purpose of Life", desc: "To know oneself is the ultimate purpose of human existence. Everything else is secondary." }
        ],
        gallery: [
            "bg-[#FDB913]",
            "bg-[#936FB1]",
            "bg-[#4EB8B9]",
            "bg-[#00A651]",
            "bg-[#2563EB]",
            "bg-[#F47C20]"
        ],
        highlightQuote: "Your inner light is strong enough to dispel the darkest ignorance.",
        heroColor: "bg-[#FDB913]"
    }
};

const MMMEdition: React.FC = () => {
    const { year } = useParams<{ year: string }>();
    const data = year ? EDITION_DATA[year] : null;

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 flex-col">
                <h2 className="text-3xl font-lemon text-gray-400 mb-4">Edition Not Found</h2>
                <Link to="/meet-my-maitreya" className="text-[#F47C20] font-bold hover:underline flex items-center">
                    <ArrowLeft size={20} className="mr-2"/> Return to MMM Overview
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white animate-fade-in">
            {/* Hero */}
            <div className={`relative h-[60vh] flex items-center justify-center overflow-hidden ${data.heroColor}`}>
                <div className="absolute inset-0 bg-black/10 z-10"></div>
                <div className="relative z-20 text-center text-white px-4 animate-fade-in-up">
                    <span className="block text-white/80 font-bold tracking-[0.3em] uppercase mb-4 text-sm md:text-base">Past Edition Archive</span>
                    <h1 className="font-lemon text-5xl md:text-7xl mb-4">MMM {data.year}</h1>
                    <p className="text-2xl md:text-3xl font-light italic opacity-90 font-serif">"{data.theme}"</p>
                </div>
            </div>

            {/* Content Container */}
            <div className="container mx-auto px-4 py-16 -mt-20 relative z-30">
                <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
                    
                    <Link to="/meet-my-maitreya" className="inline-flex items-center text-gray-500 hover:text-[#F47C20] mb-8 font-bold text-sm transition group">
                        <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Overview
                    </Link>

                    <div className="flex flex-col md:flex-row gap-12 mb-16">
                        <div className="md:w-2/3">
                            <h2 className="font-lemon text-3xl text-[#333] mb-6">A Gathering of Hearts</h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                {data.description}
                            </p>
                            <div className="flex flex-wrap gap-6 text-sm font-bold text-gray-500 uppercase tracking-wide bg-gray-50 p-6 rounded-xl border border-gray-100">
                                <span className="flex items-center"><Calendar size={18} className="mr-2 text-[#936FB1]" /> {data.date}</span>
                                <span className="flex items-center"><MapPin size={18} className="mr-2 text-[#F47C20]" /> {data.location}</span>
                                <span className="flex items-center"><Users size={18} className="mr-2 text-[#00A651]" /> {data.attendees} Attendees</span>
                            </div>
                        </div>
                        <div className="md:w-1/3 bg-[#FDB913]/10 rounded-2xl p-8 border border-[#FDB913]/20 flex flex-col justify-center text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 text-[#FDB913]/20 transform translate-x-1/4 -translate-y-1/4">
                                <Quote size={120} />
                            </div>
                            <p className="text-xl font-serif italic text-gray-800 leading-relaxed relative z-10">
                                "{data.highlightQuote}"
                            </p>
                            <div className="mt-6 w-16 h-1 bg-[#FDB913] mx-auto rounded-full"></div>
                        </div>
                    </div>

                    {/* Takeaways */}
                    <div className="mb-20">
                        <h3 className="font-lemon text-2xl text-[#936FB1] mb-10 text-center uppercase tracking-widest flex items-center justify-center">
                            <span className="w-8 h-px bg-gray-300 mr-4"></span>
                            Key Takeaways
                            <span className="w-8 h-px bg-gray-300 ml-4"></span>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {data.takeaways.map((item: any, idx: number) => (
                                <div key={idx} className="bg-gray-50 p-8 rounded-xl border-t-4 border-[#936FB1] hover:shadow-lg transition hover:-translate-y-1 duration-300">
                                    <div className="w-10 h-10 bg-[#936FB1] text-white rounded-full flex items-center justify-center font-bold mb-4 shadow-md">{idx + 1}</div>
                                    <h4 className="font-bold text-xl mb-3 text-gray-800">{item.title}</h4>
                                    <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Gallery */}
                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="font-lemon text-2xl text-[#F47C20] flex items-center">
                                <ImageIcon size={24} className="mr-3" /> Event Gallery
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {data.gallery.map((color: string, idx: number) => (
                                <div key={idx} className={`group relative aspect-[4/3] overflow-hidden rounded-xl cursor-pointer shadow-md ${color} flex items-center justify-center opacity-80 hover:opacity-100 transition`}>
                                    <ImageIcon size={48} className="text-white/50" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-4">
                                        <p className="text-white text-xs font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition duration-300 delay-100">View Memory</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default MMMEdition;
