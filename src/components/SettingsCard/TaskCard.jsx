import React from "react";
import useMainContext from "../../contexts/useMainContext";
import { FaTasks } from "react-icons/fa";

const TaskCard = () => {
  const { tasks, loading, deleteTask } = useMainContext();

  return (
    <div
      className="container-fluid p-4 rounded shadow-sm"
      style={{ backgroundColor: "#F5F5F5" }}
    >
      <div className="d-flex align-items-center gap-3">
        <span className="fs-3">
          <FaTasks />
        </span>
        <h2 className="mb-0">Tasks</h2>
      </div>

      {/* PROJECT LIST */}
      <div className="taskList my-4">
        <div className="row g-4">
          {loading ? (
            <p>Loading tasks...</p>
          ) : tasks.length > 0 ? (
            tasks?.map((task) => (
              <div key={task._id} className=" text-decoration-none text-dark">
                <div
                  className="team-card h-100 shadow-sm px-3 py-4 rounded"
                  style={{ background: "#e6ffed" }}
                >
                  <div className="d-flex flex-column gap-3" >
                    <div className="taskDetails" >
                      <div className="d-flex flex-column">
                        {/* HEADING */}
                        <div className="heading d-flex justify-content-between align-items-center">
                          <h5
                            className="text-dark fw-bold mb-2"
                            style={{ fontSize: "1.2rem" }}
                          >
                            {task.name}
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
                                className={`badge ${task.status === "completed" ? "bg-success" : "bg-warning"}`}
                                style={{ marginLeft: "5px" }}
                              >
                                {task.status === "completed"
                                  ? "Completed"
                                  : "In Progress"}
                              </span>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* DELETE BUTTON */}
                    <div className="deleteBtn d-flex align-items-center">
                      <button onClick={()=> deleteTask(task._id, task.name)} className="btn btn-danger">Delete Task</button>
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

export default TaskCard;
