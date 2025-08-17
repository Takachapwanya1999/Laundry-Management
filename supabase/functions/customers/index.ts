// deno-lint-ignore-file no-explicit-any
import 'https://esm.sh/@supabase/functions-js@2.4.1/src/deno/shim.ts';
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req) => {
  const url = new URL(req.url);
  const branch = url.searchParams.get('branch') ?? 'Downtown';
  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!);

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('branch', branch)
      .order('last_activity', { ascending: false })
      .limit(100);
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
  }

  if (req.method === 'POST') {
    const body = await req.json();
    const { data, error } = await supabase.from('customers').insert(body).select('*').single();
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
  }

  return new Response('Method not allowed', { status: 405 });
});
