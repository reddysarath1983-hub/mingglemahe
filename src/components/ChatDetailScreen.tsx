import React, { useState } from 'react';
import { MatchItem, ChatMessage } from '../types';

interface ChatDetailScreenProps {
  match: MatchItem;
  onBack: () => void;
  onSendMessage: (matchId: string, text: string) => void;
}

export const ChatDetailScreen: React.FC<ChatDetailScreenProps> = ({
  match,
  onBack,
  onSendMessage,
}) => {
  const [inputText, setInputText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    onSendMessage(match.id, inputText);
    setInputText('');
  };

  const handleIcebreaker = (text: string) => {
    onSendMessage(match.id, text);
  };

  return (
    <div className="w-full max-w-md mx-auto flex-1 flex flex-col h-[calc(100vh-80px)] px-4 pt-1 pb-20">
      {/* Top Bar */}
      <div className="flex items-center gap-3 py-2 border-b border-[#5b4040]/30 mb-3">
        <button
          onClick={onBack}
          className="p-1.5 rounded-full glass-panel text-[#f9dcdb] hover:bg-white/10"
        >
          <span className="material-symbols-outlined text-xl">arrow_back</span>
        </button>

        <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 shrink-0">
          <img
            src={match.student.avatarUrl}
            alt={match.student.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
            <span>{match.student.name}, {match.student.age}</span>
            <span className="material-symbols-outlined text-xs text-[#5edda8]">verified</span>
          </h2>
          <p className="text-[11px] text-[#e3bebd] truncate">
            {match.student.major} • {match.student.campus}
          </p>
        </div>

        <div className="px-2.5 py-1 rounded-full bg-[#0ba574]/20 border border-[#5edda8]/30 text-[#5edda8] text-[10px] font-bold">
          ONLINE
        </div>
      </div>

      {/* Icebreaker Suggestions */}
      {match.messages.length < 3 && (
        <div className="mb-3 flex gap-2 overflow-x-auto hide-scrollbar py-1">
          {[
            '☕ Coffee at Astra Cafe?',
            '📚 KMC Library or End Point sunset?',
            '🎶 Favorite song on repeat right now?',
          ].map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleIcebreaker(prompt)}
              className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-[#d1bcff] hover:bg-[#6C4AB6]/20 transition-colors shrink-0 cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Chat Messages Stream */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 py-2">
        {match.messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.isUser ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-md ${
                msg.isUser
                  ? 'bg-gradient-to-r from-[#FF4B5C] to-[#6C4AB6] text-white rounded-br-none'
                  : 'glass-panel text-[#f9dcdb] rounded-bl-none border border-white/10'
              }`}
            >
              {msg.text}
            </div>
            <span className="text-[10px] text-[#e3bebd]/60 mt-1 px-1 font-mono">
              {msg.timestamp}
            </span>
          </div>
        ))}
      </div>

      {/* Message Input Bar */}
      <form onSubmit={handleSend} className="mt-2 flex items-center gap-2 pt-2 border-t border-[#5b4040]/30">
        <input
          type="text"
          placeholder={`Message ${match.student.name}...`}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 px-4 py-3 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm text-white placeholder-[#aa8988] focus:outline-none focus:border-[#FF4B5C]"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="w-11 h-11 rounded-full bg-gradient-to-r from-[#FF4B5C] to-[#6C4AB6] text-white flex items-center justify-center shadow-lg disabled:opacity-50 active:scale-95 transition-all cursor-pointer shrink-0"
        >
          <span className="material-symbols-outlined text-xl">send</span>
        </button>
      </form>
    </div>
  );
};
