import React from "react";
import { Bar } from "react-chartjs-2";
import useMainContext from "../../contexts/useMainContext";
import "./Chart.css"

const PendingWorkChart = () => {
  const { tasks } = useMainContext();
  const pendingTasks = tasks?.filter((task) => task.status !== "Completed");

  const labels = pendingTasks.map((task) => task.name);

  const remainingDays = pendingTasks.map((task) => {
    const today = new Date();

    const dueDate = new Date(task.timeToComplete);

    const diffTime = dueDate - today;

    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return days > 0 ? days : 0;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Days Remaining",
        data: remainingDays,
        backgroundColor: "#f59e0b",
        borderRadius: 8,
      },
    ],
  };
  const options = {
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  return (
    <div className="container-fluid chart">
      <div className="card shadow-sm border-0 p-4">
        <h4 className="fw-bold mb-3">Total Days of Work Pending</h4>

        <div style={{ height: "300px" }} className="d-flex align-items-center justify-content-center">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default PendingWorkChart;
