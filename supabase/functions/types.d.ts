/* eslint-disable @typescript-eslint/no-explicit-any */
// Ambient declarations for Deno-based Supabase Edge Functions within a Node/TS workspace
// Allow Deno global
declare const Deno: {
  env: { get: (key: string) => string | undefined };
};

// Allow remote module specifiers used by Supabase Edge
declare module 'https://deno.land/std@0.177.0/http/server.ts' {
  export function serve(handler: (req: Request) => Response | Promise<Response>): void;
}

declare module 'https://esm.sh/@supabase/supabase-js@2' {
  export type SupabaseClient = any;
  export function createClient(url: string, anonKey: string): SupabaseClient;
}

declare module 'https://esm.sh/@supabase/functions-js@2.4.1/src/deno/shim.ts' {}
