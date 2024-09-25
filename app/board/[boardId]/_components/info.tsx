"use client";
import Actions from "@/components/actions";
import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useRenameModal } from "@/hooks/use-rename-model";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { Menu } from "lucide-react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface InfoProps {
  boardId: string;
}
const font = Poppins({
  subsets: ["latin"],
  weight: "600",
});

const TabSeperator = () => {
  return <div className="text-neutral-300 px-1.5"> |</div>;
};
const Info = ({ boardId }: InfoProps) => {
  const data = useQuery(api.board.get, { id: boardId as Id<"boards"> });
  const { onOpen } = useRenameModal();
  if (!data) {
    return <InfoSkeleton />;
  }

  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
      <Hint label="Go to boards" side="bottom" sideOffset={10}>
        <Button asChild className="px-2" variant="board">
          <Link href={"/"}>
            <span
              className={cn(
                "font-semibold text-xl ml-2 text-black",
                font.className
              )}
            >
              Boards
            </span>
          </Link>
        </Button>
      </Hint>
      <TabSeperator />
      <Hint label="Edit title" side="bottom" sideOffset={10}>
        <Button
          variant={"board"}
          className="text-base font-normal px-2 mr-10"
          onClick={() => onOpen(data._id, data.title)}
        >
          {data.title}
        </Button>
      </Hint>
      <TabSeperator />
      <Actions id={data._id} title={data.title} side="bottom" sideOffset={10}>
        <div>
          <Hint label="Main menu" side="bottom" sideOffset={10}>
            <Button size={"icon"} variant={"board"}>
              <Menu />
            </Button>
          </Hint>
        </div>
      </Actions>
    </div>
  );
};
export const InfoSkeleton = () => {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md  h-12 flex items-center shadow-md w-[300px]" />
  );
};
export default Info;
