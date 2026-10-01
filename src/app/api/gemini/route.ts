export async function POST() {
  return new Response(
    JSON.stringify({
      message: "ShadowTrace operates completely offline with procedural case generation and local tactical progressive hints. External AI is no longer required."
    }),
    { 
      status: 200, 
      headers: { "Content-Type": "application/json" } 
    }
  );
}
