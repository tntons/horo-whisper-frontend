export const formatDate = (iso?: string) =>
    iso
        ? new Date(iso).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })
        : ''

export const formatTime = (iso?: string) =>
    iso
        ? new Date(iso).toLocaleTimeString('th', {
            hour: '2-digit',
            minute: '2-digit',
        })
        : ''

export const formatDuration = (startIso?: string, endIso?: string) => {
    if (!startIso || !endIso) return ''
    const start = new Date(startIso).getTime()
    const end = new Date(endIso).getTime()
    const diff = end - start
    const hrs = Math.floor(diff / 3_600_000)
    const mins = Math.floor((diff % 3_600_000) / 60_000)
    return `${hrs}hr ${mins}min`
}

export function timeAgo(iso: string): string {
  const delta = Date.now() - new Date(iso).getTime()
  const hours = Math.floor(delta / 3_600_000)
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`
  const minutes = Math.floor((delta % 3_600_000) / 60_000)
  return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`
}