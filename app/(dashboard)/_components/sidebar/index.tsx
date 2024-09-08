"use client";
import React from "react";
import NewButton from "./NewButton";
import ListOrg from "./list-org";

const Sidebar = () => {
  return (
    <aside className="fixed flex flex-col p-3 gap-y-3 left-0 w-14 h-full bg-red-600">
      <ListOrg />
      <NewButton />
    </aside>
  );
};

export default Sidebar;
