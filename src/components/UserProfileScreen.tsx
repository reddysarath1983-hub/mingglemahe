import React, { useState } from 'react';
import { ASSETS } from '../data/studentProfiles';

interface UserProfileScreenProps {
  userProfile: {
    fullName: string;
    phoneNumber: string;
    email: string;
    major: string;
    year: string;
    campus: string;
    bio: string;
    quote: string;
    interests: string[];
    avatarUrl: string;
    gender?: 'male' | 'female' | 'other';
    lookingFor?: 'female' | 'male' | 'everyone';
  };
  onUpdateProfile: (updated: {
    fullName: string;
    phoneNumber: string;
    email: string;
    major: string;
    year: string;
    campus: string;
    bio: string;
    quote: string;
    avatarUrl: string;
    gender?: 'male' | 'female' | 'other';
    lookingFor?: 'female' | 'male' | 'everyone';
  }) => void;
  onOpenCampusPass: () => void;
  hasCampusPass: boolean;
  onOpenAdmin: () => void;
}

export const UserProfileScreen: React.FC<UserProfileScreenProps> = ({
  userProfile,
  onUpdateProfile,
  onOpenCampusPass,
  hasCampusPass,
}) => {
  const [userName, setUserName] = useState(userProfile.fullName || 'Student');
  const [userAge, setUserAge] = useState(21);
  const [userMajor, setUserMajor] = useState(userProfile.major || 'B.Tech Computer Science');
  const [userYear, setUserYear] = useState(userProfile.year || '2nd Year');
  const [userCampus, setUserCampus] = useState(userProfile.campus || 'MIT Manipal');
  const [userGender, setUserGender] = useState<'male' | 'female' | 'other'>(userProfile.gender || 'male');
  const [userLookingFor, setUserLookingFor] = useState<'female' | 'male' | 'everyone'>(userProfile.lookingFor || 'female');
  const [userQuote, setUserQuote] = useState(userProfile.quote || 'Looking for good coffee and coding buddies!');
  const [userBio, setUserBio] = useState(userProfile.bio || 'Late night builds, sunset views at End Point, coffee lover.');
  const [avatarUrl, setAvatarUrl] = useState(userProfile.avatarUrl || ASSETS.userAvatar);
  const [isSaved, setIsSaved] = useState(false);

  // Sync state whenever userProfile prop updates
  React.useEffect(() => {
    if (userProfile) {
      setUserName(userProfile.fullName || 'Student');
      setUserMajor(userProfile.major || 'B.Tech Computer Science');
      setUserYear(userProfile.year || '2nd Year');
      setUserCampus(userProfile.campus || 'MIT Manipal');
      setUserGender(userProfile.gender || 'male');
      setUserLookingFor(userProfile.lookingFor || 'female');
      setUserQuote(userProfile.quote || 'Looking for good coffee and coding buddies!');
      setUserBio(userProfile.bio || 'Late night builds, sunset views at End Point, coffee lover.');
      setAvatarUrl(userProfile.avatarUrl || ASSETS.userAvatar);
    }
  }, [userProfile]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      fullName: userName,
      phoneNumber: userProfile.phoneNumber,
      email: userProfile.email,
      major: userMajor,
      year: userYear,
      campus: userCampus,
      bio: userBio,
      quote: userQuote,
      avatarUrl,
      gender: userGender,
      lookingFor: userLookingFor,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="w-full max-w-md mx-auto flex-1 flex flex-col px-4 pt-2 pb-24">
      {/* Profile Card Header */}
      <div className="glass-panel rounded-2xl p-5 mb-6 text-center relative border border-white/10 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#6C4AB6]/20 blur-3xl rounded-full"></div>

        {/* Change Avatar / Display Picture */}
        <div className="relative w-24 h-24 mx-auto mb-3 group cursor-pointer">
          <img
            src={avatarUrl}
            alt="My Avatar"
            className="w-full h-full object-cover rounded-full border-2 border-[#FF4B5C] shadow-lg"
          />
          <label className="absolute inset-0 bg-black/60 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white">
            <span className="material-symbols-outlined text-2xl">photo_camera</span>
            <span className="text-[9px] font-bold">CHANGE DP</span>
            <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
          </label>
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

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-[#e3bebd] mb-1 font-semibold">Gender</label>
              <select
                value={userGender}
                onChange={(e) => setUserGender(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-[#2a1718] border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF4B5C]"
              >
                <option value="male">Male 👨</option>
                <option value="female">Female 👩</option>
                <option value="other">Non-Binary / Other ✨</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-[#e3bebd] mb-1 font-semibold">Show Me Profiles Of</label>
              <select
                value={userLookingFor}
                onChange={(e) => setUserLookingFor(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-[#2a1718] border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF4B5C]"
              >
                <option value="female">Females 👩</option>
                <option value="male">Males 👨</option>
                <option value="everyone">Everyone ✨</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs text-[#e3bebd] mb-1 font-semibold font-mono">Department & Degree</label>
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
              ✓ Profile & Display Picture updated!
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
