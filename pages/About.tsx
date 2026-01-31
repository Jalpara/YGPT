
import React from 'react';
import { Heart, Users, Play, Globe } from 'lucide-react';

const TEAM_MEMBERS = [
    {
        name: "Uurmi Kaur",
        role: "Pan India Lead",
        profession: "Celebrity Make-Up Artist",
        color: "bg-[#F47C20]"
    },
    {
        name: "Rigved Sawant",
        role: "Head of Earth Embrace",
        profession: "Entrepreneur",
        color: "bg-[#00A651]"
    },
    {
        name: "Jasmine Pahwa",
        role: "Youth Development Lead",
        profession: "Founder of 'Do Good Foundation'",
        color: "bg-[#FDB913]"
    },
    {
        name: "Sneha Laghate",
        role: "Outreach Coordinator",
        profession: "CSR Professional",
        color: "bg-[#936FB1]"
    }
];

const LOCATIONS = [
    { state: "Maharashtra", cities: ["Mumbai & Navi Mumbai", "Pune", "Nashik"] },
    { state: "Gujarat", cities: ["Surat", "Ahmedabad"] },
    { state: "Telangana", cities: ["Hyderabad"] },
    { state: "Punjab", cities: ["Amritsar", "Ludhiana", "Chandigarh"] },
    { state: "Delhi", cities: ["New Delhi"] }
];

const About: React.FC = () => (
    <div className="min-h-screen bg-white animate-fade-in">
        {/* 1. Hero / Inception */}
        <div className="relative py-20 bg-gray-50 border-b border-gray-100">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-16">
                     <div className="md:w-1/2 text-center md:text-left order-2 md:order-1">
                        <div className="flex items-center justify-center md:justify-start gap-8 mb-10">
                             {/* MaitriBodh Logo Placeholder */}
                             <div className="text-center group">
                                 <div className="w-20 h-20 mx-auto bg-white shadow-lg rounded-full flex items-center justify-center text-[#F47C20] transform group-hover:scale-110 transition duration-300">
                                    <Users size={36} />
                                 </div>
                                 <span className="text-[10px] uppercase font-bold text-gray-400 mt-3 block tracking-widest">MaitriBodh</span>
                                 <span className="text-[9px] text-gray-400 block">Love | Transformation | Service</span>
                             </div>
                             <div className="h-16 w-px bg-gray-200"></div>
                             {/* YGPT Logo Placeholder */}
                             <div className="text-center group">
                                 <div className="w-20 h-20 mx-auto bg-white shadow-lg rounded-full flex items-center justify-center text-[#4EB8B9] transform group-hover:scale-110 transition duration-300">
                                    <Heart size={36} fill="#4EB8B9" />
                                 </div>
                                 <span className="text-[10px] uppercase font-bold text-gray-400 mt-3 block tracking-widest">YGPT</span>
                                 <span className="text-[9px] text-gray-400 block">Youth • Peace • Transformation</span>
                             </div>
                        </div>
                        <h2 className="font-lemon text-4xl md:text-5xl text-[#F47C20] mb-4 uppercase tracking-widest">Inception</h2>
                        <div className="h-1.5 w-24 bg-[#F47C20] mb-8 mx-auto md:mx-0 rounded-full"></div>
                        
                        <p className="text-gray-600 text-lg leading-relaxed mb-6 font-medium">
                            Our aim is to build on the emotional intelligence and resilience of the youth through transformative youth development sessions, selfless acts of service, and green environmental initiatives.
                        </p>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            YGPT provides a welcoming, judgement-free, friendly space filled with positivity, genuine connections, and support. Together, we take on social projects, climate actions, and community service for a peaceful and united world.
                        </p>
                     </div>
                     <div className="md:w-1/2 order-1 md:order-2">
                         <div className="relative h-[400px] rounded-[2rem] bg-[#F47C20]/10 flex items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 bg-[#F47C20] opacity-10 rounded-[2rem] transform rotate-3"></div>
                            <div className="absolute w-64 h-64 bg-[#F47C20]/20 rounded-full blur-3xl"></div>
                            <Users size={120} className="text-[#F47C20]/40 relative z-10" />
                         </div>
                     </div>
                </div>
            </div>
        </div>

        {/* 2. Why do we do what we do? */}
        <div className="py-24 overflow-hidden">
            <div className="container mx-auto px-4">
                 <div className="flex flex-col md:flex-row-reverse items-center gap-16">
                     <div className="md:w-1/2">
                         <h2 className="font-lemon text-4xl md:text-5xl text-[#FDB913] mb-4 leading-tight">
                             Why do we do <br/> what we do?
                         </h2>
                         <div className="h-1.5 w-24 bg-[#FDB913] mb-10 rounded-full"></div>
                         
                         <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                             <p>
                                 Youth are powerhouses of energy and play an important role in shaping the world around us. They are at the heart of important global systems. Amongst today's youth are the future leaders of tomorrow who can drive change and uplift humanity. Their energy needs to be channelized in the right direction and for that, right guidance is essential.
                             </p>
                             <p>
                                 In the daily hustle, emotions of well-being amongst youth are often neglected leading to a confused, restless, and indecisive state of mind.
                             </p>
                             <div className="bg-yellow-50 border-l-4 border-[#FDB913] p-6 rounded-r-xl">
                                 <p className="font-medium text-gray-800">
                                     Grounded in our commitment to Peace and Transformation, our mission aims to empower youth globally through projects designed for inner transformation.
                                 </p>
                             </div>
                         </div>
                     </div>
                     <div className="md:w-1/2 relative flex justify-center">
                         <div className="w-80 h-80 md:w-96 md:h-96 rounded-full bg-[#FDB913]/20 flex items-center justify-center relative">
                             <div className="absolute inset-0 bg-[#FDB913] rounded-full filter blur-3xl opacity-20 scale-150"></div>
                             <Heart size={120} className="text-[#FDB913]" fill="#FDB913" fillOpacity={0.5} />
                         </div>
                     </div>
                 </div>
            </div>
        </div>

        {/* 3. Who Inspires Us */}
        <div className="bg-[#f9f5ff] py-24 border-y border-purple-100">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-16">
                     <div className="md:w-5/12">
                         <div className="relative h-[500px] w-full bg-[#936FB1]/10 rounded-2xl flex items-center justify-center">
                             <div className="absolute top-6 left-6 w-full h-full border-2 border-[#936FB1] rounded-2xl"></div>
                             <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-[#936FB1]/10 rounded-full blur-2xl"></div>
                             <div className="text-center p-8 relative z-10">
                                 <div className="w-32 h-32 bg-[#936FB1] text-white rounded-full flex items-center justify-center text-6xl font-serif italic mx-auto mb-6">M</div>
                                 <p className="font-lemon text-[#936FB1] text-xl">Maitreya Dadashreeji</p>
                             </div>
                         </div>
                     </div>
                     <div className="md:w-7/12">
                         <h2 className="font-lemon text-4xl md:text-5xl text-[#936FB1] mb-4 uppercase tracking-widest">Who Inspires Us?</h2>
                         <div className="h-1.5 w-24 bg-[#936FB1] mb-10 rounded-full"></div>
                         
                         <p className="text-gray-600 text-lg leading-relaxed mb-6">
                             Our primary source of inspiration is <strong>Maitreya Dadashreeji</strong>, the Founder & Visionary. He is a Transformation Pioneer, Global Humanitarian and Social Reformer.
                         </p>
                         <p className="text-gray-600 text-lg leading-relaxed mb-8">
                             From a young age, he dedicated Himself to serve humanity and envisioned 'One World, One Family and One Truth'. Through His philanthropic deeds, teachings and transformative initiatives, thousands have experienced inner transformation, discovering their true-life purpose and Meaning, Inner peace and Happiness.
                         </p>
                         
                         <button className="border-2 border-[#936FB1] text-[#936FB1] px-10 py-3 rounded-full font-bold hover:bg-[#936FB1] hover:text-white transition uppercase text-sm tracking-widest shadow-md hover:shadow-lg transform hover:-translate-y-1">
                             Read More
                         </button>
                     </div>
                </div>
            </div>
        </div>

        {/* 4. Our Presence */}
        <div className="py-24 bg-white relative overflow-hidden">
             {/* Decorative Background Elements */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-full -translate-y-1/2 translate-x-1/3"></div>
             <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-50 rounded-full translate-y-1/2 -translate-x-1/3"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row gap-16">
                    <div className="md:w-1/2">
                        <h2 className="font-lemon text-4xl md:text-5xl text-[#4EB8B9] mb-4 leading-tight uppercase">
                            Our Presence In <br/> India / Find Us
                        </h2>
                        <div className="h-1.5 w-24 bg-[#4EB8B9] mb-12 rounded-full"></div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
                            {LOCATIONS.map((loc, idx) => (
                                <div key={idx} className="group">
                                    <h4 className="font-lemon text-gray-800 text-lg mb-3 group-hover:text-[#4EB8B9] transition">{loc.state}</h4>
                                    <ul className="text-gray-500 space-y-2 font-medium">
                                        {loc.cities.map((city, cIdx) => (
                                            <li key={cIdx} className="flex items-center">
                                                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-2 group-hover:bg-[#4EB8B9] transition"></span>
                                                {city}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="md:w-1/2 flex items-center justify-center">
                         <div className="relative w-full max-w-lg aspect-square bg-[#4EB8B9]/10 rounded-full flex items-center justify-center shadow-inner">
                            <div className="absolute inset-0 bg-[#4EB8B9] rounded-full opacity-5 animate-pulse"></div>
                            <Globe size={150} className="text-[#4EB8B9]" />
                         </div>
                    </div>
                </div>
            </div>
        </div>

        {/* 5. The Team */}
        <div className="bg-[#FDB913] py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="font-lemon text-5xl text-white mb-4 uppercase tracking-widest drop-shadow-md">The Team!</h2>
                    <div className="h-1.5 w-24 bg-white/50 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {TEAM_MEMBERS.map((member, idx) => (
                        <div key={idx} className="bg-white p-6 pb-10 rounded-2xl shadow-xl transform hover:-translate-y-3 transition duration-300 text-center flex flex-col items-center">
                            <div className={`w-40 h-40 rounded-full overflow-hidden border-8 border-white shadow-lg -mt-20 mb-6 flex items-center justify-center text-white font-bold text-4xl ${member.color}`}>
                                {member.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <h3 className="font-lemon text-[#F47C20] text-xl mb-2">{member.name}</h3>
                            <div className="w-10 h-1 bg-gray-100 mb-4 rounded-full"></div>
                            <p className="font-bold text-gray-800 text-xs uppercase mb-1 tracking-wider">{member.role}</p>
                            <p className="text-gray-500 text-xs italic">{member.profession}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

export default About;
