/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
export default function combineURLs(baseURL: string, relativeURL: string) {
  if (!relativeURL) {
    return ''
  }
  if (relativeURL.startsWith('blob')) return relativeURL
  if (relativeURL.indexOf(baseURL) === 0) return relativeURL
  if (relativeURL.includes('://')) return relativeURL
  if (relativeURL.startsWith('~/'))
    return relativeURL.replace(/^~\/+/, '/_nuxt/')

  return baseURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : relativeURL
}
