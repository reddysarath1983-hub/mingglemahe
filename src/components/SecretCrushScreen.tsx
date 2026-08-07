import React, { useState } from 'react';
import { SecretCrush } from '../types';

interface SecretCrushScreenProps {
  onOpenCampusPass: () => void;
  hasCampusPass: boolean;
}

export const SecretCrushScreen: React.FC<SecretCrushScreenProps> = ({
  onOpenCampusPass,
  hasCampusPass,
}) => {
  const [crushes, setCrushes] = useState<SecretCrush[]>([
    {
      id: 'crush-1',
      crushEmail: 'aanya.mit@manipal.edu',
      studentName: 'Aanya (B.Tech 2nd Year)',
      status: 'matched',
      timestamp: '2 days ago',
    },
    {
      id: 'crush-2',
      crushEmail: 'rohan.kmc@manipal.edu',
      status: 'pending',
      timestamp: 'Yesterday',
    },
  ]);

  const [emailInput, setEmailInput] = useState('');
  const [noteInput, setNoteInput] = useState('');
  const [addedSuccess, setAddedSuccess] = useState(false);

  const handleAddCrush = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;

    const newEntry: SecretCrush = {
      id: `crush-${Date.now()}`,
      crushEmail: emailInput.trim(),
      status: 'pending',
      timestamp: 'Just now',
    };

    setCrushes([newEntry, ...crushes]);
    setEmailInput('');
    setNoteInput('');
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 3000);
  };

  return (
    <div className="w-full max-w-md mx-auto flex-1 flex flex-col px-4 pt-2 pb-24">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff5260]/20 border border-[#ff5260]/40 text-[#ffb3b3] text-xs font-bold uppercase tracking-wider mb-2">
          <span className="material-symbols-outlined text-sm">local_fire_department</span>
          <span>ANONYMOUS & ENCRYPTED</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Campus Secret Crush</h1>
        <p className="text-xs text-[#e3bebd] max-w-xs mx-auto mt-1">
          Add up to 5 student emails. No one knows unless they add you back!
        </p>
      </div>

      {/* Secret Crush Input Card */}
      <div className="glass-panel rounded-2xl p-5 mb-6 border border-white/10 shadow-xl relative overflow-hidden">
        <form onSubmit={handleAddCrush} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#e3bebd] mb-1.5 uppercase tracking-wider">
              Institutional Email or Student ID
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#aa8988]">
                alternate_email
              </span>
              <input
                type="email"
                required
                placeholder="name.student@manipal.edu"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-white placeholder-[#aa8988] focus:outline-none focus:border-[#FF4B5C]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#e3bebd] mb-1.5 uppercase tracking-wider">
              Secret Vibe Hint (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Saw you at MIT Library floor 2..."
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-[#aa8988] focus:outline-none focus:border-[#6C4AB6]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FF4B5C] to-[#6C4AB6] text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:opacity-90 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">lock</span>
            <span>LOCK IN SECRET CRUSH</span>
          </button>
        </form>

        {addedSuccess && (
          <div className="mt-3 p-3 rounded-xl bg-[#0ba574]/20 border border-[#5edda8]/40 text-[#5edda8] text-xs font-medium text-center animate-in fade-in">
            🔒 Secret crush securely encrypted! We will notify you if it matches.
          </div>
        )}
      </div>

      {/* List of active Secret Crushes */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xs font-bold text-[#e3bebd] uppercase tracking-wider">
            Your Secret Crushes ({crushes.length}/5)
          </h2>
          {!hasCampusPass && (
            <button
              onClick={onOpenCampusPass}
              className="text-[11px] text-[#d1bcff] hover:underline flex items-center gap-1 font-semibold"
            >
              <span className="material-symbols-outlined text-xs">workspace_premium</span>
              <span>Unlock 10 Crush Slots</span>
            </button>
          )}
        </div>

        <div className="space-y-2.5">
          {crushes.map((crush) => (
            <div
              key={crush.id}
              className="glass-panel p-3.5 rounded-xl flex items-center justify-between border border-white/10"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#55329e]/30 border border-[#55329e]/50 flex items-center justify-center text-[#d1bcff]">
                  <span className="material-symbols-outlined text-lg">favorite</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-white">
                    {crush.studentName || crush.crushEmail}
                  </p>
                  <span className="text-[10px] text-[#e3bebd]/70 font-mono">
                    Added {crush.timestamp}
                  </span>
                </div>
              </div>

              <div>
                {crush.status === 'matched' ? (
                  <span className="px-2.5 py-1 rounded-full bg-[#0ba574]/20 border border-[#5edda8]/40 text-[#5edda8] text-[10px] font-bold">
                    IT'S A MATCH! 🎉
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#e3bebd] text-[10px] font-semibold">
                    PENDING MATCH 🔒
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
