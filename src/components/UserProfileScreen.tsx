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
  onLogout?: () => void;
}

export const UserProfileScreen: React.FC<UserProfileScreenProps> = ({
  userProfile,
  onUpdateProfile,
  onOpenCampusPass,
  hasCampusPass,
  onLogout,
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
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setAvatarUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
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
    <div className="py-6 px-4 max-w-md mx-auto w-full space-y-5 pb-24 text-left">
      <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-4 shadow-xl">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-black text-white">Edit Student Profile</h2>
          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              className="px-3 py-1 rounded-full bg-[#FF4B5C]/20 border border-[#FF4B5C]/40 text-[#ffb3b3] text-xs font-bold hover:bg-[#FF4B5C]/30 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-xs">logout</span>
              <span>LOGOUT</span>
            </button>
          )}
        </div>

        {/* Avatar Upload */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#FF4B5C] relative group">
            <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
              <span className="material-symbols-outlined text-white text-lg">edit</span>
              <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
            </label>
          </div>
          <div>
            <p className="font-bold text-white text-sm">{userName}</p>
            <p className="text-xs text-[#e3bebd] font-mono">{userProfile.email || 'learner.manipal.edu'}</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-3 pt-2">
          <div>
            <label className="block text-xs text-[#e3bebd] mb-1 font-semibold">Full Name</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF4B5C]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-[#e3bebd] mb-1 font-semibold">My Gender</label>
              <select
                value={userGender}
                onChange={(e) => setUserGender(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-[#2a1718] border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF4B5C]"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-[#e3bebd] mb-1 font-semibold">Looking For</label>
              <select
                value={userLookingFor}
                onChange={(e) => setUserLookingFor(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-[#2a1718] border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF4B5C]"
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="everyone">Everyone</option>
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
