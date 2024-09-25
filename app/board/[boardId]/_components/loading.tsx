import { Loader } from "lucide-react";
import React from "react";
import Info, { InfoSkeleton } from "./info";
import Participants, { ParticipantsSkeleton } from "./participants";
import Toolbar, { ToolbarSkeleton } from "./toolbar";

const Loading = () => {
  return (
    <main className="h-screen w-full relative bg-neutral-100 touch-none flex items-center justify-center">
      <Loader className="h-6 w-6 text-muted-foreground animate-spin" />
      <InfoSkeleton />
      <ParticipantsSkeleton />
      <ToolbarSkeleton />
    </main>
  );
};

export default Loading;
