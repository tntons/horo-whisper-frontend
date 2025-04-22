export async function apiFetch(
  path: string,
  opts: RequestInit = {},
  { skipAuth = false } = {}
) {
  const headers = new Headers(opts.headers)
  headers.set('Content-Type', 'application/json')

  if (!skipAuth) {
    const token = localStorage.getItem('APP_TOKEN')
    if (!token) throw new Error('Not authenticated')
    headers.set('Authorization', `Bearer ${token}`)
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`, {
    ...opts,
    headers,
  })

  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`${res.status} ${txt}`)
  }

  return res.json()
}