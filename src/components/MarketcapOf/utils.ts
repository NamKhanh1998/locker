export function generateXPostLink({ url, text, hashtags = [] }: any) {
  const baseUrl = 'https://x.com/intent/post'

  const params = new URLSearchParams({
    url: url,
    text: text,
  })

  if (hashtags.length > 0) {
    params.append('hashtags', hashtags.join(','))
  }

  return `${baseUrl}?${params.toString()}`
}
