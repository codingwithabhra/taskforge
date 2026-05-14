import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useMainContext from "../../contexts/useMainContext";

const Login = () => {
  const navigate = useNavigate();

  const { setCurrentUser } = useMainContext();

  const [formData, setFormdata] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        formData,
      );

      console.log(response.data);

      // storing token
      localStorage.setItem("token", response.data.token);

      // storing user info
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Update context
      setCurrentUser(response.data.user);

      // redirecting to home page
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.error || "Login Failed");
    }
  };

  return (
    <div
      className="logIn card mb-3 overflow-hidden"
      style={{ maxWidth: "700px", width: "100%" }}
    >
      {/* RIGHT CONTENT */}
      <div className="col-12 p-4">
        <div className="card-body">
          {/* HEADING LOGO */}
          <div className="mb-4" style={{ maxWidth: "130px", width: "100%" }}>
            <img src="/Logo.png" alt="Logo" className="img-fluid" />
          </div>
          <h3 className="fs-4 mb-3">Log In to your account</h3>
          <p className="card-text fs-6">
            <small className="text-white">Please enter your details</small>
          </p>
          {/* FORMS */}
          <div className="form">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-control mb-3 bg-transparent text-white"
              value={formData.email}
              onChange={handleChange}
            />{" "}
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-control mb-4 bg-transparent text-white"
              value={formData.password}
              onChange={handleChange}
            />
            {/* BUTTON */}
            <button className="btn btn-primary w-100" onClick={handleSubmit}>
              Sign in
            </button>
          </div>

          {/* NOT A USER ? SIGN UP */}
          <p className="card-text fs-6 mt-3">
            <small className="text-white">
              Don't have an account?{" "}
              <Link to="/signup" className="text-decoration-underline">
                Sign up
              </Link>
            </small>
          </p>
        </div>
      </div>
    </div>
  );
  {
    /* <div classNameName="row g-0 align-items-center">*/
  }
  {
    /* Optional image section */
  }
  {
    /* <div classNameName="col-md-4 d-none d-md-block">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            classNameName="img-fluid rounded-start"
            alt="login"
          />
        </div> */
  }

  {
    /* Form/content */
  }
  {
    /* <div classNameName="col-md-8">
          <div classNameName="card-body text-white">
            <div>
              <img src="/logo.png" alt="Logo" classNameName="img-fluid"/>
            </div>

            <h3 classNameName="mb-3">Log In to your account</h3>

            <input
              type="email"
              placeholder="Email"
              classNameName="form-control mb-3 bg-transparent text-white"
            />

            <input
              type="password"
              placeholder="Password"
              classNameName="form-control mb-3 bg-transparent text-white"
            />

            <button classNameName="btn btn-primary w-100">Login</button>
          </div>
        </div>
      </div> */
  }
  // </div>
};

export default Login;
