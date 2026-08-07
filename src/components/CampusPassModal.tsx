import React, { useState } from 'react';
import { ASSETS } from '../data/studentProfiles';

interface CampusPassModalProps {
  onClose: () => void;
  hasCampusPass: boolean;
  onUnlockPass: () => void;
}

export const CampusPassModal: React.FC<CampusPassModalProps> = ({
  onClose,
  hasCampusPass,
  onUnlockPass,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleUnlock = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      onUnlockPass();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1e0f10]/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 overflow-y-auto animate-in fade-in duration-200">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#6C4AB6] rounded-full blur-[150px] opacity-40 z-0 pointer-events-none"></div>

      {/* Top Header */}
      <header className="relative z-10 flex justify-between items-center w-full max-w-md py-2">
        <button
          onClick={onClose}
          className="text-[#f9dcdb] hover:opacity-80 transition-opacity p-2 -ml-2 rounded-full glass-panel cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>
        <div className="text-xs font-bold text-[#d1bcff] tracking-widest uppercase">
          PREMIUM MEMBERSHIP
        </div>
        <div className="w-8"></div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 w-full max-w-md flex flex-col items-center my-auto py-4">
        {showSuccess ? (
          <div className="glass-panel p-8 rounded-3xl text-center max-w-sm w-full animate-in zoom-in duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-3xl">verified</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Campus Pass Active!</h2>
            <p className="text-xs text-[#e3bebd] mb-6 leading-relaxed">
              You now have unlimited swipes, secret crush triggers, and advanced campus filter discovery.
            </p>
            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#FF4B5C] to-[#6C4AB6] text-white font-bold text-sm uppercase tracking-wider"
            >
              START DISCOVERING
            </button>
          </div>
        ) : (
          <>
            {/* Premium Hero Image */}
            <div className="relative w-full max-w-xs sm:max-w-sm aspect-video sm:aspect-square mb-6 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src={ASSETS.campusPassHero}
                alt="Campus Pass Nightlife"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e0f10] via-transparent to-transparent opacity-80"></div>
              
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-[11px] font-bold text-[#5edda8] border border-emerald-500/30">
                  INSTANT VERIFIED ACCESS
                </span>
                <span className="text-xs text-white/80 font-mono">MANIPAL CAMPUS</span>
              </div>
            </div>

            {/* Headline & Price */}
            <div className="text-center mb-4 space-y-1">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#5edda8]/20 border border-[#5edda8]/40 text-[#5edda8] text-[10px] font-black uppercase tracking-wider">
                <span>LIMITED TIME FRESHER OFFER</span>
              </div>
              <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#ff5260] to-[#d1bcff] tracking-tight">
                CAMPUS PASS UNLOCK
              </h1>
              <p className="text-xl font-black text-[#5edda8]">
                ₹6.69 <span className="text-xs font-normal text-[#e3bebd] line-through">₹29.69</span> <span className="text-xs text-[#e3bebd]">/ month</span>
              </p>
            </div>

            {/* UPI Payment Box */}
            <div className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 mb-4 shadow-xl text-xs space-y-2.5">
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/15 flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-[#e3bebd] uppercase block">UPI ID / GPay Number</span>
                  <span className="font-mono font-bold text-white text-xs">mingle.manipal@okaxis</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText('mingle.manipal@okaxis');
                    alert('UPI ID copied to clipboard!');
                  }}
                  className="px-2.5 py-1 rounded bg-[#FF4B5C] text-white text-[10px] font-bold cursor-pointer"
                >
                  COPY
                </button>
              </div>

              <div className="text-[10px] text-[#e3bebd] flex justify-between">
                <span>PhonePe / Paytm: <strong className="text-white">+91 98765 43210</strong></span>
                <span className="text-[#5edda8] font-bold">Auto-Verification</span>
              </div>
            </div>

            {/* Benefits List */}
            <div className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 mb-5 shadow-xl relative overflow-hidden">
              <ul className="space-y-2.5 text-xs">
                <li className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#5edda8] text-base">check_circle</span>
                  <span className="text-[#f9dcdb]">Unlimited Profile Swipes & Rewinds</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#5edda8] text-base">check_circle</span>
                  <span className="text-[#f9dcdb]">Secret Crush Lock-in (10 Slots)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#5edda8] text-base">check_circle</span>
                  <span className="text-[#f9dcdb]">Direct Priority Messaging</span>
                </li>
              </ul>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleUnlock}
              disabled={isProcessing || hasCampusPass}
              className="w-full bg-gradient-to-r from-[#FF4B5C] to-[#6C4AB6] text-white font-bold text-sm uppercase py-4 px-6 rounded-full shadow-xl shadow-[#FF4B5C]/25 hover:opacity-90 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  <span>PROCESSING PAYMENT...</span>
                </>
              ) : hasCampusPass ? (
                <span>CAMPUS PASS ALREADY UNLOCKED</span>
              ) : (
                <span>UNLOCK FOR ₹6.69 (FRESHER OFFER)</span>
              )}
            </button>
          </>
        )}
      </main>

      <footer className="text-center text-[11px] text-[#e3bebd]/60 py-2">
        Cancel anytime • UPI / GPay / NetBanking supported
      </footer>
    </div>
  );
};
