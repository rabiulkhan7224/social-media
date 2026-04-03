import type { RequestHandler } from "express";
import catchAsync from "@/app/utils/catchAsync";
import { getPosts } from "./post.service";

export const createPosted: RequestHandler = catchAsync(async (req, res) => {
  res.status(201).json({
    message: "Post created successfully",
    data: req.body,
  });
});


export const getAllPosts:RequestHandler = catchAsync(async (req, res) => {
  const { page, limit, authorId, search, sortBy, sortOrder, includeComments, includeLikes, includeAuthor } = req.query;

  const result = await getPosts({
    page: page ? parseInt(page as string, 1) : 1,
    limit: limit ? parseInt(limit as string, 20) : 20,
    authorId: authorId as string,
    search: search as string,
    sortBy: sortBy as any,
    sortOrder: sortOrder as any,
    includeComments: includeComments === 'true',
    includeLikes: includeLikes === 'true',
    includeAuthor: includeAuthor !== 'false', // default true
  });

  res.status(200).json({
    success: true,
    data: result.data,
    meta: result.meta,
  });
});
