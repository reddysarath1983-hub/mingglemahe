import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://eetzyuvtzjswzqrqoyuh.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_qZEla6P3oH4Rn9ELDv2lLA_YsmNhJI3';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function simulateRegistration() {
  try {
    console.log("Simulating student registration with Supabase (https://eetzyuvtzjswzqrqoyuh.supabase.co)...");
    const mockScreenshotUrl = "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

    const { data, error } = await supabase.from('pending_registrations').insert([
      {
        student_name: "Antigravity AI (Test User)",
        phone_number: "9876543210",
        email: "antigravity.ai@learner.manipal.edu",
        transaction_ref: "SIMULATED_UTR_9988776655",
        amount: "₹6.69",
        screenshot_url: mockScreenshotUrl,
        status: "pending",
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.log("Supabase insert result:", error.message);
    } else {
      console.log("Successfully registered user in Supabase!");
    }
  } catch (error) {
    console.error("Error during simulated registration:", error);
  }
  process.exit(0);
}

simulateRegistration();
