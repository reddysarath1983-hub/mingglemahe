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
  if (
    currentView === 'splash' ||
    currentView === 'verify' ||
    currentView === 'admin' ||
    currentView === 'onboarding-details' ||
    currentView === 'payment-step' ||
    currentView === 'awaiting-approval'
  ) {
    return null;
  }

  const navItems = [
    { id: 'discover', icon: 'explore', label: 'Discover' },
    { id: 'crush', icon: 'local_fire_department', label: 'Crush' },
    { id: 'campus-pass', icon: 'workspace_premium', label: 'Pass' },
    { id: 'chats', icon: 'chat_bubble', label: 'Chats', badge: unreadMessagesCount },
    { id: 'profile', icon: 'person', label: 'Profile' },
  ];

  return (
    <>
      {/* MOBILE BOTTOM NAVIGATION DOCK (visible on screens < md) */}
      <nav className="md:hidden fixed bottom-3 inset-x-3 max-w-md mx-auto z-50 bg-[#170a0c]/90 backdrop-blur-2xl border border-white/20 rounded-full flex justify-around items-center px-2 py-1.5 shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
        {navItems.map((item) => {
          const isActive =
            currentView === item.id ||
            (item.id === 'chats' && currentView === 'chat-detail');

          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id as ViewScreen)}
              className={`relative flex flex-col items-center justify-center p-2 rounded-full transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-[#FF4B5C] to-[#6C4AB6] text-white shadow-lg shadow-[#FF4B5C]/30 scale-105 px-3.5'
                  : 'text-[#e3bebd]/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              {isActive && (
                <span className="text-[9px] font-extrabold uppercase tracking-wider leading-none mt-0.5">
                  {item.label}
                </span>
              )}

              {item.badge && item.badge > 0 ? (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FF4B5C] text-white text-[9px] font-bold flex items-center justify-center border border-[#1e0f10]">
                  {item.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </nav>

      {/* DESKTOP SIDE FLOATING NAVIGATION BAR (visible on screens >= md) */}
      <nav className="hidden md:flex fixed top-0 bottom-0 left-6 z-40 flex-col justify-center items-center py-4 pointer-events-none">
        <div className="w-[72px] h-[480px] rounded-full bg-black/60 backdrop-blur-2xl border border-white/20 shadow-2xl flex flex-col justify-around items-center py-6 px-2 pointer-events-auto">
          {navItems.map((item) => {
            const isActive =
              currentView === item.id ||
              (item.id === 'chats' && currentView === 'chat-detail');

            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id as ViewScreen)}
                className={`relative flex items-center justify-center p-3 rounded-full transition-all duration-200 cursor-pointer group ${
                  isActive
                    ? 'bg-gradient-to-r from-[#FF4B5C] to-[#6C4AB6] text-white shadow-lg shadow-[#FF4B5C]/40 scale-110'
                    : 'text-[#e3bebd] hover:bg-white/15'
                }`}
                title={item.label}
              >
                <span className="material-symbols-outlined text-xl">{item.icon}</span>

                {item.badge && item.badge > 0 ? (
                  <span className="absolute top-1 right-1 w-4.5 h-4.5 rounded-full bg-[#FF4B5C] text-white text-[10px] font-bold flex items-center justify-center border border-[#1e0f10]">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

