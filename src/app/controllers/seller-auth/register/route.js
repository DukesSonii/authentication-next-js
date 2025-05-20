import { connectDB } from '@/lib/db';
import Seller from '@/models/Seller';
import bcrypt from 'bcryptjs';
import { createSellerToken } from '@/lib/auth';

export async function POST(req) {
  await connectDB();
  const { name, email, password } = await req.json();

  const existingSeller = await Seller.findOne({ email });
  if (existingSeller) {
    return Response.json({ error: 'Seller already exists' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newSeller = new Seller({
    name,
    email,
    password: hashedPassword,
  });

  await newSeller.save();

  const token = createSellerToken(newSeller);

  const response = Response.json({ message: 'Seller registered successfully' });
  response.headers.set(
    'Set-Cookie',
    `seller_token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict; Secure`
  );

  return response;
}
