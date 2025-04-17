export async function POST(req) {
  const response = new Response(JSON.stringify({ message: 'Admin logged out' }), {
    status: 200,
    headers: {
      'Set-Cookie': `adminToken=; Path=/; HttpOnly; Max-Age=0; SameSite=Strict`,
      'Content-Type': 'application/json',
    },
  });

  return response;
}
