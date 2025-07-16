// src/context/AuthContext.tsx
import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { useNavigate } from "react-router-dom";

export interface AuthContextType {
  login: () => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Manages initial auth check
  const navigate = useNavigate();

  // Memoize the logout function to prevent unnecessary re-renders
  const logout = useCallback(() => {
    setIsAuthenticated(false);
    console.log("User logged out due to token expiration or explicit logout.");
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);

    return () => {
      delete (window as any).authContext;
    };
  }, [logout]);

  const login = () => {
    setIsAuthenticated(true);
  };

  // Memoize the context value to prevent unnecessary re-renders of consuming components
  const contextValue = React.useMemo(
    () => ({
      login,
      logout,
      isAuthenticated,
      isLoading,
    }),
    [login, logout, isAuthenticated, isLoading]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Custom hook to consume the AuthContext easily
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
