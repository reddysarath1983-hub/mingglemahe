import { StudentProfile, MatchItem, AdminActivity, AdminStats } from '../types';

export const ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgTh7dOFGJN3zcA571te05PpF-YLEaQltsbUPIuX8azmWc7-Awc8t-FzOQTFO9qrpYoU2Sw8nLWTEQS0BZDl6EQx-u_sRGgbnzFJ4ihkNTBVcxyY7D_CoLbRsVqETnpbPBuffFGueVtCt8tDP-3-9lXyO6X_lPEp3zpE_TBN7RREzCH-rTVTKLlU16O-iWymgnsZmHvbaDaAxTXxut7yzm38hjIFzYZxyi52OC81nh-aH4vdW2tTy6',
  romanticBackground: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=2000&auto=format&fit=crop',
  backgroundOverlay: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=2000&auto=format&fit=crop',
  userAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDV_c_i7kpkNii4iM_OBqu_LiktPgowuYOShGGsNzcjWd4Dqvz0uangEkqx0bEyLoyxz7z6EGTanbEAU8RSwsINfnGpX8pHKmUZi7z0ffQRbizBszlUwVZpZcx1AcyVXiDq41MA5AptNwCWR5ydqgphtqjUfaWYid2oUI5clE8Pl3ZPjhfoqN3LUYD7dc6JmRmYWRCrtCSf4IlLuyD-0C1ZskHnJarUcqOEwi90a2T7hFSeh27NAXwB',
  aanyaPhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDf-9Pub2f1bKyOu69so0tLZn4ZjcgxZzBntwx639MGejE_weSndSP6teKkzC0GIiGWeFuoIX_OO6qVdCahyAUWX-wOh1Qx1TmXSgNYnRD8cROj01HiAFpBGAx9ZeQmdrYJcv7qQKqvq-4tLIRi4thTsRvqBlSHRgyYvRl5yLFP8tNAMLPx55dqSGMCJBYOpb4ncJZ3XUXHZEvvmYOgXiCWOb4VNCgLFyPckp1k1BEuHVRzcpUlQsh8',
  matchUserLeft: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMzIPehZfFjRxEshEagCuHn7N42CeyW9qrfWClDzaRPHAn3EkiXveWHjU9sqdWYcaNsQOJd6RW8J2efLCDT2dl3K6u70nH5WEUhgwl1qF6-1VWE-mMWVHsAfyyj6Ks9HhfrUG2qt5CXFh6Wou3qpXbD4VNpYz38UDr1_SwblfgPxnTvTqveK6C7iyCaVvZsP_0FjGWU9ff-6hbMFobz-r6ghooIC5PUvPrGYS8YMC8MjdgrDKHUHB7',
  matchAanyaRight: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvS1N6lnz-E-Nk-zUjpEytDKByPeCA95FbOweoRfyGv0IIbKxSNXhcJ9F6iF4ABLKy2oVe1zmnNwu_-Pe4nTb_2G4imBnP8ySiXnKAC1QxscwYLD6niNyMy3T84KlUxoNzvAFt1LUYapHTUTezn1VkfaqovPiX4NJnL5_T9zxlaE_XKYd2qxyBynwqKvARbZVzI3fWDkQ5erShtEgW-GjrTU4nuVFAXy6A4ALdn2WLCQxdqmc0UPBc',
  campusPassHero: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1200&auto=format&fit=crop',
  adminRegistrar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASkdeMYlCGCqIF56WIm8xxKxmko8s4HHF8MSa-0Xsz6sEfn3OwWIJhfWyEZQKRNVrFkfh4D5VDTrFswKeBoWhS_pR6qv2sAtxfT6RXqWA6I9VrkxTw83QbWZOxXifU41zbOHB-4yW5ABOzVt77RZHzp6iWYI158Q1wzmv3oLIs2aq04p2MEq3mbKY7E0xYlcItB9xxcqi7iTc4ZjsTJwAp7cJh7Pi3yaIYImqj1RVvZI_v2ivipG5d',
  adminSmallAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCr695noi85phh3J4IKk78qJRxDbxw9--d_gMGq1kHpNoyPEQOfqcrifmAPqrA2C0I2xyL2TWQUBU7__H40x0EvB7QMHEWvzT6ER1ohdEXwiLnavjI3PrFT2_Hz39g4Fmbi4TznukqMgEQvKm1QHoEHsDSMcPbmYq1vgWsRcYrZ8TgHvXolYTAlMPkeI5ucjo-rYzqP9WTmFCTOxJECyDHtxzltDBHB8nD14uI5DqHA4V3X9zwHPeu'
};

export const INITIAL_PROFILES: StudentProfile[] = [
  {
    id: '1',
    name: 'Aanya',
    age: 20,
    major: 'B.Tech Computer Science',
    year: '2nd Year',
    campus: 'Manipal Campus',
    quote: '"Probably somewhere looking for good coffee."',
    bio: 'Tech enthusiast, late-night campus rambler, and coffee reviewer at Egg Factory. Always down for indie rock jams or study sessions at KMC Library.',
    interests: ['Music', 'Coffee', 'Travel', 'Coding', 'Photography'],
    verified: true,
    avatarUrl: ASSETS.aanyaPhoto,
    photos: [ASSETS.aanyaPhoto, ASSETS.matchAanyaRight],
    spotifyTrack: 'Midnight City - M83',
    coffeeSpot: 'Canara Mall Brews',
    distance: '0.4 km away'
  },
  {
    id: '2',
    name: 'Kabir',
    age: 21,
    major: 'MBBS Medical',
    year: '3rd Year',
    campus: 'KMC Manipal',
    quote: '"Surviving anatomy exams with filter coffee."',
    bio: 'Future doctor, basketball point guard, and vinyl record collector. Looking for someone who can keep up with late night food runs to End Point.',
    interests: ['Basketball', 'Medicine', 'Indie Rock', 'Fitness', 'Sunset Points'],
    verified: true,
    avatarUrl: ASSETS.campusPassHero,
    photos: [ASSETS.campusPassHero],
    spotifyTrack: 'Yellow - Coldplay',
    coffeeSpot: 'Astra Cafe',
    distance: '0.8 km away'
  },
  {
    id: '3',
    name: 'Meera',
    age: 20,
    major: 'BBA Media & Comm',
    year: '2nd Year',
    campus: 'SOC Manipal',
    quote: '"Film camera addict & rooftop concert hunter."',
    bio: 'Chasing golden hour lighting across campus. I host podcast episodes on campus student nightlife and design zines.',
    interests: ['Film Photography', 'Podcasts', 'Art', 'Nightlife', 'Cinema'],
    verified: true,
    avatarUrl: ASSETS.matchAanyaRight,
    photos: [ASSETS.matchAanyaRight],
    spotifyTrack: 'Starboy - The Weeknd',
    coffeeSpot: 'Snack Shack',
    distance: '1.2 km away'
  },
  {
    id: '4',
    name: 'Siddharth',
    age: 22,
    major: 'M.Tech AI & Robotics',
    year: '1st Year Masters',
    campus: 'MIT Manipal',
    quote: '"Building autonomous drones & brewing V60."',
    bio: 'Robotics lab addict by day, electronic music DJ by weekend. Let us debate AI ethics or hike Malpe beach at sunrise.',
    interests: ['Robotics', 'Electronic Music', 'Surfing', 'Trekking', 'Espresso'],
    verified: true,
    avatarUrl: ASSETS.userAvatar,
    photos: [ASSETS.userAvatar],
    spotifyTrack: 'Strobe - deadmau5',
    coffeeSpot: 'Kamath Canteen',
    distance: '0.2 km away'
  },
  {
    id: '5',
    name: 'Riya',
    age: 19,
    major: 'B.Des Fashion Tech',
    year: '1st Year',
    campus: 'MSAP Manipal',
    quote: '"Thrift shop fits & sunset sketching."',
    bio: 'Architectural lines and vintage streetwear. Need a buddy for midnight ice cream trips to Manipal Food Court.',
    interests: ['Fashion', 'Sketching', 'Streetwear', 'Ice Cream', 'Stargazing'],
    verified: true,
    avatarUrl: ASSETS.aanyaPhoto,
    photos: [ASSETS.aanyaPhoto],
    spotifyTrack: 'Levitating - Dua Lipa',
    coffeeSpot: 'Tc Cafe',
    distance: '1.5 km away'
  }
];

export const INITIAL_MATCHES: MatchItem[] = [
  {
    id: 'm1',
    student: INITIAL_PROFILES[0], // Aanya
    matchedAt: 'Just now',
    lastMessage: 'Hey! Saw you like good coffee too. Ever tried Astra Coffee?',
    lastMessageTime: '10:42 AM',
    unreadCount: 1,
    messages: [
      {
        id: 'msg-1',
        senderId: '1',
        text: 'Hey! It is a match! 👋',
        timestamp: '10:40 AM',
        isUser: false
      },
      {
        id: 'msg-2',
        senderId: '1',
        text: 'Saw you like good coffee too. Ever tried Astra Coffee near KMC?',
        timestamp: '10:42 AM',
        isUser: false
      }
    ]
  },
  {
    id: 'm2',
    student: INITIAL_PROFILES[2], // Meera
    matchedAt: 'Yesterday',
    lastMessage: 'That rooftop festival last weekend was insane!',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    messages: [
      {
        id: 'msg-3',
        senderId: 'user',
        text: 'Loved your film photo series on Instagram!',
        timestamp: 'Yesterday 8:15 PM',
        isUser: true
      },
      {
        id: 'msg-4',
        senderId: '3',
        text: 'Thank you so much! That rooftop festival last weekend was insane!',
        timestamp: 'Yesterday 8:20 PM',
        isUser: false
      }
    ]
  }
];

export const INITIAL_ADMIN_STATS: AdminStats = {
  totalUsers: 4289,
  verifiedStudents: 3950,
  pendingPayments: 42,
  paidMembers: 1204
};

export const INITIAL_ADMIN_ACTIVITIES: AdminActivity[] = [
  {
    id: 'act-1',
    userName: 'Aarav Patel',
    action: 'Campus Pass Payment & Screenshot Uploaded',
    status: 'Pending Review',
    time: '2 mins ago',
    avatarUrl: ASSETS.userAvatar,
    paymentDetails: {
      upiNumber: 'mingle.manipal@okaxis',
      transactionRef: 'UTR9821445102',
      amount: '₹6.69',
      screenshotUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrC4sHbzo6C8GU6kzAHH5_XaVLYHFolZUdoNiRZ52meDdEX_OTYwQ1en5Exy7Cb0qONxVydztbVKlzg1rjDrtj30VXqNchPUBYG99yfZAOM95AQItwPZCD27D_BhHJLowsZrxwLckz2FNuB4ZbLELJMGXrJt0TcTPL7srONNllhixh1A2OrbqAomwdZ5IeoVk6zKKH706ywAtgQ5cT5A2PaJAZdH7xg4YPUwhbjbMKs7LgoMvOXKUR',
      studentPhoneNumber: '220911048'
    }
  },
  {
    id: 'act-2',
    userName: 'Priya Sharma',
    action: 'Premium Subscription Purchased (Verified)',
    status: 'Completed',
    time: '15 mins ago',
    avatarUrl: ASSETS.aanyaPhoto,
    paymentDetails: {
      upiNumber: 'mingle.manipal@okaxis',
      transactionRef: 'UTR8192039120',
      amount: '₹6.69',
      screenshotUrl: ASSETS.aanyaPhoto,
      studentPhoneNumber: '210811092'
    }
  },
  {
    id: 'act-3',
    userName: 'Rohan Gupta',
    action: 'Account Flagged by Anti-Fraud',
    status: 'Investigation Required',
    time: '1 hour ago',
    avatarUrl: ASSETS.campusPassHero
  },
  {
    id: 'act-4',
    userName: 'Ananya Rao',
    action: 'Institutional Email Verified (@manipal.edu)',
    status: 'Completed',
    time: '2 hours ago',
    avatarUrl: ASSETS.matchAanyaRight
  },
  {
    id: 'act-5',
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
