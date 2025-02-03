// src/app/page.tsx
import React from "react";
import { AdminDashboard } from "./admin"

export default function AdminPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <AdminDashboard />
    </main>
  );
}