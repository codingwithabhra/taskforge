import React from "react";
import "./TeamContent.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useMainContext from "../../contexts/useMainContext";
import { Link } from "react-router-dom";

const TeamContent = () => {
  const { teamData, setTeamData, allUsers, setAllUsers, loading, setLoading, getInitials, getColor, fetchTeamData } =
    useMainContext();
  console.log(teamData);

  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState([]);

  const handleMemberChange = (index, value) => {
    const newMembers = [...members];
    newMembers[index] = value;
    setMembers(newMembers);
  };

  const handleCreateTeam = async () => {
    try {
      const token = localStorage.getItem("token");

      // Team API call
      const response = await axios.post(
        "http://localhost:3000/teams",
        {
          name: teamName,
          members,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response.data);

      //updating team data in context
      await fetchTeamData();

      // Reset form
      setTeamName("");
      setMembers([]);

      // Success Notification
      toast.success("Team Created Successfully");
    } catch (error) {
      console.log(error.response?.data || error.message);
      // Error Notification
      toast.error("Error creating team");
    }
  };

  return (
    <div className="container-fluid pt-3">
      <div className="teamTop d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div className="teamTop-heading">
          <h1>Teams</h1>
        </div>
        <div className="teamTop-buttons">
          <button
            className="teamBtn"
            data-bs-toggle="modal"
            data-bs-target="#createTeamModal"
          >
            + Create Team
          </button>
        </div>
      </div>

      <hr />

      {/* Bootstrap Modal */}
      <div
        className="modal fade"
        id="createTeamModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <h5 className="modal-title">Create New Team</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            {/* Modal Body */}
            <div className="modal-body">
              <form>
                {/* Team Name */}
                <div className="mb-3">
                  <label className="form-label">Team Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter team name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                  />
                </div>

                {/* Members */}
                <div className="mb-3">
                  <label className="form-label">Add Members</label>

                  <select
                    multiple
                    className="form-select"
                    value={members}
                    onChange={(e) =>
                      setMembers(
                        [...e.target.selectedOptions].map(
                          (option) => option.value,
                        ),
                      )
                    }
                  >
                    {allUsers.map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.name} ({user.email})
                      </option>
                    ))}
                  </select>
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
                onClick={handleCreateTeam}
              >
                Create Team
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Team Mapping */}
      <div className="container-fluid mt-4 py-3">
        <div className="row g-5">
          {loading ? (
            <div className="">
                <span className="">Loading...</span>
            </div>
          ) : teamData?.length > 0 ? (
            teamData.map((team) => (
              <div key={team._id} className="col-lg-4 col-md-6 col-sm-12">
                <div
                  className="team-card h-100 shadow-sm p-3 rounded"
                  style={{ background: "#F5F5F5" }}
                >
                  <div className="d-flex flex-column">
                    {/* HEADING */}
                    <h5 className="fs-5 text-dark fw-bold mb-2">{team.name}</h5>
                    {/* CONTENT */}
                    <div className="d-flex justify-content-between flex-wrap gap-3">
                      <div className="d-flex align-items-center mt-3">
                        {team.members?.slice(0, 3).map((member, index) => (
                          <div
                            key={member._id}
                            className="avatar-circle"
                            style={{
                              background: getColor(index),
                              marginLeft: index === 0 ? "0px" : "-10px",
                            }}
                            title={member.name} // hover name
                          >
                            {getInitials(member.name)}
                          </div>
                        ))}

                        {team.members?.length > 3 && (
                          <div className="avatar-circle extra">
                            +{team.members.length - 3}
                          </div>
                        )}
                      </div>

                      <Link
                        className="btn btn-primary btn-sm mt-3 w-20"
                        to={`/team/${team._id}`}
                      >
                        View Team
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No teams found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamContent;
