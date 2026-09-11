import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://eetzyuvtzjswzqrqoyuh.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_qZEla6P3oH4Rn9ELDv2lLA_YsmNhJI3';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
  try {
    const { data: profiles, error: pErr } = await supabase.from('user_profiles').select('*');
    console.log("=== USER PROFILES IN SUPABASE ===");
    if (pErr) console.log("user_profiles Error:", pErr.message);
    else console.log(`Count: ${profiles?.length || 0}`, profiles);

    const { data: creds, error: cErr } = await supabase.from('approved_credentials').select('*');
    console.log("=== APPROVED CREDENTIALS IN SUPABASE ===");
    if (cErr) console.log("approved_credentials Error:", cErr.message);
    else console.log(`Count: ${creds?.length || 0}`, creds);

    const { data: pending, error: rErr } = await supabase.from('pending_registrations').select('*');
    console.log("=== PENDING REGISTRATIONS IN SUPABASE ===");
    if (rErr) console.log("pending_registrations Error:", rErr.message);
    else console.log(`Count: ${pending?.length || 0}`, pending);

  } catch(e) {
    console.error(e);
  }
}
check();

