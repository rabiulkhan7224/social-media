import { Router } from 'express';
import {
  toggleLikeSchema,
  getLikesQuerySchema,
  postIdParamSchema,
} from './like.schema';
import {
  toggleLikePost,
  getPostLikeStatus,
  getPostLikesList,
  getMyLikedPosts,
  getPostLikeCountPublic,
} from './like.controller';
import validateRequest from '@/app/middlewares/validateRequest';
import { authMiddleware } from '@/app/middlewares/authMiddleware';

const router = Router();

// Public route - get like count (no auth required)
router.get(
  '/count/:postId',
  validateRequest(postIdParamSchema),
  getPostLikeCountPublic
);

// Protected routes (require authentication)
router.use(authMiddleware()); // Apply auth middleware to all routes below

// Toggle like/unlike on a post
router.post(
  '/toggle/:postId',
  validateRequest(toggleLikeSchema),
  toggleLikePost
);

// Get current user's like status on a post
router.get(
  '/status/:postId',
  validateRequest(postIdParamSchema),
  getPostLikeStatus
);

// Get list of users who liked a post
router.get(
  '/post/:postId',
  validateRequest(getLikesQuerySchema),
  getPostLikesList
);

// Get all posts liked by current user
router.get(
  '/my-likes',
  validateRequest(getLikesQuerySchema),
  getMyLikedPosts
);

export const likeRoutes: Router = router;