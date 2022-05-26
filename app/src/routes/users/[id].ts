import type { RequestHandler } from "$generated/routes/users/__types/[id]";
import { config } from "$lib/config";

export const get: RequestHandler = async ({ params, url }) => {
  const { id } = params;
  const { domain } = config

  console.log(`${id}@${domain}`, url.pathname)

  const resp = await fetch(`http://api:3000${url.pathname}`)
  if (!resp.ok)
    return { status: 404 }

  const user = await resp.json()

  return {
    status: 200,
    body: { user }
  };
}
