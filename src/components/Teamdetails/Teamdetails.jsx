import React from "react";
import useMainContext from "../../contexts/useMainContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FiArrowLeftCircle } from "react-icons/fi";

const Teamdetails = () => {
  const { teamId } = useParams();
  const {
    allUsers,
    teamData,
    findTeamById,
    selectedMembers,
    setSelectedMembers,
    handleAddMembers,
    selectedMembersToRemove,
    setSelectedMembersToRemove,
    handleRemoveMembers,
  } = useMainContext();

  const team = findTeamById(teamId);
  console.log("this is from team details --", team);

  if (!team) return <p>Loading...</p>;

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    return `${date.getDate()} ${date.toLocaleString("en-GB", {
      month: "long",
    })}, ${date.getFullYear()}`;
  };

  const availableUsers = allUsers.filter(
    (user) => !team.members.some((member) => member._id === user._id),
  );

  // for adding
  const handleMemberSelect = (userId) => {
    setSelectedMembers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  };

  //for removing
  const handleRemoveMemberSelect = (userId) => {
    setSelectedMembersToRemove((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
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

      <div className="pt-5">
        <div
          className="team-card h-100 shadow-sm p-5 rounded"
          style={{ background: "#F5F5F5" }}
        >
          <div className="d-flex flex-column">
            {/* HEADING */}
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
              <h5 className="fs-1 text-dark fw-bold mb-2">{team.name}</h5>
              <div>
                <p className="fs-5 mb-0">
                  <span className="fw-bold">Created at :</span>{" "}
                  {formatDate(team.createdAt)}
                </p>
              </div>
            </div>
            <hr />
            {/* MEMBERS */}
            <div className="members py-3">
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
          <hr className="pt-2" />
          {/*BUTTONS */}
          <div className="buttons d-flex justify-content-center align-items-center flex-wrap gap-3">
            <button
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#addMemberModal"
            >
              + Add Member
            </button>
            <button
              className="btn btn-danger"
              data-bs-toggle="modal"
              data-bs-target="#removeMemberModal"
            >
              - Remove Member
            </button>
          </div>
        </div>
      </div>

      {/* MODAL TO ADD MEMBER(S) */}
      <div
        className="modal fade"
        id="addMemberModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addMemberModalLabel">
                Add Members
              </h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              {availableUsers.length === 0 ? (
                <p>No users available.</p>
              ) : (
                availableUsers.map((user) => (
                  <div className="form-check mb-2" key={user._id}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={user._id}
                      checked={selectedMembers.includes(user._id)}
                      onChange={() => handleMemberSelect(user._id)}
                    />

                    <label className="form-check-label" htmlFor={user._id}>
                      {user.name}
                    </label>
                  </div>
                ))
              )}
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>

              <button
                className="btn btn-primary"
                onClick={() => handleAddMembers(teamId)}
                disabled={selectedMembers.length === 0}
              >
                Add Selected Members
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* REMOVE MEMBER MODAL */}
      <div
        className="modal fade"
        id="removeMemberModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Remove Members</h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              {team.members?.length === 0 ? (
                <p>No members available.</p>
              ) : (
                team.members.map((member) => (
                  <div className="form-check mb-2" key={member._id}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`remove-${member._id}`}
                      checked={selectedMembersToRemove.includes(member._id)}
                      onChange={() => handleRemoveMemberSelect(member._id)}
                    />

                    <label
                      className="form-check-label"
                      htmlFor={`remove-${member._id}`}
                    >
                      {member.name}
                    </label>
                  </div>
                ))
              )}
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>

              <button
                className="btn btn-danger"
                disabled={selectedMembersToRemove.length === 0}
                onClick={() => handleRemoveMembers(teamId)}
              >
                Remove Selected Members
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teamdetails;
