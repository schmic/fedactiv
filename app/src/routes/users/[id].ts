import type { RequestHandler } from "$generated/routes/users/__types/[id]";
import { config } from "$lib/config";
import { pool } from "$lib/database";

export const get: RequestHandler = async ({ params, url }) => {
  const { id } = params;
  const { domain } = config

  console.log(`${id}@${domain}`, url.href)

  const res = await pool.query<User>('SELECT * FROM users WHERE id = $1', [id])

  if (res.rowCount !== 1) return { status: 404 }

  const { name, summary, icon } = res.rows[0]
  const preferredUsername = id

  const user = {
    '@context': 'https://www.w3.org/ns/activitystreams',
    'id': `https://${domain}/users/${id}`,
    'type': 'Person',

    'inbox': `https://${domain}/users/${id}/inbox`,
    'outbox': `https://${domain}/users/${id}/outbox`,
    'followers': `https://${domain}/users/${id}/followers`,
    'following': `https://${domain}/users/${id}/following`,
    'liked': `https://${domain}/users/${id}/liked`,

    preferredUsername,
    name,
    summary,
    'icon': {
      'type': 'Image',
      'mediaType': 'image/jpeg',
      'url': `https://${domain}/static/accounts/avatars/78c11c1f6fbe3478.jpg`
    },
    'image': {
      'type': 'Image',
      'mediaType': 'image/jpeg',
      'url': `https://${domain}/static/accounts/headers/5ccb5da5e7712901.jpg`
    }
  }

  return {
    status: 200,
    headers: {
      // 'Content-Type': 'application/ld+json'
    },
    body: { user }
  };
}
