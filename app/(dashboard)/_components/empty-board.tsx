"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useOrganization } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const EmptyBoard = () => {
  const router = useRouter();
  const { organization } = useOrganization();
  const { mutate, pending } = useApiMutation(api.board.create);
  const handleClick = async () => {
    try {
      if (!organization) return;
      const board = await mutate({
        orgId: organization.id,
        title: "Untitled",
      });
      toast.success("Board create");
      router.push(`/board/${board}`);
    } catch (error) {
      toast.error("Failed to create board");
    }
  };
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src={"/notes.png"} alt="Empty" height={110} width={110} />
      <h2 className="text-2xl font-semibold mt-6">Create your first board!</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Start by creating a board for your organization
      </p>
      <div className="mt-6">
        <Button size={"lg"} onClick={handleClick} disabled={pending}>
          Create board
        </Button>
      </div>
    </div>
  );
};

export default EmptyBoard;
