// app/feed/page.tsx or app/feed.tsx
"use client";

import RequireAuth from "../auth/components/RequireAuth";
import Sidebar from "../components/Sidebar";
import FeedComponent from "./components/FeedComponent";

export default function FeedPage() {
  return (
    <RequireAuth>
      <Sidebar />
      <FeedComponent />
    </RequireAuth>
  );
}
