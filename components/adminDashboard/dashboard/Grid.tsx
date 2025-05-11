import React from "react";
import { StatCards } from "./StatCards";
import RecentTransactions from "./RecentTransactions";

export const Grid = () => {
  return (
    <div className="flex flex-col gap-5">
      <StatCards />
      <RecentTransactions />
    </div>
  );
};
