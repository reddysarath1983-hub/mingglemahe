-- SQL Schema setup for Mingle@Manipal (Supabase)
-- Copy and paste this into Supabase SQL Editor: https://eetzyuvtzjswzqrqoyuh.supabase.co

-- 1. Pending Registrations Table
CREATE TABLE IF NOT EXISTS public.pending_registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    email TEXT NOT NULL,
    transaction_ref TEXT,
    amount TEXT DEFAULT '₹6.69',
    screenshot_url TEXT,
    status TEXT DEFAULT 'pending',
    login_id TEXT,
    passcode TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Approved Credentials Table
CREATE TABLE IF NOT EXISTS public.approved_credentials (
    id TEXT PRIMARY KEY,
    student_id TEXT,
    student_name TEXT NOT NULL,
    student_email TEXT NOT NULL,
    student_phone_number TEXT NOT NULL,
    student_reg_no TEXT,
    login_id TEXT NOT NULL,
    passcode TEXT NOT NULL,
    status TEXT DEFAULT 'Approved',
    approved_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    utr_ref TEXT,
    is_verified_student BOOLEAN DEFAULT true
);

-- 3. User Profiles Table
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT,
    phone_number TEXT UNIQUE,
    reg_number TEXT,
    email TEXT,
    gender TEXT DEFAULT 'male',
    looking_for TEXT DEFAULT 'female',
    major TEXT,
    year TEXT,
    campus TEXT,
    bio TEXT,
    quote TEXT,
    interests TEXT[],
    avatar_url TEXT,
    login_id TEXT,
    verified BOOLEAN DEFAULT false,
    is_verified_student BOOLEAN DEFAULT false,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ensure columns exist if tables were created earlier
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS gender TEXT DEFAULT 'male';
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS looking_for TEXT DEFAULT 'female';
ALTER TABLE public.pending_registrations ADD COLUMN IF NOT EXISTS gender TEXT DEFAULT 'male';
ALTER TABLE public.pending_registrations ADD COLUMN IF NOT EXISTS looking_for TEXT DEFAULT 'female';
ALTER TABLE public.pending_registrations ADD COLUMN IF NOT EXISTS major TEXT;
ALTER TABLE public.pending_registrations ADD COLUMN IF NOT EXISTS campus TEXT;
ALTER TABLE public.pending_registrations ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE public.pending_registrations ADD COLUMN IF NOT EXISTS quote TEXT;
ALTER TABLE public.pending_registrations ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE public.pending_registrations ADD COLUMN IF NOT EXISTS interests TEXT[];

-- 4. Chats Table
CREATE TABLE IF NOT EXISTS public.chats (
    id TEXT PRIMARY KEY,
    user_phone TEXT,
    user_name TEXT,
    student_id TEXT,
    student_name TEXT,
    student_avatar TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Chat Messages Table
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    match_id TEXT NOT NULL,
    sender_id TEXT NOT NULL,
    text TEXT NOT NULL,
    is_user BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) policies for open access
ALTER TABLE public.pending_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.approved_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public select" ON public.pending_registrations FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON public.pending_registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON public.pending_registrations FOR UPDATE USING (true);

CREATE POLICY "Allow public select" ON public.approved_credentials FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON public.approved_credentials FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON public.approved_credentials FOR UPDATE USING (true);

CREATE POLICY "Allow public select" ON public.user_profiles FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON public.user_profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON public.user_profiles FOR UPDATE USING (true);

CREATE POLICY "Allow public select" ON public.chats FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON public.chats FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON public.chats FOR UPDATE USING (true);

CREATE POLICY "Allow public select" ON public.chat_messages FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON public.chat_messages FOR INSERT WITH CHECK (true);

-- Enable Realtime for live chat, user profiles & admin panel
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_profiles, public.pending_registrations, public.approved_credentials, public.chats, public.chat_messages;


