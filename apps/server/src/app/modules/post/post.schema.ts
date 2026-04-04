import z from "zod";

 export const createPostSchema  = z.object({
  body: z.object({
    content: z.string().min(1, 'Content is required'),
    image: z.string().optional()
  })})

  // const { page, limit, authorId, search, sortBy, sortOrder, includeComments, includeLikes, includeAuthor } = req.query;

  export const getPostsSchema = z.object({
    query: z.object({
      page: z.string().optional(),
      limit: z.string().optional(),
      authorId: z.string().optional(),
      search: z.string().optional(),
      sortBy: z.enum(['createdAt', 'likesCount', 'commentsCount']).optional(), 
      sortOrder: z.enum(['asc', 'desc']).optional(),
      includeComments: z.string().optional(),
      includeLikes: z.string().optional(),
      includeAuthor: z.string().optional(),
    })
  })

