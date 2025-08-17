import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Box, ListItemButton, IconButton, Select, MenuItem } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { useBranch } from '../context/useBranch';

const navItems = [
  { label: 'Dashboard', path: '/' },
  { label: 'Orders', path: '/orders' },
  { label: 'Customers', path: '/customers' },
  { label: 'Billing', path: '/billing' },
  { label: 'Reports', path: '/reports' },
  { label: 'Notifications', path: '/notifications' },
  { label: 'Branches', path: '/branches' },
  { label: 'Staff', path: '/staff' },
  { label: 'Customer Portal', path: '/portal' },
];

const drawerWidth = 220;

const Layout: React.FC = () => {
  const location = useLocation();
  const { branch, setBranch } = useBranch();

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Laundry Management
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Select size="small" value={branch} onChange={(e) => setBranch(e.target.value as 'Downtown' | 'Uptown' | 'Airport')} sx={{ mr: 2, color: 'inherit', '.MuiOutlinedInput-notchedOutline': { border: 0 } }}>
            <MenuItem value="Downtown">Downtown</MenuItem>
            <MenuItem value="Uptown">Uptown</MenuItem>
            <MenuItem value="Airport">Airport</MenuItem>
          </Select>
          <IconButton color="inherit">
            <Brightness4Icon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <List>
          {navItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: `${drawerWidth}px` }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
