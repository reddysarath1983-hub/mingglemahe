import React, { useState } from 'react';

interface VerificationScreenProps {
  studentEmail?: string;
  onVerifiedContinue: () => void;
  onOpenTerms: () => void;
  onOpenGuidelines: () => void;
}

export const VerificationScreen: React.FC<VerificationScreenProps> = ({
  studentEmail: propEmail,
  onVerifiedContinue,
  onOpenTerms,
  onOpenGuidelines,
}) => {
  const [isAgeConfirmed, setIsAgeConfirmed] = useState(false);
  const studentEmail = propEmail || 'student@learner.manipal.edu';

  return (
    <div className="bg-[#1e0f10] text-[#f9dcdb] min-h-screen relative overflow-hidden flex flex-col items-center justify-center font-sans antialiased p-5">
      {/* Ambient Glow */}
      <div className="ambient-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

      <div className="relative z-10 w-full max-w-md flex flex-col gap-6">
        {/* Header / Logo Area */}
        <div className="text-center">
          <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#FF4B5C] to-[#6C4AB6] mb-1 tracking-tight">
            MINGLE@MANIPAL
          </h1>
          <p className="text-[12px] text-[#e3bebd] tracking-widest uppercase font-semibold">
            Premium Academic Network
          </p>
        </div>

        {/* Verification Card */}
        <main className="glass-panel rounded-2xl p-6 flex flex-col items-center text-center shadow-2xl relative overflow-hidden">
          {/* Decorative glow badge */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#5edda8]/10 rounded-full blur-2xl"></div>

          {/* Icon Status */}
          <div className="w-20 h-20 rounded-full bg-[#0ba574]/20 flex items-center justify-center mb-4 border border-[#5edda8]/30 shadow-inner">
            <span className="material-symbols-outlined text-[#5edda8] text-4xl">
              check_circle
            </span>
          </div>

          {/* Status Text */}
          <h2 className="text-xl font-bold text-[#f9dcdb] mb-1 tracking-wide">
            STUDENT VERIFIED
          </h2>
          <p className="text-sm text-[#e3bebd] mb-3 leading-relaxed">
            Your institutional account (<span className="text-white font-mono font-medium">{studentEmail}</span>) has been successfully linked.
          </p>
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6C4AB6]/20 border border-[#6C4AB6]/40 text-[#d1bcff] text-xs font-semibold mb-6">
            <span className="material-symbols-outlined text-sm text-[#5edda8]">verified_user</span>
            <span>Welcome to Mingle@Manipal</span>
          </div>

          {/* Agreements Section */}
          <div className="w-full flex flex-col gap-4 border-t border-[#5b4040]/40 pt-5 text-left">
            {/* 18+ Checkbox */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={isAgeConfirmed}
                onChange={(e) => setIsAgeConfirmed(e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-[#aa8988] text-[#FF4B5C] focus:ring-[#FF4B5C] bg-[#2c1b1b] cursor-pointer"
              />
              <span className="text-xs text-[#e3bebd] group-hover:text-[#f9dcdb] transition-colors leading-normal">
                I confirm that I am 18 years of age or older and eligible to use this service.
              </span>
            </label>

            {/* Terms Links */}
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#aa8988] text-lg">
                gavel
              </span>
              <button
                type="button"
                onClick={onOpenTerms}
                className="text-xs text-[#ffb3b3] hover:text-white transition-colors underline decoration-[#ffb3b3]/40 underline-offset-4 text-left"
              >
                Review Terms & Privacy Policy
              </button>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#aa8988] text-lg">
                local_police
              </span>
              <button
                type="button"
                onClick={onOpenGuidelines}
                className="text-xs text-[#ffb3b3] hover:text-white transition-colors underline decoration-[#ffb3b3]/40 underline-offset-4 text-left"
              >
                Accept Community Guidelines
              </button>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={onVerifiedContinue}
            disabled={!isAgeConfirmed}
            className={`w-full mt-6 text-white font-bold text-sm py-3.5 px-6 rounded-xl uppercase tracking-wider transition-all duration-300 shadow-lg ${
              isAgeConfirmed
                ? 'bg-gradient-to-r from-[#FF4B5C] to-[#6C4AB6] hover:opacity-90 active:scale-[0.98] shadow-[#FF4B5C]/25 cursor-pointer'
                : 'bg-[#423030]/60 opacity-50 cursor-not-allowed border border-[#5b4040]'
            }`}
          >
            CONTINUE TO PAYMENT (₹6.69) ➔
          </button>
        </main>
      </div>
    </div>
  );
};
