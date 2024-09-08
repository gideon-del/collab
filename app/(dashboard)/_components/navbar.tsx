"use client";
import {
  UserButton,
  SignInButton,
  useAuth,
  OrganizationSwitcher,
  useOrganization,
} from "@clerk/nextjs";
import React from "react";
import SearchInput from "./search-input";
import InviteButton from "./invite-button";

const Navbar = () => {
  const { isSignedIn } = useAuth();
  const { organization } = useOrganization();
  return (
    <div className="h-16  flex items-center p-5 gap-x-4">
      <div className="hidden lg:flex lg:flex-1">
        <SearchInput />
      </div>
      <div className="block lg:hidden flex-1">
        <OrganizationSwitcher
          hidePersonal
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                maxWidth: "376px",
              },
              organizationSwitcherTrigger: {
                padding: "6px",
                width: "100%",
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                justifyContent: "space-between",
                backgroundColor: "white",
              },
            },
          }}
        />
      </div>
      {organization && <InviteButton />}
      {isSignedIn ? <UserButton /> : <SignInButton />}
    </div>
  );
};

export default Navbar;
