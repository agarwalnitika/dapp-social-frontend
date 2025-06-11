"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "./auth/utils/token";
import FeedPage from "./feed/page";

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // to prevent flicker
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

  if (loading || !authenticated) return null;

  return <FeedPage />;
}
