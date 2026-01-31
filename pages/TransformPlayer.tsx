
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Play, CheckCircle, Lock, ArrowLeft, Menu, X, Share2, Heart, PlayCircle } from 'lucide-react';

// Mock Data for Content
const COURSE_CONTENT: Record<string, any> = {
    'seminars': {
        title: "Youth Development Seminars",
        description: "Unlock your highest potential and take charge of your life with our transformative sessions.",
        progress: 35,
        modules: [
            {
                title: "Core Fundamentals",
                videos: [
                    { id: '1', title: "Introduction to Inner Transformation", duration: "12:45", url: "https://www.youtube.com/embed/LXb3EKWsInQ" }, // Nature placeholder
                    { id: '2', title: "Understanding Emotional Intelligence", duration: "18:20", url: "https://www.youtube.com/embed/LXb3EKWsInQ" },
                ]
            },
            {
                title: "Leadership Skills",
                videos: [
                    { id: '3', title: "Leading with Empathy", duration: "15:10", url: "https://www.youtube.com/embed/LXb3EKWsInQ" },
                    { id: '4', title: "Conflict Resolution", duration: "22:00", url: "https://www.youtube.com/embed/LXb3EKWsInQ" },
                ]
            }
        ]
    },
    'youth-circle': {
        title: "Youth Circle Sessions",
        description: "Meaningful discussions and authentic self-expression on diverse topics.",
        progress: 10,
        modules: [
            {
                title: "Season 1: Self Discovery",
                videos: [
                    { id: '1', title: "Overcoming Loneliness", duration: "45:00", url: "https://www.youtube.com/embed/LXb3EKWsInQ" },
                    { id: '2', title: "Finding Your Purpose", duration: "50:15", url: "https://www.youtube.com/embed/LXb3EKWsInQ" },
                    { id: '3', title: "Dealing with Anxiety", duration: "48:30", url: "https://www.youtube.com/embed/LXb3EKWsInQ" },
                ]
            }
        ]
    },
    'bodh': {
        title: "Youth Bodh",
        description: "Experiential workshops involving scientifically validated techniques.",
        progress: 0,
        modules: [
            {
                title: "Techniques",
                videos: [
                    { id: '1', title: "The Science of Inner Core", duration: "10:00", url: "https://www.youtube.com/embed/LXb3EKWsInQ" },
                    { id: '2', title: "Calmness and Stability", duration: "14:20", url: "https://www.youtube.com/embed/LXb3EKWsInQ" },
                ]
            }
        ]
    },
    'lets-talk': {
        title: "Let's Talk",
        description: "Addressing pressing questions faced by today's youth.",
        progress: 60,
        modules: [
            {
                title: "Season 1",
                videos: [
                    { id: '1', title: "Ep 1: Social Media Pressure", duration: "05:45", url: "https://www.youtube.com/embed/LXb3EKWsInQ" },
                    { id: '2', title: "Ep 2: Relationships & Boundaries", duration: "06:20", url: "https://www.youtube.com/embed/LXb3EKWsInQ" },
                ]
            },
            {
                title: "Season 2",
                videos: [
                    { id: '3', title: "Ep 1: Career vs Passion", duration: "07:10", url: "https://www.youtube.com/embed/LXb3EKWsInQ" },
                ]
            }
        ]
    },
    'maitreya': {
        title: "Wisdom from Maitreya",
        description: "Insightful sessions with Founder & Visionary Maitreya Dadashreeji.",
        progress: 0,
        modules: [
            {
                title: "Discourses",
                videos: [
                    { id: '1', title: "The Source of Love", duration: "30:00", url: "https://www.youtube.com/embed/LXb3EKWsInQ" },
                    { id: '2', title: "Unity in Diversity", duration: "25:00", url: "https://www.youtube.com/embed/LXb3EKWsInQ" },
                ]
            }
        ]
    },
    'yatra': {
        title: "Bharat Yuva Parivartan Yatra",
        description: "Highlights from the nationwide tour celebrating One Nation.",
        progress: 100,
        modules: [
            {
                title: "Journey Highlights",
                videos: [
                    { id: '1', title: "Flag Off Ceremony", duration: "03:45", url: "https://www.youtube.com/embed/LXb3EKWsInQ" },
                    { id: '2', title: "Youth Rally in Mumbai", duration: "04:20", url: "https://www.youtube.com/embed/LXb3EKWsInQ" },
                ]
            }
        ]
    }
};

const TransformPlayer: React.FC = () => {
    const { categoryId } = useParams<{ categoryId: string }>();
    const navigate = useNavigate();
    const [activeVideo, setActiveVideo] = useState<any>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const content = categoryId ? COURSE_CONTENT[categoryId] : null;

    useEffect(() => {
        if (!content) {
            // navigate('/transform'); // Optionally redirect if invalid
        } else {
            // Set first video as active by default
            const firstVideo = content.modules[0].videos[0];
            setActiveVideo(firstVideo);
        }
        
        // Auto-collapse sidebar on mobile
        if (window.innerWidth < 768) {
            setIsSidebarOpen(false);
        }
    }, [categoryId, content]);

    if (!content) return <div className="p-20 text-center">Content not found. <Link to="/transform" className="text-blue-500 underline">Go back</Link></div>;

    return (
        <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
            {/* Top Navigation Bar */}
            <div className="bg-[#2D2D2D] text-white h-16 flex items-center justify-between px-4 z-20 shadow-md">
                <div className="flex items-center">
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="mr-4 p-2 hover:bg-white/10 rounded-full transition">
                        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                    <Link to="/transform" className="flex items-center text-gray-300 hover:text-white transition mr-6">
                        <ArrowLeft size={18} className="mr-2" /> Exit
                    </Link>
                    <h1 className="font-bold text-lg hidden md:block truncate max-w-md border-l border-gray-600 pl-6">
                        {content.title}
                    </h1>
                </div>
                <div className="flex items-center space-x-4">
                     {/* Progress bar (Visual only) */}
                     <div className="hidden md:flex flex-col w-32">
                        <div className="flex justify-between text-[10px] uppercase font-bold text-gray-400 mb-1">
                            <span>Progress</span>
                            <span>{content.progress}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-[#00A651]" style={{ width: `${content.progress}%` }}></div>
                        </div>
                     </div>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden relative">
                {/* Sidebar Navigation */}
                <div className={`bg-white border-r border-gray-200 flex-shrink-0 transition-all duration-300 absolute md:relative h-full z-10 w-80 shadow-xl md:shadow-none ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:-translate-x-80'}`}>
                    <div className="h-full overflow-y-auto custom-scrollbar">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="font-lemon text-gray-800 text-lg mb-2">{content.title}</h2>
                            <p className="text-xs text-gray-500 leading-relaxed">{content.description}</p>
                        </div>
                        
                        <div className="p-4 space-y-6">
                            {content.modules.map((module: any, mIdx: number) => (
                                <div key={mIdx}>
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">{module.title}</h3>
                                    <div className="space-y-1">
                                        {module.videos.map((video: any, vIdx: number) => {
                                            const isActive = activeVideo?.id === video.id;
                                            return (
                                                <button
                                                    key={video.id}
                                                    onClick={() => { setActiveVideo(video); if(window.innerWidth < 768) setIsSidebarOpen(false); }}
                                                    className={`w-full text-left flex items-start p-3 rounded-lg transition-all ${
                                                        isActive 
                                                        ? 'bg-[#F47C20]/10 text-[#F47C20]' 
                                                        : 'text-gray-600 hover:bg-gray-50'
                                                    }`}
                                                >
                                                    <div className={`mt-0.5 mr-3 flex-shrink-0`}>
                                                        {isActive ? <Play size={16} fill="currentColor" /> : <div className="w-4 h-4 rounded-full border-2 border-gray-300" />}
                                                    </div>
                                                    <div>
                                                        <span className={`text-sm font-medium block ${isActive ? 'font-bold' : ''}`}>{video.title}</span>
                                                        <span className="text-xs opacity-60 flex items-center mt-1">
                                                            {video.duration}
                                                        </span>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto bg-gray-100 w-full">
                    <div className="max-w-5xl mx-auto p-4 md:p-8">
                        {activeVideo ? (
                            <div className="space-y-6">
                                {/* Video Player Container */}
                                <div className="bg-black rounded-xl overflow-hidden shadow-2xl aspect-video relative group">
                                    <iframe 
                                        src={`${activeVideo.url}?autoplay=1&modestbranding=1&rel=0`} 
                                        title={activeVideo.title}
                                        className="w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                        allowFullScreen
                                    ></iframe>
                                </div>

                                {/* Video Info */}
                                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-gray-100">
                                        <h2 className="text-2xl font-bold text-gray-800">{activeVideo.title}</h2>
                                        <div className="flex space-x-3">
                                            <button className="flex items-center px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-bold text-gray-600 transition">
                                                <Heart size={18} className="mr-2 text-red-400" /> Like
                                            </button>
                                            <button className="flex items-center px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-bold text-gray-600 transition">
                                                <Share2 size={18} className="mr-2 text-blue-400" /> Share
                                            </button>
                                        </div>
                                    </div>
                                    <div className="prose text-gray-600 text-sm">
                                        <p>
                                            Watch this exclusive session from YGPT's {content.title}. 
                                            Dive deep into the concepts of inner transformation and learn practical tools 
                                            to apply in your daily life.
                                        </p>
                                    </div>
                                </div>

                                {/* Next Up / Recommendations (Mock) */}
                                <div>
                                    <h3 className="font-bold text-gray-700 mb-4">Up Next</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {[1, 2, 3].map((i) => {
                                            const colors = ['bg-orange-100', 'bg-blue-100', 'bg-purple-100'];
                                            return (
                                                <div key={i} className="bg-white p-3 rounded-xl border border-gray-200 hover:shadow-md transition cursor-pointer flex gap-3 items-center">
                                                    <div className={`w-24 h-16 rounded-lg flex-shrink-0 flex items-center justify-center ${colors[i-1]}`}>
                                                        <PlayCircle size={24} className="text-gray-400 opacity-50" />
                                                    </div>
                                                    <div className="overflow-hidden">
                                                        <h4 className="font-bold text-sm text-gray-800 truncate">Related Session {i}</h4>
                                                        <p className="text-xs text-gray-500">15 mins</p>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-400">
                                Select a video to start watching
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransformPlayer;
