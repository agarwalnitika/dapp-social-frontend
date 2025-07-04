/**
 * Utility functions for formatting and data manipulation
 */

/**
 * Formats a timestamp into a human-readable relative time string
 * @param dateString - ISO date string to format
 * @returns Formatted time string (e.g., "5m", "2h", "3d", "Jun 10")
 */
export function formatTimestamp(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);

  if (diffSec < 60) return `${diffSec}s`;
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h`;
  if (diffSec < 2592000) return `${Math.floor(diffSec / 86400)}d`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  }); // e.g., Jun 10
}
