import { z } from 'zod';

export const postIdParamSchema = z.object({
  params: z.object({
    postId: z.string().min(1, 'Post ID is required'),
  }),
  body: z.object({}).optional(),
  cookies: z.object({}).optional(),
});

export const toggleLikeSchema = z.object({
  params: z.object({
    postId: z.string().min(1, 'Post ID is required'),
  }),
  body: z.object({}).optional(),
  cookies: z.object({}).optional(),
});

export const getLikesQuerySchema = z.object({
  params: z.object({
    postId: z.string().optional(),
  }),
  query: z.object({
    page: z.string().regex(/^\d+$/).optional().transform(Number),
    limit: z.string().regex(/^\d+$/).optional().transform(Number),
  }),
  cookies: z.object({}).optional(),
});