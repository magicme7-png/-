
import React, { useState, useMemo } from 'react';
import { Search, MapPin, Calendar, CheckCircle, ChevronRight, LogOut, UserCircle } from 'lucide-react';
import { GUESTS, EVENT_DETAILS } from './constants';
import { Guest } from './types';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const suggestions = useMemo(() => {
    const trimmed = searchTerm.trim();
    if (trimmed.length < 1) return [];
    return GUESTS.filter(g => 
      g.name.includes(trimmed)
    ).slice(0, 5);
  }, [searchTerm]);

  const handleSelectGuest = (guest: Guest) => {
    setSelectedGuest(guest);
    setSearchTerm(guest.name);
    setIsConfirmed(true);
  };

  const handleSearch = () => {
    const trimmed = searchTerm.trim();
    if (!trimmed) return;

    const match = GUESTS.find(g => g.name === trimmed) || 
                  GUESTS.find(g => g.name.includes(trimmed));

    if (match) {
      setSelectedGuest(match);
      setIsConfirmed(true);
    } else {
      alert("抱歉，未在嘉宾名单中找到该姓名。请核对后再试。");
    }
  };

  const handleReset = () => {
    setIsConfirmed(false);
    setSelectedGuest(null);
    setSearchTerm('');
  };

  const backgroundStyle = {
    backgroundImage: `url('https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=2000')`,
  };

  // --- 查询主界面 ---
  if (!isConfirmed) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 scale-105 blur-[8px] opacity-40 transition-all duration-1000"
          style={backgroundStyle} 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 to-slate-900/95 z-0" />
        
        <div className="max-w-2xl w-full z-10 px-4">
          <div className="bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[3rem] p-10 md:p-16 shadow-2xl text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-500/20 mb-8 shadow-xl border border-amber-500/30 backdrop-blur-md mx-auto">
              <UserCircle className="text-amber-400 w-10 h-10" />
            </div>
            
            <h1 className="text-2xl md:text-4xl font-serif text-white mb-6 tracking-wide drop-shadow-md leading-relaxed">
              {EVENT_DETAILS.name}
            </h1>
            <p className="text-slate-300 text-lg mb-12 font-light">
              欢迎莅临。请输入您的姓名以查询位置信息。
            </p>

            <div className="relative mb-8 max-w-sm mx-auto">
              <div className="relative group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-400 transition-colors w-6 h-6" />
                <input
                  type="text"
                  placeholder="请输入您的姓名"
                  className="w-full pl-14 pr-6 py-5 bg-white/10 border border-white/20 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-white placeholder:text-slate-500 text-xl outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              
              {suggestions.length > 0 && !selectedGuest && (
                <div className="absolute top-full left-0 right-0 mt-4 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-4">
                  {suggestions.map(guest => (
                    <button
                      key={guest.id}
                      onClick={() => handleSelectGuest(guest)}
                      className="w-full px-6 py-5 text-left hover:bg-slate-50 flex justify-between items-center group transition-colors border-b border-slate-100 last:border-0"
                    >
                      <span className="font-semibold text-slate-800 text-lg">{guest.name}</span>
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-amber-500 transition-colors" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleSearch}
              disabled={!searchTerm.trim()}
              className="w-full max-w-sm py-5 bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold rounded-2xl transition-all transform active:scale-[0.98] shadow-lg shadow-amber-900/40 flex items-center justify-center gap-2 disabled:opacity-50 text-xl mx-auto"
            >
              立即查询
            </button>
            
            <div className="mt-12 pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-slate-400 text-xs font-medium tracking-widest uppercase">
              <span className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-amber-500/70" /> {EVENT_DETAILS.venue}
              </span>
              <span className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-amber-500/70" /> {EVENT_DETAILS.date}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- 结果显示页 ---
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 scale-110 blur-[25px] opacity-30"
        style={backgroundStyle} 
      />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 z-0" />

      <div className="max-w-md w-full z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-200">
          <div className="bg-slate-900 p-10 text-center relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/20 mb-4">
                <CheckCircle className="text-amber-500 w-6 h-6" />
              </div>
              <h1 className="text-xs font-bold text-amber-500 uppercase tracking-[0.3em] mb-3">查询成功</h1>
              <p className="text-white text-xl font-serif opacity-90 truncate px-4">{EVENT_DETAILS.name}</p>
            </div>
          </div>

          <div className="p-12 space-y-12 text-slate-900">
            <div className="text-center">
              <p className="text-slate-400 text-sm font-medium uppercase tracking-widest mb-2">欢迎嘉宾</p>
              <h2 className="text-5xl font-bold text-slate-900 tracking-tight">{selectedGuest?.name}</h2>
            </div>

            <div className="bg-slate-50 border-2 border-slate-100 p-12 rounded-[2.5rem] text-center shadow-inner group transition-transform hover:scale-[1.02]">
              <p className="text-xs text-slate-400 font-bold uppercase mb-4 tracking-widest">您的位置</p>
              <p className="text-4xl md:text-5xl font-black text-slate-900 break-words leading-tight">
                {selectedGuest?.location}
              </p>
            </div>

            <div className="pt-6">
              <button 
                onClick={handleReset}
                className="w-full py-5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl transition-all flex items-center justify-center gap-3 group text-lg"
              >
                <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> 重新查询
              </button>
            </div>
          </div>

          <div className="bg-slate-50/50 p-8 border-t border-slate-100 text-center">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest opacity-60 italic">
              {EVENT_DETAILS.venue} · {EVENT_DETAILS.date}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
