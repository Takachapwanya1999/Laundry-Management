// deno-lint-ignore-file no-explicit-any
import 'https://esm.sh/@supabase/functions-js@2.4.1/src/deno/shim.ts';
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  const url = new URL(req.url);
  let branch = url.searchParams.get('branch') ?? 'Downtown';
  if (req.method === 'POST') {
    try { const body = await req.json(); if (body?.branch) branch = body.branch; } catch { /* ignore parse errors */ }
  }
  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!);

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('orders')
      .select('id, title, status, total, created_at, customers(name)')
      .eq('branch', branch)
      .order('created_at', { ascending: false })
      .limit(100);
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: cors });
    return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json', ...cors } });
  }

  return new Response('Method not allowed', { status: 405, headers: cors });
});
