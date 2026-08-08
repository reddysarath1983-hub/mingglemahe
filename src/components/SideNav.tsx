import React, { useState } from 'react';
import { ViewScreen } from '../types';

interface SideNavProps {
  currentView: ViewScreen;
  setCurrentView: (view: ViewScreen) => void;
  unreadMessagesCount: number;
}

export const SideNav: React.FC<SideNavProps> = ({
  currentView,
  setCurrentView,
  unreadMessagesCount,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (currentView === 'splash' || currentView === 'verify' || currentView === 'admin' || currentView === 'onboarding-details' || currentView === 'payment-step' || currentView === 'awaiting-approval') {
    return null;
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-[18px] left-4 z-50 p-2 rounded-full glass-panel border border-white/20 text-[#f9dcdb] shadow-lg cursor-pointer flex items-center justify-center bg-black/40 backdrop-blur-md"
      >
        <span className="material-symbols-outlined">{isOpen ? 'close' : 'menu'}</span>
      </button>

      <nav className={`fixed top-0 bottom-0 left-4 sm:left-6 md:left-8 z-40 flex flex-col justify-center items-center py-4 pointer-events-none transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-[150%] md:translate-x-0'}`}>
        <div className="w-16 sm:w-[72px] h-[60vh] min-h-[350px] max-h-[500px] rounded-full bg-black/80 md:bg-black/40 backdrop-blur-xl border border-white/15 shadow-2xl flex flex-col justify-around items-center py-6 px-2 pointer-events-auto">
        {/* Discover / Swipe */}
        <button
          onClick={() => { setCurrentView('discover'); setIsOpen(false); }}
          className={`flex items-center justify-center p-3 rounded-full transition-all duration-200 cursor-pointer ${
            currentView === 'discover'
              ? 'bg-gradient-to-r from-[#ff5260] to-[#55329e] text-white shadow-lg scale-105'
              : 'text-[#e3bebd] hover:bg-white/10'
          }`}
          title="Discover Students"
        >
          <span className="material-symbols-outlined text-xl">explore</span>
        </button>

        {/* Secret Crush Feature */}
        <button
          onClick={() => { setCurrentView('crush'); setIsOpen(false); }}
          className={`flex items-center justify-center p-3 rounded-full transition-all duration-200 cursor-pointer ${
            currentView === 'crush'
              ? 'bg-gradient-to-r from-[#ff5260] to-[#55329e] text-white shadow-lg scale-105'
              : 'text-[#e3bebd] hover:bg-white/10'
          }`}
          title="Campus Secret Crush"
        >
          <span className="material-symbols-outlined text-xl">local_fire_department</span>
        </button>

        {/* Campus Pass Upgrade */}
        <button
          onClick={() => { setCurrentView('campus-pass'); setIsOpen(false); }}
          className={`flex items-center justify-center p-3 rounded-full transition-all duration-200 cursor-pointer ${
            currentView === 'campus-pass'
              ? 'bg-gradient-to-r from-[#ff5260] to-[#55329e] text-white shadow-lg scale-105'
              : 'text-[#e3bebd] hover:bg-white/10'
          }`}
          title="Campus Pass"
        >
          <span className="material-symbols-outlined text-xl">workspace_premium</span>
        </button>

        {/* Chats & Messages */}
        <button
          onClick={() => { setCurrentView('chats'); setIsOpen(false); }}
          className={`relative flex items-center justify-center p-3 rounded-full transition-all duration-200 cursor-pointer ${
            currentView === 'chats' || currentView === 'chat-detail'
              ? 'bg-gradient-to-r from-[#ff5260] to-[#55329e] text-white shadow-lg scale-105'
              : 'text-[#e3bebd] hover:bg-white/10'
          }`}
          title="Messages"
        >
          <span className="material-symbols-outlined text-xl">chat_bubble</span>
          {unreadMessagesCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#ff5260] text-white text-[10px] font-bold flex items-center justify-center border border-[#1e0f10]">
              {unreadMessagesCount}
            </span>
          )}
        </button>

        {/* Profile */}
        <button
          onClick={() => { setCurrentView('profile'); setIsOpen(false); }}
          className={`flex items-center justify-center p-3 rounded-full transition-all duration-200 cursor-pointer ${
            currentView === 'profile'
              ? 'bg-gradient-to-r from-[#ff5260] to-[#55329e] text-white shadow-lg scale-105'
              : 'text-[#e3bebd] hover:bg-white/10'
          }`}
          title="My Profile"
        >
          <span className="material-symbols-outlined text-xl">person</span>
        </button>
      </div>
    </nav>
    </>
  );
};
