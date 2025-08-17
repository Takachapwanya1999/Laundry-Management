
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Card, CardContent, Typography } from '@mui/material';

const stats = [
	{ label: 'Total Orders', value: 128 },
	{ label: 'Active Customers', value: 42 },
	{ label: 'Revenue (This Month)', value: '$2,340' },
	{ label: 'Pending Deliveries', value: 7 },
];


const Dashboard: React.FC = () => (
	<Box>
		<Typography variant="h4" gutterBottom>Dashboard</Typography>
				<Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
					{stats.map((stat) => (
						<Box key={stat.label} flex={1} minWidth={200}>
							<Card>
								<CardContent>
									<Typography variant="h6" color="textSecondary" gutterBottom>
										{stat.label}
									</Typography>
									<Typography variant="h4">{stat.value}</Typography>
								</CardContent>
							</Card>
						</Box>
					))}
				</Stack>
	</Box>
);

export default Dashboard;
