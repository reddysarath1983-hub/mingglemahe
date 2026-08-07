import React, { useState } from 'react';
import { ASSETS } from '../data/studentProfiles';

interface OnboardingDetailsScreenProps {
  onSubmitDetails: (details: {
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
  }) => void;
  onBackToSplash: () => void;
}

export const OnboardingDetailsScreen: React.FC<OnboardingDetailsScreenProps> = ({
  onSubmitDetails,
  onBackToSplash,
}) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('student@manipal.edu');
  const [major, setMajor] = useState('B.Tech Computer Science');
  const [year, setYear] = useState('2nd Year');
  const [campus, setCampus] = useState('MIT Manipal');
  const [bio, setBio] = useState('Coffee lover, late night coder, and sunset explorer at End Point.');
  const [quote, setQuote] = useState('Looking for coffee buddies and gym partners!');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Coffee', 'Music', 'Coding']);
  const [avatarUrl, setAvatarUrl] = useState<string>(ASSETS.userAvatar);

  const availableInterests = ['Coffee', 'Music', 'Coding', 'Basketball', 'Photography', 'Films', 'Fitness', 'Surfing', 'Gaming', 'Art'];

  const toggleInterest = (item: string) => {
    if (selectedInterests.includes(item)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== item));
    } else {
      setSelectedInterests([...selectedInterests, item]);
    }
  };

  const handleAvatarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phoneNumber.trim()) {
      alert('Please fill in your Full Name and Phone Number.');
      return;
    }

    onSubmitDetails({
      fullName,
      phoneNumber,
      email,
      major,
      year,
      campus,
      bio,
      quote,
      interests: selectedInterests,
      avatarUrl,
    });
  };

  return (
    <div className="bg-[#1e0f10] text-[#f9dcdb] min-h-screen py-8 px-4 flex flex-col items-center justify-center font-sans antialiased relative overflow-hidden">
      {/* Ambient Background Glow */}
      <div className="ambient-glow top-10 left-1/2 -translate-x-1/2 opacity-30"></div>

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToSplash}
            className="p-2 rounded-full glass-panel text-[#e3bebd] hover:text-white"
          >
            <span className="material-symbols-outlined text-xl">arrow_back</span>
          </button>
          <div>
            <div className="text-[10px] font-bold text-[#ff5260] tracking-widest uppercase">
              STEP 1 OF 3 • REGISTRATION
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Basic Student Details</h1>
          </div>
        </div>

        {/* Form Card */}
        <div className="glass-panel rounded-3xl p-6 border border-white/10 shadow-2xl space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Avatar Upload Preview */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#FF4B5C] mb-2 shadow-lg group">
                <img src={avatarUrl} alt="Avatar Preview" className="w-full h-full object-cover" />
                <label className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <span className="material-symbols-outlined text-white text-2xl">photo_camera</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleAvatarSelect} />
                </label>
              </div>
              <p className="text-[11px] text-[#e3bebd]/80 font-medium">Tap photo to upload profile picture</p>
            </div>

            {/* Name and Reg Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#e3bebd] mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Sharma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-[#aa8988] focus:outline-none focus:border-[#FF4B5C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#e3bebd] mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-[#aa8988] focus:outline-none focus:border-[#FF4B5C]"
                />
              </div>
            </div>

            {/* Institutional Email */}
            <div>
              <label className="block text-xs font-semibold text-[#e3bebd] mb-1">Manipal Email (@manipal.edu)</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF4B5C]"
              />
            </div>

            {/* Major & Year */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#e3bebd] mb-1">Degree / Major</label>
                <input
                  type="text"
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF4B5C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#e3bebd] mb-1">Year of Study</label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a1718] border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF4B5C]"
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="Masters / PostGrad">Masters / PG</option>
                </select>
              </div>
            </div>

            {/* Campus Selection */}
            <div>
              <label className="block text-xs font-semibold text-[#e3bebd] mb-1">Campus Institute</label>
              <select
                value={campus}
                onChange={(e) => setCampus(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a1718] border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF4B5C]"
              >
                <option value="MIT Manipal">MIT (Manipal Institute of Tech)</option>
                <option value="KMC Manipal">KMC (Kasturba Medical College)</option>
                <option value="SOC Manipal">SOC (School of Communication)</option>
                <option value="MSAP Manipal">MSAP (Architecture & Design)</option>
                <option value="DOC Manipal">DOC (Department of Commerce)</option>
              </select>
            </div>

            {/* Catchphrase / Quote */}
            <div>
              <label className="block text-xs font-semibold text-[#e3bebd] mb-1">Profile Catchphrase</label>
              <input
                type="text"
                placeholder="e.g. Always looking for good coffee at Astra."
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-[#aa8988] focus:outline-none focus:border-[#FF4B5C]"
              />
            </div>

            {/* Select Interests */}
            <div>
              <label className="block text-xs font-semibold text-[#e3bebd] mb-1.5">Interests / Vibe Tags</label>
              <div className="flex flex-wrap gap-1.5">
                {availableInterests.map((tag) => {
                  const isSelected = selectedInterests.includes(tag);
                  return (
                    <button
                      type="button"
                      key={tag}
                      onClick={() => toggleInterest(tag)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-[#FF4B5C] text-white border border-[#FF4B5C]'
                          : 'bg-white/5 text-[#e3bebd] border border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FF4B5C] to-[#6C4AB6] text-white font-bold text-xs uppercase tracking-wider shadow-xl shadow-[#FF4B5C]/25 hover:opacity-90 active:scale-95 transition-all cursor-pointer mt-4 flex items-center justify-center gap-2"
            >
              <span>NEXT: VERIFY & PAYMENT</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
