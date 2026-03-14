import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Contact from "./pages/admin/Contact";
import Careers from "./pages/admin/Careers";
import AdminLayout from "./components/admin/AdminLayout";
import CustomCursor from "./components/CustomCursor";

export default function App() {
  return (
    <>
      {/* GLOBAL CUSTOM CURSOR */}
      <CustomCursor />

      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<Login />} />

        {/* Admin Layout */}
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="contact" element={<Contact />} />
          <Route path="careers" element={<Careers />} />
        </Route>

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}