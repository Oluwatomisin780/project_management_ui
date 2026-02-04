import { useAuth } from "@/providers/auth-context";
import React from "react";
import { Navigate, Outlet } from "react-router";

function AuthLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <div>Loading...</div>;

  if (isAuthenticated) return <Navigate to={"/dashboard"} />;
  return <Outlet />;
}

export default AuthLayout;
