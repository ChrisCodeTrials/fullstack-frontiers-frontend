import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../Styles/Login.css";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", password: "", email: "" });

  const handleChange = (event) => {
    setUser({ ...user, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const csrfToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("XSRF-TOKEN="))
      .split("=")[1];
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "CSRF-Token": csrfToken,
      },
      credentials: "include",
      body: JSON.stringify(user),
    };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/auth/register`,
        options
      );
      if (!res.ok) throw new Error("Registration failed");

      navigate("/dashboard");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="container mt-5 py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg">
            <div className="card-body p-5">
              <h2
                className="card-title text-center mb-4"
                style={{ color: "var(--space-cadet)" }}
              >
                Create an Account
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label
                    htmlFor="username"
                    className="form-label"
                    style={{ color: "var(--space-cadet)" }}
                  >
                    Username
                  </label>
                  <input
                    id="username"
                    value={user.username}
                    type="text"
                    className="form-control custom-form-input"
                    placeholder="Choose a username"
                    autoComplete="username"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="email"
                    className="form-label"
                    style={{ color: "var(--space-cadet)" }}
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    value={user.email}
                    type="email"
                    className="form-control custom-form-input"
                    placeholder="Enter your email"
                    autoComplete="email"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="password"
                    className="form-label"
                    style={{ color: "var(--space-cadet)" }}
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    value={user.password}
                    type="password"
                    className="form-control custom-form-input"
                    placeholder="Create a password"
                    autoComplete="current-password"
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn custom-form-button text-white w-100"
                >
                  Register
                </button>
              </form>
              <p className="mt-3 text-center">
                Already have an account?{" "}
                <Link to="/login" className="custom-link">
                  Login Here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
