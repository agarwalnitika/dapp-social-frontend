/**
 * Token management utilities for authentication
 */

/**
 * Stores the authentication token in localStorage
 * @param token - The JWT token to store
 */
export function setToken(token: string) {
  if (typeof window === "undefined") return null;
  localStorage.setItem("token", token);
}

/**
 * Retrieves the authentication token from localStorage
 * @returns The stored token or null if not found
 */
export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

/**
 * Removes the authentication token from localStorage
 */
export function removeToken() {
  if (typeof window === "undefined") return null;
  localStorage.removeItem("token");
}

/**
 * Checks if a user is currently logged in
 * @returns boolean indicating if a valid token exists
 */
export function isLoggedIn(): boolean {
  return !!getToken();
}
