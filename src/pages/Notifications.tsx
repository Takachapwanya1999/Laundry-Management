import React from 'react';
import { Typography, Card, CardContent, CardHeader, Container, Avatar, Box } from "@mui/material";
import { Notifications as NotificationsIcon } from '@mui/icons-material';

const fakeNotifications = [
	"Order #1234 is ready for pickup.",
	"Your invoice for July is available.",
	"Branch Downtown will be closed on Sunday.",
	"New promotional offer: 20% off on all services!",
];

const Notifications: React.FC = () => (
	<Container maxWidth="md" sx={{ py: 4 }}>
		<Typography variant="h3" fontWeight={700} gutterBottom color="primary.main">Notifications</Typography>
		<Typography color="text.secondary" sx={{ mb: 4, fontSize: 18 }}>
			Stay updated with the latest notifications from Laundry Management.
		</Typography>
		<Box display="grid" gap={4} gridTemplateColumns={{ xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}>
			{fakeNotifications.map((note, idx) => (	
				<Box key={idx}>
					<Card elevation={6} sx={{ borderRadius: 3, boxShadow: 3 }}>
						<CardHeader
							avatar={
								<Avatar sx={{ bgcolor: 'primary.main' }}>
									<NotificationsIcon />
								</Avatar>
							}
							title={<Typography fontWeight={600}>Notification</Typography>}
						/>
						<CardContent>
							<Typography variant="body2" color="text.secondary">
								{note}
							</Typography>
						</CardContent>
					</Card>
				</Box>
			))}
		</Box>
	</Container>
);
export default Notifications;
