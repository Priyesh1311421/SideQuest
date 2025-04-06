import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Define protected paths that require authentication
    const protectedPaths = [
        "/voice-chat",
        "/text-chat",
        "/chat-room",
        "/room"
    ];
    
    // Check if current path is protected
    const isProtectedPath = protectedPaths.some(path => 
        location.pathname.startsWith(path)
    );
    
    // Get authentication status
    const isAuthenticated = !!localStorage.getItem("token");

    useEffect(() => {
        // If path is protected and user is not authenticated
        if (isProtectedPath && !isAuthenticated) {
            // We'll use navigate instead of a custom openLoginModal function
            // to maintain compatibility with your existing Header component
            navigate("/", { state: { showLogin: true } });
        }
    }, [isProtectedPath, isAuthenticated, navigate, location.pathname]);

    // If path is protected and user is not authenticated, don't render children
    if (isProtectedPath && !isAuthenticated) {
        return null;
    }

    // Otherwise, render children
    return children;
};

export default ProtectedRoute;