import { connectDB } from '@/lib/db';
import Seller from '@/models/Seller';
import bcrypt from 'bcryptjs';
import { createSellerToken } from '@/lib/auth';

export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();

  const seller = await Seller.findOne({ email });
  if (!seller) {
    return Response.json({ error: 'Seller not found' }, { status: 400 });
  }

  const match = await bcrypt.compare(password, seller.password);
  if (!match) {
    return Response.json({ error: 'Invalid credentials' }, { status: 400 });
  }

  const token = createSellerToken(seller);

  const response = Response.json({ message: 'Login success' });
  response.headers.set('Set-Cookie', `seller_token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict; Secure`);

  return response;
}
