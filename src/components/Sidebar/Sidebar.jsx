import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar p-4 shadow-sm">
        {/* FOR LOGO */}
        <div className="logo mt-3 mb-5">
          <Link to="/home" className="logo-link">
            <img src="/Logo.png" alt="logo" />
          </Link>
        </div>

        {/* FOR NAVIGATION LINKS */}
        <nav>
          <ul className="list-unstyled">
            {/* DASHBOARD */}
            <li className="mb-4">
              <Link className="sidebar-link fs-5" to="/dashboard">
                <img src="/dashboard.png" alt="dashboard" className="sidebar-icon" />
                <span>Dashboard</span>
              </Link>
            </li>
            {/* PROJECT */}
            <li className="mb-4">
              <Link className="sidebar-link fs-5" to="/home">
                <img src="/project.png" alt="project" className="sidebar-icon" />
                <span>Project</span>
              </Link>
            </li>
            {/* TEAM */}
            <li className="mb-4">
              <Link className="sidebar-link fs-5" to="/team">
                <img src="/teams.png" alt="team" className="sidebar-icon" />
                <span>Team</span>
              </Link>
            </li>
            {/* REPORTS */}
            <li className="mb-4">
              <Link className="sidebar-link fs-5" to="/home">
                <img src="/pie-chart.png" alt="reports" className="sidebar-icon" />
                <span>Reports</span>
              </Link>
            </li>
            {/* SETTINGS */}
            <li className="mb-4">
              <Link className="sidebar-link fs-5" to="/home">
                <img src="/setting (1).png" alt="settings" className="sidebar-icon" />
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
