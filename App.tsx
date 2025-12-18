
import React, { useState, useMemo } from 'react';
import { Search, MapPin, Calendar, CheckCircle, ChevronRight, LogOut, UserCircle } from 'lucide-react';
import { GUESTS, EVENT_DETAILS } from './constants';
import { Guest } from './types';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const suggestions = useMemo(() => {
    if (searchTerm.length < 1) return [];
    return GUESTS.filter(g => 
      g.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 5);
  }, [searchTerm]);

  const handleSelectGuest = (guest: Guest) => {
    setSelectedGuest(guest);
    setSearchTerm(guest.name);
  };

  const handleConfirm = () => {
    if (selectedGuest) {
      setIsConfirmed(true);
    } else if (searchTerm.trim().length > 0) {
      const match = GUESTS.find(g => g.name.toLowerCase() === searchTerm.toLowerCase()) 
                 || GUESTS.find(g => g.name.toLowerCase().includes(searchTerm.toLowerCase()));
      if (match) {
        setSelectedGuest(match);
        setIsConfirmed(true);
      } else {
        alert("抱歉，未在嘉宾名单中找到该姓名。请尝试搜索全名或咨询现场工作人员。");
      }
    }
  };

  const handleReset = () => {
    setIsConfirmed(false);
    setSelectedGuest(null);
    setSearchTerm('');
  };

  const backgroundStyle = {
    backgroundImage: `url('https://files.oaiusercontent.com/file-K1S751D68V9M4D77Y9S3L4?se=2025-05-15T10%3A24%3A58Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20private%2C%20immutable%2C%20proxy-revalidate&rscd=attachment%3B%20filename%3Dimage.png&sig=4u/pBvJ77V7Y/h/l1m7zR0uX7n0N6r7F6v1Z4z0R3N8%3D')`,
  };

  // --- 登入/查询页面 ---
  if (!isConfirmed) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 scale-105 blur-[8px] opacity-60"
          style={backgroundStyle} 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 to-slate-900/90 z-0" />
        
        <div className="max-w-2xl w-full z-10 animate-in fade-in zoom-in duration-700">
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-8 md:p-14 shadow-2xl text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-6 shadow-xl border-2 border-white/30 backdrop-blur-md mx-auto">
              <UserCircle className="text-white w-8 h-8" />
            </div>
            
            <h1 className="text-xl sm:text-2xl md:text-3xl font-serif text-white mb-4 leading-tight tracking-wider whitespace-nowrap overflow-hidden text-ellipsis px-4 drop-shadow-md">
              {EVENT_DETAILS.name}
            </h1>
            <p className="text-slate-300 text-base md:text-lg mb-10 font-light">
              欢迎莅临。请输入您的姓名以查询位置。
            </p>

            <div className="relative mb-6 max-w-sm mx-auto">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-400 transition-colors w-5 h-5" />
                <input
                  type="text"
                  placeholder="请输入您的姓名"
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-white placeholder:text-slate-500 text-lg outline-none"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    if (selectedGuest && e.target.value !== selectedGuest.name) {
                      setSelectedGuest(null);
                    }
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleConfirm()}
                />
              </div>
              
              {suggestions.length > 0 && !selectedGuest && (
                <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                  {suggestions.map(guest => (
                    <button
                      key={guest.id}
                      onClick={() => handleSelectGuest(guest)}
                      className="w-full px-5 py-4 text-left hover:bg-slate-50 flex justify-between items-center group transition-colors border-b border-slate-100 last:border-0"
                    >
                      <span className="font-semibold text-slate-800">{guest.name}</span>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-amber-500 transition-colors" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleConfirm}
              disabled={!searchTerm.trim()}
              className="w-full max-w-sm py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-amber-950 font-bold rounded-2xl transition-all transform active:scale-[0.95] shadow-lg shadow-amber-900/40 flex items-center justify-center gap-2 disabled:opacity-50 disabled:grayscale text-xl mx-auto"
            >
              查询
            </button>
            
            <div className="mt-10 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 text-slate-400 text-xs font-medium tracking-widest">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-500/70" /> {EVENT_DETAILS.venue}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-500/70" /> {EVENT_DETAILS.date}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- 结果展示页面 ---
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden text-slate-900">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 scale-105 blur-[12px] opacity-40"
        style={backgroundStyle} 
      />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 z-0" />

      <div className="max-w-md w-full z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200">
          <div className="bg-slate-900 p-8 text-center relative">
            <div className="absolute top-0 right-0 p-4">
              <CheckCircle className="text-amber-500 w-8 h-8 opacity-50" />
            </div>
            <h1 className="text-sm font-bold text-amber-500 uppercase tracking-[0.2em] mb-2">查询结果</h1>
            <p className="text-white text-lg font-serif opacity-90 truncate px-4">{EVENT_DETAILS.name}</p>
          </div>

          <div className="p-10 space-y-10">
            <div className="text-center">
              <p className="text-slate-400 text-sm font-medium uppercase tracking-widest mb-1">尊敬的嘉宾</p>
              <h2 className="text-4xl font-bold text-slate-900">{selectedGuest?.name}</h2>
            </div>

            <div className="bg-slate-50 border border-slate-100 p-10 rounded-[2rem] text-center shadow-inner">
              <p className="text-sm text-slate-400 font-bold uppercase mb-3 tracking-widest">您的位置</p>
              <p className="text-7xl font-black text-slate-900">{selectedGuest?.location}</p>
            </div>

            <div className="pt-4">
              <button 
                onClick={handleReset}
                className="w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl transition-all flex items-center justify-center gap-2 group"
              >
                <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 重新查询
              </button>
            </div>
          </div>

          <div className="bg-slate-50 p-6 border-t border-slate-100 text-center">
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
              {EVENT_DETAILS.venue} · {EVENT_DETAILS.date}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
