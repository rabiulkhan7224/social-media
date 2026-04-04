import catchAsync from "@/app/utils/catchAsync";
import { createComment, deleteComment, getCommentsByPost, updateComment } from "./comment.service";
import type { RequestHandler } from "express";

export const addComment:RequestHandler = catchAsync(async (req, res) => {
  const { content, postId, parentId } = req.body;
  const authorId = req.user.id; 
  const comment = await createComment({ content, postId, authorId, parentId });
  res.status(201).json({ success: true, data: comment });
});

export const editComment:RequestHandler = catchAsync(async (req, res) => {
  const { id  } = req.params as { id: string };
  const { content } = req.body;
  const userId = req.user.id ;
  const updated = await updateComment(id, userId, { content });
  res.status(200).json({ success: true, data: updated });
});

export const removeComment:RequestHandler = catchAsync(async (req, res) => {
  const { id } =req.params as { id: string };
  const userId = req.user.id;
  await deleteComment(id, userId);
  res.status(204).json({ success: true });
});

export const getPostComments:RequestHandler = catchAsync(async (req, res) => {
  const { postId } = req.params as { postId: string };
  const { page, limit, parentId } = req.query;
  const result = await getCommentsByPost({
    postId,
    page: page ? parseInt(page as string) : 1,
    limit: limit ? parseInt(limit as string) : 10,
    parentId: parentId as string | null,
  });
  res.status(200).json({ success: true, ...result });
});