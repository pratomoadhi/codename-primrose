# 🧑‍💼 Employee Management Web App

A simple full-stack employee management application built with:

- 🌐 **Frontend:** React
- ⚙️ **Backend:** FastAPI
- 🛢️ **Database:** PostgreSQL

---

## 🚀 Features

- View all employees
- Add new employee
- (Update/Delete coming soon)

---

## 📁 Project Structure

```
employee-management/
├── backend/       # FastAPI app
├── frontend/      # React app
```

---

## ⚙️ Setup Instructions

### 🛠 Backend (FastAPI + PostgreSQL)

1. **Navigate to the backend folder:**
   ```bash
   cd backend
   ```

2. **Create and activate virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Create `.env` file:**
   ```
   DATABASE_URL=postgresql://postgres:password@localhost:5432/employees_db
   ```

5. **Create the database and run migration:**
   ```bash
   python init_db.py
   ```

6. **Start the FastAPI server:**
   ```bash
   uvicorn main:app --reload
   ```

---

### 🧑‍💻 Frontend (React)

1. **Navigate to the frontend folder:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the React development server:**
   ```bash
   npm start
   ```

---

## 🖼 Example

Once both servers are running:

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## ✅ To Do

- [x] Add employee
- [x] View employee list
- [ ] Update employee
- [ ] Delete employee
- [ ] Add search/filter
- [ ] Docker support
- [ ] Authentication

---

## 📄 License

MIT License
