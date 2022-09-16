import React from "react";
import { useLoggedIn } from "../../utils/use-logged-in";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const isLogged = useLoggedIn();

  if (isLogged) {
    return <>{children}</>;
  }

  return <Navigate to="/" />;
};

export default AuthGuard;
