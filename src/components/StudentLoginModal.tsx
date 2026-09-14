import React, { useState, useEffect } from 'react';
import { ApprovedCredential } from '../types';
import { supabase } from '../supabase';

interface StudentLoginModalProps {
  onClose: () => void;
  approvedCredentials: ApprovedCredential[];
  onLoginSuccess: (userCredentials: ApprovedCredential) => void;
  onNavigateToOnboarding: () => void;
}

export const DEFAULT_MANIPAL_CREDENTIALS: ApprovedCredential[] = [];

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

  const [dbLiveCredentials, setDbLiveCredentials] = useState<ApprovedCredential[]>([]);

  // Fetch all live approved credentials from Supabase DB on mount
  useEffect(() => {
    const fetchLiveDbCreds = async () => {
      try {
        const { data, error } = await supabase.from('approved_credentials').select('*');
        if (!error && data && data.length > 0) {
          const mapped: ApprovedCredential[] = data.map((item: any) => ({
            id: item.id || `cred-${Date.now()}`,
            studentId: item.student_id || item.studentId || item.id,
            studentName: item.student_name || item.studentName || 'Student',
            studentEmail: item.student_email || item.studentEmail || '',
            studentPhoneNumber: item.student_phone_number || item.studentPhoneNumber || '',
            studentRegNo: item.student_reg_no || item.studentRegNo || item.student_phone_number || '',
            loginId: item.login_id || item.loginId || '',
            passcode: item.passcode || '',
            status: item.status || 'Approved',
            approvedAt: item.approved_at || item.approvedAt || 'Just now',
            utrRef: item.utr_ref || item.utrRef || '',
            isVerifiedStudent: true,
          }));
          setDbLiveCredentials(mapped);
        }
      } catch (err) {
        console.warn("StudentLoginModal fetch warning:", err);
      }
    };
    fetchLiveDbCreds();
  }, []);

  // Combine default credentials with props and live DB credentials
  const allValidCredentials = [...dbLiveCredentials, ...approvedCredentials, ...DEFAULT_MANIPAL_CREDENTIALS];

  // Unique list by loginId or studentName
  const uniqueCredentials = Array.from(
    new Map(allValidCredentials.map((c) => [c.loginId || c.studentName || c.id, c])).values()
  );

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    const cleanInput = loginInput.trim().toLowerCase();
    const cleanPass = passcode.trim();

    try {
      // 1. Try local memory state search with safe string guards
      let match = uniqueCredentials.find((cred) => {
        const matchId = (cred.loginId || '').trim().toLowerCase() === cleanInput;
        const matchName = (cred.studentName || '').trim().toLowerCase() === cleanInput;
        const matchPhone = (cred.studentPhoneNumber || '').trim() === cleanInput || (cred.studentRegNo || '').trim() === cleanInput;
        const matchEmail = (cred.studentEmail || '').trim().toLowerCase() === cleanInput;

        const matchPass = (cred.passcode || '').trim() === cleanPass;
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
        if (match.status === 'Approved' || (match.status as string) === 'approved') {
          onLoginSuccess(match);
        } else {
          setErrorMsg('Your account is still pending Registrar Admin verification.');
        }
      } else {
        setErrorMsg(
          'Invalid Login ID, Name, or Passcode! Please check the credentials issued by Admin.'
        );
      }
    } catch (err) {
      console.warn("Login submit warning:", err);
      setErrorMsg('Invalid Credentials! Please check your Login ID and Passcode.');
    } finally {
      setIsSubmitting(false);
    }
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
              placeholder="e.g., MPL-2026-XXXX or your Phone / Name"
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
              placeholder="Enter your passcode"
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

        {/* Bottom info */}
        <p className="text-[10px] text-center text-[#e3bebd]/80">
          *After ₹6.69 payment (Limited Time Fresher Offer), Registrar Admin verifies receipt & issues official credentials.
        </p>
      </div>
    </div>
  );
};

