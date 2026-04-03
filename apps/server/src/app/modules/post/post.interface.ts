import type { Post } from "node_modules/@social-media/db/prisma/generated/client";

export interface GetPostsParams {
  page?: number;
  limit?: number;
  authorId?: string;
  search?: string;
  sortBy?: 'createdAt' | 'updatedAt' | 'title';
  sortOrder?: 'asc' | 'desc';
  includeComments?: boolean;
  includeLikes?: boolean;
  includeAuthor?: boolean;
}

export interface GetPostsResult {
  data: Post[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}