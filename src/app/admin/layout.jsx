
// src/app/admin/layout.jsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

export default async function AdminLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("prism_session_token")?.value;

  if (!token || !process.env.JWT_SECRET) {
    redirect("/login");
  }

  try {
    const session = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof session === "string" || session.role !== "admin") {
      redirect("/login");
    }
  } catch {
    redirect("/login");
  }

  return children;
}
