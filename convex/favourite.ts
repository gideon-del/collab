import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAll = query({
  args: {
    orgId: v.string(),
  },
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw Error("Unauthorized");
    }
    const favourites = await ctx.db
      .query("favourites")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .filter((q) => q.eq(q.field("orgId"), args.orgId))
      .collect();
    return favourites;
  },
});

export const addFavourite = mutation({
  args: {
    orgId: v.string(),
    boardId: v.id("boards"),
  },
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw Error("Unauthorized");
    }

    const newFavourite = await ctx.db.insert("favourites", {
      orgId: args.orgId,
      boardId: args.boardId,
      userId: identity.subject,
    });
    return newFavourite;
  },
});
export const removeFavourite = mutation({
  args: {
    boardId: v.string(),
  },
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw Error("Unauthorized");
    }
    const favBoard = await ctx.db
      .query("favourites")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .filter((q) => q.eq(args.boardId, q.field("boardId")))
      .first();
    if (!favBoard) {
      throw Error("Not found!");
    }
    await ctx.db.delete(favBoard._id);
  },
});
