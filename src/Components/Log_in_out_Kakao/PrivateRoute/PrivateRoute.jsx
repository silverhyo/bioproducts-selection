import React from 'react';
import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

export default function PrivateRoute({ component: Component, roles, ...rest }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const user = jwtDecode(token);

    if (roles && !roles.includes(user.role)) {
      return <Navigate to="/unauthorized" />;
    }

    return <Component {...rest} />;
  } catch (error) {
    return <Navigate to="/login" />;
  }
};
