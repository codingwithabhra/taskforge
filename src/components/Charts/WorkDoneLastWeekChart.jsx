import React from "react";
import { Bar } from "react-chartjs-2";
import useMainContext from "../../contexts/useMainContext";
import "./Chart.css"

const WorkDoneLastWeekChart = () => {
  const { tasks } = useMainContext();

  const last7Days = [...Array(7)].map((_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));

    return {
      label: date.toLocaleDateString("en-US", {
        weekday: "short",
      }),
      fullDate: date.toISOString().split("T")[0],
    };
  });

  const completedTasksData = last7Days.map((day) => {
    return tasks.filter((task) => {
      if (task.status !== "Completed") return false;

      const updatedDate = new Date(task.updatedAt).toISOString().split("T")[0];

      return updatedDate === day.fullDate;
    }).length;
  });

  const data = {
    labels: last7Days.map((day) => day.label),
    datasets: [
      {
        label: "Completed Tasks",
        data: completedTasksData,
        backgroundColor: "#086ae8",
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="chart">
      <div className="card shadow-sm border-0 p-4">
        <h4 className="fw-bold mb-3">Total Work Done Last Week</h4>

        <div className="chart-container" style={{ height: "250px" }}>
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default WorkDoneLastWeekChart;
