// Example SQL schema for Supabase (Postgres)
-- customers
create table if not exists public.customers (
  id bigint generated always as identity primary key,
  name text not null,
  email text unique not null,
  phone text,
  tags text[] default '{}',
  ltv numeric default 0,
  last_activity date default now(),
  branch text not null
);

-- orders
create table if not exists public.orders (
  id bigint generated always as identity primary key,
  customer_id bigint references public.customers(id) on delete set null,
  title text not null,
  status text check (status in ('Received','In Progress','Ready','Delivered')) default 'Received',
  branch text not null,
  created_at timestamptz default now(),
  total numeric default 0
);

-- invoices
create table if not exists public.invoices (
  id bigint generated always as identity primary key,
  customer_id bigint references public.customers(id) on delete set null,
  branch text not null,
  date date default now(),
  due_date date,
  status text check (status in ('Draft','Sent','Paid','Overdue')) default 'Draft',
  subtotal numeric default 0,
  tax numeric default 0,
  total numeric default 0
);
