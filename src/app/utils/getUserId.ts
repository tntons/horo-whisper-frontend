import { apiFetch } from '@/lib/api/fetch'

export async function getUserId(): Promise<number> {
  const { id } = await apiFetch('/me', { method: 'GET' }, { skipAuth: false })
  return id
}