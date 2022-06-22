import Router from '@koa/router'
import { ParameterizedContext } from 'koa'
import { config } from '../config'
import { pool } from '../database'

const router = new Router({
    prefix: '/users'
})

type User = {
    id: string
    given_name: string
    family_name: string
    summary: string
    icon: string
}

type ParameterizedUserContext = ParameterizedContext & { user: User }

router.param('id', async (id, ctx: ParameterizedContext, next) => {
    console.log('/users/', ctx.URL.href)
    const res = await pool.query<User>('SELECT * FROM users WHERE id = $1', [id])

    ctx.assert.ok(res.rows.length === 1, 404)
    ctx.user = res.rows[0]

    next()
})

router.get('/:id', (ctx: ParameterizedUserContext) => {
    const { domain } = config

    const { id, given_name, family_name, summary, icon } = ctx.user
    const preferred_username = id

    console.log('users/id', id, icon)

    ctx.body = {
        '@context': 'https://www.w3.org/ns/activitystreams',
        'id': `https://${domain}/users/${id}`,
        'type': 'Person',

        'inbox': `https://${domain}/users/${id}/inbox`,
        'outbox': `https://${domain}/users/${id}/outbox`,
        'followers': `https://${domain}/users/${id}/followers`,
        'following': `https://${domain}/users/${id}/following`,
        'liked': `https://${domain}/users/${id}/liked`,

        preferred_username,
        given_name,
        family_name,
        summary,
        'icon': {
            'type': 'Image',
            'mediaType': 'image/png',
            'url': icon ?
                `https://${domain}/static/accounts/avatars/${icon}.png` :
                `https://${domain}/avatar.png`
        },
        'image': icon || 'avatar' && {
            'type': 'Image',
            'mediaType': 'image/jpeg',
            'url': `https://${domain}/static/accounts/headers/${icon}.jpg`
        }
    }
    ctx.type = 'application/ld+json'
})

router.get('/:id/outbox', (ctx: ParameterizedUserContext) => {
    const { id } = ctx.user
    const { domain } = config

    ctx.body = {
        '@context': 'https://www.w3.org/ns/activitystreams',
        'id': `https://${domain}/users/${id}/outbox`,
        'type': 'OrderedCollection',
        'totalItems': 0,
        'first': `https://${domain}/users/${id}/outbox/page`,
        'last': `https://${domain}/users/${id}/outbox/page?min_id=0`
    }
})

router.get('/:id/outbox/page', (ctx: ParameterizedUserContext) => {
    const { id } = ctx.user
    const { domain } = config

    ctx.body = {
        '@context': [
            'https://www.w3.org/ns/activitystreams'
        ],
        'id': `https://${domain}/users/${id}/outbox/page`,
        'type': 'OrderedCollectionPage',
        'next': `https://${domain}/users/${id}/outbox/page?max_id=0`,
        'prev': `https://${domain}/users/${id}/outbox/page?min_id=0`,
        'partOf': `https://${domain}/users/${id}/outbox`,
        'orderedItems': []
    }
})

router.post('/:id/inbox', (ctx: ParameterizedUserContext) => {
    console.log('ctx', ctx)
    ctx.status = 404
})

router.get('/:id/followers', (ctx: ParameterizedUserContext) => { ctx.status = 404 })
router.get('/:id/following', (ctx: ParameterizedUserContext) => { ctx.status = 404 })
router.get('/:id/liked', (ctx: ParameterizedUserContext) => { ctx.status = 404 })

export const routes = router.routes()
