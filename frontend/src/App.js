// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
    department: "",
    salary: ""
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios
      .get("http://localhost:8000/api/employees/")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error(err));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/employees/", {
        ...formData,
        salary: parseFloat(formData.salary),
      })
      .then(() => {
        fetchEmployees();
        setFormData({
          name: "",
          email: "",
          position: "",
          department: "",
          salary: "",
        });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-bold text-blue-700 mb-8">Employee Manager</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white p-6 rounded-xl shadow-md space-y-4"
      >
        <h2 className="text-2xl font-semibold mb-2 text-gray-700">Add Employee</h2>

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
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition w-full md:w-auto"
        >
          Add Employee
        </button>
      </form>

      {/* Employee List */}
      <div className="w-full max-w-3xl mt-8 bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Employee List</h2>
        {employees.length === 0 ? (
          <p className="text-gray-500 italic">No employees yet.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {employees.map((emp) => (
              <li
                key={emp.id}
                className="py-3 flex flex-col md:flex-row justify-between items-start md:items-center"
              >
                <div>
                  <p className="font-medium text-gray-800">{emp.name}</p>
                  <p className="text-sm text-gray-500">{emp.position} — {emp.department}</p>
                </div>
                <div className="text-sm text-green-600 mt-2 md:mt-0">
                  ${emp.salary.toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;

