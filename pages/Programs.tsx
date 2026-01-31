
import React from 'react';
import { PROGRAMS_DATA } from '../constants';
import { BookOpen, Users, Leaf } from 'lucide-react';

const Programs: React.FC = () => {
    
    const getProgramIcon = (category: string) => {
        switch(category) {
            case 'Leadership': return <Users size={64} className="text-white opacity-50" />;
            case 'Environment': return <Leaf size={64} className="text-white opacity-50" />;
            default: return <BookOpen size={64} className="text-white opacity-50" />;
        }
    }

    const getProgramColor = (index: number) => {
        const colors = ['bg-[#F47C20]', 'bg-[#00A651]', 'bg-[#936FB1]'];
        return colors[index % colors.length];
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-lemon text-[#4EB8B9] mb-8">Our Programs</h1>
            <div className="space-y-12">
                {PROGRAMS_DATA.map((prog, idx) => (
                    <div key={prog.id} className={`flex flex-col md:flex-row gap-8 items-center ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                        <div className="w-full md:w-1/2">
                            <div className={`rounded-xl shadow-lg w-full h-64 flex items-center justify-center ${getProgramColor(idx)}`}>
                                {getProgramIcon(prog.category)}
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <span className="text-xs font-bold bg-gray-100 px-2 py-1 rounded text-gray-500 uppercase">{prog.category}</span>
                            <h2 className="text-3xl font-bold mt-2 mb-4 text-gray-800">{prog.title}</h2>
                            <p className="text-gray-600 text-lg mb-6">{prog.description}</p>
                            <button className="bg-[#333333] text-white px-6 py-2 rounded font-bold hover:bg-black transition">View Details</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Programs;
