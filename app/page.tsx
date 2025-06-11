/**
 * Root page component
 * Handles authentication state and redirects to appropriate pages
 */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "./helpers/token";
import FeedPage from "./feed/page";

export default function HomePage() {
  const router = useRouter();
  // Prevent flash of unauthenticated content
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const loggedIn = isLoggedIn();
    if (!loggedIn) {
      router.push("/login");
    } else {
      setAuthenticated(true);
    }
    setLoading(false);
  }, [router]);

  // Don't render anything while checking auth state
  if (loading || !authenticated) return null;

  return <FeedPage />;
}
