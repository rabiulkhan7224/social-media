import { Router } from 'express';

import {
  createCommentSchema,
  updateCommentSchema,
  getCommentsSchema,
} from './comment.schema';
import validateRequest from '@/app/middlewares/validateRequest';
import { authMiddleware } from '@/app/middlewares/authMiddleware';
import { addComment, editComment, getPostComments, removeComment } from './comment.controller';


const router = Router();

// Public: get comments for a post (with pagination & nested replies)
router.get('/post/:postId', validateRequest(getCommentsSchema), getPostComments);

// Protected: create a comment (top-level or reply)
router.post(
  '/create',
  authMiddleware(), 
  validateRequest(createCommentSchema),
  addComment
);

// Protected: update own comment
router.put(
  '/:id',
  authMiddleware(),
  validateRequest(updateCommentSchema),
    editComment
);

// Protected: delete own comment (cascades replies automatically)
router.delete('/:id', authMiddleware(), removeComment);

export const commentRoutes: Router = router;