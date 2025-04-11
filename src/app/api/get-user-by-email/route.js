import { connectDB } from '@/lib/db';
import User from '@/models/User';

export async function POST(req) {
  await connectDB();
  const { email } = await req.json();

  const user = await User.findOne({ email }).select('-password');
  if (!user) return Response.json({ error: 'User not found' }, { status: 404 });

  return Response.json(user);
}
