import { apiFetch } from '@/lib/api/fetch'

export async function getTellerId(): Promise<number> {
  const response = await apiFetch('/me/teller', { method: 'GET' }, { skipAuth: false })
  console.log('Teller ID response:', response)
  return response.id
}