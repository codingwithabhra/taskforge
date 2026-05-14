import React, { useState } from "react";
import useMainContext from "../../contexts/useMainContext";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeftCircle } from "react-icons/fi";
import { toast } from "react-toastify";
import axios from "axios";
import "./Projectdetails.css";
import { useFilterContext } from "../../contexts/filterContext";
import { useLocation } from "react-router-dom";

const ProjectDetails = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const {
    projects,
    findProjectById,
    teamData,
    allUsers,
    tasks,
    setTasks,
    taskName,
    setTaskName,
    taskDeadline,
    setTaskDeadline,
    taskStatus,
    setTaskStatus,
    taskPriority,
    setTaskPriority,
    taskTags,
    setTaskTags,
    loading,
    getInitials,
    getColor,
    selectedOwners,
    setSelectedOwners,
    fetchTasksData,
  } = useMainContext();

  const { filter, setFilter } = useFilterContext();

  const [selectedProjectTeam, setSelectedProjectTeam] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);

  const project = findProjectById(projectId);

  if (!project) return <p>Loading ...</p>;

  // console.log("This is from project details task--", tasks);

  const location = useLocation();
  // Get previous route
  const backPath = location.state?.from || "/projects";

  const matchingTask = tasks.filter((t) => t.project === projectId);
  console.log("Matching task for this project ---", matchingTask);

  let filteredTasks = [...matchingTask];

  // Filter by priority
  if (filter.priority) {
    filteredTasks = filteredTasks.filter(
      (task) => task.priority === filter.priority,
    );
  }

  // Filter by status
  if (filter.status === "completed") {
    filteredTasks = filteredTasks.filter((task) => task.status === "Completed");
  }

  if (filter.status === "pending") {
    filteredTasks = filteredTasks.filter(
      (task) =>
        task.status === "To Do" ||
        task.status === "In Progress" ||
        task.status === "Blocked",
    );
  }

  if (filter.status === "all") {
    filteredTasks = filteredTasks.filter(
      (task) =>
        task.status === "To Do" ||
        task.status === "In Progress" ||
        task.status === "Blocked" ||
        task.status === "Completed",
    );
  }

  // Sort by due date
  if (filter.sortByDate === "asc") {
    filteredTasks = [...filteredTasks].sort(
      (a, b) => new Date(a.timeToComplete) - new Date(b.timeToComplete),
    );
  }

  // Getting selected team of user's choice & then filtering members of that team
  const handleTeamChange = (e) => {
    const teamId = e.target.value;
    setSelectedProjectTeam(teamId);

    const selectedTeamObj = teamData.find((team) => team._id === teamId);

    if (selectedTeamObj) {
      setTeamMembers(selectedTeamObj.members); // ✅ DIRECTLY use members
    } else {
      setTeamMembers([]);
    }
  };

  //Sending data to DB for new task
  const handleCreateTask = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/tasks",
        {
          name: taskName,
          project: projectId,
          team: selectedProjectTeam,
          timeToComplete: taskDeadline,
          status: taskStatus,
          priority: taskPriority,
          tags: taskTags.split(",").map((tag) => tag.trim()),
          owners: selectedOwners,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setTaskName("");
      setTaskDeadline("");
      setTaskPriority("");
      setTaskStatus("");
      setTaskTags("");
      setSelectedOwners([]);
      setSelectedProjectTeam("");

      // Refreshing tasks from backend
      await fetchTasksData();

      toast.success("Task created successfully");
    } catch (error) {
      console.log("Error creating task", error);
      toast.error("Error creating task");
    }
  };

  // Converting date to readable format
  const dateString = matchingTask?.map((task) => task.timeToComplete);
  const date = new Date(dateString);
  const formattedDate = `${String(date.getDate()).padStart(2, "0")}/${String(
    date.getMonth() + 1,
  ).padStart(2, "0")}/${String(date.getFullYear())}`;

  return (
    <div className="container-fluid pt-4">
      <Link
        to={backPath}
        className="text-decoration-none fs-5 d-flex align-items-center fw-semibold"
        state={{ from: `/projects/${project._id}` }}
        style={{ color: "#086ae8" }}
      >
        <FiArrowLeftCircle />
        <span className="mx-2">Back to Projects</span>
      </Link>

      {/* PROJECT DETAILS */}
      <div className="container-fluid pt-5 mb-3">
        <h1 className="fw-bold">{project.name}</h1>
        <p className="mt-3 text-secondary">{project.description}</p>

        {/* SORT BY and FILTER and CREATE TASK */}
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mt-5">
          {/* SORT BY BUTTONS */}
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div className="projectdetails-sortby">
              <p className="mb-0">Sort By :</p>
            </div>
            <div className="projectdetails-btns d-flex gap-2 flex-wrap">
              <button
                className="btn btn-outline-secondary"
                onClick={() =>
                  setFilter((prev) => ({ ...prev, priority: "high" }))
                }
              >
                High
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={() =>
                  setFilter((prev) => ({ ...prev, priority: "medium" }))
                }
              >
                Medium
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={() =>
                  setFilter((prev) => ({ ...prev, priority: "low" }))
                }
              >
                Low
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={() =>
                  setFilter((prev) => ({
                    ...prev,
                    priority: "",
                    sortByDate: "asc",
                  }))
                }
              >
                Due Date
              </button>
              {/* CLEAR FILTER BUTTON */}
              <button
                className="btn btn-outline-danger"
                onClick={() =>
                  setFilter({
                    priority: "",
                    status: "all",
                    sortByDate: "",
                  })
                }
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* FILTER & CREATE TASK BUTTONS */}
          <div className="d-flex justify-content-between align-items-center gap-3">
            <select
              name="filterBtn"
              id="filterBtn"
              onChange={(e) =>
                setFilter((prev) => ({
                  ...prev,
                  status: e.target.value,
                }))
              }
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>

            <button
              className="teamBtn"
              data-bs-toggle="modal"
              data-bs-target="#createTaskModal"
            >
              + Create Task
            </button>
          </div>
        </div>
      </div>

      {/* Bootstrap Modal */}
      <div
        className="modal fade"
        id="createTaskModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <h5 className="modal-title">Create New Task</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            {/* Modal Body */}
            <div className="modal-body">
              <form>
                {/* Task Name */}
                <div className="mb-3">
                  <label className="form-label">Task Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter task name"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                  />
                </div>

                {/* Select Team */}
                <div className="mb-3">
                  <label className="form-label">Select Team</label>
                  <select className="form-select" onChange={handleTeamChange}>
                    <option value="">Choose a Team</option>
                    {teamData?.map((team) => (
                      <option key={team._id} value={team._id}>
                        {team.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Owners */}
                <div className="mb-3">
                  <label className="form-label">Select Owner(s)</label>
                  <select
                    multiple
                    className="form-select"
                    disabled={!selectedProjectTeam}
                    onChange={(e) => {
                      const selectedValues = Array.from(
                        e.target.selectedOptions,
                        (option) => option.value,
                      );

                      setSelectedOwners(selectedValues);
                    }}
                  >
                    {teamMembers.length > 0 ? (
                      teamMembers.map((user) => (
                        <option key={user._id} value={user._id}>
                          {user.name}
                        </option>
                      ))
                    ) : (
                      <option disabled>No members available</option>
                    )}
                  </select>
                </div>

                {/* TAGS */}
                <div className="mb-3 me-2">
                  <label className="form-label">Tags</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter tags (comma-separated)"
                    value={taskTags}
                    onChange={(e) => setTaskTags(e.target.value)}
                  />
                </div>

                {/* DATE & PRIORITY Side by side */}
                <div className="d-flex flex-wrap align-items-center">
                  <div className="mb-3 me-2">
                    <label className="form-label">Task Due Date</label>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Enter task deadline"
                      value={taskDeadline}
                      onChange={(e) => setTaskDeadline(e.target.value)}
                    />
                  </div>

                  {/* Task Status */}
                  <div className="mb-3 me-2">
                    <label className="form-label">Task Status</label>
                    <select
                      className="form-select"
                      value={taskStatus}
                      onChange={(e) => setTaskStatus(e.target.value)}
                    >
                      <option value="">Select Status</option>
                      <option value="To Do">To Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Blocked">Blocked</option>
                    </select>
                  </div>

                  {/* Task Priority */}
                  <div className="mb-3">
                    <label className="form-label">Priority</label>
                    <select
                      className="form-select"
                      value={taskPriority}
                      onChange={(e) => setTaskPriority(e.target.value)}
                    >
                      <option value="">Select Priority</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
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
                onClick={handleCreateTask}
              >
                Create Task
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* TASK DETAILS TABLE */}
      <div className="container-fluid mt-5">
        {loading ? (
          <p>Loading tasks ...</p>
        ) : filteredTasks.length > 0 ? (
          <table className="table table-bordered">
            <thead>
              <tr className="table-primary">
                <th>Task Name</th>
                <th>Owners</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks?.map((task) => (
                <tr
                  key={task._id}
                  onClick={() =>
                    navigate(`/tasks/${task._id}`, {
                      state: {
                        from: `/projects/${project._id}`,
                      },
                    })
                  }
                  style={{ cursor: "pointer" }}
                >
                  <td className="fw-bold">{task.name}</td>
                  <td>
                    <div className="d-flex justify-content-between gap-3">
                      <div className="d-flex align-items-center">
                        {task.owners?.slice(0, 3).map((owner, index) => (
                          <div
                            key={owner._id}
                            className="avatar-circle"
                            style={{
                              background: getColor(index),
                              marginLeft: index === 0 ? "0px" : "-10px",
                            }}
                            title={owner.name} // hover name
                          >
                            {getInitials(owner.name)}
                          </div>
                        ))}

                        {task.owners?.length > 3 && (
                          <div className="avatar-circle extra">
                            +{task.owners.length - 3}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="fw-bold">
                    {new Date(task.timeToComplete).toLocaleDateString("en-GB")}
                  </td>
                  <td>{task.status}</td>
                  <td>
                    <span className={`priority-badge ${task.priority}`}>
                      {task.priority.charAt(0).toUpperCase() +
                        task.priority.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No tasks found.</p>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
