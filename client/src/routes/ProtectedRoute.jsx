import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return (
            <div className="container mt-5 text-center">
                <h1 className="text-danger fw-bold">403</h1>
                <h3>Access Denied</h3>
                <p className="text-muted">You do not have permission to view this page.</p>
            </div>
        );
    }

    return children;
};

export default ProtectedRoute;
