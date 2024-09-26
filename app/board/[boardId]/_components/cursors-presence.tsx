"use client";

import { useOthersConnectionIds } from "@liveblocks/react";
import { memo } from "react";

import React from "react";
import Cursor from "./cursor";
const Cursors = () => {
  const ids = useOthersConnectionIds();

  return (
    <>
      {ids.map((conncectionId) => (
        <Cursor key={conncectionId} connectionId={conncectionId} />
      ))}
    </>
  );
};
const CursorsPresence = () => {
  return (
    <>
      {/* TODO: Draft pencil */}
      <Cursors />
    </>
  );
};
CursorsPresence.displayName = "CursorsPresence";
export default memo(CursorsPresence);
