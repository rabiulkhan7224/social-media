import prisma from "@social-media/db";
import AppError from "../../errors/AppError";
import type { Prisma } from "node_modules/@social-media/db/prisma/generated/client";
import type { GetPostsParams, GetPostsResult } from "./post.interface";

// export const createPost = async (
//     data: { content: string; image?: string },
//     userId: string
// ) => {
//   try {
//     const post = await prisma.post.create({
//       data: {
//         content: data.content,
//         image: data.image || null,
//         authorId: userId
//       },

//     })

//     return post
//   } catch (error) {
//     if (error instanceof Error) {
//       throw new AppError(500, 'database', 'Failed to create post', error.message)
//     }
//     throw error
//   }
// }

export const createPost = async (
  userId: string,
  data: { content: string; image?: string },
) => {
  try {
    const post = await prisma.post.create({
      data: {
        content: data.content,
        image: data.image || null,
        authorId: userId,
      },
      include: {
        author: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });

    return post;
  } catch (error) {
    if (error instanceof Error) {
      throw new AppError(
        500,
        "database",
        "Failed to create post",
        error.message,
      );
    }
    throw error;
  }
};

export const getPosts = async (
  params: GetPostsParams = {},
): Promise<GetPostsResult> => {
  const {
    page = 1,
    limit = 20,
    search,
    sortBy = "createdAt",
    sortOrder = "desc",
    includeComments = false,
    includeLikes = false,
    includeAuthor = true,
  } = params;

  const skip = (page - 1) * limit;
  const take = limit;

  // Build where clause
  const where: Prisma.PostWhereInput = {};

  if (search) {
    where.OR = [{ content: { contains: search, mode: "insensitive" } }];
  }

  const include: Prisma.PostInclude = {};
  if (includeAuthor) {
    include.author = {
      //  without email for privacy
      select: {
        id: true,
        name: true,
        image: true,
      },
    };
  }
  if (includeComments) {
    include.Comment = {
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    };
  }
  if (includeLikes) {
    include.Like = true;
  }

  // Run both queries in parallel
  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      skip,
      take,
      orderBy: { [sortBy]: sortOrder },
      include,
    }),
    prisma.post.count({ where }),
  ]);

  // Optionally add counts even if not including full relations
  const postsWithCounts = await Promise.all(
    posts.map(async (post) => {
      const [commentCount, likeCount] = await Promise.all([
        prisma.comment.count({ where: { postId: post.id } }),
        prisma.like.count({ where: { postId: post.id } }),
      ]);
      return {
        ...post,
        _count: {
          comments: commentCount,
          likes: likeCount,
        },
      };
    }),
  );

  return {
    data: postsWithCounts,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getPostById = async (postId: string, userId?: string) => {
  // Fetch the post with author
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
     Comment:{
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    }
    },
  });

  if (!post) {
    throw new AppError(404, "post", "Post not found");
  }

  // Get counts
  const [commentCount, likeCount] = await Promise.all([
    prisma.comment.count({ where: { postId } }),
    prisma.like.count({ where: { postId } }),
  ]);

  // Check if user liked this post (if userId provided)
  let userLiked = false;
  if (userId) {
    const like = await prisma.like.findFirst({
      where: { postId, userId },
    });
    userLiked = !!like;
  }

  return {
    ...post,
    commentCount,
    likeCount,
    userLiked,
  };
};
