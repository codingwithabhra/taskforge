import React from "react";
import useMainContext from "../../contexts/useMainContext";
import { useFilterContext } from "../../contexts/filterContext";
import { Link } from "react-router-dom";
import { useState } from "react";

const HomeMyTask = () => {
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
    currentUser,
  } = useMainContext();

  const myTasks = tasks.filter((task) =>
    task.owners.some((owner) => owner._id === currentUser?._id),
  );

  const { filter, setFilter } = useFilterContext();

  const [selectedProject, setSelectedProject] = useState("");
  const [selectedProjectTeam, setSelectedProjectTeam] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);

  // Converting date to readable format
  const dateString = myTasks?.map((task) => task.timeToComplete);
  const date = new Date(dateString);
  const formattedDate = `${String(date.getDate()).padStart(2, "0")}/${String(
    date.getMonth() + 1,
  ).padStart(2, "0")}/${String(date.getFullYear())}`;

  let filteredTasks = [...myTasks];

  // Filter by status
  if (filter.status === "Completed") {
    filteredTasks = filteredTasks.filter((task) => task.status === "Completed");
  }

  if (filter.status === "In Progress") {
    filteredTasks = filteredTasks.filter(
      (task) =>
        task.status === "To Do" ||
        task.status === "In Progress" ||
        task.status === "Blocked",
    );
  }

  if (filter.status === "All") {
    filteredTasks = filteredTasks.filter(
      (task) =>
        task.status === "To Do" ||
        task.status === "In Progress" ||
        task.status === "Blocked" ||
        task.status === "Completed",
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
          project: selectedProject,
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

      setSelectedProject("");
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

  return (
    <div className="homeProject pt-3">
      {/* HEADER PART */}
      <div className="headerPart d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div className="leftPrt">
          <h2 className="fw-bold pt-3">My Tasks</h2>
        </div>
        <div className="rightPrt">
          <select
            name="filter"
            id="filterBtn"
            className="mx-2"
            onChange={(e) =>
              setFilter((prev) => ({
                ...prev,
                status: e.target.value,
              }))
            }
          >
            <option value="All">All</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
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
                {/* Select Project */}
                <div className="mb-3">
                  <label className="form-label">Select Project</label>

                  <select
                    className="form-select"
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                  >
                    <option value="">Choose a Project</option>

                    {projects?.map((project) => (
                      <option key={project._id} value={project._id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </div>
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

      {/* TASKS LIST */}
      <div className="taskList mt-4">
        <div className="row g-5">
          {loading ? (
            <p>Loading tasks...</p>
          ) : filteredTasks.length === 0 ? (
            <p>No tasks found.</p>
          ) : (
            filteredTasks.map((task) => {
              const project = findProjectById(task.project);

              return (
                <Link
                  to={`/tasks/${task._id}`}
                  key={task._id}
                  className="col-lg-4 col-md-6 col-sm-12 text-decoration-none text-dark"
                >
                  <div
                    className="team-card h-100 shadow-sm px-3 py-4 rounded"
                    style={{ background: "#F5F5F5" }}
                  >
                    {/* <div className="card-body"> */}
                    <div className="d-flex flex-column">
                      {/* HEADING */}
                      <div className="heading d-flex justify-content-between align-items-center">
                        <h6
                          className="text-dark fw-bold mb-2"
                          style={{ fontSize: "1.2rem" }}
                        >
                          {task.name}
                        </h6>

                        <div
                          className="status mb-2 mx-2"
                          style={{ fontSize: "0.8rem" }}
                        >
                          <span
                            className={`badge ${task.status === "Completed" ? "bg-success" : "bg-warning"}`}
                          >
                            {task.status === "Completed"
                              ? "Completed"
                              : "In Progress"}
                          </span>
                        </div>
                      </div>

                      <p
                        className="mt-3 mb-0 fw-semibold"
                        style={{ fontSize: "1rem" }}
                      >
                        <span className="badge bg-primary">Project :</span>{" "}
                        <span className="mx-2">{project.name}</span>
                      </p>

                      <p
                        className="mt-1 mb-0 fw-semibold"
                        style={{ fontSize: "1rem" }}
                      >
                        <span className="badge bg-primary">Due On :</span>{" "}
                        <span className="mx-2">{formattedDate}</span>
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeMyTask;
