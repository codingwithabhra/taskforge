import React from "react";
import "./Homecontent.css";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import HomeProjects from "../HomeProjects/HomeProjects";

const HomeContent = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="container pt-2">
      {/* SEARCH BOX */}
      <form className="d-flex">
        <input
          type="text"
          className="formControl me-2"
          placeholder="Search tasks..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="button">
            <IoSearchOutline />
        </button>
      </form>

      {/* PROJECT SECTION */}
      <div className="homeProjectSection mt-4">
        <HomeProjects />
      </div>
    </div>
  );
};

export default HomeContent;
