import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Card, CardContent, Chip, Divider, Stack, Typography } from '@mui/material';
import { fetchCustomersFromEdge } from '../utils/edge';
import { useQuery } from '@tanstack/react-query';
import StatusChip from '../components/StatusChip';
import type { OrderStatus } from '../components/StatusChip';

const CustomerProfile: React.FC = () => {
  const { id } = useParams();
  const customerId = Number(id);
  type Customer = { id: number; name: string; email?: string; phone?: string; ltv?: number; lastActivity?: string; tags?: string[]; orders?: Order[] };
  type Order = { id: number; date?: string; created_at?: string; title?: string; status?: string; total?: number };
  const { data: customers = [] } = useQuery({
    queryKey: ['customers'],
    queryFn: async () => (await fetchCustomersFromEdge('')) || [],
  });
  const customer = useMemo(() => (customers as Customer[]).find((c) => c.id === customerId), [customers, customerId]);
  const orders = useMemo(() => (customer?.orders || []).map((o: Order) => ({
    id: o.id,
    date: o.date || o.created_at || '',
    title: o.title || 'Order',
    status: o.status || 'Received',
    total: o.total || 0,
  })), [customer]);

  if (!customer) return <Typography>Customer not found.</Typography>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>{customer.name}</Typography>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6">Contact</Typography>
            <Typography color="text.secondary">{customer.email}</Typography>
            <Typography color="text.secondary">{customer.phone}</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Segments</Typography>
            <Stack direction="row" spacing={1}>
              {customer.tags?.map((t: string) => <Chip key={t} label={t} size="small" />)}
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Lifetime Value</Typography>
            <Typography>${customer.ltv?.toFixed(0)}</Typography>
            <Typography color="text.secondary">Last activity: {customer.lastActivity}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Order History</Typography>
            <Stack spacing={1}>
              {(orders as Order[]).map((o) => (
                <Stack key={o.id} direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                  <Typography>{o.date}</Typography>
                  <Typography flex={1}>{o.title}</Typography>
                  <StatusChip status={(o.status as OrderStatus) || 'Received'} />
                  <Typography>${(o.total ?? 0).toFixed(2)}</Typography>
                </Stack>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

export default CustomerProfile;
