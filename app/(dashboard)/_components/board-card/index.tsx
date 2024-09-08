"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Overlay from "./overlay";
import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import Footer from "./footer";
import { Skeleton } from "@/components/ui/skeleton";
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
  return (
    <Link href={`/board/${id}`}>
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-amber-50">
          <Image src={imageUrl} alt={title} fill className="object-fit" />
          <Overlay />
        </div>
        <Footer
          aurthorLabel={aurthorLabel}
          createdAtLabel={createdAtLabel}
          disabled={false}
          isFavourite={isFavourite}
          onClick={() => {}}
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
