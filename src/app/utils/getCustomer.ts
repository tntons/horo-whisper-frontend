import { apiFetch } from '@/lib/api/fetch'

export async function getCustomerId(): Promise<number> {
  const { id } = await apiFetch('/me/customer', { method: 'GET' }, { skipAuth: false })
  return id
}