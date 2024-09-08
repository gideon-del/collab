import React from "react";
import EmptySearch from "./empty-search";
import EmptyFavourite from "./empty-favourite";
import EmptyBoard from "./empty-board";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import BoardCard from "./board-card";
import NewBoardButton from "./new-board-button";
interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favourite?: string;
  };
}
const BoardList = ({ query, orgId }: BoardListProps) => {
  const data = useQuery(api.boards.get, { orgId });
  if (data === undefined) {
    return (
      <div>
        {" "}
        <h2 className="text-3xl">
          {query.favourite ? "Favourite boards" : "Team boards"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10 ">
          <NewBoardButton orgId={orgId} disabled={true} />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
        </div>
      </div>
    );
  }
  if (!data?.length && query.search) {
    return <EmptySearch />;
  }
  if (!data?.length && query.favourite) {
    return <EmptyFavourite />;
  }
  if (!data.length) {
    return <EmptyBoard />;
  }
  return (
    <div>
      <h2 className="text-3xl">
        {query.favourite ? "Favourite boards" : "Team boards"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10 ">
        <NewBoardButton orgId={orgId} />
        {data.map((board) => (
          <BoardCard
            key={board._id}
            title={board.title}
            imageUrl={board.imageUrl}
            aurthorId={board.aurthorId}
            authorName={board.aurthorName}
            createdAt={board._creationTime}
            orgId={board.orgId}
            isFavourite={false}
            id={board._id}
          />
        ))}
      </div>
    </div>
  );
};

export default BoardList;
