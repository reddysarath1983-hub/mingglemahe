import { StudentProfile, MatchItem, AdminActivity, AdminStats } from '../types';

export const ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgTh7dOFGJN3zcA571te05PpF-YLEaQltsbUPIuX8azmWc7-Awc8t-FzOQTFO9qrpYoU2Sw8nLWTEQS0BZDl6EQx-u_sRGgbnzFJ4ihkNTBVcxyY7D_CoLbRsVqETnpbPBuffFGueVtCt8tDP-3-9lXyO6X_lPEp3zpE_TBN7RREzCH-rTVTKLlU16O-iWymgnsZmHvbaDaAxTXxut7yzm38hjIFzYZxyi52OC81nh-aH4vdW2tTy6',
  romanticBackground: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=2000&auto=format&fit=crop',
  backgroundOverlay: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=2000&auto=format&fit=crop',
  userAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDV_c_i7kpkNii4iM_OBqu_LiktPgowuYOShGGsNzcjWd4Dqvz0uangEkqx0bEyLoyxz7z6EGTanbEAU8RSwsINfnGpX8pHKmUZi7z0ffQRbizBszlUwVZpZcx1AcyVXiDq41MA5AptNwCWR5ydqgphtqjUfaWYid2oUI5clE8Pl3ZPjhfoqN3LUYD7dc6JmRmYWRCrtCSf4IlLuyD-0C1ZskHnJarUcqOEwi90a2T7hFSeh27NAXwB',
  campusPassHero: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1200&auto=format&fit=crop',
  adminRegistrar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASkdeMYlCGCqIF56WIm8xxKxmko8s4HHF8MSa-0Xsz6sEfn3OwWIJhfWyEZQKRNVrFkfh4D5VDTrFswKeBoWhS_pR6qv2sAtxfT6RXqWA6I9VrkxTw83QbWZOxXifU41zbOHB-4yW5ABOzVt77RZHzp6iWYI158Q1wzmv3oLIs2aq04p2MEq3mbKY7E0xYlcItB9xxcqi7iTc4ZjsTJwAp7cJh7Pi3yaIYImqj1RVvZI_v2ivipG5d',
  
  // New Local Assets
  bhavyaMain: '/profiles/bhavya_main.png',
  bhavya1: '/profiles/bhavya_1.png',
  bhavya2: '/profiles/bhavya_2.png',
  bhavya3: '/profiles/bhavya_3.png',
  bhavya4: '/profiles/bhavya_4.png',
  pragyaMain: '/profiles/pragya_main.png',
};

export const INITIAL_PROFILES: StudentProfile[] = [
  {
    id: 'bhavya-1',
    name: 'Bhavya',
    age: 20,
    major: 'B.Des Fashion Design',
    year: '2nd Year',
    campus: 'MSAP Manipal',
    quote: '"Laughing my way through design projects and endless coffee cups."',
    bio: 'Design student who spends way too much time hunting for aesthetic cafes and cute thrifted clothes. Let us go for a late-night drive or study date!',
    interests: ['Fashion', 'Photography', 'Cafes', 'Road Trips', 'Art'],
    verified: true,
    avatarUrl: ASSETS.bhavyaMain,
    photos: [ASSETS.bhavyaMain, ASSETS.bhavya1, ASSETS.bhavya2, ASSETS.bhavya3, ASSETS.bhavya4],
    spotifyTrack: 'Espresso - Sabrina Carpenter',
    coffeeSpot: 'Egg Factory',
    distance: '0.5 km away'
  },
  {
    id: 'pragya-1',
    name: 'Pragya',
    age: 21,
    major: 'B.Tech Computer Science',
    year: '3rd Year',
    campus: 'MIT Manipal',
    quote: '"Coding by day, cyberpunk aesthetics by night."',
    bio: 'Tech enthusiast who loves neon lights and building cool software. Looking for someone who can keep up with me in Mario Kart and debate AI over midnight snacks.',
    interests: ['Coding', 'Gaming', 'Tech', 'Neon Art', 'Snacks'],
    verified: true,
    avatarUrl: ASSETS.pragyaMain,
    photos: [ASSETS.pragyaMain],
    spotifyTrack: 'Midnight City - M83',
    coffeeSpot: 'Canara Mall Brews',
    distance: '1.2 km away'
  }
];

export const INITIAL_MATCHES: MatchItem[] = [];

export const INITIAL_ADMIN_STATS: AdminStats = {
  totalUsers: 4289,
  verifiedStudents: 3950,
  pendingPayments: 42,
  paidMembers: 1204
};

export const INITIAL_ADMIN_ACTIVITIES: AdminActivity[] = [
  {
    id: 'act-1',
    userName: 'Vikramaditya S',
    action: 'Campus Pass Payment Verified',
    status: 'Completed',
    time: '3 hours ago',
    avatarUrl: ASSETS.userAvatar,
    paymentDetails: {
      upiNumber: 'mingle.manipal@okaxis',
      transactionRef: 'UTR7719203910',
      amount: '₹6.69',
      screenshotUrl: ASSETS.userAvatar,
      studentPhoneNumber: '200711011'
    }
  }
];
