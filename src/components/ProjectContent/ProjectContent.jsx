import React from "react";
import useMainContext from "../../contexts/useMainContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useFilterContext } from "../../contexts/filterContext";

const ProjectContent = () => {
  const {
    projects,
    setProjects,
    loading,
    setLoading,
    handleCreateProject,
    projectName,
    setProjectName,
    projectDescription,
    setProjectDescription,
    projectDeadline,
    setProjectDeadline,
    projectStatus,
    setProjectStatus,
  } = useMainContext();

  const [statusFilter, setStatusFilter] = useState("all");

  let filteredProjects = [...projects];

  // Filter by status
  if (statusFilter.status === "completed") {
    filteredProjects = filteredProjects.filter(
      (project) => project.status === "completed",
    );
  }

  if (statusFilter.status === "to do") {
    filteredProjects = filteredProjects.filter(
      (project) => project.status === "to do",
    );
  }

  if (statusFilter.status === "inprogress") {
    filteredProjects = filteredProjects.filter(
      (project) => project.status === "inprogress",
    );
  }

  if (statusFilter.status === "all") {
    filteredProjects = filteredProjects.filter(
      (project) =>
        project.status === "inprogress" || project.status === "completed" || project.status === "to do",
    );
  }

  return (
    <div className="container-fluid pt-3">
      <div className="projectTop d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div className="teamTop-heading">
          <h1>Projects</h1>
        </div>
        <div className="projectTop-buttons">
          <select
            name="filter"
            id="filterBtn"
            className="mx-2"
            onChange={(e) =>
              setStatusFilter((prev) => ({
                ...prev,
                status: e.target.value,
              }))
            }
          >
            <option value="all">All</option>
            <option value="to do">To Do</option>
            <option value="inprogress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <button
            className="teamBtn"
            id="createProjectBtn"
            data-bs-toggle="modal"
            data-bs-target="#createProjectModal"
          >
            + Create Project
          </button>
        </div>
      </div>

      <hr />

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
                    <option value="to do">To Do</option>
                    <option value="inprogress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
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
      <div className="projectList mt-5">
        <div className="row g-5">
          {loading ? (
            <p>Loading projects...</p>
          ) : filteredProjects.length > 0 ? (
            filteredProjects?.map((project) => (
              <Link
                key={project._id}
                className="col-lg-4 col-md-6 col-sm-12 text-decoration-none text-dark"
                to={`/projects/${project._id}`}
              >
                <div
                  className="team-card h-100 shadow-sm px-3 py-4 rounded"
                  style={{ background: "#F5F5F5" }}
                >
                  <div className="d-flex flex-column">
                    {/* HEADING */}
                    <div className="heading d-flex justify-content-between align-items-center">
                      <h5
                        className="text-dark fw-bold mb-2"
                        style={{ fontSize: "1.2rem" }}
                      >
                        {project.name}
                      </h5>
                    </div>
                    <p className="mt-3 mb-0" style={{ fontSize: "0.9rem" }}>
                      {project.description}
                    </p>

                    {/* CARD FOOTER */}
                    <div className="heading d-flex justify-content-between align-items-center flex-wrap gap-2 mt-3">
                      <div className="status" style={{ fontSize: "0.8rem" }}>
                        <h6 className="mb-0">
                          Status:
                          <span
                            className={`badge ${project.status === "completed" ? "bg-success" : project.status === "todo" ? "bg-primary" : "bg-warning"}`}
                            style={{ marginLeft: "5px" }}
                          >
                            {project.status === "completed"
                              ? "Completed"
                              : project.status === "todo"
                                ? "To Do"
                                : "In Progress"}
                          </span>
                        </h6>
                      </div>

                      <div className="deadline" style={{ fontSize: "0.9rem" }}>
                        <span className="mb-0 fw-bold">Deadline:</span>
                        <span
                          className="fw-regular"
                          style={{ marginLeft: "5px" }}
                        >
                          {new Date(project.deadline).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No projects found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectContent;
