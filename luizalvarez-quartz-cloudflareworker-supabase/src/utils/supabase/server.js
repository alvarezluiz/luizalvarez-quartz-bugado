// server.js
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export function createClient(supabaseUrl, supabaseKey) {
  return createSupabaseClient(supabaseUrl, supabaseKey)
}