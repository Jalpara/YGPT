
import React from 'react';
import { Link } from 'react-router-dom';
import { Map, Home, Info, Heart, Users, Leaf, Shield, FileText, Calendar, PlayCircle, Mail } from 'lucide-react';

const Sitemap: React.FC = () => {
    const sections = [
        {
            title: "Main",
            icon: <Home size={20} className="text-[#F47C20]" />,
            links: [
                { name: "Home", path: "/" },
                { name: "New to YGPT?", path: "/new" },
                { name: "Get Involved", path: "/get-involved" },
                { name: "Contact Us", path: "/contact" }
            ]
        },
        {
            title: "Who We Are",
            icon: <Info size={20} className="text-[#FDB913]" />,
            links: [
                { name: "Our Story", path: "/about" },
                { name: "Our Founder", path: "/founder" },
                { name: "Meet My Maitreya", path: "/meet-my-maitreya" },
                { name: "Our Impact", path: "/impact" }
            ]
        },
        {
            title: "Our Verticals",
            icon: <Heart size={20} className="text-[#00A651]" />,
            links: [
                { name: "Share Some Love", path: "/share-some-love" },
                { name: "Youth Development", path: "/youth-development" },
                { name: "Earth Embrace", path: "/earth-embrace" }
            ]
        },
        {
            title: "Community & Activities",
            icon: <Users size={20} className="text-[#936FB1]" />,
            links: [
                { name: "Global Chapters (Clubs)", path: "/clubs" },
                { name: "Events Calendar", path: "/events" },
                { name: "Transform (LMS)", path: "/transform" },
                { name: "Member Creations", path: "/fan-art" }
            ]
        },
        {
            title: "Resources & Legal",
            icon: <FileText size={20} className="text-[#4EB8B9]" />,
            links: [
                { name: "Brand Guidelines", path: "/brand" },
                { name: "Privacy Policy", path: "/privacy" },
                { name: "Terms of Service", path: "/terms" },
                { name: "Cookie Policy", path: "/cookies" }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-20 animate-fade-in">
            {/* Header */}
            <div className="bg-[#333] text-white py-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/5 opacity-50 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex p-4 rounded-full bg-white/10 backdrop-blur-md mb-6 text-[#FDB913]">
                        <Map size={40} />
                    </div>
                    <h1 className="font-lemon text-4xl md:text-5xl mb-4">Sitemap</h1>
                    <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
                        Navigate through every corner of the YGPT universe.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-8 relative z-20 max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sections.map((section, idx) => (
                        <div key={idx} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
                            <div className="flex items-center mb-6 border-b border-gray-100 pb-4">
                                <div className="p-2 bg-gray-50 rounded-lg mr-3">
                                    {section.icon}
                                </div>
                                <h2 className="font-lemon text-xl text-gray-800">{section.title}</h2>
                            </div>
                            <ul className="space-y-3">
                                {section.links.map((link, linkIdx) => (
                                    <li key={linkIdx}>
                                        <Link 
                                            to={link.path} 
                                            className="text-gray-600 hover:text-[#F47C20] hover:translate-x-1 transition-all duration-200 block text-sm font-medium flex items-center"
                                        >
                                            <span className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-3 group-hover:bg-[#F47C20] transition-colors"></span>
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sitemap;
