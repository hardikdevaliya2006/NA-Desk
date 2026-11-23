import { Navigate, Route, Routes } from "react-router";
import AuthGuard from "@/components/common/AuthGuard";
import DashboardLayout from "@/layout/DashboardLayout";
import Dashboard from "@/pages/Dashboard";
import Employe from "@/pages/Employe";
import Login from "@/pages/Login";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      <Route element={<AuthGuard />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employe" element={<Employe />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
