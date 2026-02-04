import { PUBLIC_ROUTES } from "@/lib";
import { queryClient } from "@/providers/react-query.provider";
import type { User } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error?: string | null;
  login: (data: any) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const currentPath = useLocation().pathname;
  const isPublicRoute = PUBLIC_ROUTES.includes(currentPath);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);

      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      if (token) {
        setToken(token);
        setIsAuthenticated(true);
        if (user) {
          setUser(JSON.parse(user));
          setIsAuthenticated(true);
        }
      } else {
        setIsAuthenticated(false);
        if (!isPublicRoute) {
          navigate("/sign-in");
        }
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const handleLogout = () => {
      logout();
      navigate("/sign-in");
    };
    window.addEventListener("force-logout", handleLogout);
    return () => removeEventListener("force-logout", handleLogout);
  }, []);
  const login = async (data: any) => {
    console.log(data);
    localStorage.setItem("token", data.token);
    setUser(data.user);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
    queryClient.clear();
  };
  const values = {
    user,
    isAuthenticated,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth user must used be within the Authprovider");
  return context;
};
