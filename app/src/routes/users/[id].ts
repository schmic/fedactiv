import type { RequestHandler } from "$generated/routes/users/__types/[id]";
import { config } from "$lib/config";

export const get: RequestHandler = async ({ params, url }) => {
  const { id } = params;
  const { domain } = config

  console.log(`${url.pathname} => ${id}@${domain}`)

  const resp = await fetch(`http://api:3000${url.pathname}`)

  if (resp.status === 404)
    return { status: 404 }

  if (!resp.ok)
    return { status: resp.status }

  const user: PublicProfile = await resp.json()

  return {
    status: 200,
    body: { user }
  };
}
