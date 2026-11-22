import { Navigate } from "react-router";
import { useSelector } from "react-redux";

import { LoginForm } from "@/components/login/LoginForm";
import { EmptySpinner } from "@/components/common/EmptySpinner";

export default function Login() {
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

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginForm />
      </div>
    </div>
  );
}
