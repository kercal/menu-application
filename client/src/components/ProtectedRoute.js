import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const isCafeOwnerLoggedIn = !!localStorage.getItem("token");
  const isCustomerLoggedIn = !!localStorage.getItem("customerToken");

  if (role === "cafeOwner" && !isCafeOwnerLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (role === "customer" && !isCustomerLoggedIn) {
    return <Navigate to="/customer/login" />;
  }

  return children;
};

export default ProtectedRoute;
