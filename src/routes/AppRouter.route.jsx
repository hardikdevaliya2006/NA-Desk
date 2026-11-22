import { Navigate, Route, Routes } from "react-router";
import DashboardLayout from "@/layout/DashboardLayout";
import Dashboard from "@/pages/Dashboard";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;