import type { RequestHandler } from "express";
import catchAsync from "@/app/utils/catchAsync";
import { createPost, getPostById, getPosts } from "./post.service";
import AppError from "@/app/errors/AppError";

export const createPosted: RequestHandler = catchAsync(async (req, res) => {
  const { content, image } = req.body;
  const userId = req.user?.id;

  // Validate required fields
  if (!userId) {
    throw new AppError(401, "auth", "User not authenticated");
  }

  if (!content) {
    throw new AppError(400, "validation", "Content is required");
  }

  const result = await createPost(userId, { content, image });

  res.status(201).json({
    success: true,
    data: result,
  });
});

export const getAllPosts: RequestHandler = catchAsync(async (req, res) => {
  const {
    page ,
    limit,
    authorId,
    search,
    sortBy,
    sortOrder,
    includeComments,
    includeLikes,
    includeAuthor,
  } = req.query;

  const result = await getPosts({
    page: page ? parseInt(page as string, 10) : 1,
    limit: limit ? parseInt(limit as string, 10) : 20,
    authorId: authorId as string,
    search: search as string,
    sortBy: sortBy as any,
    sortOrder: sortOrder as any,
    includeComments: includeComments === "true",
    includeLikes: includeLikes === "true",
    includeAuthor: includeAuthor !== "false", // default true
  });

  res.status(200).json({
    success: true,
    data: result.data,
    meta: result.meta,
  });
});

export const getPostByIdController: RequestHandler = catchAsync(
  async (req, res) => {
    const { id } = req.params as { id: string };
    const userId = req.user?.id; // from auth middleware (if logged in)

    const post = await getPostById(id, userId);

    res.status(200).json({
      success: true,
      data: post,
    });
  },
);
