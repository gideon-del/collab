import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
const images = [
  "/placeholders/1.svg",
  "/placeholders/2.svg",
  "/placeholders/3.svg",
  "/placeholders/4.svg",
  "/placeholders/5.svg",
  "/placeholders/6.svg",
  "/placeholders/7.svg",
  "/placeholders/8.svg",
];
export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }
    const randomImage = images[Math.floor(Math.random() * images.length)];

    const board = await ctx.db.insert("boards", {
      title: args.title,
      orgId: args.orgId,
      aurthorId: identity.subject,
      aurthorName: identity.name!,
      imageUrl: randomImage,
    });
    return board;
  },
});
export const remove = mutation({
  args: {
    boardId: v.id("boards"),
  },
  handler: async (ctx, arg) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }
    const favouriteBoard = await ctx.db
      .query("favourites")
      .filter((q) => q.eq(arg.boardId, q.field("boardId")))
      .first();
    if (favouriteBoard) {
      await ctx.db.delete(favouriteBoard._id);
    }
    await ctx.db.delete(arg.boardId);
  },
});

export const update = mutation({
  args: {
    id: v.id("boards"),
    title: v.string(),
  },
  handler: async (ctx, arg) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }
    const title = arg.title.trim();
    if (!title) {
      throw new Error("Title is required");
    }
    if (title.length > 60) {
      throw new Error("Title cannone be longer than 60 characters");
    }
    const board = await ctx.db.patch(arg.id, {
      title: title,
    });

    return board;
  },
});
export const get = query({
  args: {
    id: v.id("boards"),
  },
  async handler(ctx, args) {
    const board = await ctx.db.get(args.id);

    return board;
  },
});
