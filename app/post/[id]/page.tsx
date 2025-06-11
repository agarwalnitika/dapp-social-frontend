"use client";

import PostDetailsComponent from "./components/PostDetailsPage";

import RequireAuth from "../../providers/RequireAuth";
import Sidebar from "@/app/components/Sidebar";

export default function PostDetailsPage() {
  return (
    <>
      <Sidebar />
      <PostDetailsComponent />
    </>
  );
}
