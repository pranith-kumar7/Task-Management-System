import { useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setSuccess("");

      const res = await api.post(
        "/auth/register",
        form
      );

      setSuccess(res.data.message);

      setForm({
        name: "",
        email: "",
        password: "",
      });

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">
                Register
              </h2>

              {success && (
                <div className="alert alert-success">
                  {success}
                </div>
              )}

              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    className="form-control"
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    className="form-control"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    className="form-control"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100"
                >
                  Register
                </button>
              </form>

              <div className="text-center mt-3">
                <Link to="/">
                  Already have an account? Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;