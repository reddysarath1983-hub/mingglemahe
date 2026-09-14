import React from 'react';
import { ViewScreen } from '../types';
import { ASSETS } from '../data/studentProfiles';

interface HeaderProps {
  currentView: ViewScreen;
  setCurrentView: (view: ViewScreen) => void;
  hasCampusPass: boolean;
  onOpenCampusPass: () => void;
  onOpenAdmin: () => void;
  onOpenPreviews?: () => void;
  onOpenStudentLogin?: () => void;
  onLogout?: () => void;
  userAvatarUrl?: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
  hasCampusPass,
  onOpenCampusPass,
  onOpenAdmin,
  onOpenPreviews,
  onOpenStudentLogin,
  onLogout,
  userAvatarUrl,
}) => {
  // Hide top header on splash / verify screens
  if (currentView === 'splash' || currentView === 'verify' || currentView === 'onboarding-details' || currentView === 'payment-step') {
    return null;
  }

  return (
    <header className="flex justify-between items-center w-full px-3 sm:px-5 py-2.5 sm:py-3.5 z-40 bg-[#1e0f10]/85 backdrop-blur-md border-b border-[#5b4040]/30 sticky top-0">
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <button 
          onClick={() => setCurrentView('discover')}
          className="flex items-center gap-1.5 sm:gap-2 group text-left focus:outline-none cursor-pointer"
        >
          <img 
            src={ASSETS.logo} 
            alt="Mingle@Manipal Logo" 
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg object-cover shadow-lg border border-white/10 group-hover:scale-105 transition-transform" 
          />
          <div>
            <h1 className="font-bold text-sm sm:text-lg leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[#FF4B5C] to-[#6C4AB6] tracking-tight">
              MINGLE@MANIPAL
            </h1>
            <span className="text-[9px] sm:text-[10px] text-[#e3bebd]/70 font-semibold tracking-wider uppercase hidden xs:block">
              Academic Network
            </span>
          </div>
        </button>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {/* Previews Button */}
        {onOpenPreviews && (
          <button
            onClick={onOpenPreviews}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-[#f9dcdb] font-semibold transition-all flex items-center gap-1 cursor-pointer"
            title="Preview Student Cards"
          >
            <span className="material-symbols-outlined text-[16px] text-[#ffb3b3]">style</span>
            <span className="hidden md:inline">PREVIEWS</span>
          </button>
        )}

        {/* Campus Pass Badge Button */}
        <button
          onClick={onOpenCampusPass}
          className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1 sm:gap-1.5 shadow-md cursor-pointer ${
            hasCampusPass 
              ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/40' 
              : 'bg-gradient-to-r from-[#FF4B5C] to-[#6C4AB6] text-white hover:opacity-90 active:scale-95'
          }`}
        >
          <span className="material-symbols-outlined text-[14px] sm:text-[16px]">
            {hasCampusPass ? 'verified' : 'workspace_premium'}
          </span>
          <span className="text-[10px] sm:text-xs">{hasCampusPass ? 'PASS ACTIVE' : 'PASS'}</span>
        </button>

        {/* Student Login or Logout Button */}
        {hasCampusPass ? (
          onLogout && (
            <button
              onClick={onLogout}
              title="Logout Account"
              className="px-2.5 py-1.5 rounded-full bg-white/10 hover:bg-[#FF4B5C]/20 border border-white/20 hover:border-[#FF4B5C]/50 text-xs text-white font-bold transition-all cursor-pointer flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm text-[#FF4B5C]">logout</span>
              <span className="hidden sm:inline">LOGOUT</span>
            </button>
          )
        ) : (
          onOpenStudentLogin && (
            <button
              onClick={onOpenStudentLogin}
              title="Student Login"
              className="px-2.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs text-white font-bold transition-all cursor-pointer flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm text-[#5edda8]">key</span>
              <span className="hidden sm:inline">LOGIN</span>
            </button>
          )
        )}

        {/* Admin Dashboard Switch - Only visible when in admin view or discreetly */}
        {currentView === 'admin' && (
          <button
            onClick={onOpenAdmin}
            title="Admin Panel"
            className="px-2.5 py-1.5 rounded-full bg-[#FF4B5C]/30 text-[#ffb3b3] border border-[#FF4B5C] transition-all cursor-pointer flex items-center gap-1 text-xs font-bold"
          >
            <span className="material-symbols-outlined text-sm text-[#FF4B5C]">admin_panel_settings</span>
            <span className="hidden sm:inline">ADMIN PANEL</span>
          </button>
        )}

        {/* User Profile avatar */}
        <button
          onClick={() => setCurrentView('profile')}
          className="w-9 h-9 rounded-full overflow-hidden border border-white/20 glass-panel active:scale-95 transition-transform cursor-pointer"
        >
          <img 
            src={userAvatarUrl || ASSETS.userAvatar} 
            alt="User Avatar" 
            className="w-full h-full object-cover" 
          />
        </button>
      </div>
    </header>
  );
};
