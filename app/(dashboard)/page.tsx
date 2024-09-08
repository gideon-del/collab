"use client";
import React from "react";
import EmptyOrg from "./_components/empty-org";
import { useOrganization } from "@clerk/nextjs";
import BoardList from "./_components/board-list";
interface DashbardPageProps {
  searchParams: {
    search?: string;
    favourite?: string;
  };
}
const Dashboard = ({ searchParams }: DashbardPageProps) => {
  const { organization } = useOrganization();
  return (
    <div className="h-[calc(100%-80px)] p-6">
      {!organization ? (
        <EmptyOrg />
      ) : (
        <BoardList orgId={organization.id} query={searchParams} />
      )}
    </div>
  );
};

export default Dashboard;
