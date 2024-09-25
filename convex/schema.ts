import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
  boards: defineTable({
    title: v.string(),
    orgId: v.string(),
    aurthorId: v.string(),
    aurthorName: v.string(),
    imageUrl: v.string(),
  })
    .index("by_org", ["orgId"])
    .searchIndex("search_title", {
      searchField: "title",
      filterFields: ["orgId"],
    }),
  favourites: defineTable({
    userId: v.string(),
    boardId: v.id("boards"),
    orgId: v.string(),
  })
    .index("by_user", ["userId"])
    .index("by_board", ["boardId"])
    .index("by_user_org", ["orgId", "userId"])
    .index("by_user_board", ["userId", "boardId"])
    .index("by_user_board_org", ["boardId", "orgId", "userId"]),
});
