import { z } from 'zod';

export const createCommentSchema = z.object({
  body: z.object({
    content: z.string().min(1).max(2000),
    postId: z.string().min(1),
    parentId: z.string().optional(),
  }),
  params: z.object({}).optional(),
  cookies: z.object({}).optional(),
});

export const updateCommentSchema = z.object({
  body: z.object({
    content: z.string().min(1).max(2000),
  }),
  params: z.object({
    id: z.string().min(1),
  }),
  cookies: z.object({}).optional(),
});

export const getCommentsSchema = z.object({
  params: z.object({
    postId: z.string().min(1),
  }),
  query: z.object({
    page: z.string().optional().transform(Number),
    limit: z.string().optional().transform(Number),
    parentId: z.string().optional().nullable(),
  }),
  cookies: z.object({}).optional(),
});