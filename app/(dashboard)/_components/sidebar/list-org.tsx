"use client";
import React from "react";
import {
  OrganizationList,
  useOrganization,
  useOrganizationList,
} from "@clerk/nextjs";
import Image from "next/image";
import Item from "./item";
const ListOrg = () => {
  const { domains, organization } = useOrganization();
  const { setActive, userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });
  console.log(userMemberships);
  return (
    <ul className="space-y-4">
      {userMemberships.data?.map((mem) => {
        return (
          <Item
            id={mem.id}
            key={mem.id}
            name={mem.organization.name}
            imageUrl={mem.organization.imageUrl}
          />
        );
      })}
    </ul>
  );
};

export default ListOrg;
