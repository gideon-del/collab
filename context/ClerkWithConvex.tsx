"use client";
import { ClerkProvider, useAuth } from "@clerk/nextjs";

import { ConvexProviderWithClerk } from "convex/react-clerk";

import { AuthLoading, Authenticated, ConvexReactClient } from "convex/react";
import React from "react";

interface ConvexClientProviderProps {
  children: React.ReactNode;
}

const converURL = process.env.NEXT_PUBLIC_CONVEX_URL!;
const convex = new ConvexReactClient(converURL);

export const ConvexClientProvider: React.FC<ConvexClientProviderProps> = ({
  children,
}) => {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};
