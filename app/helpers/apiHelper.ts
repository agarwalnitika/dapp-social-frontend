import { API_BASE_URL } from "./config";

/**
 * Validates if a string is a valid HTTP/HTTPS URL
 * @param string - The URL string to validate
 * @returns boolean - True if valid HTTP/HTTPS URL, false otherwise
 */
export function isValidHttpUrl(string: string) {
  try {
    const url = new URL(string);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (err) {
    console.warn("failed to construct", err);
    return false;
  }
}

/**
 * Adds a like to a post by a specific wallet address
 * @param postId - The ID of the post to like
 * @param wallet_address - The wallet address of the user liking the post
 * @throws Logs error to console if the like operation fails
 */
export const addLikeOnPost = async (postId: number, wallet_address: string) => {
  try {
    await fetch(`${API_BASE_URL}/posts/${postId}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postId,
        wallet_address,
      }),
    });
  } catch (err) {
    console.error("Like error:", err);
  }
};

/**
 * Adds a comment to a post
 * @param postId - The ID of the post to comment on
 * @param text - The comment text content
 * @param wallet_address - The wallet address of the user commenting
 * @throws Logs error to console if the comment operation fails
 */
export const addCommentOnPost = async (
  postId: number,
  text: string,
  wallet_address: string
) => {
  try {
    await fetch(`${API_BASE_URL}/posts/${postId}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postId,
        content: text,
        wallet_address,
      }),
    });
  } catch (err) {
    console.error("Comment error:", err);
  }
};

/**
 * Creates a new post
 * @param wallet_address - The wallet address of the post creator
 * @param content - The content of the post
 * @throws Error if post creation fails
 */
export const createPost = async (
  wallet_address: string,
  content: string
): Promise<void> => {
  try {
    const res = await fetch(`${API_BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ wallet_address, content }),
    });

    if (!res.ok) throw new Error("Failed to create post");
  } catch (err) {
    console.error("Error creating post:", err);
    throw err;
  }
};

/**
 * Fetches all posts from the API
 * @returns Promise<Array> - Array of posts, empty array if fetch fails
 */
export const getAllPosts = async (): Promise<any[]> => {
  try {
    const res = await fetch(`${API_BASE_URL}/posts`);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Error fetching posts:", err);
    return [];
  }
};

/**
 * Fetches a specific post by its ID
 * @param postId - The ID of the post to fetch
 * @returns Promise<Object|null> - The post data or null if not found/fetch fails
 */
export const getPostById = async (postId: string): Promise<any | null> => {
  try {
    const res = await fetch(`${API_BASE_URL}/posts/${postId}`);
    if (!res.ok) throw new Error("Failed to fetch post");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(`Error fetching post ${postId}:`, err);
    return null;
  }
};
