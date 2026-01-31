import React, { useState, useRef, useEffect } from 'react';
import { chatWithYGPT } from '../services/geminiService';
import { Send, User, Bot } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const YGPTChat: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Namaste! I'm the YGPT Guide. Ask me anything about our clubs, programs, or how we bring peace to the world!" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Prepare history for API
    const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
    }));

    const responseText = await chatWithYGPT(userMsg.text, history);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[500px] border rounded-2xl overflow-hidden shadow-lg bg-white">
      <div className="bg-[#4EB8B9] p-4 text-white flex items-center">
        <Bot className="mr-2" />
        <h3 className="font-bold">YGPT Virtual Guide</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-xl p-3 text-sm ${
              msg.role === 'user' 
                ? 'bg-[#F47C20] text-white rounded-tr-none' 
                : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none shadow-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex justify-start">
                 <div className="bg-white text-gray-500 rounded-xl p-3 border border-gray-200 text-xs italic">
                    Thinking...
                 </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about YGPT..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4EB8B9]"
        />
        <button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="bg-[#4EB8B9] text-white p-2 rounded-full hover:bg-teal-600 disabled:opacity-50"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default YGPTChat;