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

export const get: RequestHandler = async ({ url, locals }) => {
  if (!locals.profile)
    throw new Error('No profile found, aborting')

  const { VITE_DROPBOX_CLIENT_ID: client_id, VITE_DROPBOX_CLIENT_SECRET: client_secret } = import.meta.env

  const code_verifier = Buffer.from(randomUUID()).toString("hex");
  const code_challenge = Base64URL.fromBase64(SHA("sha256").update(code_verifier).digest("base64"))
  const redirect_uri = getRedirectUri(url);
  const state = Buffer.from(randomUUID()).toString("base64")

  const params = new URLSearchParams({
    client_id,
    client_secret,
    code_challenge,
    code_challenge_method: "S256",
    response_type: "code",
    token_access_type: "offline",
    // scope: "account_info.read files.metadata.read files.content.read",
    redirect_uri,
    state,
  });

  const redirectTo = new URL(
    `https://www.dropbox.com/oauth2/authorize?${params.toString()}`
  );

  await redis.set(`dropbox:oidc:${state}`, JSON.stringify({ code_verifier }), 'EX', 300);

  return {
    status: 302,
    headers: {
      'Location': redirectTo.href
    }
  }
}