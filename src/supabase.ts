import { createClient } from '@supabase/supabase-js';

const meta = import.meta as any;
const supabaseUrl = meta?.env?.VITE_SUPABASE_URL || 'https://eetzyuvtzjswzqrqoyuh.supabase.co';
const supabaseAnonKey = meta?.env?.VITE_SUPABASE_ANON_KEY || 'sb_publishable_qZEla6P3oH4Rn9ELDv2lLA_YsmNhJI3';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface PendingRegistration {
  id?: string;
  studentName: string;
  phoneNumber: string;
  email: string;
  transactionRef: string;
  amount: string;
  screenshotUrl: string;
  status: string;
  loginId?: string;
  passcode?: string;
  createdAt?: string;
}

export interface ApprovedCredentialRecord {
  id?: string;
  studentId?: string;
  studentName: string;
  studentEmail: string;
  studentPhoneNumber: string;
  studentRegNo?: string;
  loginId: string;
  passcode: string;
  status: string;
  approvedAt?: string;
  utrRef?: string;
  isVerifiedStudent?: boolean;
}
