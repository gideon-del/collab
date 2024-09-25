"use client";
import { useOthers, useSelf } from "@liveblocks/react";
import React from "react";
import UserAvatar from "./user-avatart";
import { connectionIdToColor } from "@/lib/utils";
const MAX_SHOWN_USERS = 1;
const Participants = () => {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > MAX_SHOWN_USERS;
  return (
    <div className="absolute  top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md ">
      <div className="flex gap-x-2">
        {users.slice(0, MAX_SHOWN_USERS).map(({ connectionId, info }) => (
          <UserAvatar
            key={connectionId}
            src={info.pictur}
            fallback={info.name?.[0] || "T"}
            borderColor={connectionIdToColor(connectionId)}
          />
        ))}
        {currentUser && (
          <UserAvatar
            src={currentUser.info.pictur}
            name={`${currentUser.info.name} You`}
            fallback={currentUser.info.name?.[0]}
            borderColor={connectionIdToColor(currentUser.connectionId)}
          />
        )}
        {hasMoreUsers && (
          <UserAvatar
            name={`${users.length - MAX_SHOWN_USERS} more`}
            fallback={`+${users.length - MAX_SHOWN_USERS}`}
          />
        )}
      </div>
    </div>
  );
};
export const ParticipantsSkeleton = () => {
  return (
    <div className="absolute h-2 top-2 right-2 bg-white w-[100px] rounded-md p-3 flex items-center shadow-md " />
  );
};
export default Participants;
