import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import TeamContent from "../components/Team/TeamContent";

const Team = () => {
  return (
    <>
      <header>
        {/* Toggle button (only visible on small screens) */}
        <button
          className="btn btn-primary d-lg-none position-absolute top-100 end-0 mx-2 my-2"
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
        style={{ backgroundColor: "#E6E6FA " }}
      >
        <div className="offcanvas-header">
          <button
            type="button"
            className="btn-close bg-white"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>
        <div className="offcanvas-body">
          <Sidebar />
        </div>
      </div>

      <main className="d-flex">
        <div className="leftSide h-100">
          <Sidebar />
        </div>
        <div className="rightSide p-4" style={{ flex: "1" }}>
          <TeamContent />
        </div>
      </main>
    </>
  );
};

export default Team;
