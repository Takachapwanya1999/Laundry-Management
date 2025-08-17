
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, Alert } from '@mui/material';
import api from '../utils/api';

interface Order {
	id: number;
	title: string;
	status: string;
}

const Orders: React.FC = () => {
	const [orders, setOrders] = useState<Order[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		setLoading(true);
			api.get('/posts') // Example endpoint, replace with your backend orders endpoint
				.then((res) => {
					// Replace titles with English sample order descriptions
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
					setOrders(res.data.slice(0, 10).map((o: any, i: number) => ({
						...o,
						title: englishTitles[i],
						status: ['Received', 'In Progress', 'Ready', 'Delivered'][i % 4],
					})));
					setLoading(false);
				})
			.catch(() => {
				setError('Failed to fetch orders.');
				setLoading(false);
			});
	}, []);

	return (
		<div>
			<Typography variant="h4" gutterBottom>Orders</Typography>
			{loading && <CircularProgress />}
			{error && <Alert severity="error">{error}</Alert>}
			{!loading && !error && (
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>ID</TableCell>
								<TableCell>Title</TableCell>
								<TableCell>Status</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{orders.map((order) => (
								<TableRow key={order.id}>
									<TableCell>{order.id}</TableCell>
									<TableCell>{order.title}</TableCell>
									<TableCell>{order.status}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</div>
	);
};

export default Orders;
