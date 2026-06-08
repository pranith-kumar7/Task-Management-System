import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    fetchTasks();
  }, [navigate]);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data.tasks);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const createTask = async (e) => {
    e.preventDefault();

    try {
      await api.post("/tasks", form);

      setForm({
        title: "",
        description: "",
      });

      fetchTasks();
    } catch (error) {
      alert("Task creation failed");
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      alert("Delete failed");
    }
  };

  const toggleTask = async (task) => {
    try {
      await api.put(`/tasks/${task._id}`, {
        completed: !task.completed,
      });

      fetchTasks();
    } catch (error) {
      alert("Update failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Task Dashboard</h1>

        <button
          className="btn btn-outline-danger"
          onClick={logout}
        >
          Logout
        </button>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h4 className="mb-3">Create New Task</h4>

          <form onSubmit={createTask}>
            <div className="mb-3">
              <input
                className="form-control"
                name="title"
                placeholder="Task Title"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <input
                className="form-control"
                name="description"
                placeholder="Task Description"
                value={form.description}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="btn btn-success"
            >
              Create Task
            </button>
          </form>
        </div>
      </div>

      <h2 className="mb-3">My Tasks</h2>

      {tasks.length === 0 ? (
        <div className="alert alert-info">
          No tasks found. Create your first task.
        </div>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id}
            className="card shadow-sm mb-3"
          >
            <div className="card-body">
              <h5 className="card-title">
                {task.title}
              </h5>

              <p className="card-text">
                {task.description}
              </p>

              <p>
                Status:{" "}
                {task.completed ? (
                  <span className="badge bg-success">
                    Completed
                  </span>
                ) : (
                  <span className="badge bg-warning text-dark">
                    Pending
                  </span>
                )}
              </p>

              <button
                className="btn btn-primary me-2"
                onClick={() =>
                  toggleTask(task)
                }
              >
                Toggle Status
              </button>

              <button
                className="btn btn-danger"
                onClick={() =>
                  deleteTask(task._id)
                }
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;