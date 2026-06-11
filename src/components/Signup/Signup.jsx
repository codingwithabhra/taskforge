import React from "react";
import { Link } from "react-router-dom";
import "./Signup.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (password.length < 7) {
      toast.error("Password must be at least 7 characters");
      return;
    }

    if (password.length > 15) {
      toast.error("Password cannot exceed 15 characters");
      return;
    }
    try {
      const response = await axios.post(
        "https://taskforge-backend.vercel.app/auth/signup",
        { name, email, password },
      );
      console.log(response.data);
      localStorage.setItem("adminToken", response.data.token);
      setName("");
      setEmail("");
      setPassword("");

      // Success Notification
      toast.success(
        <>
          Sign up successful ✅
          <br />
          You can log in now.
        </>,
      );
      navigate("/");
    } catch (error) {
      console.log(error.response?.data || error.message);

      // Error Notification
      toast.error(error.response?.data?.error || "Error creating user");
    }
  };

  return (
    <div className="signupBg d-flex align-items-center justify-content-center">
      <div
        className="card mb-3 mx-4 overflow-hidden"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        {/* CONTENT */}
        <div className="col-12">
          <div className="card-body py-5">
            {/* HEADING LOGO */}
            <div className="mb-2" style={{ maxWidth: "110px", width: "100%" }}>
              <img src="/Logo.png" alt="Logo" className="img-fluid" />
            </div>
            <h3 className="fs-1 fw-bold mb-4">Sign Up</h3>
            {/* FORMS */}
            <div className="form">
              <input
                type="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="form-control mb-3 bg-transparent text-white"
              />{" "}
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="form-control mb-3 bg-transparent text-white"
              />{" "}
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="form-control mb-1 bg-transparent text-white"
              />
              <small className="text-secondary">
                Password must be 7-15 characters long.
              </small>
              {/* BUTTON */}
              <button className="btn btn-primary w-100 mt-3" onClick={handleSignup}>
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
