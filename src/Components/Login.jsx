import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../Styles/Login.css";

const Login = ({logUser, setLogUser}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", password: "" });

  const handleChange = (event) => {
    setUser({ ...user, [event.target.id]: event.target.value });
  };

  const postFetch = async (user) => {
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
        `${import.meta.env.VITE_BASE_URL}/api/auth/login`,
        options
      );
      if (!res.ok) {
        alert("Login failed");
        setUser({ username: "", password: "" });
        throw new Error("Registration failed");
      }
      setLogUser(true)
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.username || !user.password) {
      alert("You must enter a username and password");
      return;
    }
    postFetch(user);
  };

  const handleDemoSignIn = async (e) => {
    e.preventDefault();
    const demoUser = { username: "demo", password: "password" };
    postFetch(demoUser);
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
                Login to Your Account
              </h2>
              <button
                className="btn custom-form-button text-white w-100 mb-3"
                onClick={handleDemoSignIn}
              >
                Demo User
              </button>
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
                    placeholder="Enter your username"
                    autoComplete="username"
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
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn custom-form-button text-white w-100"
                >
                  Login
                </button>
              </form>
              <p className="mt-3 text-center">
                No Account?{" "}
                <Link to="/register" className="custom-link">
                  Register Here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
