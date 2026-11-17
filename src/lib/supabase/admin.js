/**
 * src/lib/supabase/admin.js
 *
 * Secure server-side Supabase client using the Service Role Key.
 *
 * IMPORTANT SECURITY RULES:
 * - This file MUST ONLY be imported in server-side API routes or Server Actions.
 * - NEVER import this client in Client Components.
 * - Bypasses Row Level Security for trusted admin moderation and content publishing.
 */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export const isSupabaseAdminConfigured = Boolean(supabaseUrl && supabaseServiceRoleKey);

export const supabaseAdmin = isSupabaseAdminConfigured
  ? createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null;
