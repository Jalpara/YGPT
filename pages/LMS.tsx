
import React, { useState } from 'react';
import { Youtube, ArrowRight, Instagram, Users, Heart, MapPin, Tent, MessageCircle, Mic, Globe, ExternalLink, PlayCircle, ClipboardCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import SeminarRegistrationModal from '../components/SeminarRegistrationModal';

const Transform: React.FC = () => {
    const [isSeminarModalOpen, setIsSeminarModalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white animate-fade-in">
            {/* 1. Hero Section - Updated */}
            <div className="relative py-24 bg-[#936FB1] overflow-hidden">
                <div className="absolute inset-0 bg-black/20 z-10"></div>
                {/* Abstract Patterns */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#FDB913]/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>
                
                <div className="container mx-auto px-4 relative z-20 text-center text-white">
                    <h1 className="font-lemon text-5xl md:text-7xl mb-6 leading-tight">
                        Transform Yourself.<br/>Transform The World.
                    </h1>
                    <p className="text-xl md:text-2xl font-light opacity-90 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Unlock your highest potential with our curated workshops and initiatives.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/transform/watch/seminars" className="bg-[#FDB913] text-[#333] px-10 py-4 rounded-full font-bold hover:bg-yellow-400 transition shadow-lg flex items-center justify-center transform hover:scale-105 duration-200">
                            <PlayCircle size={20} className="mr-2" /> Start Watching
                        </Link>
                        <a href="#initiatives" className="bg-white/10 border border-white/30 text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-[#936FB1] transition backdrop-blur-md flex items-center justify-center">
                            Explore Initiatives
                        </a>
                    </div>
                </div>
            </div>

            {/* 2. The Context: Need & Definition */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        {/* Need to Transform */}
                        <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
                            <h2 className="font-lemon text-3xl text-[#F47C20] mb-6 border-b pb-4">Need To Transform</h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                    The challenges facing today's youth are more significant than ever. There is a need for a galactic shift in their approach to life and nature.
                                </p>
                                <p>
                                    Today's hyper-connected world has caused identity crises and mental health issues especially amongst the youth leading to stress, low self-esteem, depression, and anxiety. The pressure to excel while managing relationships has left many in conflict.
                                </p>
                                <div className="bg-red-50 p-5 rounded-xl border-l-4 border-red-400 text-sm">
                                    <p className="font-bold text-red-800 mb-2">According to WHO:</p>
                                    <ul className="list-disc pl-5 space-y-1 text-red-700">
                                        <li>1 in 7 (10-19 year-olds) experiences a mental disorder.</li>
                                        <li>Depression & anxiety are top causes of illness.</li>
                                        <li>Suicide is the 3rd leading cause of death for ages 15-29.</li>
                                    </ul>
                                </div>
                                <p className="font-medium text-gray-800 pt-2">
                                    At YGPT, we are determined to change this grim scenario.
                                </p>
                            </div>
                        </div>

                        {/* What is Transformation */}
                        <div className="relative">
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#FDB913] rounded-full opacity-20 blur-xl"></div>
                            <h2 className="font-lemon text-3xl text-[#FDB913] mb-6">What is <br/><span className="text-5xl">Transformation?</span></h2>
                            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                                <p>
                                    To combat these pressing concerns, YGPT is committed to empowering youth by offering practical, easily applicable strategies.
                                </p>
                                <blockquote className="border-l-4 border-[#936FB1] pl-6 italic text-gray-700 text-xl font-serif">
                                    "Transformation is an inside-out process which ignites a shift in one's internal state, to enable one to reach their highest potential."
                                </blockquote>
                                <p>
                                    This transformation occurs at the core of one's heart where the driving force of life resides. It is a shift that cannot be captured in words but has to be experienced.
                                </p>
                                <p>
                                    It helps young individuals navigate through challenging lives, be it at schools, colleges, or corporate offices, giving them more clarity, better focus, and enhanced creativity.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Our Initiatives (Alternating Layout) */}
            <div id="initiatives" className="py-10">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="font-lemon text-4xl text-[#333]">Pathways to Change</h2>
                        <div className="h-1.5 w-24 bg-[#4EB8B9] mx-auto mt-4 rounded-full"></div>
                    </div>

                    <div className="space-y-24">
                        
                        {/* 1. Youth Development Seminars */}
                        <div className="flex flex-col md:flex-row items-center gap-12">
                            <div className="md:w-1/2">
                                <div className="h-[400px] w-full bg-[#F47C20]/10 rounded-3xl flex items-center justify-center">
                                    <Users size={100} className="text-[#F47C20]" />
                                </div>
                            </div>
                            <div className="md:w-1/2">
                                <div className="flex items-center mb-4">
                                    <div className="p-3 bg-orange-100 text-[#F47C20] rounded-xl mr-4"><Users size={24} /></div>
                                    <h3 className="font-lemon text-2xl text-[#F47C20]">Youth Development Seminars</h3>
                                </div>
                                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                    A series of transformative seminars crafted specifically for colleges, guiding youth to unlock their highest potential and enabling them to take charge of their lives. 
                                </p>
                                <p className="text-gray-600 leading-relaxed mb-8">
                                    Blending fun, interaction, and the real-life experiences of our facilitators, these sessions have positively impacted countless lives.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Link to="/transform/watch/seminars" className="text-[#F47C20] font-bold uppercase tracking-wider text-sm flex items-center hover:underline">
                                        Watch Highlights <ArrowRight size={16} className="ml-2" />
                                    </Link>
                                    <button 
                                        onClick={() => setIsSeminarModalOpen(true)}
                                        className="bg-[#F47C20] text-white px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow hover:bg-orange-600 transition flex items-center"
                                    >
                                        <ClipboardCheck size={16} className="mr-2" /> Register / Mark Attendance
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* 2. Youth Circle */}
                        <div className="flex flex-col md:flex-row-reverse items-center gap-12">
                            <div className="md:w-1/2">
                                <div className="h-[400px] w-full bg-[#2563EB]/10 rounded-3xl flex items-center justify-center">
                                    <Globe size={100} className="text-[#2563EB]" />
                                </div>
                            </div>
                            <div className="md:w-1/2">
                                <div className="flex items-center mb-4">
                                    <div className="p-3 bg-blue-100 text-[#2563EB] rounded-xl mr-4"><Globe size={24} /></div>
                                    <h3 className="font-lemon text-2xl text-[#2563EB]">Youth Circle</h3>
                                </div>
                                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                    Open to a global audience aged 15 to 35, the Youth Circle series is an online platform designed for meaningful discussions and authentic self-expression.
                                </p>
                                <ul className="space-y-3 text-gray-600 mb-8">
                                    <li className="flex items-start"><span className="w-1.5 h-1.5 bg-[#2563EB] rounded-full mt-2 mr-2"></span>Understand yourself: core nature, strengths, weaknesses.</li>
                                    <li className="flex items-start"><span className="w-1.5 h-1.5 bg-[#2563EB] rounded-full mt-2 mr-2"></span>Diverse topics: overcoming challenges, acceptance, loneliness.</li>
                                    <li className="flex items-start"><span className="w-1.5 h-1.5 bg-[#2563EB] rounded-full mt-2 mr-2"></span>Q&A with open and honest expression.</li>
                                </ul>
                                <Link to="/transform/watch/youth-circle" className="text-[#2563EB] font-bold uppercase tracking-wider text-sm flex items-center hover:underline">
                                    Watch Past Sessions <ArrowRight size={16} className="ml-2" />
                                </Link>
                            </div>
                        </div>

                        {/* 3. Youth Bodh */}
                        <div className="flex flex-col md:flex-row items-center gap-12">
                            <div className="md:w-1/2">
                                <div className="h-[400px] w-full bg-[#4EB8B9]/10 rounded-3xl flex items-center justify-center">
                                    <Heart size={100} className="text-[#4EB8B9]" />
                                </div>
                            </div>
                            <div className="md:w-1/2">
                                <div className="flex items-center mb-4">
                                    <div className="p-3 bg-teal-100 text-[#4EB8B9] rounded-xl mr-4"><Heart size={24} /></div>
                                    <h3 className="font-lemon text-2xl text-[#4EB8B9]">Youth Bodh</h3>
                                </div>
                                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                    A physical, experiential workshop involving scientifically validated techniques directed at one's inner core (spiritual) level.
                                </p>
                                <p className="text-gray-600 leading-relaxed mb-8">
                                    These techniques positively influence emotions, resulting in calmness and stability of the mind, leading to positive actions at the outermost physical level. Scientifically validated studies are available online.
                                </p>
                                <Link to="/transform/watch/bodh" className="text-[#4EB8B9] font-bold uppercase tracking-wider text-sm flex items-center hover:underline">
                                    Learn Techniques <ArrowRight size={16} className="ml-2" />
                                </Link>
                            </div>
                        </div>

                         {/* 4. YGPT Club */}
                         <div className="flex flex-col md:flex-row-reverse items-center gap-12">
                            <div className="md:w-1/2">
                                <div className="h-[400px] w-full bg-[#FDB913]/10 rounded-3xl flex items-center justify-center">
                                    <Users size={100} className="text-[#FDB913]" />
                                </div>
                            </div>
                            <div className="md:w-1/2">
                                <div className="flex items-center mb-4">
                                    <div className="p-3 bg-yellow-100 text-[#FDB913] rounded-xl mr-4"><Users size={24} /></div>
                                    <h3 className="font-lemon text-2xl text-[#FDB913]">YGPT Club</h3>
                                </div>
                                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                    Launched across 13 cities in India, YGPT clubs are safe and engaging spaces for youth to unlock their hidden potential and develop skills needed to lead with impact.
                                </p>
                                <p className="text-gray-600 leading-relaxed mb-8">
                                    Activities include traditional outdoor games, sports, jamming sessions, debate sessions, skill development workshops, leadership training, and much more.
                                </p>
                                <Link to="/clubs" className="text-[#FDB913] font-bold uppercase tracking-wider text-sm flex items-center hover:underline">
                                    Find a Club <ArrowRight size={16} className="ml-2" />
                                </Link>
                            </div>
                        </div>

                        {/* 5. YGPT Youth Camp */}
                        <div className="flex flex-col md:flex-row items-center gap-12">
                            <div className="md:w-1/2">
                                <div className="h-[400px] w-full bg-[#00A651]/10 rounded-3xl flex items-center justify-center">
                                    <Tent size={100} className="text-[#00A651]" />
                                </div>
                            </div>
                            <div className="md:w-1/2">
                                <div className="flex items-center mb-4">
                                    <div className="p-3 bg-green-100 text-[#00A651] rounded-xl mr-4"><Tent size={24} /></div>
                                    <h3 className="font-lemon text-2xl text-[#00A651]">YGPT Youth Camp</h3>
                                </div>
                                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                    A residential camp designed for colleges, offering youth a unique and enriching experience. From connecting with nature to participating in transformative sessions, this camp is all about introspection and growth.
                                </p>
                                <p className="text-gray-600 leading-relaxed mb-8">
                                    Example: Our cohort with SNDT College, Mumbai saw 32 students leave refreshed and energized.
                                </p>
                            </div>
                        </div>

                         {/* 6. Let's Talk */}
                         <div className="flex flex-col md:flex-row-reverse items-center gap-12">
                            <div className="md:w-1/2">
                                <div className="h-[400px] w-full bg-pink-100 rounded-3xl flex items-center justify-center">
                                    <Instagram size={100} className="text-pink-500" />
                                </div>
                            </div>
                            <div className="md:w-1/2">
                                <div className="flex items-center mb-4">
                                    <div className="p-3 bg-pink-100 text-pink-600 rounded-xl mr-4"><Instagram size={24} /></div>
                                    <h3 className="font-lemon text-2xl text-pink-600">Let's Talk</h3>
                                </div>
                                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                    Our Instagram series, Let's Talk, addresses the pressing questions faced by today's youth. With two successful seasons completed, we've reached over <strong>70,000 young individuals</strong>.
                                </p>
                                <p className="text-gray-600 leading-relaxed mb-8">
                                    We provide them with insights and answers that resonate with their daily struggles and aspirations.
                                </p>
                                <Link to="/transform/watch/lets-talk" className="text-pink-600 font-bold uppercase tracking-wider text-sm flex items-center hover:underline">
                                    Watch Episodes <PlayCircle size={16} className="ml-2" />
                                </Link>
                            </div>
                        </div>

                        {/* 7. 1:1 Mentoring */}
                        <div className="flex flex-col md:flex-row items-center gap-12">
                            <div className="md:w-1/2">
                                <div className="h-[400px] w-full bg-[#936FB1]/10 rounded-3xl flex items-center justify-center">
                                    <MessageCircle size={100} className="text-[#936FB1]" />
                                </div>
                            </div>
                            <div className="md:w-1/2">
                                <div className="flex items-center mb-4">
                                    <div className="p-3 bg-purple-100 text-[#936FB1] rounded-xl mr-4"><MessageCircle size={24} /></div>
                                    <h3 className="font-lemon text-2xl text-[#936FB1]">1:1 Mentoring</h3>
                                </div>
                                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                    Mentors who are long-term experienced YGPT volunteers are assigned to youth engaged with the organization. It is mainly to help the youth through their transformational journey of ups and downs.
                                </p>
                                <p className="text-gray-600 leading-relaxed mb-8">
                                    Unique to YGPT, mentors play the role of friends and confidants, lending a listening ear, providing reassurance, and reaffirming faith with positivity.
                                </p>
                                <a href="#" className="text-[#F47C20] font-bold underline hover:text-orange-600">
                                    Feeling Low? We are here to help you!
                                </a>
                            </div>
                        </div>

                        {/* 8. Bharat Yuva Parivatran Yatra */}
                        <div className="flex flex-col md:flex-row-reverse items-center gap-12">
                            <div className="md:w-1/2">
                                <div className="h-[400px] w-full bg-[#F47C20]/10 rounded-3xl flex items-center justify-center">
                                    <MapPin size={100} className="text-[#F47C20]" />
                                </div>
                            </div>
                            <div className="md:w-1/2">
                                <div className="flex items-center mb-4">
                                    <div className="p-3 bg-orange-100 text-[#F47C20] rounded-xl mr-4"><MapPin size={24} /></div>
                                    <h3 className="font-lemon text-2xl text-[#F47C20]">Bharat Yuva Parivartan Yatra</h3>
                                </div>
                                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                    YGPT took the message of Ek Bharat, Hum Bharat to the youth across the nation, encouraging them to celebrate one's own culture and integrate the spirit of coming together as One Nation!
                                </p>
                                <ul className="space-y-3 text-gray-600 mb-8 text-sm">
                                    <li className="flex items-start"><span className="w-1.5 h-1.5 bg-[#F47C20] rounded-full mt-2 mr-2"></span><strong>Self-Discovery:</strong> Explore inner potential & gain clarity.</li>
                                    <li className="flex items-start"><span className="w-1.5 h-1.5 bg-[#F47C20] rounded-full mt-2 mr-2"></span><strong>Unity:</strong> Building emotional connections across regions.</li>
                                    <li className="flex items-start"><span className="w-1.5 h-1.5 bg-[#F47C20] rounded-full mt-2 mr-2"></span><strong>Practical Guidance:</strong> Actionable takeaways for life.</li>
                                </ul>
                                <Link to="/transform/watch/yatra" className="text-[#F47C20] font-bold uppercase tracking-wider text-sm flex items-center hover:underline">
                                    Watch Highlights <ArrowRight size={16} className="ml-2" />
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* 4. Meet My Maitreya (Highlight) */}
            <div className="bg-[#FDB913] py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/5"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="bg-white rounded-3xl p-8 md:p-16 shadow-2xl max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
                        <div className="md:w-1/3">
                            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-[#FDB913]/20 shadow-inner flex items-center justify-center">
                                <Heart size={80} className="text-[#FDB913]" fill="#FDB913" />
                            </div>
                        </div>
                        <div className="md:w-2/3">
                            <span className="text-[#F47C20] font-bold uppercase tracking-widest text-sm mb-2 block">The Source of Inspiration</span>
                            <h2 className="font-lemon text-4xl text-[#333] mb-6">Meet My Maitreya</h2>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                A wave of transformation has swept over our country, following the Bharat Yuva Parivartan Yatra. On the occasion of International Youth Day, we invite the youth into our loving home, the ShantiKshetra Premgiri Ashram for a day of celebrations and insightful sessions with our beloved Maitreya Dadashreeji.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-8">
                                We introduce Him as a Guide or Divine Friend, to fuel their spiritual journey and forge the bond of true friendship - a bond etched in love, comfort, self-expression and freedom.
                            </p>
                            <Link to="/transform/watch/maitreya" className="bg-[#F47C20] text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition shadow-lg inline-block">
                                Learn More About Maitreya
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <SeminarRegistrationModal 
                isOpen={isSeminarModalOpen} 
                onClose={() => setIsSeminarModalOpen(false)} 
            />
        </div>
    );
};

export default Transform;
