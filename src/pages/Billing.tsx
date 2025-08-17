import { useMemo } from 'react';
import { Box, Button, Stack, Typography, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import { fetchInvoicesFromEdge } from '../utils/edge';
import { useBranch } from '../context/useBranch';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import Papa from 'papaparse';
import { useQuery } from '@tanstack/react-query';

const Billing = () => {
	const { branch } = useBranch();
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
		<Box sx={{ p: 3 }}>
			<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
				<Typography variant="h3" fontWeight={700} color="primary.main">Billing</Typography>
				<Stack direction="row" spacing={2}>
					<Button size="medium" variant="outlined" onClick={exportCsv}>Export CSV</Button>
					<Button size="medium" variant="contained" onClick={exportPdf}>Export PDF</Button>
				</Stack>
			</Stack>
			<Box component={Paper} elevation={6} sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
				<div style={{ height: 560, width: '100%' }}>
					<DataGrid
						rows={invoices as InvoiceRow[]}
						columns={invoiceCols}
						pageSizeOptions={[10, 25, 50]}
						initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
						sx={{ background: 'white', borderRadius: 2 }}
					/>
				</div>
			</Box>
		</Box>
	);
};

export default Billing;

