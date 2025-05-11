import React from "react";
import { AccountToggle } from "./AccountToggle";
import { RouteSelect } from "./RouteSelect";

export const Sidebar = () => {
  return (
    <div>
      <div className="sticky top-4 h-screen max-w-[36rem]">
        <AccountToggle />
        {/* <Search /> */}
        <RouteSelect />
        {/* <Plan /> */}
      </div>
    </div>
  );
};
