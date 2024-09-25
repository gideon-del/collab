"use client";
import { useMutation } from "convex/react";
import { useState } from "react";

export const useApiMutation = (mutationFunction: any) => {
  const [pending, setPending] = useState(false);
  const apiMutation = useMutation(mutationFunction);
  const mutate = async (payload: any) => {
    setPending(true);
    try {
      let res = await apiMutation(payload);

      return res;
    } catch (err) {
      throw err;
    } finally {
      setPending(false);
    }
  };
  return {
    mutate,
    pending,
  };
};
