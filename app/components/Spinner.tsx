import React from "react";

export default function Spinner({ size = 24, color = "border-blue-600" }) {
  return (
    <div
      className={`inline-block animate-spin rounded-full border-2 border-t-transparent ${color}`}
      style={{ width: size, height: size }}
      role="status"
      aria-label="loading"
    />
  );
}
