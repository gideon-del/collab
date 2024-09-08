"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { LayoutDashboard, Star } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
const FAVOURITES = "favourite";
const font = Poppins({
  subsets: ["latin"],
  weight: "600",
});
const OrgSidebar = () => {
  const searchParams = useSearchParams();
  const favourite = searchParams.get(FAVOURITES);
  return (
    <div className="hidden lg:flex flex-col lg:w-[206px] px-5 pt-5 ">
      <Link href={"/"}>
        <div className="flex items-center gap-x-2 mb-4">
          <span className={cn("font-semibold text-2xl", font.className)}>
            Board
          </span>
        </div>
      </Link>
      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            },
            organizationSwitcherTrigger: {
              padding: "6px",
              width: "100%",
              borderRadius: "8px",
              border: "1px solid #E5E7EB",
              justifyContent: "space-between",
              backgroundColor: "white",
              marginBottom: 30,
            },
          },
        }}
      />
      <div className="space-y-1 w-full">
        <Button
          asChild
          size={"lg"}
          className="font-normal justify-start px-2 w-full"
          variant={favourite ? "ghost" : "secondary"}
        >
          <Link href={"/"}>
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Team boards
          </Link>
        </Button>
        <Button
          asChild
          size={"lg"}
          className="font-normal justify-start px-2 w-full"
          variant={!favourite ? "ghost" : "secondary"}
        >
          <Link
            href={{
              pathname: "/",
              query: {
                [FAVOURITES]: true,
              },
            }}
          >
            <Star className="h-4 w-4 mr-2" />
            Favourite boards
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default OrgSidebar;
