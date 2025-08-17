import React, { useMemo, useState } from 'react';
import { Box, Chip, Stack, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import { fetchCustomersFromEdge } from '../utils/edge';
import { useBranch } from '../context/useBranch';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const Customers: React.FC = () => {
	const [search, setSearch] = useState('');
	const { branch } = useBranch();
	const nav = useNavigate();
	const { data } = useQuery({
		queryKey: ['customers', branch],
		queryFn: async () => {
			const res = await fetchCustomersFromEdge(branch);
			return Array.isArray(res) ? res : [];
		},
	});

	type CustomerRow = { id: number; name?: string; email?: string; phone?: string; ltv?: number; lastActivity?: string; tags?: string[]; branch?: string };
	const rows = useMemo(() => {
		const s = search.toLowerCase();
		const arr = (Array.isArray(data) ? data : []) as CustomerRow[];
		return arr.filter((c) => ((c.name || '').toLowerCase().includes(s) || (c.email || '').toLowerCase().includes(s)) && c.branch === branch);
	}, [data, search, branch]);

	const columns = useMemo<GridColDef[]>(() => [
		{ field: 'id', headerName: 'ID', width: 80 },
		{ field: 'name', headerName: 'Name', flex: 1, minWidth: 200 },
		{ field: 'email', headerName: 'Email', flex: 1, minWidth: 220 },
		{ field: 'phone', headerName: 'Phone', width: 140 },
		{ field: 'ltv', headerName: 'LTV ($)', width: 120 },
		{ field: 'lastActivity', headerName: 'Last Activity', width: 140 },
		{ field: 'tags', headerName: 'Tags', width: 180, renderCell: (p) => (
			<Stack direction="row" spacing={0.5}>{(p.value as string[] | undefined)?.map((t) => <Chip size="small" key={t} label={t} />)}</Stack>
		) },
	], []);

	return (
		<Box>
			<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
				<Typography variant="h4">Customers</Typography>
				<TextField size="small" label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
			</Stack>
			<div style={{ height: 560, width: '100%' }}>
				<DataGrid
					rows={rows}
					columns={columns}
					pageSizeOptions={[10, 25, 50]}
					initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
					onRowDoubleClick={(p) => nav(`/customers/${p.row.id}`)}
				/>
			</div>
		</Box>
	);
};

export default Customers;
