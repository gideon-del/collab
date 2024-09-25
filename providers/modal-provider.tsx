"use client";
import RenameModel from "@/components/modals/rename-model";
import React, { useState, useEffect } from "react";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <>
      <RenameModel />
    </>
  );
};

export default ModalProvider;
