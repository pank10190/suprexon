export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 text-center text-xs py-3 text-slate-500">
      © {new Date().getFullYear()} Suprexon Admin Panel
    </footer>
  );
}