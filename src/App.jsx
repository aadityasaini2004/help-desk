import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/dashboard/StudentDashboard';
import FacultyDashboard from './pages/dashboard/FacultyDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import NotFound from './pages/NotFound';
import { useAuth } from './context/AuthContext';

// Redirector Component
const HomeRedirect = () => {
  const { user, loading } = useAuth();
  console.log("HomeRedirect State - User:", user, "Loading:", loading);

  if (loading) return null; // Or loader

  if (!user) {
    console.warn("HomeRedirect: No user found, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  // Normalize Role (handle lowercase, ROLE_ prefix, etc.)
  // Some JWTs use "roles" array, "role" string, or "authorities" array
  const rawRole = user.role || user.roles?.[0] || user.authorities?.[0]?.authority || '';
  const role = String(rawRole).toUpperCase().replace('ROLE_', '').trim(); // Added trim for safety

  console.log("HomeRedirect: Raw Role:", rawRole, "Normalized Role:", role);

  // Redirect based on role
  if (role === 'STUDENT') return <Navigate to="/student" replace />;
  if (role === 'FACULTY') return <Navigate to="/faculty" replace />;
  if (['HOD', 'DEAN'].includes(role)) return <Navigate to="/admin" replace />;

  console.warn(`HomeRedirect: Unknown role '${role}', redirecting to login`);
  return <Navigate to="/login" replace />;
};

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<HomeRedirect />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={['STUDENT']} />}>
          <Route path="/student" element={<StudentDashboard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['FACULTY']} />}>
          <Route path="/faculty" element={<FacultyDashboard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['HOD', 'DEAN']} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
