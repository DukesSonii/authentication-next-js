export async function POST(req) {
    const response = new Response(JSON.stringify({ message: 'Seller logged out' }), {
      status: 200,
      headers: {
        'Set-Cookie': `seller_token=; Path=/; HttpOnly; Max-Age=0; SameSite=Strict`,
        'Content-Type': 'application/json'
      }
    });
    return response;
  }
  