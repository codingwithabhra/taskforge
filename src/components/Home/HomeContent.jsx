import React from "react";
import "./Homecontent.css";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import HomeProjects from "../HomeProjects/HomeProjects";
import HomeMyTask from "../HomeMyTask/HomeMyTask";
import { SlMagnifier } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useMainContext from "../../contexts/useMainContext";

const HomeContent = () => {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const { tasks } = useMainContext();

  // Search handler
  const handleSearch = (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    // Find matching task
    const matchedTask = tasks.find((task) =>
      task.name.toLowerCase().includes(query.toLowerCase()),
    );

    if (matchedTask) {
      navigate(`/tasks/${matchedTask._id}`, {
        state: {
          from: "/dashboard",
        },
      });

      setQuery("");
    } else {
      toast.error("Task not found");
    }
  };

  return (
    <div className="container-fluid pt-2">
      {/* SEARCH BOX */}
      <div className="d-flex align-items-center gap-2 w-100">
        <form className="position-relative flex-grow-1" onSubmit={handleSearch}>
          <input
            type="text"
            className="form-control rounded-pill py-2 pe-5 shadow-sm"
            placeholder="Search tasks..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button
            type="submit"
            className="border-0 bg-transparent position-absolute top-50 end-0 translate-middle-y me-3"
          >
            <SlMagnifier size={18} color="#6c757d" />
          </button>
        </form>
      </div>

      {/* PROJECT SECTION */}
      <div className="homeProjectSection mt-2">
        <HomeProjects />
      </div>

      {/* MY TASK SECTION */}
      <div className="homeMyTaskSection mt-2">
        <HomeMyTask />
      </div>
    </div>
  );
};

export default HomeContent;
