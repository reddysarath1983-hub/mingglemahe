import React, { useState } from 'react';
import { MatchItem, StudentProfile } from '../types';

interface ChatsScreenProps {
  matches: MatchItem[];
  onSelectMatch: (match: MatchItem) => void;
  onOpenCampusPass: () => void;
}

export const ChatsScreen: React.FC<ChatsScreenProps> = ({
  matches,
  onSelectMatch,
  onOpenCampusPass,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMatches = matches.filter((m) =>
    m.student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.student.major.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-md mx-auto flex-1 flex flex-col px-4 pt-2 pb-24">
      {/* Title */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Connections & Messages</h1>
          <p className="text-xs text-[#e3bebd]">Verified Manipal student matches</p>
        </div>
        <button
          onClick={onOpenCampusPass}
          className="px-3 py-1 rounded-full bg-[#6C4AB6]/20 text-[#d1bcff] border border-[#6C4AB6]/40 text-xs font-semibold hover:bg-[#6C4AB6]/30 transition-colors"
        >
          ⚡ Priority DM
        </button>
      </div>

      {/* New Matches Row */}
      <div className="mb-6">
        <h2 className="text-xs font-bold text-[#e3bebd] uppercase tracking-wider mb-3">
          New Matches ({matches.length})
        </h2>
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
          {matches.map((m) => (
            <button
              key={m.id}
              onClick={() => onSelectMatch(m)}
              className="flex flex-col items-center gap-1.5 shrink-0 group cursor-pointer"
            >
              <div className="relative w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-[#FF4B5C] to-[#6C4AB6] group-hover:scale-105 transition-transform">
                <img
                  src={m.student.avatarUrl}
                  alt={m.student.name}
                  className="w-full h-full object-cover rounded-full border-2 border-[#1e0f10]"
                />
                {m.unreadCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-[#ff5260] border-2 border-[#1e0f10]"></span>
                )}
              </div>
              <span className="text-xs font-semibold text-white group-hover:text-[#ffb3b3] transition-colors">
                {m.student.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative mb-4">
        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#aa8988]">
          search
        </span>
        <input
          type="text"
          placeholder="Search matches or majors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-[#aa8988] focus:outline-none focus:border-[#FF4B5C]"
        />
      </div>

      {/* Messages List */}
      <div className="flex-1 space-y-2">
        {filteredMatches.length === 0 ? (
          <div className="glass-panel p-8 rounded-2xl text-center">
            <span className="material-symbols-outlined text-4xl text-[#aa8988] mb-2">forum</span>
            <p className="text-sm text-[#e3bebd]">No messages found.</p>
          </div>
        ) : (
          filteredMatches.map((m) => (
            <button
              key={m.id}
              onClick={() => onSelectMatch(m)}
              className="w-full glass-panel p-3.5 rounded-2xl flex items-center gap-3.5 hover:bg-white/10 active:scale-[0.99] transition-all text-left cursor-pointer border border-white/10"
            >
              <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white/20">
                <img
                  src={m.student.avatarUrl}
                  alt={m.student.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <h3 className="text-sm font-bold text-white truncate flex items-center gap-1">
                    <span>{m.student.name}, {m.student.age}</span>
                    <span className="material-symbols-outlined text-xs text-[#5edda8]">verified</span>
                  </h3>
                  <span className="text-[11px] text-[#e3bebd]/70 font-mono">
                    {m.lastMessageTime}
                  </span>
                </div>
                <p className={`text-xs truncate ${m.unreadCount > 0 ? 'text-white font-semibold' : 'text-[#e3bebd]/80'}`}>
                  {m.lastMessage || 'Start a conversation...'}
                </p>
                <span className="text-[10px] text-[#ffb3b3]/70 block mt-0.5">
                  {m.student.major}
                </span>
              </div>

              {m.unreadCount > 0 && (
                <div className="w-5 h-5 rounded-full bg-[#FF4B5C] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                  {m.unreadCount}
                </div>
              )}
            </button>
          ))
        )}
      </div>
    </div>
  );
};
