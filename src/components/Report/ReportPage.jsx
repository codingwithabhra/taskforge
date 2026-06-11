import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  BarElement,
  Tooltip,
  Legend,
  LinearScale,
} from "chart.js";

import WorkDoneLastWeekChart from "../Charts/WorkDoneLastWeekChart";
import PendingWorkChart from "../Charts/PendingWorkChart";
import TasksClosedByTeamChart from "../Charts/TasksClosedByTeamChart";
import TasksClosedByOwnersChart from "../Charts/TasksClosedByOwnersChart";

ChartJS.register(
  ArcElement,
  CategoryScale,
  BarElement,
  LinearScale,
  Tooltip,
  Legend,
);

const ReportPage = () => {
  return (
    <div className="container-fluid pt-4 pb-5">
      <div className="report-heading">
        <h1>Report Overview</h1>
        <hr />
      </div>

      <div className="row g-4 pt-4">
        <div className="mb-2 col-12 col-md-6">
          <TasksClosedByTeamChart />
        </div>

        <div className="mb-2 col-12 col-md-6">
          <WorkDoneLastWeekChart />
        </div>
      </div>

      <div className="my-4 col-12">
        <PendingWorkChart />
      </div>

      <div className="pt-4 col-12">
        {/* <WorkDoneLastWeekChart /> */}
        <TasksClosedByOwnersChart />
      </div>

      {/* <div className="topCharts pt-4 row g-4">
        <div className="mb-2 col-md-6">
          <WorkDoneLastWeekChart />
        </div>

        <div className="mb-2 col-md-6">
          <PendingWorkChart />
        </div>
      </div> */}
    </div>
  );
};

export default ReportPage;
