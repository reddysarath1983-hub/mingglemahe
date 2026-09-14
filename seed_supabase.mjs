import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://eetzyuvtzjswzqrqoyuh.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_qZEla6P3oH4Rn9ELDv2lLA_YsmNhJI3';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const DEFAULT_PROFILES = [];

const DEFAULT_CREDS = [];

async function seed() {
  console.log("Checking current user_profiles in Supabase...");
  const { data: testData, error: testErr } = await supabase.from('user_profiles').select('*').limit(1);
  if (testData && testData.length > 0) {
    console.log("Existing columns in user_profiles:", Object.keys(testData[0]));
  } else {
    console.log("user_profiles query result:", testData, testErr);
  }

  // Safe payload with encoded interests tags
  const SAFE_PROFILES = DEFAULT_PROFILES.map(p => {
    const rawInterests = p.interests || ['Coffee', 'Music'];
    const safeInterests = [`[GENDER:${p.gender || 'female'}]`, `[LOOKING_FOR:${p.looking_for || 'male'}]`, ...rawInterests];

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
      interests: safeInterests,
      avatar_url: p.avatar_url,
      login_id: p.login_id,
      gender: p.gender,
      looking_for: p.looking_for,
      verified: true,
      is_verified_student: true
    };
  });

  console.log("Seeding Supabase user_profiles table...");
  const { data: profData, error: profErr } = await supabase
    .from('user_profiles')
    .upsert(SAFE_PROFILES, { onConflict: 'phone_number' });

  if (profErr) {
    console.warn("Retrying user_profiles upsert without gender/looking_for columns...");
    const FALLBACK_PROFILES = SAFE_PROFILES.map(({ gender, looking_for, ...rest }) => rest);
    const { error: fbErr } = await supabase.from('user_profiles').upsert(FALLBACK_PROFILES, { onConflict: 'phone_number' });
    if (fbErr) console.error("Error seeding user_profiles fallback:", fbErr.message);
    else console.log("Successfully seeded user_profiles into Supabase with interest tag encoding!");
  } else {
    console.log("Successfully seeded user_profiles into Supabase!");
  }

  console.log("Seeding Supabase approved_credentials table...");
  const { data: credData, error: credErr } = await supabase
    .from('approved_credentials')
    .upsert(DEFAULT_CREDS, { onConflict: 'id' });

  if (credErr) console.error("Error seeding approved_credentials:", credErr.message);
  else console.log("Successfully seeded approved_credentials into Supabase!");
}

seed();
