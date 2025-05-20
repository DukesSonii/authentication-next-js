// src/app/api/auth/login/route.js
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { createToken } from '@/lib/auth';

export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user) {
    return Response.json({ error: 'User not found' }, { status: 400 });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return Response.json({ error: 'Invalid credentials' }, { status: 400 });
  }

  const token = createToken(user);

  // Set secure HTTP-only cookie
  const response = Response.json({ message: 'Login success' });
  response.headers.set('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict; Secure`);

  return response;
}
