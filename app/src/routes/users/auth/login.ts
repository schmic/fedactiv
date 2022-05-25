import { config } from '$lib/config';
import { redis } from '$lib/redis';
import type { RequestHandler } from "@sveltejs/kit";
import Base64URL from 'base64url';
import { randomUUID } from 'crypto';
import SHA from 'sha.js';

const getRedirectUri = (url: URL) => {
  return `${url.origin.replace("http:", "https:")}${url.pathname.replace(
    "/login",
    "/callback"
  )}`;
};

export const get: RequestHandler = async ({ url }) => {
  const code_verifier = Buffer.from(randomUUID()).toString("hex");
  const code_challenge = Base64URL.fromBase64(SHA("sha256").update(code_verifier).digest("base64"))
  const client_id = config.oidc.client_id;
  const redirect_uri = getRedirectUri(url);
  const state = Buffer.from(randomUUID()).toString("base64")

  const params = new URLSearchParams({
    client_id,
    code_challenge,
    code_challenge_method: "S256",
    response_type: "code",
    scope: "openid profile email", // offline_access,
    redirect_uri,
    state,
  });

  const redirectTo = new URL(
    `${config.oidc.server}/protocol/openid-connect/auth?${params.toString()}`
  );

  await redis.set(`oidc:${state}`, JSON.stringify({ code_verifier }), 'EX', 300);

  return {
    status: 302,
    headers: {
      'Location': redirectTo.href
    }
  }
}