"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Overlay from "./overlay";
import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import Footer from "./footer";
import { Skeleton } from "@/components/ui/skeleton";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import Actions from "@/components/actions";
import { MoreHorizontal } from "lucide-react";
interface BoardCardProps {
  title: string;
  aurthorId: string;
  orgId: string;
  imageUrl: string;
  authorName: string;
  createdAt: number;
  isFavourite: boolean;
  id: string;
}
const BoardCard = ({
  id,
  createdAt,
  aurthorId,
  authorName,
  imageUrl,
  isFavourite,
  orgId,
  title,
}: BoardCardProps) => {
  const { userId } = useAuth();
  const aurthorLabel = aurthorId === userId ? "You" : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true,
  });
  const { mutate: mutateAdd, pending: pendingAdd } = useApiMutation(
    api.favourite.addFavourite
  );
  const { mutate: mutateRemove, pending: pendingRemove } = useApiMutation(
    api.favourite.removeFavourite
  );
  const removeFromFavourite = async () => {
    try {
      await mutateRemove({
        boardId: id,
      });
      toast.success("Removed from favourite");
    } catch (error) {
      toast.error("Failed to remove favourite");
    }
  };
  const addToFavourite = async () => {
    try {
      await mutateAdd({
        boardId: id,
        orgId,
      });
      toast.success("Added favourite");
    } catch (error) {
      toast.error("Failed to add favourite");
    }
  };
  return (
    <Link href={`/board/${id}`} className="block">
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-amber-50">
          <Image src={imageUrl} alt={title} fill className="object-fit" />
          <Overlay />
          <Actions id={id} title={title} side="right">
            <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
              <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity" />
            </button>
          </Actions>
        </div>
        <Footer
          aurthorLabel={aurthorLabel}
          createdAtLabel={createdAtLabel}
          disabled={pendingAdd || pendingRemove}
          isFavourite={isFavourite}
          onClick={isFavourite ? removeFromFavourite : addToFavourite}
          title={title}
        />
      </div>
    </Link>
  );
};
BoardCard.Skeleton = function BoardSkeleton() {
  return (
    <div className=" aspect-[100/127] border rounded-lg  overflow-hidden">
      <Skeleton className="w-full h-full" />
    </div>
  );
};

export default BoardCard;
