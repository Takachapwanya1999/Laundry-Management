import React from 'react';
import { Typography, Card, CardContent, CardHeader, Container, Avatar, Box } from "@mui/material";
import { Person } from '@mui/icons-material';

const fakeActions = [
	"View Orders",
	"Track Laundry Status",
	"Download Invoice",
	"Update Profile",
];

const CustomerPortal: React.FC = () => (
	<Container maxWidth="md" sx={{ py: 4 }}>
		<Typography variant="h3" fontWeight={700} gutterBottom color="primary.main">Customer Portal</Typography>
		<Typography color="text.secondary" sx={{ mb: 4, fontSize: 18 }}>
			Welcome to your laundry portal. Manage your orders, invoices, and profile with ease.
		</Typography>
		<Box display="grid" gap={4} gridTemplateColumns={{ xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}>
			{fakeActions.map((action, idx) => (
				<Box key={idx}>
					<Card elevation={6} sx={{ borderRadius: 3, boxShadow: 3 }}>
						<CardHeader
							avatar={
								<Avatar sx={{ bgcolor: 'primary.main' }}>
									<Person />
								</Avatar>
							}
							title={<Typography fontWeight={600}>{action}</Typography>}
						/>
						<CardContent>
							<Typography variant="body2" color="text.secondary">
								Quick access to {action.toLowerCase()}.
							</Typography>
						</CardContent>
					</Card>
				</Box>
			))}
		</Box>
	</Container>
);
export default CustomerPortal;
