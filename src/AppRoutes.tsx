import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard.tsx';
import Orders from './pages/Orders.tsx';
import Customers from './pages/Customers.tsx';
import CustomerProfile from './pages/CustomerProfile.tsx';
import Billing from './pages/Billing.tsx';
import Reports from './pages/Reports.tsx';
import Notifications from './pages/Notifications.tsx';
import Branches from './pages/Branches.tsx';
import Staff from './pages/Staff.tsx';
import CustomerPortal from './pages/CustomerPortal.tsx';
import Login from './pages/Login.tsx';
import Layout from './components/Layout';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} /> 
        <Route path="/orders" element={<Orders />} /> 
        <Route path="/customers" element={<Customers />} />
  <Route path="/customers/:id" element={<CustomerProfile />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/branches" element={<Branches />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/portal" element={<CustomerPortal />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Router>
);

export default AppRoutes;
