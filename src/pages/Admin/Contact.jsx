import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

export default function Contact() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("adminToken");

  // Fetch contacts
  useEffect(() => {
    fetch("http://localhost:8000/api/contacts", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setContacts(data.data);
        else setError("Failed to fetch contacts");
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Server error");
        setLoading(false);
      });
  }, []);

  // Delete contact
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;

    try {
      const res = await fetch(`http://localhost:8000/api/contacts/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setContacts(contacts.filter((c) => c.id !== id));
        alert("Contact deleted successfully");
      } else {
        alert(data.message || "Failed to delete contact");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  // Define columns
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      wrap: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      wrap: true,
    },
    {
      name: "Message",
      selector: (row) => row.message,
      sortable: false,
      wrap: true,
    },
    {
      name: "Submitted At",
      selector: (row) => new Date(row.created_at).toLocaleString(),
      sortable: true,
      wrap: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <button
          onClick={() => handleDelete(row.id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400 transition text-sm"
        >
          Delete
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  // Custom styles for responsive table
  const customStyles = {
    tableWrapper: {
      style: {
        overflowX: "auto",
      },
    },
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "14px",
      },
    },
    cells: {
      style: {
        fontSize: "14px",
      },
    },
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-4">📩 Contact Submissions</h1>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <DataTable
        columns={columns}
        data={contacts}
        progressPending={loading}
        pagination
        highlightOnHover
        responsive
        dense
        customStyles={customStyles}
        noHeader
      />
    </div>
  );
}