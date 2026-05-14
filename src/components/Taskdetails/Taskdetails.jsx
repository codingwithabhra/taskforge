import React from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import useMainContext from "../../contexts/useMainContext";
import { FiArrowLeftCircle } from "react-icons/fi";
import { BsFolder2 } from "react-icons/bs";
import { RxPeople } from "react-icons/rx";
import { CiShoppingTag } from "react-icons/ci";
import { CiCalendarDate } from "react-icons/ci";
import { BsHourglassSplit } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-toastify";

const Taskdetails = () => {
  const { taskId } = useParams();

  const location = useLocation();
  // Get previous route
  const backPath = location.state?.from || "/projects";

  const { findTaskById, loading, projects, teamData, updateTaskStatus } =
    useMainContext();

  const task = findTaskById(taskId);
  console.log("From task details page --", task);

  const projectName = projects?.find(
    (project) => project._id === task?.project,
  )?.name;

  const teamName = teamData?.find((team) => team._id === task?.team)?.name;

  const teamMembers = task?.owners.map((owner) => owner.name).join(", ");

  // Converting date to readable format
  const dateString = task?.timeToComplete;
  const date = new Date(dateString);
  const formattedDate = `${String(date.getDate()).padStart(2, "0")}/${String(
    date.getMonth() + 1,
  ).padStart(2, "0")}/${String(date.getFullYear())}`;

  // calculating time left
  const timeLeft = () => {
    const today = new Date();
    const dueDate = new Date(task.timeToComplete);

    const diff = dueDate - today;

    const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));

    return `${daysLeft} Days`;
  };

  // Status update handler
  const handleMarkComplete = async () => {
    await updateTaskStatus(task._id, "Completed");
  };

  return (
    <div className="container-fluid pt-4">
      <Link
        to={backPath}
        className="text-decoration-none fs-5 d-flex align-items-center fw-semibold"
        style={{ color: "#086ae8" }}
      >
        <FiArrowLeftCircle />
        <span className="mx-2">Back to {projectName}</span>
      </Link>

      {/* TASK DETAILS */}
      <div className="pt-5">
        <div className="taskDetails-border border rounded">
          {/* TASK DETAILS TABLE */}
          <div className="">
            {loading ? (
              <p>Loading task details ...</p>
            ) : (
              task && (
                <>
                  {/* HEADER */}
                  <div className="header p-4 d-flex justify-content-between align-items-center flex-wrap">
                    <h1 className="fw-bold">{task?.name}</h1>

                    <p
                      className={`mt-2 badge fs-6 px-3 py-2 ${
                        task.status === "Completed"
                          ? "bg-success"
                          : task.status === "To Do"
                            ? "bg-warning"
                            : task.status === "In Progress"
                              ? "bg-warning"
                              : task.status === "Blocked"
                                ? "bg-dark"
                                : "bg-secondary"
                      }`}
                    >
                      {task.status}
                    </p>
                  </div>
                  <hr className="mt-0" />
                  {/* BODY */}
                  <div className="body p-4 row">
                    <div className="left col-md-6">
                      {/* PROJECT */}
                      <div className="project">
                        <div className="d-flex align-items-center gap-2">
                          <BsFolder2 />
                          <h6 className="mb-0 fw-bold">Project -</h6>
                        </div>
                        <p className="mt-2 mx-4">{projectName}</p>
                      </div>
                      {/* TEAM */}
                      <div className="team mt-5">
                        <div className="d-flex align-items-center gap-2">
                          <RxPeople />
                          <h6 className="mb-0 fw-bold">Team -</h6>
                        </div>
                        <p className="mt-2 mx-4">{teamName}</p>
                      </div>
                      {/* OWNERS */}
                      <div className="OWNERS mt-5">
                        <div className="d-flex align-items-center gap-2">
                          <RxPeople />
                          <h6 className="mb-0 fw-bold">Owners -</h6>
                        </div>
                        <p className="mt-2 mx-4">
                          {task?.owners.map((owner) => (
                            <span className="badge bg-warning text-dark mx-1 px-3 py-2">
                              {owner.name}
                            </span>
                          ))}
                        </p>
                      </div>
                    </div>
                    <div className="right col-md-6">
                      {/* TAGS */}
                      <div className="tags">
                        <div className="d-flex align-items-center gap-2">
                          <CiShoppingTag />
                          <h6 className="mb-0 fw-bold">Tags -</h6>
                        </div>

                        <div className="mt-2 mx-4 d-flex flex-wrap gap-2">
                          {task?.tags?.map((tag, index) => (
                            <span
                              key={index}
                              className="badge bg-success text-white px-3 py-2"
                            >
                              {tag.charAt(0).toUpperCase() +
                                tag.slice(1).toLowerCase()}
                            </span>
                          ))}
                        </div>
                      </div>
                      {/* Date */}
                      <div className="date mt-5">
                        <div className="d-flex align-items-center gap-2">
                          <CiCalendarDate />
                          <h6 className="mb-0 fw-bold">Date -</h6>
                        </div>
                        <p className="mt-2 mx-4">
                          {formattedDate || "Not specified"}
                        </p>
                      </div>
                      {/* PRIORITY */}
                      <div className="priority mt-5">
                        <div className="d-flex align-items-center gap-2">
                          <CiCalendarDate />
                          <h6 className="mb-0 fw-bold">Priority -</h6>
                        </div>
                        <p className="mt-2 mx-4">
                          <span className={`priority-badge ${task.priority}`}>
                            {task.priority.charAt(0).toUpperCase() +
                              task.priority.slice(1)}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <hr className="m-0" />
                  {/* FOOTER */}
                  <div className="footer p-4 d-flex justify-content-between align-items-center flex-wrap gap-3">
                    {/* TIME LEFT */}
                    <div className="dueDate">
                      <div className="d-flex align-items-center gap-2">
                        <BsHourglassSplit />
                        <h6 className="mb-0 fw-bold">Time Left -</h6>
                        <p className="mb-0">{timeLeft()}</p>
                      </div>
                    </div>
                    {/*BUTTON */}
                    <div className="button">
                      <button
                        onClick={handleMarkComplete}
                        className="bg-none px-3 py-2 rounded"
                        style={{
                          backgroundColor: "#086ae8",
                          color: "white",
                          border: "none",
                        }}
                      >
                        Mark as complete
                      </button>
                    </div>
                  </div>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Taskdetails;
