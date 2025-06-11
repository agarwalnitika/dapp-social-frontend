/**
 * Main feed page component that displays the social feed
 * Includes sidebar navigation and the main feed content
 */
"use client";

import RequireAuth from "../providers/RequireAuth";
import Sidebar from "../components/Sidebar";
import FeedComponent from "./components/FeedComponent";

export default function FeedPage() {
  return (
    // <RequireAuth>
    <>
      <Sidebar />
      <FeedComponent />
    </>
    // </RequireAuth>
  );
}
