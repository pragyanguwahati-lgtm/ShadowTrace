-- =========================================================================
-- SHADOWTRACE: PostgreSQL / Supabase Row Level Security (RLS) Policies
-- =========================================================================
-- Enforces zero cross-user tampering, strict tenant isolation, and read-only
-- protection for public intelligence blueprints.
-- Compatible with Supabase, Neon, Vercel Postgres, and standard PostgreSQL 14+.
-- =========================================================================

-- 1. Enable RLS on all operative tables
ALTER TABLE IF EXISTS public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.clues ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.reports ENABLE ROW LEVEL SECURITY;

-- -------------------------------------------------------------------------
-- 2. USERS TABLE POLICIES (Isolated to Authenticated Subject)
-- -------------------------------------------------------------------------
CREATE POLICY "Users can only view their own profile"
  ON public.users
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can only update their own profile"
  ON public.users
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert their own initial profile"
  ON public.users
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- -------------------------------------------------------------------------
-- 3. CASES & CLUES POLICIES (Public Read-Only, Write Blocked)
-- -------------------------------------------------------------------------
CREATE POLICY "Anyone can view case blueprints"
  ON public.cases
  FOR SELECT
  USING (true);

CREATE POLICY "No client writes on case blueprints"
  ON public.cases
  FOR ALL
  USING (false);

CREATE POLICY "Anyone can view evidence clues"
  ON public.clues
  FOR SELECT
  USING (true);

CREATE POLICY "No client writes on evidence clues"
  ON public.clues
  FOR ALL
  USING (false);

-- -------------------------------------------------------------------------
-- 4. SESSIONS TABLE POLICIES (Strict Operative Row-Level Isolation)
-- -------------------------------------------------------------------------
CREATE POLICY "Operatives can only view own investigation sessions"
  ON public.sessions
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Operatives can only insert sessions for themselves"
  ON public.sessions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Operatives can only update own investigation sessions"
  ON public.sessions
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Operatives can only delete own investigation sessions"
  ON public.sessions
  FOR DELETE
  USING (auth.uid() = user_id);

-- -------------------------------------------------------------------------
-- 5. REPORTS TABLE POLICIES (Strict Debrief Dossier Row-Level Isolation)
-- -------------------------------------------------------------------------
CREATE POLICY "Operatives can only view own compiled reports"
  ON public.reports
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Operatives can only insert reports for themselves"
  ON public.reports
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Operatives can only update own compiled reports"
  ON public.reports
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Operatives can only delete own compiled reports"
  ON public.reports
  FOR DELETE
  USING (auth.uid() = user_id);
