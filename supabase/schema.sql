-- ============================================
-- GOLD MAFIA - SUPABASE DATABASE SCHEMA
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS & PROFILES
-- ============================================

-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  avatar_ipfs_hash TEXT, -- IPFS CID for avatar image
  membership_tier TEXT NOT NULL DEFAULT 'Associate' CHECK (membership_tier IN ('Associate', 'Caporegime', 'Don', 'Commission')),
  respect_points INTEGER NOT NULL DEFAULT 0,
  deals_completed INTEGER NOT NULL DEFAULT 0,
  endorsements INTEGER NOT NULL DEFAULT 0,
  response_rate INTEGER NOT NULL DEFAULT 100,
  member_since TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  wallet_address TEXT, -- Solana wallet address
  badge_nft_minted BOOLEAN NOT NULL DEFAULT FALSE,
  badge_nft_mint_address TEXT, -- Solana NFT mint address
  is_online BOOLEAN NOT NULL DEFAULT FALSE,
  last_seen TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Achievements table
CREATE TABLE public.achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL, -- Lucide icon name
  criteria JSONB NOT NULL, -- e.g., {"deals_completed": 10}
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- User achievements (many-to-many)
CREATE TABLE public.user_achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  achievement_id UUID NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- ============================================
-- LOUNGE - CHAT SYSTEM
-- ============================================

-- Channels table
CREATE TABLE public.channels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon_name TEXT NOT NULL, -- Lucide icon name
  member_count INTEGER NOT NULL DEFAULT 0,
  is_voice BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Messages table
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  channel_id UUID NOT NULL REFERENCES public.channels(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  message_type TEXT NOT NULL DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'file')),
  attachments_ipfs JSONB DEFAULT '[]'::jsonb, -- [{ filename, ipfs_hash, mime_type }]
  is_pinned BOOLEAN NOT NULL DEFAULT FALSE,
  reply_to UUID REFERENCES public.messages(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Message reactions
CREATE TABLE public.message_reactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  message_id UUID NOT NULL REFERENCES public.messages(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  emoji TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(message_id, user_id, emoji)
);

-- ============================================
-- COMMAND ROOM - DEALS SYSTEM
-- ============================================

-- Deals table
CREATE TABLE public.deals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Real Estate', 'Crypto', 'Business', 'Investment', 'Partnership')),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'review', 'completed', 'archived')),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  value DECIMAL(15, 2), -- Deal value in USD
  progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  deadline TIMESTAMPTZ,
  created_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  documents_ipfs JSONB DEFAULT '[]'::jsonb, -- [{ filename, ipfs_hash, mime_type, uploaded_at, uploaded_by }]
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Deal assignments (many-to-many)
CREATE TABLE public.deal_assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  deal_id UUID NOT NULL REFERENCES public.deals(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT, -- e.g., "Lead", "Supporter", "Advisor"
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(deal_id, user_id)
);

-- Deal comments
CREATE TABLE public.deal_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  deal_id UUID NOT NULL REFERENCES public.deals(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- ACTIVITY LOG
-- ============================================

CREATE TABLE public.activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL, -- e.g., "deal_closed", "endorsement_received", "respect_earned"
  description TEXT NOT NULL,
  metadata JSONB, -- Additional context
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

-- Profiles
CREATE INDEX idx_profiles_membership_tier ON public.profiles(membership_tier);
CREATE INDEX idx_profiles_is_online ON public.profiles(is_online);
CREATE INDEX idx_profiles_wallet_address ON public.profiles(wallet_address);

-- Messages
CREATE INDEX idx_messages_channel_id ON public.messages(channel_id);
CREATE INDEX idx_messages_user_id ON public.messages(user_id);
CREATE INDEX idx_messages_created_at ON public.messages(created_at DESC);
CREATE INDEX idx_messages_is_pinned ON public.messages(is_pinned) WHERE is_pinned = TRUE;

-- Deals
CREATE INDEX idx_deals_status ON public.deals(status);
CREATE INDEX idx_deals_priority ON public.deals(priority);
CREATE INDEX idx_deals_created_by ON public.deals(created_by);
CREATE INDEX idx_deals_created_at ON public.deals(created_at DESC);

-- Deal assignments
CREATE INDEX idx_deal_assignments_deal_id ON public.deal_assignments(deal_id);
CREATE INDEX idx_deal_assignments_user_id ON public.deal_assignments(user_id);

-- Activity log
CREATE INDEX idx_activity_log_user_id ON public.activity_log(user_id);
CREATE INDEX idx_activity_log_created_at ON public.activity_log(created_at DESC);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.message_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deal_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deal_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read all profiles, update only their own
CREATE POLICY "Profiles are viewable by everyone" 
  ON public.profiles FOR SELECT 
  USING (TRUE);

CREATE POLICY "Users can update own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Achievements: Readable by all
CREATE POLICY "Achievements are viewable by everyone" 
  ON public.achievements FOR SELECT 
  USING (TRUE);

-- User achievements: Users can view all, insert/delete only their own
CREATE POLICY "User achievements are viewable by everyone" 
  ON public.user_achievements FOR SELECT 
  USING (TRUE);

CREATE POLICY "Users can insert own achievements" 
  ON public.user_achievements FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Channels: Readable by all authenticated users
CREATE POLICY "Channels are viewable by authenticated users" 
  ON public.channels FOR SELECT 
  USING (auth.role() = 'authenticated');

-- Messages: Authenticated users can read all and insert their own
CREATE POLICY "Messages are viewable by authenticated users" 
  ON public.messages FOR SELECT 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert messages" 
  ON public.messages FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own messages" 
  ON public.messages FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own messages" 
  ON public.messages FOR DELETE 
  USING (auth.uid() = user_id);

-- Message reactions: Authenticated users can manage their own
CREATE POLICY "Message reactions are viewable by authenticated users" 
  ON public.message_reactions FOR SELECT 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Users can add their own reactions" 
  ON public.message_reactions FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their own reactions" 
  ON public.message_reactions FOR DELETE 
  USING (auth.uid() = user_id);

-- Deals: Users can view all deals, create their own
CREATE POLICY "Deals are viewable by authenticated users" 
  ON public.deals FOR SELECT 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can create deals" 
  ON public.deals FOR INSERT 
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Deal creators and assigned users can update" 
  ON public.deals FOR UPDATE 
  USING (
    auth.uid() = created_by OR 
    EXISTS (
      SELECT 1 FROM public.deal_assignments 
      WHERE deal_id = deals.id AND user_id = auth.uid()
    )
  );

-- Deal assignments: Viewable by all, manageable by deal creators
CREATE POLICY "Deal assignments are viewable by authenticated users" 
  ON public.deal_assignments FOR SELECT 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Deal creators can manage assignments" 
  ON public.deal_assignments FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.deals 
      WHERE id = deal_assignments.deal_id AND created_by = auth.uid()
    )
  );

-- Deal comments: Users can view all, create/update their own
CREATE POLICY "Deal comments are viewable by authenticated users" 
  ON public.deal_comments FOR SELECT 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can create comments" 
  ON public.deal_comments FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own comments" 
  ON public.deal_comments FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own comments" 
  ON public.deal_comments FOR DELETE 
  USING (auth.uid() = user_id);

-- Activity log: Users can view their own logs
CREATE POLICY "Users can view own activity log" 
  ON public.activity_log FOR SELECT 
  USING (auth.uid() = user_id);

-- ============================================
-- TRIGGERS & FUNCTIONS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_messages_updated_at BEFORE UPDATE ON public.messages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_deals_updated_at BEFORE UPDATE ON public.deals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_deal_comments_updated_at BEFORE UPDATE ON public.deal_comments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, membership_tier, respect_points)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)),
    'Associate',
    0
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update user online status
CREATE OR REPLACE FUNCTION public.update_user_online_status(user_uuid UUID, is_online_status BOOLEAN)
RETURNS VOID AS $$
BEGIN
  UPDATE public.profiles
  SET is_online = is_online_status, last_seen = NOW()
  WHERE id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- SEED DATA
-- ============================================

-- Insert default channels
INSERT INTO public.channels (name, description, icon_name, is_voice) VALUES
  ('general', 'General discussion for all members', 'Hash', FALSE),
  ('deals', 'Discuss potential deals and opportunities', 'TrendingUp', FALSE),
  ('strategy', 'Strategic planning and analysis', 'Target', FALSE),
  ('lounge', 'Casual conversations and networking', 'Coffee', FALSE);

-- Insert default achievements
INSERT INTO public.achievements (name, description, icon_name, criteria) VALUES
  ('Deal Maker', 'Close your first deal', 'Trophy', '{"deals_completed": 1}'::jsonb),
  ('Fast Responder', 'Maintain 95%+ response rate', 'Zap', '{"response_rate": 95}'::jsonb),
  ('Thought Leader', 'Receive 20+ endorsements', 'Star', '{"endorsements": 20}'::jsonb),
  ('Founding Member', 'Join during the founding period', 'Sparkles', '{"member_since": "2025-01-01"}'::jsonb);

-- ============================================
-- REAL-TIME SUBSCRIPTIONS
-- ============================================

-- Enable real-time for messages (Lounge chat)
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.message_reactions;

-- Enable real-time for deals (Command Room updates)
ALTER PUBLICATION supabase_realtime ADD TABLE public.deals;
ALTER PUBLICATION supabase_realtime ADD TABLE public.deal_comments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.deal_assignments;

-- Enable real-time for online status
ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;

-- ============================================
-- STORAGE BUCKETS (for Supabase Storage alternative to Pinata)
-- ============================================

-- Note: If using Supabase Storage instead of Pinata for some assets:
-- 1. Create bucket: supabase.storage.createBucket('avatars', { public: true })
-- 2. Set up storage policies in Supabase dashboard
-- However, we recommend Pinata/IPFS for permanent, decentralized storage

-- ============================================
-- END OF SCHEMA
-- ============================================
