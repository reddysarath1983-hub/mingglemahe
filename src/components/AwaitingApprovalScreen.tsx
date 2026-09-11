import React, { useState } from 'react';
import { ApprovedCredential } from '../types';

interface AwaitingApprovalScreenProps {
  studentName: string;
  regNumber: string;
  transactionRef: string;
  approvedCredentials: ApprovedCredential[];
  onLoginSuccess: (cred: ApprovedCredential) => void;
  onOpenAdmin: () => void;
}

export const AwaitingApprovalScreen: React.FC<AwaitingApprovalScreenProps> = ({
  studentName,
  regNumber,
  transactionRef,
  approvedCredentials,
  onLoginSuccess,
  onOpenAdmin,
}) => {
  const [enteredLoginId, setEnteredLoginId] = useState('');
  const [enteredPasscode, setEnteredPasscode] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [showDirectLoginForm, setShowDirectLoginForm] = useState(false);

  // Check if current student's reg number or UTR matches an approved credential
  const myCredential = approvedCredentials.find(
    (c) =>
      c.studentRegNo === regNumber ||
      (transactionRef && c.utrRef === transactionRef) ||
      c.studentName.toLowerCase() === studentName.toLowerCase()
  );

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    const found = approvedCredentials.find(
      (c) =>
        c.loginId.trim().toUpperCase() === enteredLoginId.trim().toUpperCase() &&
        c.passcode.trim() === enteredPasscode.trim()
    );

    if (found) {
      if (found.status === 'Approved') {
        onLoginSuccess(found);
      } else {
        setLoginError('This credential is still pending Registrar Admin approval.');
      }
    } else {
      setLoginError('Invalid Login ID or Passcode! Please check credentials provided by Admin.');
    }
  };

  return (
    <div className="bg-[#1e0f10] text-[#f9dcdb] min-h-screen py-8 px-4 flex flex-col items-center justify-center font-sans antialiased relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="ambient-glow top-10 left-1/2 -translate-x-1/2 opacity-30"></div>

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Top Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF4B5C]/20 border border-[#FF4B5C]/40 text-[#ffb3b3] text-[10px] font-extrabold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#FF4B5C] animate-ping"></span>
            <span>REGISTRAR VERIFICATION IN PROGRESS</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            {myCredential?.status === 'Approved'
              ? 'Login Approved by Admin!'
              : 'Awaiting Admin Approval'}
          </h1>
          <p className="text-xs text-[#e3bebd] max-w-xs mx-auto">
            {myCredential?.status === 'Approved'
              ? 'Your payment was verified by Registrar. Your login credentials are created below.'
              : 'Your ₹6.69 payment proof is submitted (Limited Time Fresher Offer). The Admin will verify payment & assign your Login Credentials.'}
          </p>
        </div>

        {/* Status Card */}
        <div className="glass-panel rounded-3xl p-6 border border-white/15 shadow-2xl space-y-5">
          {/* Student Submitted Info */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-2">
            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <span className="text-[#e3bebd]">Student Name:</span>
              <span className="font-bold text-white">{studentName || 'Manipal Student'}</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/10 pb-2 font-mono">
              <span className="text-[#e3bebd]">Reg No:</span>
              <span className="text-white">{regNumber || '220911048'}</span>
            </div>
            {transactionRef && (
              <div className="flex justify-between items-center font-mono">
                <span className="text-[#e3bebd]">UTR Ref:</span>
                <span className="text-[#5edda8] font-bold">{transactionRef}</span>
              </div>
            )}
          </div>

          {/* IF APPROVED BY ADMIN */}
          {myCredential && myCredential.status === 'Approved' ? (
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0ba574]/20 to-[#5edda8]/10 border border-[#5edda8]/40 space-y-3 text-center">
              <div className="w-12 h-12 rounded-full bg-[#5edda8]/20 border border-[#5edda8] text-[#5edda8] flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-3xl">verified</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#5edda8] uppercase tracking-widest block">
                  REGISTRAR ASSIGNED LOGIN CREDENTIALS
                </span>
                <h3 className="text-lg font-black text-white">Your Official Login Pass</h3>
              </div>

              {/* Generated Credential Card */}
              <div className="p-3.5 rounded-xl bg-black/60 border border-white/20 text-left space-y-2 font-mono text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[#e3bebd]">LOGIN ID:</span>
                  <span className="text-[#5edda8] font-bold text-sm tracking-wider">
                    {myCredential.loginId}
                  </span>
                </div>
                <div className="flex justify-between items-center border-t border-white/10 pt-2">
                  <span className="text-[#e3bebd]">PASSCODE:</span>
                  <span className="text-white font-bold text-sm tracking-wider">
                    {myCredential.passcode}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onLoginSuccess(myCredential)}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#0ba574] to-[#5edda8] text-slate-950 font-black text-xs uppercase tracking-wider shadow-xl hover:opacity-90 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>LOG IN NOW & EXPLORE</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </div>
          ) : (
            /* STILL PENDING APPROVAL */
            <div className="p-4 rounded-2xl bg-[#FF4B5C]/10 border border-[#FF4B5C]/30 space-y-3 text-center">
              <div className="w-12 h-12 rounded-full bg-[#FF4B5C]/20 text-[#FF4B5C] flex items-center justify-center mx-auto animate-pulse">
                <span className="material-symbols-outlined text-3xl">hourglass_top</span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white">Awaiting Admin Credential Generation</h3>
                <p className="text-[11px] text-[#e3bebd] mt-1">
                  The Admin will inspect your payment screenshot, approve the login, and issue your Login ID & Passcode.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">

                <button
                  onClick={() => setShowDirectLoginForm(!showDirectLoginForm)}
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#e3bebd] font-semibold text-xs transition-colors cursor-pointer"
                >
                  {showDirectLoginForm
                    ? 'Hide Credential Login Form'
                    : 'I already have Login ID & Passcode ➔'}
                </button>
              </div>
            </div>
          )}

          {/* Direct Credential Login Form */}
          {showDirectLoginForm && (
            <form onSubmit={handleManualLogin} className="space-y-3 pt-3 border-t border-white/10">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-[#FF4B5C]">key</span>
                <span>Enter Admin-Provided Credentials</span>
              </h4>

              {loginError && (
                <div className="p-2.5 rounded-xl bg-[#FF4B5C]/20 border border-[#FF4B5C]/40 text-xs text-[#ffb3b3] font-semibold">
                  {loginError}
                </div>
              )}

              <div>
                <label className="block text-[11px] font-semibold text-[#e3bebd] mb-1">
                  LOGIN ID (assigned by Admin)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. MPL-2026-8812"
                  value={enteredLoginId}
                  onChange={(e) => setEnteredLoginId(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-[#aa8988] font-mono focus:border-[#FF4B5C] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#e3bebd] mb-1">
                  PASSCODE (assigned by Admin)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Campus#8812"
                  value={enteredPasscode}
                  onChange={(e) => setEnteredPasscode(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-[#aa8988] font-mono focus:border-[#FF4B5C] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF4B5C] to-[#6C4AB6] text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:opacity-90 active:scale-95 transition-all cursor-pointer"
              >
                VERIFY & LOG IN
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
