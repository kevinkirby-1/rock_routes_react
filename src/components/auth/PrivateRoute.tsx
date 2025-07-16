// src/components/PrivateRoute.tsx (or RequireAuth.tsx)
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface PrivateRouteProps {
  // You can add props for specific roles/permissions if needed later
  // allowedRoles?: string[];
  children?: React.ReactNode; // For wrapped components, if not using <Outlet />
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show a loading indicator while determining auth status
  if (isLoading) {
    return <div>Loading authentication...</div>; // Or a more sophisticated spinner
  }

  // If authenticated, render the children or the nested route's content
  if (isAuthenticated) {
    return children ? <>{children}</> : <Outlet />;
  }

  // If not authenticated, redirect to the login page
  // `replace` prop prevents adding the protected route to browser history
  return <Navigate to="/login" replace />;
};

export default PrivateRoute;