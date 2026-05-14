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
    <div className="container-fluid pt-4">
      <Link
        to="/team"
        className="text-decoration-none fs-5 d-flex align-items-center fw-semibold"
        style={{ color: "#086ae8" }}
      >
        <FiArrowLeftCircle />
        <span className="mx-2">Back to Teams</span>
      </Link>

      <div className="container-fluid pt-5">
        <div
          className="team-card h-100 shadow-sm p-5 rounded"
          style={{ background: "#F5F5F5" }}
        >
          <div className="d-flex flex-column">
            {/* HEADING */}
            <div className="d-flex justify-content-between flex-wrap gap-2">
              <h5 className="fs-2 text-dark fw-bold mb-2">{team.name}</h5>
              <div>
                <p className="fs-4">
                  <span className="fw-bold">Created at :</span>{" "}
                  {formatDate(team.createdAt)}
                </p>
              </div>
            </div>
            <hr />
            {/* MEMBERS */}
            <div className="members pt-3">
              <div className="row gy-3">
                {/* Team Members */}
                <div className="col-12 col-lg-8">
                  <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center">
                    <span className="badge bg-success fs-6 me-2 mb-2 mb-sm-0">
                      Team Members:
                    </span>

                    <span className="fs-5 text-break">
                      {team.members?.map((member) => member.name).join(", ")}
                    </span>
                  </div>
                </div>

                {/* Member Count */}
                <div className="col-12 col-lg-4">
                  <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center">
                    <span className="badge bg-success fs-6 me-2 mb-2 mb-sm-0">
                      No of Members:
                    </span>

                    <span className="fw-bold badge bg-danger fs-6">
                      {team.members?.length || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teamdetails;
