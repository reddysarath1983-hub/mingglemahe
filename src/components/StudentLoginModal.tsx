import React, { useState } from 'react';
import { ApprovedCredential } from '../types';
import { supabase } from '../supabase';

interface StudentLoginModalProps {
  onClose: () => void;
  approvedCredentials: ApprovedCredential[];
  onLoginSuccess: (userCredentials: ApprovedCredential) => void;
  onNavigateToOnboarding: () => void;
}

// Default pre-approved logins with full profile preferences
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
    gender: 'female',
    lookingFor: 'male',
    major: 'B.A Media & Communication',
    campus: 'SOC Manipal',
    bio: 'Film student, portrait photographer, and sunset seeker at End Point. Looking for music lovers and coffee date companions!',
    quote: 'Capturing candid Manipal moments 📸',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
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
    gender: 'male',
    lookingFor: 'female',
    major: 'B.Tech Computer Science',
    campus: 'MIT Manipal',
    bio: 'Tech builder, guitarist, and weekend road tripper. Looking for a genuine co-pilot for Malpe beach sunsets!',
    quote: 'Coding by day, acoustic jams by night 🎸',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Combine default credentials with any admin-approved ones from backend
  const allValidCredentials = [...DEFAULT_MANIPAL_CREDENTIALS, ...approvedCredentials];

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    const cleanInput = loginInput.trim().toLowerCase();
    const cleanPass = passcode.trim();

    try {
      // 1. Try local memory state search
      let match = allValidCredentials.find((cred) => {
        const matchId = cred.loginId.trim().toLowerCase() === cleanInput;
        const matchName = cred.studentName.trim().toLowerCase() === cleanInput;
        const matchPhone = cred.studentPhoneNumber.trim() === cleanInput;
        const matchEmail = cred.studentEmail?.trim().toLowerCase() === cleanInput;

        const matchPass = cred.passcode.trim() === cleanPass;
        return (matchId || matchName || matchPhone || matchEmail) && matchPass;
      });

      // 2. If not found in memory, perform live Supabase search on approved_credentials
      if (!match) {
        const { data: dbCreds } = await supabase.from('approved_credentials').select('*');
        if (dbCreds && dbCreds.length > 0) {
          const foundDb = dbCreds.find((item: any) => {
            const loginId = (item.login_id || item.loginId || '').trim().toLowerCase();
            const name = (item.student_name || item.studentName || '').trim().toLowerCase();
            const phone = (item.student_phone_number || item.studentPhoneNumber || '').trim();
            const email = (item.student_email || item.studentEmail || '').trim().toLowerCase();
            const itemPass = (item.passcode || '').trim();

            const inputMatches = loginId === cleanInput || name === cleanInput || phone === cleanInput || email === cleanInput;
            return inputMatches && itemPass === cleanPass;
          });

          if (foundDb) {
            match = {
              id: foundDb.id || `cred-${Date.now()}`,
              studentId: foundDb.student_id || foundDb.id,
              studentName: foundDb.student_name || 'Student',
              studentEmail: foundDb.student_email || '',
              studentPhoneNumber: foundDb.student_phone_number || '',
              studentRegNo: foundDb.student_reg_no || foundDb.student_phone_number || '',
              loginId: foundDb.login_id || '',
              passcode: foundDb.passcode || '',
              status: foundDb.status || 'Approved',
              approvedAt: foundDb.approved_at || 'Just now',
              utrRef: foundDb.utr_ref || '',
              isVerifiedStudent: true,
            };
          }
        }
      }

      // 3. If still not found, check pending_registrations table in Supabase
      if (!match) {
        const { data: dbRegs } = await supabase.from('pending_registrations').select('*');
        if (dbRegs && dbRegs.length > 0) {
          const foundReg = dbRegs.find((item: any) => {
            const loginId = (item.login_id || item.loginId || '').trim().toLowerCase();
            const name = (item.student_name || item.studentName || '').trim().toLowerCase();
            const phone = (item.phone_number || item.phoneNumber || '').trim();
            const email = (item.email || '').trim().toLowerCase();
            const itemPass = (item.passcode || '').trim();

            const inputMatches = loginId === cleanInput || name === cleanInput || phone === cleanInput || email === cleanInput;
            return inputMatches && itemPass === cleanPass;
          });

          if (foundReg) {
            match = {
              id: `cred-${foundReg.id}`,
              studentId: foundReg.id,
              studentName: foundReg.student_name || 'Student',
              studentEmail: foundReg.email || '',
              studentPhoneNumber: foundReg.phone_number || '',
              studentRegNo: foundReg.phone_number || '',
              loginId: foundReg.login_id || '',
              passcode: foundReg.passcode || '',
              status: foundReg.status === 'approved' ? 'Approved' : 'Pending',
              approvedAt: 'Just now',
              utrRef: foundReg.transaction_ref || '',
              isVerifiedStudent: true,
            };
          }
        }
      }

      if (match) {
        if (match.status === 'Approved' || match.status === 'approved' as any) {
          onLoginSuccess(match);
        } else {
          setErrorMsg('Your account is still pending Registrar Admin verification.');
        }
      } else {
        setErrorMsg(
          'Invalid Login ID, Name, or Passcode! Please check credentials issued by Admin or select from active logins below.'
        );
      }
    } catch (err) {
      console.warn("Login submit warning:", err);
      setErrorMsg('Invalid Credentials! Please try again or check active logins.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillQuickPreset = (cred: ApprovedCredential) => {
    setLoginInput(cred.loginId);
    setPasscode(cred.passcode);
    setErrorMsg(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#120708]/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="glass-panel rounded-3xl p-5 sm:p-6 border border-white/20 shadow-2xl max-w-sm w-full relative space-y-4 sm:space-y-5 animate-in zoom-in-95 text-left max-h-[92vh] overflow-y-auto">
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
            Enter your Admin-issued Login ID, Name, or Phone & Passcode
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
              Manipal Name, Phone, or Login ID
            </label>
            <input
              type="text"
              required
              placeholder="e.g., MPL-2026-8812, Sarath Reddy, or Anya Sharma"
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
              placeholder="Enter passcode (e.g. Manipal#2026 or Campus#3000)"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder-[#aa8988] focus:border-[#FF4B5C] focus:outline-none transition-colors font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FF4B5C] to-[#6C4AB6] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#FF4B5C]/20 hover:opacity-90 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-base">login</span>
            <span>{isSubmitting ? 'VERIFYING...' : 'LOG IN TO PORTAL'}</span>
          </button>
        </form>

        {/* ACTIVE LOGINS QUICK SELECT BOX */}
        <div className="pt-2 border-t border-white/10 space-y-2">
          <div className="flex justify-between items-center text-[10px] font-bold text-[#e3bebd] uppercase tracking-wider">
            <span>{allValidCredentials.length} ACTIVE MANIPAL LOGINS</span>
            <span className="text-[#5edda8]">PRE-APPROVED</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-left max-h-36 overflow-y-auto pr-1">
            {allValidCredentials.map((cred) => (
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

