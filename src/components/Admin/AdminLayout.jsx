// AdminLayout.jsx (updated for Router Outlet)
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex">
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Main Area */}
      <div className="flex flex-col flex-1">
        <Header setOpen={setOpen} />
        <main className="flex-1 p-4 md:p-6">
          <Outlet /> {/* Nested admin pages render here */}
        </main>
        <Footer />
      </div>
    </div>
  );
}