export const env = {
  functionsUrl: import.meta.env.VITE_SUPABASE_FUNCTIONS_URL as string | undefined,
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL as string | undefined,
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined,
};
