import React from 'react';
import { Typography, TextField, Button, Paper, Stack, Container, Avatar } from "@mui/material";
import { Lock } from '@mui/icons-material';

const Login: React.FC = () => (
	<Container maxWidth="xs" sx={{ py: 8 }}>
		<Paper elevation={6} sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
			<Stack alignItems="center" spacing={2} sx={{ mb: 2 }}>
				<Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
					<Lock fontSize="large" />
				</Avatar>
				<Typography variant="h4" fontWeight={700} color="primary.main">Login</Typography>
			</Stack>
			<Typography color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
				Please enter your credentials to access the laundry management system.
			</Typography>
			<Stack spacing={3}>
				<TextField label="Email" type="email" fullWidth />
				<TextField label="Password" type="password" fullWidth />
				<Button variant="contained" color="primary" size="large">Login</Button>
			</Stack>
		</Paper>
	</Container>
);
export default Login;
