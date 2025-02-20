import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../config/appRouter/Firebase';
function ProtectedRoute({ children }) {
    const user = auth.currentUser;
    return user ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
