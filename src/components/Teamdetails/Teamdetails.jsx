import React from "react";
import useMainContext from "../../contexts/useMainContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FiArrowLeftCircle } from "react-icons/fi";

const Teamdetails = () => {
  const { teamId } = useParams();
  const { teamData, findTeamById } = useMainContext();

  const team = findTeamById(teamId);
  console.log("this is from team details --", team);

  if (!team) return <p>Loading...</p>;

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    return `${date.getDate()} ${date.toLocaleString("en-GB", {
      month: "long",
    })}, ${date.getFullYear()}`;
  };

  return (
    <div className="container pt-4">
      <Link
        to="/team"
        className="text-decoration-none fs-5 d-flex align-items-center fw-semibold"
        style={{ color: "#086ae8" }}
      >
        <FiArrowLeftCircle />
        <span className="mx-2">Back to Teams</span>
      </Link>

      <div className="container pt-5">
        <div
          className="team-card h-100 shadow-sm p-5 rounded"
          style={{ background: "#F5F5F5" }}
        >
          <div className="d-flex flex-column">
            {/* HEADING */}
            <div className="d-flex justify-content-between">
              <h5 className="fs-4 text-dark fw-bold mb-2">{team.name}</h5>
              <div>
                <p>Created at : {formatDate(team.createdAt)}</p>
              </div>
            </div>
            <hr />
            {/* MEMBERS */}
            <div className="members pt-3">
              <div className="fs-5">
                <span className="badge bg-success mx-3">Team Members:{" "}</span>
                {team.members?.map((member) => member.name).join(", ")}
              </div>
              <p className="fs-5 pt-3">
                <span className="badge bg-success mx-3">No of Members :</span>
                <span className="fw-bold badge bg-danger mx-2">
                  {team.members?.length || 0}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teamdetails;
