// components/ProtectedRoute.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, openLoginModal, children }) => {
    const location = useLocation();

    useEffect(() => {
        if (!isAuthenticated && location.pathname !== "/") {
            openLoginModal();
        }
    }, [isAuthenticated, openLoginModal, location.pathname]);

    if (!isAuthenticated) {
        return null;
    }

    return children;
};

export default ProtectedRoute;
