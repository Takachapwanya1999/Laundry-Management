import { env } from './env';

const headers = { 'Content-Type': 'application/json' };

export async function fetchOrdersFromEdge(branch: string) {
  if (!env.functionsUrl) return null;
  const res = await fetch(`${env.functionsUrl}/orders?branch=${encodeURIComponent(branch)}`, { headers });
  if (!res.ok) throw new Error('Edge function orders failed');
  return res.json();
}

export async function fetchCustomersFromEdge(branch: string) {
  if (!env.functionsUrl) return null;
  const res = await fetch(`${env.functionsUrl}/customers?branch=${encodeURIComponent(branch)}`, { headers });
  if (!res.ok) throw new Error('Edge function customers failed');
  return res.json();
}

export async function fetchInvoicesFromEdge(branch: string) {
  if (!env.functionsUrl) return null;
  const res = await fetch(`${env.functionsUrl}/invoices?branch=${encodeURIComponent(branch)}`, { headers });
  if (!res.ok) throw new Error('Edge function invoices failed');
  return res.json();
}
