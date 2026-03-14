// pages/admin/Dashboard.jsx
export default function Dashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Users", count: 120 },
          { title: "Services", count: 8 },
          { title: "Careers", count: 5 },
          { title: "Messages", count: 32 },
        ].map((item, i) => (
          <div key={i} className="bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="text-gray-400">{item.title}</h3>
            <p className="text-3xl font-bold">{item.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}