"use client";

import PostDetailsComponent from "./components/PostDetailsPage";

import RequireAuth from "../../auth/components/RequireAuth";
import Sidebar from "@/app/components/Sidebar";

export default function PostDetailsPage() {
  return (
    <RequireAuth>
      <Sidebar />
      <PostDetailsComponent />
    </RequireAuth>
  );
}
