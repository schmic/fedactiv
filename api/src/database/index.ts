import { Pool } from 'pg'

export const pool = new Pool({
    max: 20,
    min: 5,
    idleTimeoutMillis: 30 * 1000,
    connectionTimeoutMillis: 30 * 1000,
})

export const { connect, query, end } = pool

pool.on('connect', () => console.log('pg.client connect'))
pool.on('error', (err, client) => { 
    console.log('err', err, 'client', client)
})
pool.on('remove', () => console.log('pg.client remove'))
