import React, { useState } from 'react';
import { ASSETS } from '../data/studentProfiles';

interface UserProfileScreenProps {
  onOpenCampusPass: () => void;
  hasCampusPass: boolean;
  onOpenAdmin: () => void;
}

export const UserProfileScreen: React.FC<UserProfileScreenProps> = ({
  onOpenCampusPass,
  hasCampusPass,
  onOpenAdmin,
}) => {
  const [userName, setUserName] = useState('Alex');
  const [userAge, setUserAge] = useState(21);
  const [userMajor, setUserMajor] = useState('B.Tech Mechanical');
  const [userYear, setUserYear] = useState('3rd Year');
  const [userCampus, setUserCampus] = useState('MIT Manipal');
  const [userQuote, setUserQuote] = useState('Sunset coffee @ Malpe & late night lab builds.');
  const [userBio, setUserBio] = useState('Formula student team, coffee enthusiast, and weekend surfer.');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="w-full max-w-md mx-auto flex-1 flex flex-col px-4 pt-2 pb-24">
      {/* Profile Card Header */}
      <div className="glass-panel rounded-2xl p-5 mb-6 text-center relative border border-white/10 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#6C4AB6]/20 blur-3xl rounded-full"></div>

        <div className="relative w-24 h-24 mx-auto mb-3">
          <img
            src={ASSETS.userAvatar}
            alt="My Avatar"
            className="w-full h-full object-cover rounded-full border-2 border-[#FF4B5C] shadow-lg"
          />
          <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#0ba574] text-white flex items-center justify-center text-xs border-2 border-[#1e0f10]">
            <span className="material-symbols-outlined text-sm">verified</span>
          </div>
        </div>

        <h1 className="text-xl font-bold text-white mb-0.5">{userName}, {userAge}</h1>
        <p className="text-xs text-[#e3bebd] font-medium mb-3">{userMajor} • {userYear}</p>

        <div className="flex justify-center gap-2">
          <span className="px-3 py-1 rounded-full bg-[#5edda8]/15 border border-[#5edda8]/30 text-[#5edda8] text-xs font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">school</span> Verified Student
          </span>

          <button
            onClick={onOpenCampusPass}
            className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 cursor-pointer ${
              hasCampusPass
                ? 'bg-[#55329e]/30 text-[#d1bcff] border border-[#d1bcff]/30'
                : 'bg-gradient-to-r from-[#FF4B5C] to-[#6C4AB6] text-white shadow-md'
            }`}
          >
            <span className="material-symbols-outlined text-sm">workspace_premium</span>
            <span>{hasCampusPass ? 'CAMPUS PASS' : 'UPGRADE PASS'}</span>
          </button>
        </div>
      </div>

      {/* Edit Profile Form */}
      <div className="glass-panel rounded-2xl p-5 border border-white/10 shadow-xl mb-6">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-base text-[#ffb3b3]">edit_note</span>
          <span>Edit Student Profile</span>
        </h2>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-[#e3bebd] mb-1 font-semibold">Display Name</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF4B5C]"
              />
            </div>
            <div>
              <label className="block text-xs text-[#e3bebd] mb-1 font-semibold">Age</label>
              <input
                type="number"
                value={userAge}
                onChange={(e) => setUserAge(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF4B5C]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-[#e3bebd] mb-1 font-semibold">Department & Degree</label>
            <input
              type="text"
              value={userMajor}
              onChange={(e) => setUserMajor(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF4B5C]"
            />
          </div>

          <div>
            <label className="block text-xs text-[#e3bebd] mb-1 font-semibold">Short Profile Catchphrase / Quote</label>
            <input
              type="text"
              value={userQuote}
              onChange={(e) => setUserQuote(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF4B5C]"
            />
          </div>

          <div>
            <label className="block text-xs text-[#e3bebd] mb-1 font-semibold">About Me / Bio</label>
            <textarea
              rows={3}
              value={userBio}
              onChange={(e) => setUserBio(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF4B5C]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF4B5C] to-[#6C4AB6] text-white font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all cursor-pointer"
          >
            SAVE PROFILE CHANGES
          </button>

          {isSaved && (
            <p className="text-xs text-[#5edda8] text-center font-semibold animate-in fade-in">
              ✓ Profile successfully updated!
            </p>
          )}
        </form>
      </div>

      {/* Admin Quick Switch */}
      <div className="glass-panel p-4 rounded-2xl flex items-center justify-between border border-white/10">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-2xl text-[#d1bcff]">admin_panel_settings</span>
          <div>
            <p className="text-xs font-bold text-white">Campus Registrar Portal</p>
            <p className="text-[10px] text-[#e3bebd]">View verification queue & live stats</p>
          </div>
        </div>
        <button
          onClick={onOpenAdmin}
          className="px-3 py-1.5 rounded-full bg-[#FF4B5C]/20 hover:bg-[#FF4B5C]/30 border border-[#FF4B5C]/30 text-xs font-bold text-[#ffb3b3] transition-colors cursor-pointer flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-sm text-[#FF4B5C]">lock</span>
          <span>ADMIN (3000)</span>
        </button>
      </div>
    </div>
  );
};
