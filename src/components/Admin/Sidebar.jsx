import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ open, setOpen }) {
  const { pathname } = useLocation();

  const menu = [
    { name: "Dashboard", path: "/admin/dashboard", icon: "📊" },

    { name: "Contact", path: "/admin/contact", icon: "🛠️" },
    { name: "Careers", path: "/admin/careers", icon: "💼" },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <aside
        className={`fixed md:static z-50 w-64 bg-gray-800 border-b border-slate-200
        min-h-screen p-5 transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <img
          src="/images/suprexon_logo.png"
          alt="Suprexon Admin"
          className="w-36 mb-8 mx-auto md:mx-0"
        />

        <nav className="space-y-2">
          {menu.map(item => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)} // closes sidebar on mobile
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors
                ${
                  pathname === item.path
                    ? "bg-indigo-50 text-indigo-600 font-medium"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
            >
              <span>{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}