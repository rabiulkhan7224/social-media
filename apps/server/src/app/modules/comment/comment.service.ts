import AppError from "@/app/errors/AppError";
import prisma from "@social-media/db";


export interface CreateCommentInput {
  content: string;
  postId: string;
  authorId: string;
  parentId?: string; // optional – for replies
}

export interface UpdateCommentInput {
  content: string;
}

export interface GetCommentsParams {
  postId: string;
  page?: number;
  limit?: number;
  parentId?: string | null; // get top-level or replies to a specific comment
}

// Create a comment (top-level or reply)
export const createComment = async (data: CreateCommentInput) => {
  // If it's a reply, validate parent exists and belongs to the same post
  if (data.parentId) {
    const parent = await prisma.comment.findUnique({
      where: { id: data.parentId },
    });
    if (!parent) {
      throw new AppError(404, 'comment', 'Parent comment not found');
    }
    if (parent.postId !== data.postId) {
      throw new AppError(400, 'comment', 'Reply must be on the same post');
    }
  }

  // Create the comment 
  return await prisma.comment.create({
    data: {
      content: data.content,
      postId: data.postId,
      authorId: data.authorId,
      parentId: data.parentId,
    },
    include: {
      author: true,
      parent: true, 
    },
  });
};

// Update a comment (only by author or admin)
export const updateComment = async (commentId: string, userId: string, data: UpdateCommentInput) => {
  const comment = await prisma.comment.findUnique({ where: { id: commentId } });
  if (!comment) {
    throw new AppError(404, 'comment', 'Comment not found');
  }
  if (comment.authorId !== userId) {
    // optionally allow admin role – add role check here
    throw new AppError(403, 'comment', 'You can only edit your own comments');
  }

  return await prisma.comment.update({
    where: { id: commentId },
    data: { content: data.content },
    include: { author: true },
  });
};

// Delete a comment (cascades replies automatically because of onDelete: Cascade)
export const deleteComment = async (commentId: string, userId: string) => {
  const comment = await prisma.comment.findUnique({ where: { id: commentId } });
  if (!comment) {
    throw new AppError(404, 'comment', 'Comment not found');
  }
  if (comment.authorId !== userId) {
    throw new AppError(403, 'comment', 'You can only delete your own comments');
  }

  await prisma.comment.delete({ where: { id: commentId } });
  return { success: true };
};

// Get comments for a post (with nested replies, paginated top-level)
export const getCommentsByPost = async (params: GetCommentsParams) => {
  const { postId, page = 1, limit = 10, parentId = null } = params;
  const skip = (page - 1) * limit;

  // For top-level comments (parentId = null) or specific parent
  const where = {
    postId,
    parentId: parentId === null ? null : parentId,
  };

  const [comments, total] = await Promise.all([
    prisma.comment.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        author: true,
        // Include immediate replies (one level deep)
        replies: {
          include: { author: true },
          orderBy: { createdAt: 'asc' },
        },
      },
    }),
    prisma.comment.count({ where }),
  ]);

  return {
    data: comments,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

// Get a single comment with its full reply tree (recursive – use with caution)
export const getCommentTree = async (commentId: string) => {
  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
    include: {
      author: true,
      replies: {
        include: { author: true, replies: { include: { author: true } } },
      },
    },
  });
  if (!comment) {
    throw new AppError(404, 'comment', 'Comment not found');
  }
  return comment;
};

// Count comments on a post (including all replies)
export const countPostComments = async (postId: string) => {
  return await prisma.comment.count({ where: { postId } });
};