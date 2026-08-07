import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StudentProfile } from '../types';
import { INITIAL_PROFILES } from '../data/studentProfiles';

interface CampusPreviewsModalProps {
  onClose: () => void;
  onStartRegistration: () => void;
  initialSelectedProfile?: StudentProfile | null;
}

export const CampusPreviewsModal: React.FC<CampusPreviewsModalProps> = ({
  onClose,
  onStartRegistration,
  initialSelectedProfile,
}) => {
  const [selectedProfile, setSelectedProfile] = useState<StudentProfile>(
    initialSelectedProfile || INITIAL_PROFILES[0]
  );
  const [activeCampusFilter, setActiveCampusFilter] = useState<string>('all');

  const campuses = ['all', 'MIT Manipal', 'KMC Manipal', 'SOC Manipal', 'MSAP Manipal', 'DOC Manipal'];

  const filteredProfiles = INITIAL_PROFILES.filter((p) => {
    if (activeCampusFilter === 'all') return true;
    return p.campus.toLowerCase().includes(activeCampusFilter.toLowerCase());
  });

  return (
    <div className="fixed inset-0 z-50 bg-[#1e0f10]/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative z-10 w-full max-w-lg glass-panel rounded-3xl p-5 border border-white/15 shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex justify-between items-center pb-3 border-b border-white/10 mb-4">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#5edda8] uppercase tracking-wider">
              <span className="material-symbols-outlined text-xs">verified</span>
              <span>VERIFIED CAMPUS HUMANS PREVIEW</span>
            </div>
            <h2 className="text-xl font-extrabold text-white tracking-tight">Student Profile Cards</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full glass-panel text-[#e3bebd] hover:text-white cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Campus Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-3 mb-3 border-b border-white/5">
          {campuses.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCampusFilter(c)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCampusFilter === c
                  ? 'bg-gradient-to-r from-[#FF4B5C] to-[#6C4AB6] text-white shadow-md'
                  : 'bg-white/5 text-[#e3bebd] hover:bg-white/10 border border-white/10'
              }`}
            >
              {c === 'all' ? 'All Institutes' : c.replace(' Manipal', '')}
            </button>
          ))}
        </div>

        {/* Selected Card Spotlight Display */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedProfile.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3 }}
              className="glass-panel rounded-2xl overflow-hidden border border-white/20 shadow-xl relative"
            >
              {/* Profile Image with Badges */}
              <div className="relative h-72 sm:h-80 w-full">
                <img
                  src={selectedProfile.avatarUrl}
                  alt={selectedProfile.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e0f10] via-transparent to-black/30"></div>

                {/* Verification Badge */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#5edda8]/40 text-[#5edda8] text-xs font-bold flex items-center gap-1.5 shadow-lg">
                  <span className="material-symbols-outlined text-sm">verified</span>
                  <span>{selectedProfile.campus}</span>
                </div>

                {/* Spotify Anthem if available */}
                {selectedProfile.spotifyAnthem && (
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#1db954]/40 text-[#1db954] text-[10px] font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">graphic_eq</span>
                    <span className="truncate max-w-[120px]">{selectedProfile.spotifyAnthem}</span>
                  </div>
                )}

                {/* Profile Overlay Name & Info */}
                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <div className="flex items-baseline gap-2 mb-1">
                    <h3 className="text-2xl font-extrabold text-white">{selectedProfile.name}, {selectedProfile.age}</h3>
                    <span className="text-xs font-bold text-[#ffb3b3]">{selectedProfile.year}</span>
                  </div>
                  <p className="text-xs text-[#e3bebd] font-medium mb-2">{selectedProfile.major}</p>

                  <div className="flex items-center gap-2 text-[11px] text-[#e3bebd]">
                    <span className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-md border border-white/10">
                      <span className="material-symbols-outlined text-xs text-[#FF4B5C]">near_me</span>
                      <span>{selectedProfile.distance || 'Manipal Campus'}</span>
                    </span>
                    <span className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-md border border-white/10">
                      <span className="material-symbols-outlined text-xs text-[#d1bcff]">local_cafe</span>
                      <span>{selectedProfile.coffeeSpot || 'Astra Cafe'}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Bio & Details Section */}
              <div className="p-4 space-y-3 bg-[#1e0f10]/60">
                <div>
                  <h4 className="text-[10px] font-bold text-[#e3bebd] uppercase tracking-wider mb-1">About Me</h4>
                  <p className="text-xs text-white leading-relaxed">{selectedProfile.bio}</p>
                </div>

                <div>
                  <h4 className="text-[10px] font-bold text-[#e3bebd] uppercase tracking-wider mb-1.5">Interests & Vibes</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProfile.interests.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-[#d1bcff]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Thumbnails Horizontal Strip */}
          <div>
            <h4 className="text-xs font-bold text-[#e3bebd] uppercase tracking-wider mb-2">
              Select Profile to Preview ({filteredProfiles.length})
            </h4>
            <div className="flex gap-2.5 overflow-x-auto hide-scrollbar pb-2">
              {filteredProfiles.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedProfile(p)}
                  className={`relative w-16 h-20 rounded-xl overflow-hidden shrink-0 transition-all cursor-pointer border-2 ${
                    selectedProfile.id === p.id
                      ? 'border-[#FF4B5C] scale-105 shadow-lg'
                      : 'border-white/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={p.avatarUrl} alt={p.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-1 text-center">
                    <span className="text-[10px] font-bold text-white truncate block">{p.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="pt-3 mt-2 border-t border-white/10 flex items-center justify-between gap-3">
          <p className="text-[11px] text-[#e3bebd]">Like what you see? Connect with verified students!</p>
          <button
            onClick={() => {
              onClose();
              onStartRegistration();
            }}
            className="px-4 py-2.5 rounded-full bg-gradient-to-r from-[#FF4B5C] to-[#6C4AB6] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:opacity-90 active:scale-95 transition-all cursor-pointer shrink-0 flex items-center gap-1.5"
          >
            <span>JOIN & MATCH</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
