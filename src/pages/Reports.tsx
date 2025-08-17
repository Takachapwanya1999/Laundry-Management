import React, { useMemo, useState } from 'react';
import { Box, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

function generateData() {
	return Array.from({ length: 12 }).map((_, i) => ({
		month: new Date(2025, i, 1).toLocaleString('en', { month: 'short' }),
		revenue: Math.round(1000 + Math.random() * 3000),
		orders: Math.round(50 + Math.random() * 120),
		conversion: Math.round(20 + Math.random() * 50),
	}));
}

const Reports: React.FC = () => {
	const [mode, setMode] = useState<'revenue' | 'orders' | 'conversion'>('revenue');
	const data = useMemo(() => generateData(), []);

	return (
		<Box>
			<Typography variant="h4" gutterBottom>Reports</Typography>
			<Stack direction="row" spacing={1} sx={{ mb: 2 }}>
				<ToggleButtonGroup size="small" value={mode} exclusive onChange={(_, v) => v && setMode(v)}>
					<ToggleButton value="revenue">Revenue</ToggleButton>
					<ToggleButton value="orders">Orders</ToggleButton>
					<ToggleButton value="conversion">Conversion</ToggleButton>
				</ToggleButtonGroup>
			</Stack>

			{mode === 'revenue' && (
				<ResponsiveContainer width="100%" height={360}>
					<LineChart data={data}>
						<XAxis dataKey="month" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Line type="monotone" dataKey="revenue" stroke="#1976d2" />
					</LineChart>
				</ResponsiveContainer>
			)}

			{mode === 'orders' && (
				<ResponsiveContainer width="100%" height={360}>
					<BarChart data={data}>
						<XAxis dataKey="month" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Bar dataKey="orders" fill="#00bcd4" />
					</BarChart>
				</ResponsiveContainer>
			)}

			{mode === 'conversion' && (
				<ResponsiveContainer width="100%" height={360}>
					<LineChart data={data}>
						<XAxis dataKey="month" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Line type="monotone" dataKey="conversion" stroke="#43a047" />
					</LineChart>
				</ResponsiveContainer>
			)}
		</Box>
	);
};

export default Reports;
