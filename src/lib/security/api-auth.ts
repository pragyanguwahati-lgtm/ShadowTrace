/**
 * ShadowTrace API Key Authentication Guard
 * Validates incoming HTTP requests against configured operative API keys.
 */

import { NextRequest } from "next/server";

// Fallback development API key for prototyping if environment variable is not explicitly configured
const DEFAULT_DEV_API_KEY = "st_live_operative_key_9x8f7d6e5c4b3a2";

export interface ApiAuthResult {
  authenticated: boolean;
  error?: string;
  keyUsed?: string;
}

/**
 * Validates whether the incoming request possesses a valid ShadowTrace API Key.
 * Checks:
 * 1. 'x-api-key' header
 * 2. 'Authorization: Bearer <API_KEY>' header
 */
export function validateApiKey(request: NextRequest): ApiAuthResult {
  const configuredKey = process.env.SHADOWTRACE_API_KEY || process.env.API_SECRET_KEY || DEFAULT_DEV_API_KEY;

  // Extract from x-api-key header
  const headerKey = request.headers.get("x-api-key");
  if (headerKey && headerKey.trim() === configuredKey.trim()) {
    return { authenticated: true, keyUsed: "x-api-key" };
  }

  // Extract from Authorization header (Bearer token)
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.toLowerCase().startsWith("bearer ")) {
    const bearerToken = authHeader.substring(7).trim();
    if (bearerToken === configuredKey.trim()) {
      return { authenticated: true, keyUsed: "bearer" };
    }
  }

  return {
    authenticated: false,
    error: "Unauthorized: Missing or invalid Operative API Key. Provide a valid 'x-api-key' or 'Authorization: Bearer <KEY>' header."
  };
}
