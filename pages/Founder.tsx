
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, PlayCircle, Flower2 } from 'lucide-react';

const QUOTES = [
    {
        text: "Care for the planet and work for it. Remember this care is not limited to Mother Nature alone– but also meant for the people around you",
        author: "- Maitreya Dadashreeji"
    },
    {
        text: "Let your heart lead your life – not the conditioned mind !",
        author: "- Maitreya Dadashreeji"
    },
    {
        text: "Love is the only way to transform yourself and the world around you. Be the source of love.",
        author: "- Maitreya Dadashreeji"
    }
];

const GALLERY_VIDEOS = [
    {
        id: 1,
        title: "#IamPeace - Powerful message by Maitreya Dadashreeji | Antidote to Disturbance | Geneva",
        color: "bg-[#936FB1]",
        url: "https://www.youtube.com/embed/LXb3EKWsInQ"
    },
    {
        id: 2,
        title: "Highlights | Power of Love | Event in Germany | Maitreya Dadashreeji",
        color: "bg-[#F47C20]",
        url: "https://www.youtube.com/embed/LXb3EKWsInQ"
    },
    {
        id: 3,
        title: "Panic Attack के दौरान क्या करना चाहिए | Mental Health Dadashreeji",
        color: "bg-[#4EB8B9]",
        url: "https://www.youtube.com/embed/LXb3EKWsInQ"
    }
];

const Founder: React.FC = () => {
    const [currentQuote, setCurrentQuote] = useState(0);

    const nextQuote = () => setCurrentQuote((prev) => (prev + 1) % QUOTES.length);
    const prevQuote = () => setCurrentQuote((prev) => (prev - 1 + QUOTES.length) % QUOTES.length);

    // Auto-advance quotes
    useEffect(() => {
        const timer = setInterval(nextQuote, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-white animate-fade-in">
            
            {/* 1. Hero Section */}
            <div className="relative pt-20 pb-20 md:pt-32 md:pb-32 bg-gradient-to-b from-purple-50 to-white overflow-hidden">
                {/* Decorative background texture */}
                <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/white-diamond.png')]"></div>
                
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                        {/* Portrait */}
                        <div className="w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden border-8 border-white shadow-2xl bg-[#936FB1] flex items-center justify-center flex-shrink-0 text-white text-8xl font-serif italic">
                            M
                        </div>
                        
                        {/* Text */}
                        <div className="text-center md:text-left max-w-lg">
                            <h1 className="font-serif italic text-5xl md:text-6xl text-[#936FB1] mb-2 leading-tight">
                                Maitreya <br/> Dadashreeji
                            </h1>
                            <div className="h-1 w-24 bg-[#F47C20] my-6 mx-auto md:mx-0 rounded-full"></div>
                            <h2 className="font-lemon text-xl md:text-2xl text-[#F47C20] uppercase tracking-wider leading-relaxed">
                                Enabling the Youth;<br/>Transforming the World!
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. His Youth */}
            <div className="py-20 bg-white relative">
                {/* Decorative Lotus Icons */}
                <div className="hidden md:block absolute left-10 top-1/2 -translate-y-1/2 opacity-20 text-pink-300">
                    <Flower2 size={200} strokeWidth={0.5} />
                </div>
                <div className="hidden md:block absolute right-10 top-1/2 -translate-y-1/2 opacity-20 text-pink-300 transform scale-x-[-1]">
                    <Flower2 size={200} strokeWidth={0.5} />
                </div>

                <div className="container mx-auto px-4 max-w-4xl relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="font-lemon text-3xl md:text-4xl text-[#936FB1] uppercase tracking-widest inline-block border-b-2 border-[#936FB1] pb-2">
                            His Youth
                        </h2>
                    </div>
                    
                    <div className="prose prose-lg text-gray-600 mx-auto text-justify md:text-center leading-relaxed space-y-6">
                        <p>
                            <span className="font-serif font-bold text-[#936FB1] text-xl">Maitreya Dadashreeji</span> had the urge to help people from a young age. Being a science-oriented individual led Him to pursue medicine. As a practicing doctor, Maitreya Dadashreeji realized His limitations in solely addressing physical pain but felt helpless in healing the emotional and mental trauma.
                        </p>
                        <p>
                            He understood the limits of medicine, as the cure to all deep-rooted human suffering still remained undiscovered. With this thought he directed His attention inwards and went into deep meditation, contemplation and serving the society selflessly.
                        </p>
                        <p>
                            His humble appearance seems very simple to the human eye, however His transforming presence helps people forge an unparalleled connection with their inner true-self.
                        </p>
                    </div>
                </div>
            </div>

            {/* 3. Discovering The Vision */}
            <div className="bg-[#f9f9f9] py-20">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        {/* Image Side */}
                        <div className="lg:w-1/2 relative">
                            <div className="absolute inset-0 bg-[#FDB913] transform translate-x-4 translate-y-4 rounded-3xl opacity-20"></div>
                            <div className="relative rounded-3xl shadow-xl w-full h-[600px] bg-[#FDB913]/10 flex items-center justify-center">
                                <Flower2 size={120} className="text-[#FDB913]" opacity={0.5} />
                            </div>
                        </div>

                        {/* Text Side */}
                        <div className="lg:w-1/2">
                            <h2 className="font-lemon text-3xl md:text-4xl text-[#936FB1] uppercase tracking-widest mb-2">
                                Discovering The Vision
                            </h2>
                            <div className="h-1 w-full max-w-[300px] bg-[#936FB1] mb-8"></div>

                            <div className="space-y-6 text-gray-600 text-lg leading-relaxed text-justify">
                                <p className="font-medium text-gray-800 italic border-l-4 border-[#FDB913] pl-4">
                                    During his journey of self-reflection and personal growth, he discovered that simply by serving society, individuals could immediately establish a connection with their hearts, paving the way for inner transformation and growth.
                                </p>
                                <p>
                                    In his twenties, <span className="text-[#936FB1] font-bold">Maitreya Dadashreeji</span> selflessly served society by donating food and clothing. As a doctor, he also arranged free healthcare camps, providing support to patients through blood donations and offering treatment and medication at no cost.
                                </p>
                                <p>
                                    Recognizing that 'Youth', especially in the age group of 16 to 30 are untapped powerhouses of energy. Maitreya Dadashreeji understood that if channelized correctly, youth can transform the world to become a better place. To foster youth transformation, he initiated 'Youth Force for Better India' with just 11 volunteers to extend the impact of doing good in the society. He conducted youth seminars, became their friend and provided guidance to help discover their highest potential.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. Quote Carousel */}
            <div className="relative py-24 bg-[#F2F4F6] overflow-hidden">
                {/* Background texture simulation */}
                <div className="absolute inset-0 opacity-50 bg-[url('https://www.transparenttextures.com/patterns/marble.png')] mix-blend-multiply"></div>
                
                <div className="container mx-auto px-4 relative z-10 max-w-5xl">
                    <div className="relative bg-white/60 backdrop-blur-sm rounded-3xl p-10 md:p-16 shadow-lg border border-white/50 text-center min-h-[300px] flex flex-col justify-center items-center">
                        <button 
                            onClick={prevQuote}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 hover:bg-[#936FB1] hover:text-white rounded-full transition text-[#936FB1]"
                        >
                            <ChevronLeft size={32} />
                        </button>
                        
                        <div className="animate-fade-in key={currentQuote}">
                            <p className="font-serif text-2xl md:text-4xl text-gray-700 leading-normal mb-6">
                                "{QUOTES[currentQuote].text}"
                            </p>
                            <p className="font-lemon text-[#936FB1] text-lg">
                                {QUOTES[currentQuote].author}
                            </p>
                        </div>

                        <button 
                            onClick={nextQuote}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-[#936FB1] hover:text-white rounded-full transition text-[#936FB1]"
                        >
                            <ChevronRight size={32} />
                        </button>

                        {/* Dots */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                            {QUOTES.map((_, idx) => (
                                <button 
                                    key={idx}
                                    onClick={() => setCurrentQuote(idx)}
                                    className={`w-2 h-2 rounded-full transition-all ${currentQuote === idx ? 'bg-[#936FB1] w-4' : 'bg-gray-400'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 5. Gallery */}
            <div className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="font-lemon text-4xl text-[#936FB1] uppercase tracking-[0.2em]">Gallery</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {GALLERY_VIDEOS.map((video) => (
                            <div key={video.id} className="group cursor-pointer">
                                <div className={`relative aspect-video rounded-xl overflow-hidden shadow-lg mb-4 flex items-center justify-center ${video.color}`}>
                                    <div className="absolute inset-0 bg-white opacity-10"></div>
                                    <PlayCircle size={48} className="text-white opacity-80 group-hover:opacity-100 transform group-hover:scale-110 transition z-10" />
                                </div>
                                <h3 className="font-bold text-gray-700 group-hover:text-[#936FB1] transition leading-snug">
                                    {video.title}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Founder;
