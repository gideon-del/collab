import React from "react";
import Sidebar from "./_components/sidebar";
import OrgSidebar from "./_components/org-sidebar";
import Navbar from "./_components/navbar";
interface DashboardLayoutProps {
  children: React.ReactNode;
}
const DashbaoradLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <main className="h-full">
      <Sidebar />
      <div className="flex min-h-screen w-full pl-14 ">
        <OrgSidebar />
        <div className="flex-1">
          <Navbar />
          {children}
        </div>
      </div>
    </main>
  );
};

export default DashbaoradLayout;
