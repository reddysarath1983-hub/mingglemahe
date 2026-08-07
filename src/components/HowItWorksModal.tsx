import React from 'react';
import { ASSETS } from '../data/studentProfiles';

interface HowItWorksModalProps {
  onClose: () => void;
  onContinue: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({
  onClose,
  onContinue,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#1e0f10]/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative z-10 w-full max-w-md glass-panel rounded-3xl p-6 border border-white/10 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <img src={ASSETS.logo} alt="Logo" className="w-7 h-7 rounded-lg object-cover" />
            <h2 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF4B5C] to-[#6C4AB6]">
              HOW IT WORKS
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#e3bebd] hover:text-white"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-[#e3bebd] mb-6">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-[#FF4B5C]/20 text-[#ffb3b3] border border-[#FF4B5C]/40 flex items-center justify-center shrink-0 font-bold">
              1
            </div>
            <div>
              <h3 className="font-bold text-white mb-0.5">Verified Institutional Access</h3>
              <p className="leading-relaxed">
                Sign in using your official @manipal.edu Google Workspace account. Only active, verified students can join.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-[#6C4AB6]/20 text-[#d1bcff] border border-[#6C4AB6]/40 flex items-center justify-center shrink-0 font-bold">
              2
            </div>
            <div>
              <h3 className="font-bold text-white mb-0.5">Campus Crush & Swipe Discovery</h3>
              <p className="leading-relaxed">
                Swipe profiles of students across MIT, KMC, SOC, MSAP, and DOC. Or lock in an anonymous Secret Crush!
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-[#0ba574]/20 text-[#5edda8] border border-[#5edda8]/40 flex items-center justify-center shrink-0 font-bold">
              3
            </div>
            <div>
              <h3 className="font-bold text-white mb-0.5">Double-Opt-In Privacy</h3>
              <p className="leading-relaxed">
                Profiles and secret crushes are 100% private. Chat opens only when both students express mutual interest.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onContinue}
          className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#FF4B5C] to-[#6C4AB6] text-white font-bold text-xs uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all cursor-pointer"
        >
          GET STARTED WITH GOOGLE
        </button>
      </div>
    </div>
  );
};
