import { Chip } from '@mui/material';

export type OrderStatus = 'Received' | 'In Progress' | 'Ready' | 'Delivered';

const colorMap: Record<OrderStatus, 'default' | 'info' | 'warning' | 'success'> = {
  'Received': 'default',
  'In Progress': 'info',
  'Ready': 'warning',
  'Delivered': 'success',
};

export default function StatusChip({ status }: { status: OrderStatus }) {
  return <Chip size="small" label={status} color={colorMap[status]} />;
}
