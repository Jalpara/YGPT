
import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Calendar, Mail, Heart, Zap, Globe, ArrowRight, PlayCircle, Clock } from 'lucide-react';

const NewToYGPT: React.FC = () => {
  return (
    <div className="animate-fade-in min-h-screen flex flex-col bg-white">
      {/* Hero Section - Light Theme */}
      <section className="bg-gradient-to-b from-[#FDB913]/20 to-white py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="bg-[#FDB913] text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest mb-6 inline-block shadow-md">
            Welcome to the Family
          </span>
          <h1 className="font-lemon text-4xl md:text-6xl text-[#333] mb-6 leading-tight">
            What is YGPT?
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-medium max-w-2xl mx-auto flex items-center justify-center">
            <Clock className="mr-2 text-[#FDB913]" size={24} /> Explained in 60 Seconds
          </p>
        </div>
        {/* Decorative Circles - Adjusted for light theme */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#FDB913] opacity-10 rounded-full -translate-y-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FDB913] opacity-5 rounded-full translate-x-1/3 translate-y-1/3"></div>
      </section>

      {/* The 60-Second Explanation */}
      <section className="py-12 container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-1 bg-gray-100 -z-10"></div>

                {/* Step 1 */}
                <div className="flex flex-col items-center text-center group">
                    <div className="w-24 h-24 bg-white border-4 border-[#F47C20] rounded-full flex items-center justify-center shadow-xl mb-6 group-hover:scale-110 transition duration-300 relative z-10">
                        <Heart size={40} className="text-[#F47C20]" />
                    </div>
                    <h3 className="font-lemon text-xl text-gray-800 mb-3">1. Connect Within</h3>
                    <p className="text-gray-600 leading-relaxed">
                        We start with <strong>You</strong>. Through simple, non-religious meditation and mindfulness practices, we help you find inner peace and emotional stability in a chaotic world.
                    </p>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center text-center group">
                    <div className="w-24 h-24 bg-white border-4 border-[#936FB1] rounded-full flex items-center justify-center shadow-xl mb-6 group-hover:scale-110 transition duration-300 relative z-10">
                        <Zap size={40} className="text-[#936FB1]" />
                    </div>
                    <h3 className="font-lemon text-xl text-gray-800 mb-3">2. Unlock Potential</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Once grounded, we empower you. Our <strong>Youth Seminars</strong> and workshops build leadership skills, resilience, and clarity, helping you navigate life's big decisions.
                    </p>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center text-center group">
                    <div className="w-24 h-24 bg-white border-4 border-[#00A651] rounded-full flex items-center justify-center shadow-xl mb-6 group-hover:scale-110 transition duration-300 relative z-10">
                        <Globe size={40} className="text-[#00A651]" />
                    </div>
                    <h3 className="font-lemon text-xl text-gray-800 mb-3">3. Serve Together</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Inner change leads to outer action. We channelize your energy into <strong>Social Impact</strong>—from planting trees to feeding the needy. Peace in action.
                    </p>
                </div>
            </div>

            <div className="mt-16 text-center bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-lg text-gray-700 font-medium">
                    <span className="text-[#FDB913] font-bold text-xl">In short:</span> YGPT is a global family where you discover your true self, make lifelong friends, and heal the world together.
                </p>
            </div>
        </div>
      </section>

      {/* Quick Links / Get Started - Light Theme */}
      <section className="bg-gray-50 text-[#333] py-20 mt-auto border-t border-gray-200">
          <div className="container mx-auto px-4 text-center">
              <h2 className="font-lemon text-3xl md:text-4xl mb-12 text-[#333]">Where Do You Want To Start?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  
                  {/* Card 1: Clubs */}
                  <Link to="/clubs" className="group bg-white hover:bg-[#F47C20] border border-gray-200 rounded-2xl p-8 transition duration-300 transform hover:-translate-y-2 flex flex-col items-center shadow-lg hover:shadow-xl">
                      <div className="bg-orange-50 p-4 rounded-full mb-6 group-hover:bg-white/20 transition">
                          <Users size={32} className="text-[#F47C20] group-hover:text-white" />
                      </div>
                      <h3 className="font-lemon text-xl mb-3 text-gray-800 group-hover:text-white">Find a Club</h3>
                      <p className="text-gray-500 text-sm mb-6 group-hover:text-white/90">
                          Locate a YGPT chapter in your city or university. Meet amazing people offline.
                      </p>
                      <span className="mt-auto font-bold text-sm uppercase tracking-wider flex items-center text-[#F47C20] group-hover:text-white">
                          Search Locations <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition" />
                      </span>
                  </Link>

                  {/* Card 2: Events */}
                  <Link to="/events" className="group bg-white hover:bg-[#4EB8B9] border border-gray-200 rounded-2xl p-8 transition duration-300 transform hover:-translate-y-2 flex flex-col items-center shadow-lg hover:shadow-xl">
                      <div className="bg-teal-50 p-4 rounded-full mb-6 group-hover:bg-white/20 transition">
                          <Calendar size={32} className="text-[#4EB8B9] group-hover:text-white" />
                      </div>
                      <h3 className="font-lemon text-xl mb-3 text-gray-800 group-hover:text-white">Join an Event</h3>
                      <p className="text-gray-500 text-sm mb-6 group-hover:text-white/90">
                          Register for upcoming workshops, meditation sessions, or social drives.
                      </p>
                      <span className="mt-auto font-bold text-sm uppercase tracking-wider flex items-center text-[#4EB8B9] group-hover:text-white">
                          View Calendar <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition" />
                      </span>
                  </Link>

                  {/* Card 3: Contact */}
                  <Link to="/contact" className="group bg-white hover:bg-[#936FB1] border border-gray-200 rounded-2xl p-8 transition duration-300 transform hover:-translate-y-2 flex flex-col items-center shadow-lg hover:shadow-xl">
                      <div className="bg-purple-50 p-4 rounded-full mb-6 group-hover:bg-white/20 transition">
                          <Mail size={32} className="text-[#936FB1] group-hover:text-white" />
                      </div>
                      <h3 className="font-lemon text-xl mb-3 text-gray-800 group-hover:text-white">Get in Touch</h3>
                      <p className="text-gray-500 text-sm mb-6 group-hover:text-white/90">
                          Have questions? Want to volunteer or partner with us? Say hello!
                      </p>
                      <span className="mt-auto font-bold text-sm uppercase tracking-wider flex items-center text-[#936FB1] group-hover:text-white">
                          Contact Us <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition" />
                      </span>
                  </Link>

              </div>
          </div>
      </section>
    </div>
  );
};

export default NewToYGPT;
