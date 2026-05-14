import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Sidebar2 from "../components/Sidebar/Sidebar2";
import ProjectContent from "../components/ProjectContent/ProjectContent";
import { Link } from "react-router-dom";

const Projects = () => {
  return (
    <>
      <header className="d-lg-none w-100 px-3 pt-3 d-flex justify-content-between align-items-center">
        <div className="logo">
          <Link to="/home" className="logo-link">
            <img src="/Logo.png" alt="logo" style={{ height: "40px" }} />
          </Link>
        </div>

        {/* Toggle button */}
        <button
          className="btn btn-primary"
          data-bs-toggle="offcanvas"
          data-bs-target="#mobileSidebar"
        >
          ☰
        </button>
      </header>

      {/* Sidebar Offcanvas (Mobile) */}
      <div
        className="offcanvas offcanvas-start d-lg-none"
        tabIndex="-1"
        id="mobileSidebar"
        style={{ backgroundColor: "#E6E6FA ", maxWidth: "70%" }}
      >
        <div className="offcanvas-header">
          <button
            type="button"
            className="btn-close bg-white"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>
        <div className="offcanvas-body">
          <Sidebar2 />
        </div>
      </div>

      <main className="d-flex">
        <div className="leftSide d-none d-lg-block">
          <Sidebar />
        </div>
        <div className="rightSide p-4" style={{ flex: "1" }}>
          <ProjectContent />
        </div>
      </main>
    </>
  );
};

export default Projects;
