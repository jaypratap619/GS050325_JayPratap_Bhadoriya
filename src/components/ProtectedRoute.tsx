// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const user = auth.currentUser;
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;