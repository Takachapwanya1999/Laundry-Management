import React, { useMemo, useState } from 'react';
import { Box, Button, Stack, Tab, Tabs, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import { fetchInvoicesFromEdge } from '../utils/edge';
import { useBranch } from '../context/useBranch';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import Papa from 'papaparse';
import { useQuery } from '@tanstack/react-query';

const Billing: React.FC = () => {
	const { branch } = useBranch();
	const [tab, setTab] = useState(0);
	const { data: invoices = [] } = useQuery({
		queryKey: ['invoices', branch],
		queryFn: async () => {
			const res = await fetchInvoicesFromEdge(branch);
			return Array.isArray(res) ? res : [];
		},
	});

	type InvoiceRow = { id: number; customerName?: string; date?: string; dueDate?: string; status?: string; total: number };
	const invoiceCols = useMemo<GridColDef<InvoiceRow>[]>(() => [
		{ field: 'id', headerName: 'ID', width: 80 },
		{ field: 'customerName', headerName: 'Customer', flex: 1, minWidth: 200 },
		{ field: 'date', headerName: 'Date', width: 120 },
		{ field: 'dueDate', headerName: 'Due', width: 120 },
		{ field: 'status', headerName: 'Status', width: 120 },
		{ field: 'total', headerName: 'Total ($)', width: 120 },
	], []);

	const exportCsv = () => {
		const csv = Papa.unparse((invoices as InvoiceRow[]));
		const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
		saveAs(blob, 'invoices.csv');
	};

	const exportPdf = () => {
		const doc = new jsPDF();
		doc.text('Invoices', 14, 16);
		(invoices as InvoiceRow[]).slice(0, 20).forEach((inv, idx) => {
			doc.text(`#${inv.id} - ${inv.customerName} - $${inv.total.toFixed(2)}`, 14, 28 + idx * 8);
		});
		doc.save('invoices.pdf');
	};

	return (
		<Box>
			<Typography variant="h4" gutterBottom>Billing</Typography>
			<Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
				<Tab label="Invoices" />
				<Tab label="Price Catalog" />
			</Tabs>

			{tab === 0 && (
				<>
					<Stack direction="row" spacing={1} sx={{ mb: 1 }}>
						<Button size="small" onClick={exportCsv}>Export CSV</Button>
						<Button size="small" variant="contained" onClick={exportPdf}>Export PDF</Button>
					</Stack>
					<div style={{ height: 560, width: '100%' }}>
						<DataGrid
							rows={invoices}
							columns={invoiceCols}
							pageSizeOptions={[10, 25, 50]}
							initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
						/>
					</div>
				</>
			)}

			{tab === 1 && (
				<Typography color="text.secondary">Price Catalog coming from Supabase soon.</Typography>
			)}
		</Box>
	);
};

export default Billing;
