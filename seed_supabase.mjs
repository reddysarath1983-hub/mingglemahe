import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://eetzyuvtzjswzqrqoyuh.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_qZEla6P3oH4Rn9ELDv2lLA_YsmNhJI3';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const DEFAULT_PROFILES = [
  {
    full_name: 'Anya Sharma',
    phone_number: '220911048',
    reg_number: '220911048',
    email: 'anya.sharma@manipal.edu',
    gender: 'female',
    looking_for: 'male',
    major: 'B.A Media & Communication',
    year: '3rd Year',
    campus: 'SOC Manipal',
    bio: 'Film student, portrait photographer, and sunset seeker at End Point. Looking for music lovers and coffee date companions!',
    quote: 'Capturing candid Manipal moments 📸',
    interests: ['Photography', 'Films', 'Coffee', 'Music', 'Road Trips'],
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    login_id: 'MPL-2026-8812',
    verified: true,
    is_verified_student: true
  },
  {
    full_name: 'Kabir Mehta',
    phone_number: '220911099',
    reg_number: '220911099',
    email: 'kabir.mehta@manipal.edu',
    gender: 'male',
    looking_for: 'female',
    major: 'B.Tech Computer Science',
    year: '4th Year',
    campus: 'MIT Manipal',
    bio: 'Tech builder, guitarist, and weekend road tripper. Looking for a genuine co-pilot for Malpe beach sunsets!',
    quote: 'Coding by day, acoustic jams by night 🎸',
    interests: ['Coding', 'Music', 'Road Trips', 'Coffee', 'Gaming'],
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    login_id: 'MPL-2026-9923',
    verified: true,
    is_verified_student: true
  },
  {
    full_name: 'Bhavya',
    phone_number: '9876540001',
    reg_number: '220911001',
    email: 'bhavya@learner.manipal.edu',
    gender: 'female',
    looking_for: 'male',
    major: 'B.Des Fashion Design',
    year: '2nd Year',
    campus: 'MSAP Manipal',
    bio: 'Design student who spends way too much time hunting for aesthetic cafes and cute thrifted clothes.',
    quote: 'Laughing my way through design projects and endless coffee cups.',
    interests: ['Fashion', 'Photography', 'Cafes', 'Road Trips', 'Art'],
    avatar_url: '/profiles/bhavya_main.png',
    verified: true,
    is_verified_student: true
  },
  {
    full_name: 'Pragya',
    phone_number: '9876540002',
    reg_number: '220911002',
    email: 'pragya@learner.manipal.edu',
    gender: 'female',
    looking_for: 'male',
    major: 'B.Tech Computer Science',
    year: '3rd Year',
    campus: 'MIT Manipal',
    bio: 'Tech enthusiast who loves neon lights and building cool software. Looking for someone who can keep up with me in Mario Kart.',
    quote: 'Coding by day, cyberpunk aesthetics by night.',
    interests: ['Coding', 'Gaming', 'Tech', 'Neon Art', 'Snacks'],
    avatar_url: '/profiles/pragya_main.png',
    verified: true,
    is_verified_student: true
  },
  {
    full_name: 'Riya Sen',
    phone_number: '9876540003',
    reg_number: '220911003',
    email: 'riya.sen@learner.manipal.edu',
    gender: 'female',
    looking_for: 'male',
    major: 'MBBS',
    year: '2nd Year',
    campus: 'KMC Manipal',
    bio: 'Med student who loves classic indie rock, beach drives to Kapu, and midnight street food around Canara Mall.',
    quote: 'Stethoscope by day, vinyl records by night 🎧',
    interests: ['Music', 'Fitness', 'Coffee', 'Beach', 'Surfing'],
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
    verified: true,
    is_verified_student: true
  },
  {
    full_name: 'Tanvi Kulkarni',
    phone_number: '9876540004',
    reg_number: '220911004',
    email: 'tanvi.k@learner.manipal.edu',
    gender: 'female',
    looking_for: 'male',
    major: 'B.Tech Biotechnology',
    year: '4th Year',
    campus: 'MIT Manipal',
    bio: 'Lab nerd by day, stargazer at End Point by night. Always up for deep conversations over strong espresso.',
    quote: 'AI researcher & coffee addict ☕',
    interests: ['Coding', 'Coffee', 'Art', 'Films', 'Tech'],
    avatar_url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    verified: true,
    is_verified_student: true
  },
  {
    full_name: 'Rohan Kapoor',
    phone_number: '9876540005',
    reg_number: '220911005',
    email: 'rohan.k@learner.manipal.edu',
    gender: 'male',
    looking_for: 'female',
    major: 'B.Tech Mechanical',
    year: '3rd Year',
    campus: 'MIT Manipal',
    bio: 'Automotive nerd, loves acoustic jam sessions, gym, and street food at Astra. Let us grab coffee!',
    quote: 'Formula Student grease monkey looking for a co-pilot for late night End Point drives.',
    interests: ['Formula Student', 'Fitness', 'Music', 'Road Trips', 'Coffee'],
    avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDV_c_i7kpkNii4iM_OBqu_LiktPgowuYOShGGsNzcjWd4Dqvz0uangEkqx0bEyLoyxz7z6EGTanbEAU8RSwsINfnGpX8pHKmUZi7z0ffQRbizBszlUwVZpZcx1AcyVXiDq41MA5AptNwCWR5ydqgphtqjUfaWYid2oUI5clE8Pl3ZPjhfoqN3LUYD7dc6JmRmYWRCrtCSf4IlLuyD-0C1ZskHnJarUcqOEwi90a2T7hFSeh27NAXwB',
    verified: true,
    is_verified_student: true
  },
  {
    full_name: 'Aarav Verma',
    phone_number: '9876540006',
    reg_number: '220911006',
    email: 'aarav.v@learner.manipal.edu',
    gender: 'male',
    looking_for: 'female',
    major: 'BBA Finance',
    year: '3rd Year',
    campus: 'DOC Manipal',
    bio: 'Point guard for the varsity squad. Loves thrift markets, sunset drives, and post-workout protein shakes.',
    quote: 'Basketball player & iced latte fanatic 🏀',
    interests: ['Basketball', 'Fitness', 'Coffee', 'Films', 'Road Trips'],
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    verified: true,
    is_verified_student: true
  },
  {
    full_name: 'Siddharth Nair',
    phone_number: '9876540007',
    reg_number: '220911007',
    email: 'siddharth.n@learner.manipal.edu',
    gender: 'male',
    looking_for: 'female',
    major: 'B.Arch Architecture',
    year: '2nd Year',
    campus: 'MSAP Manipal',
    bio: 'Architecture student constantly sketching coffee shops and coastal scenery. Let us go cafe hopping!',
    quote: 'Sketchbook always in hand 📐🎨',
    interests: ['Art', 'Photography', 'Architecture', 'Cafes', 'Music'],
    avatar_url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
    verified: true,
    is_verified_student: true
  },
  {
    full_name: 'Devansh Hegde',
    phone_number: '9876540008',
    reg_number: '220911008',
    email: 'devansh.h@learner.manipal.edu',
    gender: 'male',
    looking_for: 'female',
    major: 'B.Sc Allied Health',
    year: '4th Year',
    campus: 'KMC Manipal',
    bio: 'Gym regular who loves trekking, photography, and late night conversations. Hit me up for coffee or a workout session.',
    quote: 'Fitness enthusiast & End Point sunset hunter 🌅',
    interests: ['Fitness', 'Surfing', 'Photography', 'Coffee', 'Road Trips'],
    avatar_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    verified: true,
    is_verified_student: true
  }
];

const DEFAULT_CREDS = [
  {
    id: 'default-1',
    student_id: 'std-8812',
    student_name: 'Anya Sharma',
    student_email: 'anya.sharma@manipal.edu',
    student_phone_number: '220911048',
    student_reg_no: '220911048',
    login_id: 'MPL-2026-8812',
    passcode: 'Manipal#2026',
    status: 'Approved',
    approved_at: new Date().toISOString(),
    utr_ref: 'UTR-DEFAULT-8812',
    is_verified_student: true
  },
  {
    id: 'default-2',
    student_id: 'std-9923',
    student_name: 'Kabir Mehta',
    student_email: 'kabir.mehta@manipal.edu',
    student_phone_number: '220911099',
    student_reg_no: '220911099',
    login_id: 'MPL-2026-9923',
    passcode: 'Campus#3000',
    status: 'Approved',
    approved_at: new Date().toISOString(),
    utr_ref: 'UTR-DEFAULT-9923',
    is_verified_student: true
  }
];

async function seed() {
  console.log("Checking current user_profiles in Supabase...");
  const { data: testData, error: testErr } = await supabase.from('user_profiles').select('*').limit(1);
  if (testData && testData.length > 0) {
    console.log("Existing columns in user_profiles:", Object.keys(testData[0]));
  } else {
    console.log("user_profiles query result:", testData, testErr);
  }

  // Fallback payload with core columns if schema hasn't migrated gender/looking_for
  const SAFE_PROFILES = DEFAULT_PROFILES.map(p => {
    return {
      full_name: p.full_name,
      phone_number: p.phone_number,
      email: p.email,
      reg_number: p.reg_number,
      major: p.major,
      year: p.year,
      campus: p.campus,
      bio: p.bio,
      quote: p.quote,
      avatar_url: p.avatar_url,
      login_id: p.login_id,
      verified: true,
      is_verified_student: true
    };
  });

  console.log("Seeding Supabase user_profiles table (safe columns)...");
  const { data: profData, error: profErr } = await supabase
    .from('user_profiles')
    .upsert(SAFE_PROFILES, { onConflict: 'phone_number' });

  if (profErr) console.error("Error seeding user_profiles:", profErr.message);
  else console.log("Successfully seeded user_profiles into Supabase!");

  console.log("Seeding Supabase approved_credentials table...");
  const { data: credData, error: credErr } = await supabase
    .from('approved_credentials')
    .upsert(DEFAULT_CREDS, { onConflict: 'id' });

  if (credErr) console.error("Error seeding approved_credentials:", credErr.message);
  else console.log("Successfully seeded approved_credentials into Supabase!");
}

seed();
