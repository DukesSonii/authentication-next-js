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

  return Response.json({ message: 'Login success', token });
}
