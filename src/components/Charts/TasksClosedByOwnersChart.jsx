import React from "react";
import { Bar } from "react-chartjs-2";
import useMainContext from "../../contexts/useMainContext";
import "./Chart.css"

const TasksClosedByOwnersChart = () => {
  const { tasks } = useMainContext();

  const completedTasks = tasks.filter((task) => task.status === "Completed");

  const ownerCounts = {};

  completedTasks.forEach((task) => {
    task.owners.forEach((owner) => {
      ownerCounts[owner.name] = (ownerCounts[owner.name] || 0) + 1;
    });
  });

  const data = {
    labels: Object.keys(ownerCounts),
    datasets: [
      {
        label: "Closed Tasks",
        data: Object.values(ownerCounts),
        backgroundColor: "#16a34a",
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
  };

  return (
    <div className="container-fluid chart">
      <div className="card shadow-sm border-0 p-4">
        <h4 className="fw-bold mb-3">Tasks Closed by Owners</h4>

        <div style={{ height: "250px" }} className="d-flex align-items-center justify-content-center">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default TasksClosedByOwnersChart;
