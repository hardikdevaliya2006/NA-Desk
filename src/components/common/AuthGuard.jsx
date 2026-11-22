import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

import { EmptySpinner } from "@/components/common/EmptySpinner";

const AuthGuard = () => {
  const isAuthenticated = useSelector(
    (state) => state.authentication.isAuthenticated,
  );
  const initialized = useSelector((state) => state.authentication.initialized);

  if (!initialized) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <EmptySpinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
