import React from "react";
import { StatCards } from "./StatCards";
import StudentDistributionChart from "./StudentCharts";

export const Grid = () => {
  return (
    <div className="flex flex-col gap-5">
      <StatCards />
      <StudentDistributionChart />
    </div>
  );
};
