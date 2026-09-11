import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://eetzyuvtzjswzqrqoyuh.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_qZEla6P3oH4Rn9ELDv2lLA_YsmNhJI3';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function fixCredentials() {
  console.log("Fetching pending registrations from Supabase...");
  const { data: pending, error: pErr } = await supabase.from('pending_registrations').select('*');
  if (pErr) {
    console.error("Error fetching pending:", pErr.message);
    return;
  }

  console.log(`Found ${pending?.length || 0} pending registrations.`);

  for (const reg of pending) {
    if (reg.login_id && reg.passcode) {
      const studentName = (reg.student_name || 'Student').trim();
      const phone = (reg.phone_number || '').trim();
      const email = (reg.email || `${studentName.toLowerCase().replace(/\s+/g, '.')}@learner.manipal.edu`).trim();
      const credId = `cred-${reg.id}`;

      console.log(`Upserting approved credential for ${studentName} (${reg.login_id} / ${reg.passcode})...`);

      const { error: upsertErr } = await supabase.from('approved_credentials').upsert([
        {
          id: credId,
          student_id: reg.id,
          student_name: studentName,
          student_email: email,
          student_phone_number: phone,
          student_reg_no: phone,
          login_id: reg.login_id,
          passcode: reg.passcode,
          status: 'Approved',
          approved_at: new Date().toISOString(),
          utr_ref: reg.transaction_ref || 'UTR-VERIFIED',
          is_verified_student: true,
        }
      ], { onConflict: 'id' });

      if (upsertErr) console.error("Error upserting:", upsertErr.message);
      else console.log(`✓ Approved credential synced for ${studentName}!`);

      // Also upsert into user_profiles
      const { error: profErr } = await supabase.from('user_profiles').upsert([
        {
          full_name: studentName,
          phone_number: phone,
          email: email,
          reg_number: phone,
          login_id: reg.login_id,
          verified: true,
          is_verified_student: true,
          updated_at: new Date().toISOString()
        }
      ], { onConflict: 'phone_number' });

      if (profErr) console.warn("user_profiles warning:", profErr.message);
    }
  }

  console.log("Done fixing credentials!");
}

fixCredentials();
