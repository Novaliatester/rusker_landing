/**
 * Get the base path for assets (images, etc.)
 * For Vercel: No basePath needed (empty by default)
 * For GitHub Pages: Set NEXT_PUBLIC_BASE_PATH='/rusker_landing' if needed
 */
export function getAssetPath(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return basePath ? `${basePath}/${cleanPath}` : `/${cleanPath}`
}

/**
 * Get image URL with base path
 */
export function getImageUrl(path: string): string {
  return getAssetPath(path)
}

