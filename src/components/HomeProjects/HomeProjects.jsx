import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useMainContext from "../../contexts/useMainContext";

const HomeProjects = () => {
  const { projects, setProjects, loading, setLoading } = useMainContext();
  // console.log("this is from project component -- ", projects);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectDeadline, setProjectDeadline] = useState("");
  const [projectStatus, setProjectStatus] = useState("");

  const handleCreateProject = async () => {
    try {
      const token = localStorage.getItem("token");

      //Project API call
      const response = await axios.post(
        "https://taskforge-backend.vercel.app/projects",
        {
          name: projectName,
          description: projectDescription,
          deadline: projectDeadline,
          status: projectStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response.data);

      // Reset form
      setProjectName("");
      setProjectDescription("");
      setProjectDeadline("");
      setProjectStatus("");

      // Success Notification
      toast.success("Project created successfully");
    } catch (error) {
      console.log(error.response?.data || error.message);
      // Error Notification
      toast.error("Error creating project");
    }
  };

  return (
    <div className="homeProject pt-3">
      {/* HEADER PART */}
      <div className="headerPart d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div className="leftPrt">
          <h2 className="fw-bold pt-3">Projects</h2>
        </div>
        <div className="rightPrt">
          <select name="filter" id="filterBtn" className="mx-2">
            <option value="">Filter</option>
            <option value="inprogress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <button
            className="teamBtn"
            data-bs-toggle="modal"
            data-bs-target="#createProjectModal"
          >
            + Create Project
          </button>
        </div>
      </div>

      {/* ✅ Bootstrap Modal */}
      <div
        className="modal fade"
        id="createProjectModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <h5 className="modal-title">Create New Project</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            {/* Modal Body */}
            <div className="modal-body">
              <form>
                {/* Project Name */}
                <div className="mb-3">
                  <label className="form-label">Project Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter project name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </div>

                {/* Project Description */}
                <div className="mb-3">
                  <label className="form-label">Project Description</label>
                  <textarea
                    className="form-control"
                    placeholder="Enter project description"
                    rows={6}
                    style={{ resize: "vertical" }}
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                  />
                </div>

                {/* Project Deadline */}
                <div className="mb-3">
                  <label className="form-label">Project Deadline</label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Enter project deadline"
                    value={projectDeadline}
                    onChange={(e) => setProjectDeadline(e.target.value)}
                  />
                </div>

                {/* Project Status */}
                <div className="mb-3">
                  <label className="form-label">Project Status</label>
                  <select
                    className="form-select"
                    value={projectStatus}
                    onChange={(e) => setProjectStatus(e.target.value)}
                  >
                    <option value="">Select Status</option>
                    <option value="inprogress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                {/* Teams */}
                {/* <div className="mb-3">
                  <label className="form-label">Add Teams</label>

                  <select
                    multiple
                    className="form-select"
                    value={members}
                    onChange={(e) =>
                      setMembers(
                        [...e.target.selectedOptions].map(
                          (option) => option.value,
                        ),
                      )
                    }
                  >
                    {allUsers.map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.name} ({user.email})
                      </option>
                    ))}
                  </select>
                </div> */}
              </form>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCreateProject}
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* PROJECT LIST */}
      <div className="projectList mt-4">
        <div className="row g-5">
          {loading ? (
            <p>Loading projects...</p>
          ) : projects.length > 0 ? (
            projects?.map((project) => (
              <div key={project._id} className="col-lg-4 col-md-6 col-sm-12">
                <div
                  className="team-card h-100 shadow-sm px-3 py-4 rounded"
                  style={{ background: "#F5F5F5" }}
                >
                  <div className="d-flex flex-column">
                    {/* HEADING */}
                    <div className="heading d-flex justify-content-between align-items-center">
                      <h5 className="text-dark fw-bold mb-2" style={{fontSize: "1.2rem"}}>
                        {project.name}
                      </h5>

                      <div className="status mb-2" style={{fontSize: "0.8rem"}}>
                        <span
                          className={`badge ${project.status === "completed" ? "bg-success" : "bg-warning"}`}
                        >
                          {project.status === "completed"
                            ? "Completed"
                            : "In Progress"}
                        </span>
                      </div>
                    </div>
                    <p className="mt-3 mb-0" style={{fontSize: "0.9rem"}}>{project.description}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No projects found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeProjects;
