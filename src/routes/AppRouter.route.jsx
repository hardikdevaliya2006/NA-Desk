import { Navigate, Route, Routes } from "react-router";
import AuthGuard from "@/components/common/AuthGuard";
import DashboardLayout from "@/layout/DashboardLayout";
import Customer from "@/pages/Customer";
import Dashboard from "@/pages/Dashboard";
import Employe from "@/pages/Employe";
import Login from "@/pages/Login";
import NADesk from "@/pages/NADesk";
import NADeskCreate from "@/pages/NADeskCreate";
import Report from "@/pages/Report";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      <Route element={<AuthGuard />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employe" element={<Employe />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/report" element={<Report />} />
          <Route path="/na-desk" element={<NADesk />} />
          <Route path="/na-desk/create" element={<NADeskCreate />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
