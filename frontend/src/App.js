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
    axios.get("http://localhost:8000/api/employees/")
      .then(res => setEmployees(res.data))
      .catch(err => console.error(err));
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/employees/", {
      ...formData,
      salary: parseFloat(formData.salary)
    })
      .then(() => {
        fetchEmployees();
        setFormData({
          name: "",
          email: "",
          position: "",
          department: "",
          salary: ""
        });
      })
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Employee List</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input name="position" placeholder="Position" value={formData.position} onChange={handleChange} required />
        <input name="department" placeholder="Department" value={formData.department} onChange={handleChange} required />
        <input name="salary" placeholder="Salary" value={formData.salary} onChange={handleChange} type="number" required />
        <button type="submit">Add Employee</button>
      </form>

      <ul>
        {employees.map(emp => (
          <li key={emp.id}>
            {emp.name} — {emp.position} (${emp.salary})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
