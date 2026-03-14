import { useEffect, useState } from "react";

export default function Careers() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("adminToken");

    // Fetch applications
    const fetchApplications = async () => {
        try {
            const res = await fetch("http://localhost:8000/api/applications", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (res.ok) setApplications(data);
            else console.error("Failed to fetch applications:", data);
        } catch (err) {
            console.error("Server error:", err);
        } finally {
            setLoading(false);
        }
    };

    // Delete application
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this application?")) return;

        try {
            const res = await fetch(`http://localhost:8000/api/applications/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setApplications(applications.filter((app) => app.id !== id));
                alert("Application deleted successfully");
            } else {
                alert(data.message || "Failed to delete application");
            }
        } catch (err) {
            console.error("Server error:", err);
            alert("Server error");
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Career Applications</h2>

            {loading ? (
                <p className="text-gray-500">Loading applications...</p>
            ) : applications.length === 0 ? (
                <p className="text-gray-400">No applications found.</p>
            ) : (
                <>
                    {/* Desktop Table */}
                    <div className="hidden md:block overflow-x-auto rounded-lg shadow-lg">
                        <table className="min-w-full bg-white rounded-lg shadow divide-y divide-gray-200">
                            <thead className="bg-gray-50 sticky top-0">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Job Title</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Resume</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Submitted At</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {applications.map((app) => (
                                    <tr key={app.id} className="hover:bg-gray-50 transition">
                                        <td className="px-4 py-2">{app.name}</td>
                                        <td className="px-4 py-2 break-words">{app.email}</td>
                                        <td className="px-4 py-2">{app.job_title}</td>
                                        <td className="px-4 py-2">
                                            <a
                                                href={app.resume_path}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-indigo-600 hover:underline"
                                            >
                                                View Resume
                                            </a>
                                        </td>
                                        <td className="px-4 py-2 whitespace-nowrap">
                                            {new Date(app.created_at).toLocaleString()}
                                        </td>
                                        <td className="px-4 py-2">
                                            <button
                                                onClick={() => handleDelete(app.id)}
                                                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 active:bg-red-700 
             text-white font-semibold px-4 py-2 rounded-lg shadow-md 
             transition-all duration-200 transform hover:scale-105
             focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1
             md:px-3 md:py-1 text-sm md:text-sm"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4 md:h-3 md:w-3"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="md:hidden grid gap-4">
                        {applications.map((app) => (
                            <div key={app.id} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col justify-between">
                                <div className="space-y-1">
                                    <p className="text-gray-800 font-semibold">{app.name}</p>
                                    <p className="text-gray-500 break-words">{app.email}</p>
                                    <p className="text-gray-600 font-medium">{app.job_title}</p>
                                    <p className="text-gray-400 text-sm">
                                        Submitted: {new Date(app.created_at).toLocaleString()}
                                    </p>
                                </div>
                                <div className="mt-3 flex items-center justify-between">
                                    <a
                                        href={app.resume_path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-indigo-600 font-medium hover:underline"
                                    >
                                        View Resume
                                    </a>
                                    <button
                                        onClick={() => handleDelete(app.id)}
                                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 active:bg-red-700 
                                            text-white font-semibold px-4 py-2 rounded-lg shadow-md 
                                            transition-all duration-200 transform hover:scale-105
                                            focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1
                                            md:px-3 md:py-1 text-sm md:text-sm"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 md:h-3 md:w-3"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}