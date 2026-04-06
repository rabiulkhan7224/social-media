"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

// Types
export interface Post {
  id: string;
  title: string | null;
  content: string;
  image: string | null;
  authorId: string;
  author?: {
    id: string;
    name: string | null;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
  _count?: {
    comments: number;
    likes: number;
  };
  userLiked?: boolean;
}

export interface CreatePostInput {
  title?: string;
  content: string;
  image?: string | null;
}

export interface GetPostsParams {
  page?: number;
  limit?: number;
  authorId?: string;
  search?: string;
  includeComments?: boolean;
  includeLikes?: boolean;
  includeAuthor?: boolean;
  sortBy?: "createdAt" | "updatedAt" | "title";
  sortOrder?: "asc" | "desc";
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// API URL from environment
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// Helper function to get headers with auth cookie
async function getHeaders() {
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();

  return {
    "Content-Type": "application/json",
    Cookie: cookieString,
  };
}

// ============ GET POSTS (with filters & pagination) ============
export async function getPosts(
  params: GetPostsParams = {},
): Promise<ApiResponse<Post[]>> {
  try {
    const {
      page = 1,
      limit = 10,
      authorId,
      search,
      sortBy = "createdAt",
      sortOrder = "desc",
      includeAuthor="true",
      includeComments="true",
      includeLikes="true",
    } = params;

    // Build query string
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sortBy,
      sortOrder,
      includeAuthor: includeAuthor.toString(),
      includeComments: includeComments.toString(),
      includeLikes: includeLikes.toString(),
    });

    if (authorId) queryParams.append("authorId", authorId);
    if (search) queryParams.append("search", search);

    const response = await fetch(`${API_URL}/v1/api/posts?${queryParams}`, {
      method: "GET",
        headers: await getHeaders(),
        cache: 'no-store', // Don't cache for real-time data
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch posts");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch posts",
      data: [],
    };
  }
}

// ============ GET SINGLE POST BY ID ============
export async function getPostById(id: string): Promise<ApiResponse<Post>> {
  try {
    const response = await fetch(`${API_URL}/v1/api/posts/${id}`, {
      method: "GET",
      headers: await getHeaders(),
      cache: "no-store",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch post");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching post:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch post",
    };
  }
}

// ============ CREATE POST ============
export async function createPost(
  formData: FormData,
): Promise<ApiResponse<Post>> {
  try {
    // Extract data from FormData
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const image = formData.get("image") as string | null;

    // Validation
    if (!content || content.trim().length === 0) {
      return {
        success: false,
        message: "Content is required",
      };
    }

    if (content.length > 10000) {
      return {
        success: false,
        message: "Content must be less than 10000 characters",
      };
    }

    const payload = {
      title: title || null,
      content: content.trim(),
      image: image || null,
    };

    const response = await fetch(`${API_URL}/v1/api/posts/create`, {
      method: "POST",
      headers: await getHeaders(),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create post");
    }

    const data = await response.json();

    // Revalidate the posts list page
    revalidatePath("/dashboard");
    revalidatePath("/posts");

    return data;
  } catch (error) {
    console.error("Error creating post:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to create post",
    };
  }
}

// ============ CREATE POST WITH JSON INPUT (alternative to FormData) ============
export async function createPostJson(
  input: CreatePostInput,
): Promise<ApiResponse<Post>> {
  try {
    // Validation
    if (!input.content || input.content.trim().length === 0) {
      return {
        success: false,
        message: "Content is required",
      };
    }

    if (input.content.length > 10000) {
      return {
        success: false,
        message: "Content must be less than 10000 characters",
      };
    }

    const response = await fetch(`${API_URL}/v1/api/posts/create`, {
      method: "POST",
      headers: await getHeaders(),
      body: JSON.stringify({
        title: input.title || null,
        content: input.content.trim(),
        image: input.image || null,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create post");
    }

    const data = await response.json();

    // Revalidate the posts list page
    revalidatePath("/dashboard");
    revalidatePath("/posts");

    return data;
  } catch (error) {
    console.error("Error creating post:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to create post",
    };
  }
}

// ============ UPDATE POST ============
export async function updatePost(
  id: string,
  formData: FormData,
): Promise<ApiResponse<Post>> {
  try {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const image = formData.get("image") as string | null;

    if (!content || content.trim().length === 0) {
      return {
        success: false,
        message: "Content is required",
      };
    }

    const response = await fetch(`${API_URL}/v1/api/posts/${id}`, {
      method: "PUT",
      headers: await getHeaders(),
      body: JSON.stringify({
        title: title || null,
        content: content.trim(),
        image: image || null,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update post");
    }

    const data = await response.json();

    revalidatePath(`/posts/${id}`);
    revalidatePath("/dashboard");

    return data;
  } catch (error) {
    console.error("Error updating post:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to update post",
    };
  }
}

// ============ DELETE POST ============
export async function deletePost(id: string): Promise<ApiResponse<null>> {
  try {
    const response = await fetch(`${API_URL}/v1/api/posts/${id}`, {
      method: "DELETE",
      headers: await getHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to delete post");
    }

    // Revalidate the posts list
    revalidatePath("/dashboard");
    revalidatePath("/posts");

    return {
      success: true,
      message: "Post deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting post:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to delete post",
    };
  }
}
