import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { GoProjectSymlink } from "react-icons/go";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { BsGraphDownArrow } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar p-4">
        {/* FOR LOGO */}
        <div className="logo mt-3 mb-5">
          <Link to="/dashboard" className="logo-link">
            <img src="/Logo.png" alt="logo" />
          </Link>
        </div>

        {/* FOR NAVIGATION LINKS */}
        <nav>
          <ul className="list-unstyled">
            {/* DASHBOARD */}
            <li className="mb-4">
              <Link className="sidebar-link fs-5" to="/dashboard">
                {/* <img src="/dashboard.png" alt="dashboard" className="sidebar-icon" /> */}
                <RxDashboard />
                <span>Dashboard</span>
              </Link>
            </li>
            {/* PROJECT */}
            <li className="mb-4">
              <Link className="sidebar-link fs-5" to="/projects">
                {/* <img src="/project.png" alt="project" className="sidebar-icon" /> */}
                <GoProjectSymlink />
                <span>Projects</span>
              </Link>
            </li>
            {/* TEAM */}
            <li className="mb-4">
              <Link className="sidebar-link fs-5" to="/team">
                {/* <img src="/teams.png" alt="team" className="sidebar-icon" /> */}
                <HiOutlineUserGroup />
                <span>Teams</span>
              </Link>
            </li>
            {/* REPORTS */}
            <li className="mb-4">
              <Link className="sidebar-link fs-5" to="/reports">
                {/* <img src="/pie-chart.png" alt="reports" className="sidebar-icon" /> */}
                <BsGraphDownArrow />
                <span>Reports</span>
              </Link>
            </li>
            {/* SETTINGS */}
            <li className="mb-4">
              <Link className="sidebar-link fs-5" to="/settings">
                {/* <img src="/setting (1).png" alt="settings" className="sidebar-icon" /> */}
                <CiSettings />
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
