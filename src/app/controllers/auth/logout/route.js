// src/app/controllers/auth/logout/route.js

export async function POST(req) {
  // Remove the token by setting it with Max-Age=0
  const response = new Response(JSON.stringify({ message: 'Logged out' }), {
    status: 200,
    headers: {
      'Set-Cookie': `token=; Path=/; HttpOnly; Max-Age=0; SameSite=Strict`,
      'Content-Type': 'application/json'
    }
  });

  return response;
}

export function GET() {
  return new Response('Method Not Allowed', {
    status: 405,
    headers: {
      Allow: 'POST'
    }
  });
}
