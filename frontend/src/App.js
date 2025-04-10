import { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import axios from "axios";

function App() {
  const API_BASE_URL = process.env.REACT_APP_API_URL;
  const API_URL = API_BASE_URL + '/employees';

  const initialFormData = {
    name: "",
    email: "",
    position: "",
    department: "",
    salary: ""
  };

  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios
      .get(API_URL)
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error(err));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Open form for editing
  const handleEdit = (employee) => {
    setFormData({
      name: employee.name,
      email: employee.email,
      position: employee.position,
      department: employee.department,
      salary: employee.salary,
    });
    setEditingId(employee.id);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  // Submit form (add or edit)
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      salary: parseFloat(formData.salary),
    };

    const request = editingId
      ? axios.put(`${API_URL}/${editingId}/`, payload)
      : axios.post(API_URL, payload);

    request
      .then(() => {
        fetchEmployees();
        setFormData(initialFormData);
        setIsEditing(false);
        setEditingId(null);
        setIsModalOpen(false);
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      axios
        .delete(`${API_URL}/${id}/`)
        .then(() => fetchEmployees())
        .catch((err) => console.error(err));
    }
  };

  // Filter employees before rendering
  const filteredEmployees = employees.filter((emp) =>
    `${emp.name} ${emp.email}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-bold text-blue-700 mb-8">Employee Management</h1>

      <div className="w-full max-w-5xl flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-full md:w-1/2 focus:ring-2 focus:ring-blue-400 outline-none"
        />

        {/* Add Employee Button */}
        <button
          onClick={() => {
            setFormData(initialFormData);
            setEditingId(null);
            setIsEditing(false);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full md:w-auto"
        >
          + Employee
        </button>
      </div>

      {/* Employee Table */}
      <div className="w-full max-w-5xl bg-white shadow-md rounded-xl overflow-hidden">
        {employees.length === 0 ? (
          <div className="p-6 text-gray-500 italic">No employees yet.</div>
        ) : (
          <table className="min-w-full table-auto">
            <thead className="bg-blue-100 text-left text-gray-700">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Position</th>
                <th className="px-6 py-3">Department</th>
                <th className="px-6 py-3">Salary</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-3">{emp.name}</td>
                  <td className="px-6 py-3">{emp.email}</td>
                  <td className="px-6 py-3">{emp.position}</td>
                  <td className="px-6 py-3">{emp.department}</td>
                  <td className="px-6 py-3 text-green-600">${emp.salary.toLocaleString()}</td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3 mt-2 md:mt-0">
                      <button
                        onClick={() => handleEdit(emp)}
                        className="text-blue-600 hover:text-blue-800 transition"
                        title="Edit"
                      >
                        <FiEdit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(emp.id)}
                        className="text-red-600 hover:text-red-800 transition"
                        title="Delete"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-lg relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-4 text-gray-600 hover:text-black text-xl"
            >
              &times;
            </button>

            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Add Employee</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                />
                <input
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                />
                <input
                  name="position"
                  placeholder="Position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                  className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                />
                <input
                  name="department"
                  placeholder="Department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                />
                <input
                  name="salary"
                  placeholder="Salary"
                  value={formData.salary}
                  onChange={handleChange}
                  type="number"
                  required
                  className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
