import React from "react";
import useMainContext from "../../contexts/useMainContext";
import { GrLogout } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProjectCard from "../SettingsCard/ProjectCard";
import TaskCard from "../SettingsCard/TaskCard";

const SettingPage = () => {
  const navigate = useNavigate();

  const { allUsers, currentUser, setCurrentUser, teamData } = useMainContext();

  const logedInUser = allUsers?.find((user) => user._id === currentUser?._id);

  const teamName = teamData?.find((team) =>
    team.members?.some(
      (member) => member._id?.toString() === logedInUser?._id?.toString(),
    ),
  );

  console.log("The logged in user details--", logedInUser);
  console.log("The logged in user team--", teamName);

  //Creating Log Out
  const handleLogout = () => {
    try {
      // Remove auth data
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Clear context user
      setCurrentUser(null);

      // Success message
      toast.success("Logged out successfully");

      // Redirect to login page
      navigate("/");
    } catch (error) {
      console.log("Following error occured while logging out - ", error);
      toast.error("Error Logging Out");
    }
  };

  return (
    <div className="container-fluid mt-4">
      <div
        className="loggedinUser p-4 rounded shadow-sm"
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <div className="row g-4 my-2 align-items-center">
          {/* LEFT SECTION */}
          <div className="col-12 col-lg-8">
            <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start gap-4 text-center text-md-start">
              {/* USER IMAGE */}
              <div className="loggedinUser-img">
                <img
                  src="https://placehold.co/150"
                  alt="user"
                  className="rounded-circle"
                  style={{
                    width: "140px",
                    height: "140px",
                    minWidth: "140px",
                    minHeight: "140px",
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* USER DETAILS */}
              <div className="loggedinUser-details mt-2 w-100">
                {/* NAME */}
                <div className="row align-items-center mb-3">
                  <div className="col-4 col-sm-3">
                    <h6 className="mb-0 fw-semibold text-secondary">Name :</h6>
                  </div>

                  <div className="col-8 col-sm-9">
                    <p className="mb-0 fs-5 fw-bold text-dark">
                      {logedInUser?.name}
                    </p>
                  </div>
                </div>

                {/* EMAIL */}
                <div className="row align-items-center mb-3">
                  <div className="col-4 col-sm-3">
                    <h6 className="mb-0 fw-semibold text-secondary">Email :</h6>
                  </div>

                  <div className="col-8 col-sm-9">
                    <p className="mb-0 text-muted text-break">
                      {logedInUser?.email}
                    </p>
                  </div>
                </div>

                {/* TEAM */}
                <div className="row align-items-center">
                  <div className="col-4 col-sm-3">
                    <h6 className="mb-0 fw-semibold text-secondary">Team :</h6>
                  </div>

                  <div className="col-8 col-sm-9">
                    <span className="badge bg-primary px-3 py-2 fs-6">
                      {teamName?.name || "No Team Assigned"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="col-12 col-lg-4 d-flex justify-content-center">
            <button
              className="btn btn-danger d-flex align-items-center px-4 py-2 mt-3"
              onClick={handleLogout}
            >
              <span className="me-2">Log Out</span>
              <GrLogout />
            </button>
          </div>
        </div>
      </div>

      <div className="cards mt-5">
        <div className="row g-5">
          <div className="projectCard col-12 col-lg-6">
            <ProjectCard />
          </div>
          <div className="taskCard col-12 col-lg-6">
            <TaskCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
