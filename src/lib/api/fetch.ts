export async function apiFetch(path: string, opts: RequestInit = {}) {
  const token = localStorage.getItem('APP_TOKEN')
  if (!token) throw new Error('Not authenticated')
  const headers = new Headers(opts.headers)
  headers.set('Authorization', `Bearer ${token}`)
  headers.set('Content-Type', 'application/json')
  const res = await fetch(`http://localhost:8000${path}`, {
    ...opts,
    headers,
  })
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`)
  return res.json()
}