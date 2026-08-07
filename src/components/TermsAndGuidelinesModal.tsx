import React from 'react';

interface TermsAndGuidelinesModalProps {
  title: string;
  type: 'terms' | 'guidelines';
  onClose: () => void;
}

export const TermsAndGuidelinesModal: React.FC<TermsAndGuidelinesModalProps> = ({
  title,
  type,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#1e0f10]/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative z-10 w-full max-w-md glass-panel rounded-3xl p-6 border border-white/10 shadow-2xl max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#5b4040]/30">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffb3b3]">
              {type === 'terms' ? 'gavel' : 'local_police'}
            </span>
            <span>{title}</span>
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#e3bebd] hover:text-white"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 text-xs text-[#e3bebd] leading-relaxed pr-1">
          {type === 'terms' ? (
            <>
              <p className="font-semibold text-white">1. Student Eligibility & Verification</p>
              <p>
                Mingle@Manipal is strictly restricted to active students enrolled in accredited Manipal Academy of Higher Education (MAHE) institutions. User verification requires a valid @manipal.edu Google Workspace account.
              </p>
              <p className="font-semibold text-white">2. Privacy & Data Handling</p>
              <p>
                Your student ID and institutional email are stored securely for identity verification and anti-harassment enforcement. We do not sell or expose student personal information to third parties.
              </p>
              <p className="font-semibold text-white">3. Campus Pass Subscription</p>
              <p>
                Campus Pass subscriptions auto-renew monthly for ₹29.69. You can cancel anytime from your profile settings or payment provider portal.
              </p>
            </>
          ) : (
            <>
              <p className="font-semibold text-white">1. Respect & Safe Campus Atmosphere</p>
              <p>
                Maintain mutual respect across all communications. Harassment, unwanted persistence, hate speech, or inappropriate image sharing will result in immediate permanent account termination.
              </p>
              <p className="font-semibold text-white">2. Authentic Profiles</p>
              <p>
                Use real profile photos and accurate department/year information. Impersonation of other students or faculty is strictly prohibited.
              </p>
              <p className="font-semibold text-white">3. Zero Tolerance Harassment Policy</p>
              <p>
                All reported messages are reviewed by the University Registrar Moderation team within 24 hours.
              </p>
            </>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 py-3 rounded-full bg-gradient-to-r from-[#FF4B5C] to-[#6C4AB6] text-white font-bold text-xs uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all cursor-pointer"
        >
          I UNDERSTAND
        </button>
      </div>
    </div>
  );
};
