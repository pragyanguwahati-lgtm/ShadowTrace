import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/security/rate-limiter";
import { validateApiKey } from "@/lib/security/api-auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only apply security controls to /api/* routes
  if (!pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // 1. Resolve client IP address (supporting reverse proxies and Vercel edge)
  const forwardedFor = request.headers.get("x-forwarded-for");
  const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : (request.headers.get("x-real-ip") || "127.0.0.1");

  // Determine rate limit threshold: 15 req/min for sensitive/intel APIs, 60 req/min for standard APIs
  const isSensitive = pathname.startsWith("/api/intel") || pathname.startsWith("/api/protected");
  const limit = isSensitive ? 15 : 60;
  const windowMs = 60 * 1000;

  // 2. Evaluate Rate Limiting
  const rateLimitResult = checkRateLimit(clientIp, limit, windowMs);

  if (!rateLimitResult.isAllowed) {
    return new NextResponse(
      JSON.stringify({
        error: "Too Many Requests",
        message: "Tactical relay rate limit exceeded. IP throttled to mitigate denial-of-service and brute-force traffic.",
        limit: rateLimitResult.limit,
        retryAfterSeconds: 60
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": "60",
          "X-RateLimit-Limit": rateLimitResult.limit.toString(),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": rateLimitResult.reset.toString()
        }
      }
    );
  }

  // 3. Evaluate API Key Authentication on Protected Endpoints
  if (isSensitive) {
    const authResult = validateApiKey(request);
    if (!authResult.authenticated) {
      return new NextResponse(
        JSON.stringify({
          error: "Unauthorized",
          message: authResult.error || "Valid Operative API Key required to query classified intelligence relays."
        }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
            "WWW-Authenticate": "ApiKey",
            "X-RateLimit-Limit": rateLimitResult.limit.toString(),
            "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
            "X-RateLimit-Reset": rateLimitResult.reset.toString()
          }
        }
      );
    }
  }

  // 4. Attach Rate Limit Telemetry Headers to downstream response
  const response = NextResponse.next();
  response.headers.set("X-RateLimit-Limit", rateLimitResult.limit.toString());
  response.headers.set("X-RateLimit-Remaining", rateLimitResult.remaining.toString());
  response.headers.set("X-RateLimit-Reset", rateLimitResult.reset.toString());

  return response;
}

// Restrict middleware matching exclusively to API pathways
export const config = {
  matcher: ["/api/:path*"]
};
