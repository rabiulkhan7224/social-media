
import type { RequestHandler } from 'express';
import {
  toggleLike,
  getLikeStatus,
  getPostLikes,
  getUserLikedPosts,
  getPostLikeCount,
} from './like.service';
import catchAsync from '@/app/utils/catchAsync';
import AppError from '@/app/errors/AppError';

// Toggle like/unlike on a post
export const toggleLikePost: RequestHandler = catchAsync(async (req, res) => {
  const { postId } = req.params as { postId: string };
  const userId = req.user?.id;

  if (!userId) {
    throw new AppError(401, 'auth', 'User not authenticated');
  }

  const result = await toggleLike(postId, userId);

  res.status(200).json({
    success: true,
    data: result,
  });
});

// Get like status for current user on a post
export const getPostLikeStatus: RequestHandler = catchAsync(async (req, res) => {
  const { postId } = req.params as { postId: string } ;
  const userId = req.user?.id;

  if (!userId) {
    throw new AppError(401, 'auth', 'User not authenticated');
  }

  const result = await getLikeStatus(postId, userId);

  res.status(200).json({
    success: true,
    data: result,
  });
});

// Get all likes for a specific post (with user info)
export const getPostLikesList: RequestHandler = catchAsync(async (req, res) => {
  const { postId } = req.params as { postId: string };
  const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 20;

  const result = await getPostLikes({ postId, page, limit });

  res.status(200).json({
    success: true,
    ...result,
  });
});

// Get all posts liked by current user
export const getMyLikedPosts: RequestHandler = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;

  if (!userId) {
    throw new AppError(401, 'auth', 'User not authenticated');
  }

  const result = await getUserLikedPosts({ userId, page, limit });

  res.status(200).json({
    success: true,
    ...result,
  });
});

// Get like count for a post (public - no auth needed)
export const getPostLikeCountPublic: RequestHandler = catchAsync(async (req, res) => {
  const { postId } = req.params as { postId: string };

  const count = await getPostLikeCount(postId);

  res.status(200).json({
    success: true,
    data: { postId, likeCount: count },
  });
});