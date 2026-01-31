
import React from 'react';
import { Heart, Users, Leaf, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const VerticalHeader: React.FC<{ title: string; subtitle: string; color: string; icon: React.ReactNode }> = ({ title, subtitle, color, icon }) => (
    <div className={`relative py-24 text-white overflow-hidden`} style={{ backgroundColor: color }}>
        <div className="absolute inset-0 bg-black/10"></div>
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="flex justify-center mb-6">
                <div className="p-4 bg-white/20 rounded-full backdrop-blur-md text-white">
                    {icon}
                </div>
            </div>
            <h1 className="font-lemon text-4xl md:text-6xl mb-4">{title}</h1>
            <p className="text-xl md:text-2xl font-light opacity-90 max-w-2xl mx-auto">{subtitle}</p>
        </div>
    </div>
);

const VerticalContent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Link to="/" className="inline-flex items-center text-gray-500 hover:text-gray-800 mb-8 font-bold text-sm transition">
            <ArrowLeft size={16} className="mr-2" /> Back to Home
        </Link>
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
            {children}
        </div>
    </div>
);

export const ShareSomeLove: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <VerticalHeader 
                title="Share Some Love" 
                subtitle="Humanity in Action" 
                color="#F47C20" 
                icon={<Heart size={48} fill="currentColor" />}
            />
            <VerticalContent>
                <div className="prose prose-lg text-gray-600 max-w-none">
                    <h2 className="font-lemon text-[#F47C20] text-3xl mb-6">Spreading Compassion</h2>
                    <p className="mb-6">
                        "Share Some Love" is our humanitarian vertical dedicated to serving the underprivileged and spreading the message of empathy through action. We believe that small acts of kindness, when multiplied by millions of people, can transform the world.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-8 my-10">
                        <div className="rounded-xl shadow-lg w-full h-64 bg-orange-100 flex items-center justify-center">
                            <Heart size={64} className="text-[#F47C20]" />
                        </div>
                        <div className="rounded-xl shadow-lg w-full h-64 bg-red-100 flex items-center justify-center">
                            <Users size={64} className="text-red-400" />
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Key Initiatives</h3>
                    <ul className="space-y-4 mb-8">
                        <li className="flex items-start">
                            <span className="bg-[#F47C20] p-1.5 rounded-full mt-1 mr-3 flex-shrink-0"></span>
                            <span><strong>Food for All:</strong> Regular food donation drives ensuring no one goes to sleep hungry in our served communities.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="bg-[#F47C20] p-1.5 rounded-full mt-1 mr-3 flex-shrink-0"></span>
                            <span><strong>Menstrual Hygiene:</strong> Distributing sanitary pads and conducting awareness sessions to break taboos.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="bg-[#F47C20] p-1.5 rounded-full mt-1 mr-3 flex-shrink-0"></span>
                            <span><strong>Winter Warmth:</strong> Blanket distribution drives during harsh winters for the homeless.</span>
                        </li>
                    </ul>

                    <div className="bg-orange-50 p-6 rounded-xl border-l-4 border-[#F47C20] mt-8">
                        <p className="italic font-medium text-gray-700">"Service to humanity is service to the Divine. Let us be the reason someone smiles today."</p>
                    </div>
                </div>
                <div className="mt-10 pt-6 border-t border-gray-100 flex justify-center">
                    <Link to="/get-involved" className="bg-[#F47C20] text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition shadow-lg inline-flex items-center">
                        Volunteer for Humanity <ArrowRight size={18} className="ml-2" />
                    </Link>
                </div>
            </VerticalContent>
        </div>
    );
};

export const YouthDevelopment: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <VerticalHeader 
                title="Youth Development" 
                subtitle="Empowering Future Leaders" 
                color="#FDB913" 
                icon={<Users size={48} />}
            />
            <VerticalContent>
                <div className="prose prose-lg text-gray-600 max-w-none">
                    <h2 className="font-lemon text-[#FDB913] text-3xl mb-6">Building Tomorrow, Today</h2>
                    <p className="mb-6">
                        Our "Youth Development" vertical focuses on the holistic growth of young individuals. We bridge the gap between academic education and life skills, fostering emotional intelligence, spiritual grounding, and leadership qualities.
                    </p>

                    <div className="bg-yellow-50 rounded-2xl p-8 mb-10">
                        <h3 className="font-bold text-xl text-gray-800 mb-4">Our Approach</h3>
                        <p>
                            We utilize a unique blend of modern psychological tools and ancient spiritual wisdom to help youth navigate anxiety, career pressure, and relationship issues.
                        </p>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Core Programs</h3>
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="border border-gray-200 p-6 rounded-xl">
                            <h4 className="font-bold text-lg text-[#FDB913] mb-2">Transformational Seminars</h4>
                            <p className="text-sm">Interactive workshops in universities covering stress management, focus, and purpose.</p>
                        </div>
                        <div className="border border-gray-200 p-6 rounded-xl">
                            <h4 className="font-bold text-lg text-[#FDB913] mb-2">Leadership Retreats</h4>
                            <p className="text-sm">Intensive residential programs designed to awaken the inner leader.</p>
                        </div>
                        <div className="border border-gray-200 p-6 rounded-xl">
                            <h4 className="font-bold text-lg text-[#FDB913] mb-2">Digital Detox</h4>
                            <p className="text-sm">Campaigns promoting healthy relationships with technology.</p>
                        </div>
                        <div className="border border-gray-200 p-6 rounded-xl">
                            <h4 className="font-bold text-lg text-[#FDB913] mb-2">Mentorship Network</h4>
                            <p className="text-sm">Connecting students with accomplished professionals for guidance.</p>
                        </div>
                    </div>
                </div>
                <div className="mt-10 pt-6 border-t border-gray-100 flex justify-center">
                    <Link to="/transform" className="bg-[#FDB913] text-[#333] px-8 py-3 rounded-full font-bold hover:bg-yellow-400 transition shadow-lg inline-flex items-center">
                        Access Learning Modules <ArrowRight size={18} className="ml-2" />
                    </Link>
                </div>
            </VerticalContent>
        </div>
    );
};

export const EarthEmbrace: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <VerticalHeader 
                title="Earth Embrace" 
                subtitle="Healing Our Planet" 
                color="#00A651" 
                icon={<Leaf size={48} />}
            />
            <VerticalContent>
                <div className="prose prose-lg text-gray-600 max-w-none">
                    <h2 className="font-lemon text-[#00A651] text-3xl mb-6">For A Greener Future</h2>
                    <p className="mb-6">
                        "Earth Embrace" is our commitment to Mother Earth. We recognize that human well-being is intrinsically linked to the health of our planet. This vertical drives action-oriented initiatives to restore ecosystems and promote sustainable living.
                    </p>

                    <div className="rounded-2xl shadow-lg w-full h-80 bg-green-100 flex items-center justify-center mb-10">
                        <Leaf size={100} className="text-[#00A651]" />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Green Footprint</h3>
                    <div className="space-y-6 mb-8">
                        <div>
                            <h4 className="font-bold text-lg text-[#00A651] flex items-center"><Leaf size={20} className="mr-2"/> Mega Plantation Drives</h4>
                            <p className="pl-7">Collaborating with local authorities to create micro-forests in urban areas. We don't just plant; we nurture saplings until they are self-sustaining.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg text-[#00A651] flex items-center"><Leaf size={20} className="mr-2"/> Waste Management</h4>
                            <p className="pl-7">Educating communities on segregation, composting, and reducing single-use plastics.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg text-[#00A651] flex items-center"><Leaf size={20} className="mr-2"/> Water Conservation</h4>
                            <p className="pl-7">Reviving local water bodies and promoting rainwater harvesting techniques.</p>
                        </div>
                    </div>

                    <div className="bg-green-50 p-6 rounded-xl border border-green-100 mt-8">
                        <h4 className="font-bold text-green-800 mb-2">Did You Know?</h4>
                        <p className="text-green-700 text-sm">
                            YGPT has planted over 500,000 trees globally in the last 3 years, with a survival rate of over 85% thanks to our dedicated volunteers.
                        </p>
                    </div>
                </div>
                <div className="mt-10 pt-6 border-t border-gray-100 flex justify-center">
                    <Link to="/events" className="bg-[#00A651] text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 transition shadow-lg inline-flex items-center">
                        Join Next Plantation Drive <ArrowRight size={18} className="ml-2" />
                    </Link>
                </div>
            </VerticalContent>
        </div>
    );
};
