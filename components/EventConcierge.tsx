
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Sparkles } from 'lucide-react';
import { getGeminiConciergeResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const EventConcierge: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '您好！我是您的智能会务助手。关于座位安排、会议日程或场馆设施，有什么我可以帮您的吗？' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const response = await getGeminiConciergeResponse(userMsg);
    
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[500px] bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
      <div className="bg-slate-900 text-white p-4 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-amber-400" />
        <span className="font-semibold">AI 会务助理</span>
      </div>
      
      <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 scroll-smooth">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl flex gap-2 ${
              msg.role === 'user' 
                ? 'bg-amber-100 text-amber-900 rounded-tr-none' 
                : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none'
            }`}>
              {msg.role === 'model' && <Sparkles className="w-4 h-4 mt-1 flex-shrink-0 text-amber-500" />}
              {msg.role === 'user' && <User className="w-4 h-4 mt-1 flex-shrink-0 text-amber-600" />}
              <p className="text-sm leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-2xl border border-slate-100 animate-pulse flex gap-2">
              <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:-.3s]" />
              <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:-.5s]" />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-slate-200">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="询问座位、菜单或日程..."
            className="w-full pl-4 pr-12 py-3 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-amber-500 text-sm transition-all"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventConcierge;
