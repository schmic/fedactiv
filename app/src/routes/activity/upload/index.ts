import type { RequestHandler } from "@sveltejs/kit";

export const post: RequestHandler = async ({ request, locals }) => {
  const { profile } = locals

  if (!profile)
    return { status: 302, headers: { 'Location': '/' } }

  const formData = await request.formData()

  const fitfile = formData.get('fitfile') as File
  console.log('### fitfile', profile.sub, fitfile.name, fitfile.size, fitfile.type)

  const headers = new Headers()
  headers.set('cookie', request.headers.get('cookie') || '')

  const resp = await fetch(`http://api:3000/api/activity`, {
    method: 'PUT',
    headers,
    body: formData
  })

  console.log('resp.status', resp.status)

  if (!resp.ok) return { status: 302, headers: { 'Location': '/auth/login' } }

  const respBody = await resp.json()

  return {
    status: 302,
    headers: {
      'Location': `/activity/${respBody.etag}`
    }
  }
}
