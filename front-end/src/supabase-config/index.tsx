import { createClient } from '@supabase/supabase-js'
import {
  SUPABASE_LOCAL_ANON_KEY,
  SUPABASE_LOCAL_URL,
} from '../lib/constants.ts'
const supabase = createClient(
  SUPABASE_LOCAL_URL || '',
  SUPABASE_LOCAL_ANON_KEY || ''
)

export { supabase }
