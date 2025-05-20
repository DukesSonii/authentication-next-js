 import { verifyToken } from "@/lib/auth";
import User from "@/models/User";
import { connectDB } from "@/lib/db";

export async function GET(req) {
  await connectDB();

  const cookie = req.headers.get("cookie") || "";
  const token = cookie
    .split(";")
    .find(c => c.trim().startsWith("token="))
    ?.split("=")[1];

  if (!token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id).select("name email");
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json(user);
  } catch (err) {
    return Response.json({ error: "Invalid token" }, { status: 401 });
  }
}
