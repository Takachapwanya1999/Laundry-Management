
import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Box, Button, CircularProgress, Drawer, Stack, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import type { GridColDef, GridRowId, GridRowSelectionModel } from '@mui/x-data-grid';
import StatusChip from '../components/StatusChip';
import type { OrderStatus } from '../components/StatusChip';
import { useBranch } from '../context/useBranch';
import { fetchOrdersFromEdge } from '../utils/edge';
import { useQuery } from '@tanstack/react-query';

interface OrderRow {
	id: number;
	title: string;
	status: OrderStatus;
	customer?: string;
	branch?: string;
	createdAt?: string;
}

const englishTitles = [
	'Wash and Fold - Shirts and Pants',
	'Dry Cleaning - Suit',
	'Express Laundry - Bedsheets',
	'Ironing - Dresses',
	'Wash and Iron - Uniforms',
	'Dry Cleaning - Curtains',
	'Laundry - Towels',
	'Express Wash - Sportswear',
	'Ironing - Tablecloths',
	'Wash and Fold - Kids Clothes',
];

const Orders: React.FC = () => {
	const [search, setSearch] = useState('');
			const [selectionIds, setSelectionIds] = useState<GridRowId[]>([]);
	const [drawer, setDrawer] = useState<{ open: boolean; row?: OrderRow }>({ open: false });
	const [rows, setRows] = useState<OrderRow[]>([]);
	const [openCreateCustomer, setOpenCreateCustomer] = useState(false);

		const { branch } = useBranch();
		const { data, isLoading, error } = useQuery({
			queryKey: ['orders', branch],
			queryFn: async () => {
				// Try Supabase Edge first
				const edge = await fetchOrdersFromEdge(branch).catch(() => null);
				if (Array.isArray(edge)) {
					return edge.map((o: { id: number; title?: string; status?: string; customers?: { name?: string }; created_at?: string }, i: number) => ({
						id: o.id,
						title: o.title ?? englishTitles[i % englishTitles.length],
						status: (o.status ?? ['Received', 'In Progress', 'Ready', 'Delivered'][i % 4]) as OrderStatus,
						customer: o.customers?.name ?? `Customer ${((i % 8) + 1)}`,
						branch: branch,
						createdAt: (o.created_at ?? new Date()).toString().slice(0, 10),
					})) as OrderRow[];
				}
				// No fallback: Supabase is the single source of truth now
				return [] as OrderRow[];
			},
		});

		const columns = useMemo<GridColDef<OrderRow>[]>(() => [
		{ field: 'id', headerName: 'ID', width: 90 },
		{ field: 'title', headerName: 'Title', flex: 1, minWidth: 220 },
		{ field: 'customer', headerName: 'Customer', width: 160 },
		{ field: 'branch', headerName: 'Branch', width: 140 },
		{ field: 'createdAt', headerName: 'Date', width: 130 },
		{ field: 'status', headerName: 'Status', width: 140, renderCell: (p) => <StatusChip status={p.value as OrderStatus} /> },
	], []);

		useEffect(() => {
			if (data) setRows(data);
		}, [data]);

		const filteredRows = useMemo(() => {
			const s = search.toLowerCase();
			return rows.filter((r) =>
				r.title.toLowerCase().includes(s) ||
				(r.customer?.toLowerCase().includes(s) ?? false) ||
				(r.branch?.toLowerCase().includes(s) ?? false)
			);
		}, [rows, search]);

				const onBulkReady = () => {
					const ids = new Set(selectionIds);
			setRows((prev) => prev.map((r) => (ids.has(r.id) ? { ...r, status: 'Ready' } : r)));
		};
		const onBulkDelivered = () => {
					const ids = new Set(selectionIds);
			setRows((prev) => prev.map((r) => (ids.has(r.id) ? { ...r, status: 'Delivered' } : r)));
		};

		return (
			<Box sx={{ maxWidth: 1200, mx: 'auto', py: 4 }}>
				<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
					<Typography variant="h3" fontWeight={700} color="primary.main">Orders</Typography>
					<Stack direction="row" spacing={1}>
						<TextField size="medium" label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
						<Button size="medium" variant="outlined" onClick={() => setOpenCreateCustomer(true)}>Quick Create Customer</Button>
					</Stack>
				</Stack>

				{isLoading && <CircularProgress />}
				{error && <Alert severity="error">Failed to fetch orders.</Alert>}

				{!isLoading && !error && (
					<Box component={Paper} elevation={6} sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
						<Stack direction="row" spacing={1} sx={{ mb: 1 }}>
							<Button size="small" variant="outlined" disabled={selectionIds.length === 0} onClick={onBulkReady}>Mark Ready</Button>
							<Button size="small" variant="contained" disabled={selectionIds.length === 0} onClick={onBulkDelivered}>Mark Delivered</Button>
						</Stack>
						<div style={{ height: 560, width: '100%' }}>
							<DataGrid
								rows={filteredRows}
								columns={columns}
								checkboxSelection
								pageSizeOptions={[10, 25, 50]}
								initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
								onRowDoubleClick={(p) => setDrawer({ open: true, row: p.row })}
								onRowSelectionModelChange={(model: GridRowSelectionModel) => {
									setSelectionIds(model as unknown as GridRowId[]);
								}}
								slots={{ toolbar: GridToolbar }}
								sx={{ background: 'white', borderRadius: 2 }}
							/>
						</div>
					</Box>
				)}

				<Drawer anchor="right" open={drawer.open} onClose={() => setDrawer({ open: false })}>
					<Box sx={{ width: 360, p: 2 }}>
						<Typography variant="h6" gutterBottom>Order Details</Typography>
						{drawer.row && (
							<Stack spacing={1}>
								<Typography>ID: {drawer.row.id}</Typography>
								<Typography>Title: {drawer.row.title}</Typography>
								<Typography>Customer: {drawer.row.customer}</Typography>
								<Typography>Branch: {drawer.row.branch}</Typography>
								<Typography>Date: {drawer.row.createdAt}</Typography>
								<Typography>Status: <StatusChip status={drawer.row.status} /></Typography>
								<Typography variant="subtitle2" sx={{ mt: 2 }}>Items & Pricing</Typography>
								<Typography color="text.secondary">3 x Wash & Fold @ $5.00, 1 x Dry Clean @ $8.00</Typography>
								<Typography>Total: $23.00</Typography>
							</Stack>
						)}
					</Box>
				</Drawer>

				{/* Quick Create Customer Dialog */}
				<QuickCreateCustomerDialog open={openCreateCustomer} onClose={() => setOpenCreateCustomer(false)} />
			</Box>
		);
};

export default Orders;

// Quick Create Customer Dialog
const createCustomerSchema = z.object({
	name: z.string().min(2),
	email: z.string().email(),
	phone: z.string().optional(),
});

type CreateCustomerForm = z.infer<typeof createCustomerSchema>;

function QuickCreateCustomerDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
		const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<CreateCustomerForm>({
			resolver: zodResolver(createCustomerSchema),
		});

		const onSubmit = async (data: CreateCustomerForm) => {
			// Placeholder: integrate with backend later
			console.log('Create customer', data);
			reset();
			onClose();
		};

		return (
			<Dialog open={open} onClose={onClose}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<DialogTitle>Create Customer</DialogTitle>
					<DialogContent>
						<TextField {...register('name')} label="Name" fullWidth margin="normal" error={!!errors.name} helperText={errors.name?.message} />
						<TextField {...register('email')} label="Email" fullWidth margin="normal" error={!!errors.email} helperText={errors.email?.message} />
						<TextField {...register('phone')} label="Phone" fullWidth margin="normal" error={!!errors.phone} helperText={errors.phone?.message} />
					</DialogContent>
					<DialogActions>
						<Button onClick={onClose}>Cancel</Button>
						<Button type="submit" variant="contained" disabled={isSubmitting}>Create</Button>
					</DialogActions>
				</form>
			</Dialog>
		);
}
