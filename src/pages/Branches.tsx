import React from 'react';
import { Typography, Card, CardContent, CardHeader, Container, Avatar } from "@mui/material";
import { Grid } from "@mui/material";
import { Store } from '@mui/icons-material';

const fakeBranches = [
	{ id: 1, name: "Downtown", address: "123 Main St", manager: "Alice" },
	{ id: 2, name: "Uptown", address: "456 Elm St", manager: "Bob" },
	{ id: 3, name: "Suburb", address: "789 Oak St", manager: "Charlie" },
];

const Branches: React.FC = () => (
		<Container maxWidth="lg" sx={{ py: 6 }}>
			<Typography variant="h3" fontWeight={700} gutterBottom color="primary.main">Our Branches</Typography>
			<Typography color="text.secondary" sx={{ mb: 4, fontSize: 18 }}>
				Explore our laundry branches and meet their managers.
			</Typography>
			<Grid container spacing={4}>
				{fakeBranches.map((branch) => (
					<Grid key={branch.id} item xs={12} sm={6} md={4}>
						<Card elevation={8} sx={{ borderRadius: 4, boxShadow: 6, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.03)', boxShadow: 12 }, background: 'linear-gradient(135deg, #e3f2fd 0%, #fff 100%)' }}>
							<CardHeader
								avatar={
									<Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
										<Store fontSize="large" />
									</Avatar>
								}
								title={<Typography fontWeight={700} fontSize={22}>{branch.name}</Typography>}
								subheader={<Typography color="secondary" fontWeight={500}>{branch.manager}</Typography>}
							/>
							<CardContent>
								<Typography variant="body1" color="text.secondary" sx={{ fontSize: 17 }}>
									Address: <b>{branch.address}</b>
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		</Container>
);
export default Branches;
