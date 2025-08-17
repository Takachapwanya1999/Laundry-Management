import React from 'react';
import { Typography, Card, CardContent, CardHeader, Avatar, Container, Box } from "@mui/material";
import { deepPurple, blue, green } from "@mui/material/colors";

const fakeStaff = [
	{ id: 1, name: "Alice Smith", role: "Manager", branch: "Downtown" },
	{ id: 2, name: "Bob Johnson", role: "Attendant", branch: "Uptown" },
	{ id: 3, name: "Charlie Lee", role: "Cleaner", branch: "Suburb" },
];

const roleColors: { [key: string]: string } = {
	Manager: deepPurple[500],
	Attendant: blue[500],
	Cleaner: green[500],
};

const Staff: React.FC = () => (
	<Container maxWidth="md" sx={{ py: 4 }}>
		<Typography variant="h3" fontWeight={700} gutterBottom color="primary.main">Our Team</Typography>
		<Typography color="text.secondary" sx={{ mb: 4, fontSize: 18 }}>
			Meet our dedicated laundry staff members who make your experience seamless.
		</Typography>
		<Box display="grid" gap={4} gridTemplateColumns={{ xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}>
			{fakeStaff.map((staff) => (
			<Box key={staff.id}>
					<Card elevation={6} sx={{ borderRadius: 3, boxShadow: 3 }}>
						<CardHeader
							avatar={
								<Avatar sx={{ bgcolor: roleColors[staff.role] }}>
									{staff.name[0]}
								</Avatar>
							}
							title={<Typography fontWeight={600}>{staff.name}</Typography>}
							subheader={staff.role}
						/>
						<CardContent>
							<Typography variant="body2" color="text.secondary">
								Branch: <b>{staff.branch}</b>
							</Typography>
						</CardContent>
					</Card>
				</Box>
			))}
		</Box>
	</Container>
);
export default Staff;
