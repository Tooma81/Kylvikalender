import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://juflbpgirbhwxqkxrhaq.supabase.co'; // Leia: Project Settings -> API
const supabaseAnonKey = 'sb_publishable_7VZ4HS4jtAWjOL9--1hJUg_P23Te4vn'; // Leia: Project Settings -> API

export const supabase = createClient(supabaseUrl, supabaseAnonKey);