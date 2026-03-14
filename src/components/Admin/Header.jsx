export default function Header({ setOpen }) {
  return (
    <header className="h-16 bg-gray-800  border-b border-slate-200 flex items-center justify-between px-4 md:px-6 sticky top-0 z-40">
      
      {/* Mobile Menu */}
      <button
        onClick={() => setOpen(prev => !prev)}
        className="md:hidden text-2xl text-slate-600"
      >
        ☰
      </button>

      <h1 className="font-semibold text-lg">Admin Dashboard</h1>

      <div className="flex items-center gap-4">
        <span className="hidden sm:block text-sm text-slate-500">
          Hello, Admin
        </span>
        <button className="bg-red-500 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-red-600 transition">
          Logout
        </button>
      </div>
    </header>
  );
}