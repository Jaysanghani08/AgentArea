// ProtectedRoute.js
import React from 'react';
import { useAuth } from './../context/AuthContext';
import { Navigate, Route } from 'react-router-dom';

const ProtectedRoute = ({ path, element }) => {
    const { user } = useAuth();

    // If the user is not authenticated, redirect to the login page
    if (!user) {
        return <Navigate to="/login" />;
    }

    // Otherwise, render the protected route
    return <Route path={path} element={element} />;
};

export default ProtectedRoute;
