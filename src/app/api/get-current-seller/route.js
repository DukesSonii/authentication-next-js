import { verifySellerToken } from "@/lib/auth";
import Seller from "@/models/Seller";
import { connectDB } from "@/lib/db";

export async function GET(req) {
  await connectDB();

  const cookie = req.headers.get("cookie") || "";
  const token = cookie
    .split(";")
    .find(c => c.trim().startsWith("seller_token="))
    ?.split("=")[1];

  if (!token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = verifySellerToken(token);
    const seller = await Seller.findById(decoded.id).select("name email");
    if (!seller) {
      return Response.json({ error: "Seller not found" }, { status: 404 });
    }

    return Response.json(seller);
  } catch (err) {
    return Response.json({ error: "Invalid token" }, { status: 401 });
  }
}
