import React from "react";
import { Doughnut } from "react-chartjs-2";
import useMainContext from "../../contexts/useMainContext";
import "./Chart.css";

const TasksClosedByTeamChart = () => {
  const { tasks, teamData, findTeamById } = useMainContext();

  const completedTasks = tasks.filter((task) => task.status === "Completed");

  const teamCounts = {};

  completedTasks.forEach((task) => {
    const team = findTeamById(task.team);

    const teamName = team?.name || "Unknown";

    teamCounts[teamName] = (teamCounts[teamName] || 0) + 1;
  });

  const data = {
    labels: Object.keys(teamCounts),
    datasets: [
      {
        data: Object.values(teamCounts),
        backgroundColor: [
          "#086ae8",
          "#16a34a",
          "#f59e0b",
          "#ef4444",
          "#9333ea",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="chart">
      <div className="card shadow-sm border-0 p-4">
        <h4 className="fw-bold mb-3">Tasks Closed by Team</h4>

        <div className="chart-container" style={{ height: "250px" }}>
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default TasksClosedByTeamChart;
