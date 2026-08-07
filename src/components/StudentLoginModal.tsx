import React, { useState } from 'react';
import { ApprovedCredential } from '../types';

interface StudentLoginModalProps {
  onClose: () => void;
  approvedCredentials: ApprovedCredential[];
  onLoginSuccess: (userCredentials: { name: string; loginId: string }) => void;
  onNavigateToOnboarding: () => void;
}

// Exactly 2 default pre-approved logins
export const DEFAULT_MANIPAL_CREDENTIALS: ApprovedCredential[] = [
  {
    id: 'default-1',
    studentId: 'std-8812',
    studentName: 'Anya Sharma',
    studentEmail: 'anya.sharma@manipal.edu',
    studentPhoneNumber: '220911048',
    loginId: 'MPL-2026-8812',
    passcode: 'Manipal#2026',
    status: 'Approved',
    approvedAt: 'Official Default',
    utrRef: 'UTR-DEFAULT-8812',
  },
  {
    id: 'default-2',
    studentId: 'std-9923',
    studentName: 'Kabir Mehta',
    studentEmail: 'kabir.mehta@manipal.edu',
    studentPhoneNumber: '220911099',
    loginId: 'MPL-2026-9923',
    passcode: 'Campus#3000',
    status: 'Approved',
    approvedAt: 'Official Default',
    utrRef: 'UTR-DEFAULT-9923',
  },
];

export const StudentLoginModal: React.FC<StudentLoginModalProps> = ({
  onClose,
  approvedCredentials,
  onLoginSuccess,
  onNavigateToOnboarding,
}) => {
  const [loginInput, setLoginInput] = useState('');
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Combine default 2 credentials with any admin-approved ones from backend
  const allValidCredentials = [...DEFAULT_MANIPAL_CREDENTIALS, ...approvedCredentials];

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const match = allValidCredentials.find((cred) => {
      const matchIdOrName =
        cred.loginId.trim().toLowerCase() === loginInput.trim().toLowerCase() ||
        cred.studentName.trim().toLowerCase() === loginInput.trim().toLowerCase() ||
        cred.studentPhoneNumber.trim() === loginInput.trim();

      const matchPass = cred.passcode.trim() === passcode.trim();
      return matchIdOrName && matchPass;
    });

    if (match) {
      if (match.status === 'Approved') {
        onLoginSuccess({ name: match.studentName, loginId: match.loginId });
      } else {
        setErrorMsg('Your account is still pending Registrar Admin verification.');
      }
    } else {
      setErrorMsg(
        'Invalid Credentials! Only 2 default logins are active. Other students must complete ₹6.69 payment & receive Admin approval.'
      );
    }
  };

  const fillQuickPreset = (cred: ApprovedCredential) => {
    setLoginInput(cred.loginId);
    setPasscode(cred.passcode);
    setErrorMsg(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#120708]/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="glass-panel rounded-3xl p-6 border border-white/20 shadow-2xl max-w-sm w-full relative space-y-5 animate-in zoom-in-95 text-left">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#e3bebd] hover:text-white p-1.5 rounded-full bg-white/5 hover:bg-white/10 cursor-pointer transition-colors"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        {/* Title */}
        <div className="text-center pt-1">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FF4B5C] to-[#6C4AB6] p-0.5 shadow-xl mx-auto mb-2 flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-2xl">key</span>
          </div>
          <h2 className="text-xl font-extrabold text-white tracking-tight">Manipal Student Login</h2>
          <p className="text-xs text-[#e3bebd] mt-0.5">
            Enter your Admin-issued Login ID/Name & Passcode
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-3.5">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-[#FF4B5C]/20 border border-[#FF4B5C]/40 text-xs text-[#ffb3b3] font-semibold space-y-1">
              <p>{errorMsg}</p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateToOnboarding();
                }}
                className="text-[11px] text-white font-bold underline block mt-1 hover:text-[#5edda8]"
              >
                New Student? Register & Pay ₹6.69 (Fresher Offer) ➔
              </button>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold text-[#e3bebd] uppercase tracking-wider mb-1">
              Manipal Name or Login ID
            </label>
            <input
              type="text"
              required
              placeholder="e.g., MPL-2026-8812 or Anya Sharma"
              value={loginInput}
              onChange={(e) => setLoginInput(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder-[#aa8988] focus:border-[#FF4B5C] focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#e3bebd] uppercase tracking-wider mb-1">
              Passcode
            </label>
            <input
              type="password"
              required
              placeholder="Enter 4+ char passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder-[#aa8988] focus:border-[#FF4B5C] focus:outline-none transition-colors font-mono"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FF4B5C] to-[#6C4AB6] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#FF4B5C]/20 hover:opacity-90 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-base">login</span>
            <span>LOG IN TO PORTAL</span>
          </button>
        </form>

        {/* DEFAULT LOGINS QUICK SELECT BOX */}
        <div className="pt-2 border-t border-white/10 space-y-2">
          <div className="flex justify-between items-center text-[10px] font-bold text-[#e3bebd] uppercase tracking-wider">
            <span>2 ACTIVE DEFAULT LOGINS</span>
            <span className="text-[#5edda8]">PRE-APPROVED</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-left">
            {DEFAULT_MANIPAL_CREDENTIALS.map((cred) => (
              <button
                key={cred.id}
                type="button"
                onClick={() => fillQuickPreset(cred)}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-[#FF4B5C]/50 transition-all cursor-pointer text-xs space-y-0.5 group"
              >
                <div className="font-bold text-white group-hover:text-[#ffb3b3] truncate">
                  {cred.studentName}
                </div>
                <div className="text-[10px] text-[#5edda8] font-mono truncate">
                  {cred.loginId}
                </div>
                <div className="text-[9px] text-[#e3bebd] font-mono opacity-80">
                  Pass: {cred.passcode}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom info */}
        <p className="text-[10px] text-center text-[#e3bebd]/80">
          *After ₹6.69 payment (Limited Time Fresher Offer), Registrar Admin verifies receipt & issues official credentials.
        </p>
      </div>
    </div>
  );
};
