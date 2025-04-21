import { apiFetch } from '@/lib/api/fetch'

export async function getTellerId(): Promise<number> {
  const { id } = await apiFetch('/me/teller', { method: 'GET' }, { skipAuth: false })
  return id
}