import AppError from "@/app/errors/AppError";
import prisma from "@social-media/db";


export interface ToggleLikeResult {
  liked: boolean;
  likeCount: number;
}

export interface LikeStatusResult {
  liked: boolean;
}

export interface GetPostLikesParams {
  postId: string;
  page?: number;
  limit?: number;
}

export interface GetUserLikedPostsParams {
  userId: string;
  page?: number;
  limit?: number;
}

// Toggle like/unlike with transaction (prevents double likes)
export const toggleLike = async (
  postId: string,
  userId: string
): Promise<ToggleLikeResult> => {
  return await prisma.$transaction(async (tx) => {
    // Check if post exists
    const post = await tx.post.findUnique({
      where: { id: postId },
    });
    if (!post) {
      throw new AppError(404, 'like', 'Post not found');
    }

    // Check if user already liked this post
    const existingLike = await tx.like.findFirst({
      where: { postId, userId },
    });

    if (existingLike) {
      // Unlike: remove the like
      await tx.like.delete({
        where: { id: existingLike.id },
      });
      
      const newCount = await tx.like.count({
        where: { postId },
      });
      
      return { liked: false, likeCount: newCount };
    } else {
      // Like: create new like
      await tx.like.create({
        data: {
          id: crypto.randomUUID(),
          postId,
          userId,
        },
      });
      
      const newCount = await tx.like.count({
        where: { postId },
      });
      
      return { liked: true, likeCount: newCount };
    }
  });
};

// Get like status for a specific user on a post
export const getLikeStatus = async (
  postId: string,
  userId: string
): Promise<LikeStatusResult> => {
  const like = await prisma.like.findFirst({
    where: { postId, userId },
  });
  
  return { liked: !!like };
};

// Get all users who liked a post (with pagination)
export const getPostLikes = async (params: GetPostLikesParams) => {
  const { postId, page = 1, limit = 20 } = params;
  const skip = (page - 1) * limit;

  // Check if post exists
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });
  if (!post) {
    throw new AppError(404, 'like', 'Post not found');
  }

  const [likes, total] = await Promise.all([
    prisma.like.findMany({
      where: { postId },
      skip,
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.like.count({ where: { postId } }),
  ]);

  return {
    data: likes.map((like) => ({
      id: like.id,
      userId: like.userId,
      user: like.user,
      createdAt: like.createdAt,
    })),
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

// Get all posts liked by a user (with pagination)
export const getUserLikedPosts = async (params: GetUserLikedPostsParams) => {
  const { userId, page = 1, limit = 10 } = params;
  const skip = (page - 1) * limit;

  const [likes, total] = await Promise.all([
    prisma.like.findMany({
      where: { userId },
      skip,
      take: limit,
      include: {
        post: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            _count: {
              select: {
                Like: true,
                Comment: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.like.count({ where: { userId } }),
  ]);

  return {
    data: likes.map((like) => ({
      likedAt: like.createdAt,
      post: like.post,
    })),
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

// Get total like count for a post
export const getPostLikeCount = async (postId: string): Promise<number> => {
  return await prisma.like.count({
    where: { postId },
  });
};

// Delete all likes for a post (useful for post deletion - though cascade handles it)
export const deleteAllPostLikes = async (postId: string): Promise<void> => {
  await prisma.like.deleteMany({
    where: { postId },
  });
};