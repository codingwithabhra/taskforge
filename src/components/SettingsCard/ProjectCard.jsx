import React from "react";
import useMainContext from "../../contexts/useMainContext";
import { FaFileCode } from "react-icons/fa";

const ProjectCard = () => {
  const { projects, loading, deleteProject } = useMainContext();
  return (
    <div
      className="container-fluid p-4 rounded shadow-sm"
      style={{ backgroundColor: "#F5F5F5" }}
    >
      <div className="d-flex align-items-center gap-3">
        <span className="fs-3">
          <FaFileCode />
        </span>
        <h2 className="mb-0">Projects</h2>
      </div>

      {/* PROJECT LIST */}
      <div className="projectList my-4">
        <div className="row g-4">
          {loading ? (
            <p>Loading projects...</p>
          ) : projects.length > 0 ? (
            projects?.map((project) => (
              <div
                key={project._id}
                className=" text-decoration-none text-dark"
              >
                <div
                  className="team-card h-100 shadow-sm px-3 py-4 rounded"
                  style={{ background: "#fff6e3" }}
                >
                  <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                    <div className="projectDetails">
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

                        {/* CARD FOOTER */}
                        <div className="heading d-flex justify-content-between align-items-center mt-1">
                          <div
                            className="status"
                            style={{ fontSize: "0.8rem" }}
                          >
                            <h6 className="mb-0">
                              Status:
                              <span
                                className={`badge ${project.status === "completed" ? "bg-success" : "bg-warning"}`}
                                style={{ marginLeft: "5px" }}
                              >
                                {project.status === "completed"
                                  ? "Completed"
                                  : "In Progress"}
                              </span>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* DELETE BUTTON */}
                    <div className="deleteBtn d-flex align-items-center justify-content-center">
                      <button onClick={()=> deleteProject(project._id)} className="btn btn-danger">Delete Project</button>
                    </div>
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

export default ProjectCard;
