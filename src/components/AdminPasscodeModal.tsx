import React, { useState } from 'react';

interface AdminPasscodeModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminPasscodeModal: React.FC<AdminPasscodeModalProps> = ({
  onClose,
  onSuccess,
}) => {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === '3000') {
      onSuccess();
    } else {
      setError(true);
      setPasscode('');
    }
  };

  const handleKeyPress = (digit: string) => {
    setError(false);
    if (passcode.length < 4) {
      const newCode = passcode + digit;
      setPasscode(newCode);
      if (newCode === '3000') {
        setTimeout(() => {
          onSuccess();
        }, 150);
      }
    }
  };

  const handleDelete = () => {
    setError(false);
    setPasscode((prev) => prev.slice(0, -1));
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1e0f10]/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="glass-panel rounded-3xl p-6 border border-white/20 shadow-2xl max-w-xs w-full text-center relative space-y-5 animate-in zoom-in-95">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#e3bebd] hover:text-white p-1 rounded-full cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {/* Icon & Title */}
        <div className="pt-2">
          <div className="w-14 h-14 rounded-full bg-[#FF4B5C]/15 border border-[#FF4B5C]/30 text-[#FF4B5C] flex items-center justify-center mx-auto mb-3 shadow-lg">
            <span className="material-symbols-outlined text-3xl">admin_panel_settings</span>
          </div>
          <h2 className="text-xl font-extrabold text-white tracking-tight">Admin Passcode Access</h2>
          <p className="text-xs text-[#e3bebd] mt-1">Enter 4-digit passcode to enter Registrar Portal</p>
        </div>

        {/* Form Input */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Digit Dots Display */}
          <div className="flex justify-center items-center gap-3 my-2">
            {[0, 1, 2, 3].map((idx) => {
              const hasVal = passcode.length > idx;
              return (
                <div
                  key={idx}
                  className={`w-10 h-12 rounded-xl border flex items-center justify-center text-lg font-bold transition-all ${
                    error
                      ? 'border-[#FF4B5C] bg-[#FF4B5C]/20 text-[#FF4B5C] animate-shake'
                      : hasVal
                      ? 'border-[#5edda8] bg-[#5edda8]/15 text-[#5edda8]'
                      : 'border-white/20 bg-white/5 text-white/40'
                  }`}
                >
                  {hasVal ? '•' : ''}
                </div>
              );
            })}
          </div>

          {error && (
            <p className="text-xs text-[#FF4B5C] font-semibold animate-pulse">
              Incorrect passcode! Hint: 3000
            </p>
          )}

          {/* On-screen Keypad */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => handleKeyPress(num)}
                className="py-3 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white font-bold text-base active:scale-95 transition-all cursor-pointer"
              >
                {num}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPasscode('')}
              className="py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-[#e3bebd] cursor-pointer uppercase"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => handleKeyPress('0')}
              className="py-3 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white font-bold text-base active:scale-95 transition-all cursor-pointer"
            >
              0
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white cursor-pointer flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-lg">backspace</span>
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF4B5C] to-[#6C4AB6] text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:opacity-90 active:scale-98 transition-all cursor-pointer"
          >
            VERIFY PASSCODE
          </button>
        </form>
      </div>
    </div>
  );
};
