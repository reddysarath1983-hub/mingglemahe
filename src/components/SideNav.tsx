import React from 'react';
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
  if (currentView === 'splash' || currentView === 'verify' || currentView === 'admin') {
    return null;
  }

  return (
    <nav className="fixed top-0 bottom-0 left-4 sm:left-6 md:left-8 z-40 flex flex-col justify-center items-center py-4 pointer-events-none">
      <div className="w-16 sm:w-[72px] h-[60vh] min-h-[350px] max-h-[500px] rounded-full bg-black/40 backdrop-blur-xl border border-white/15 shadow-2xl flex flex-col justify-around items-center py-6 px-2 pointer-events-auto">
        {/* Discover / Swipe */}
        <button
          onClick={() => setCurrentView('discover')}
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
          onClick={() => setCurrentView('crush')}
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
          onClick={() => setCurrentView('campus-pass')}
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
          onClick={() => setCurrentView('chats')}
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
          onClick={() => setCurrentView('profile')}
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
  );
};
