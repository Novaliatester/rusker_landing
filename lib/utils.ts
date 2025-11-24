/**
 * Get the base path for assets (images, etc.)
 * This ensures images work correctly when deployed to GitHub Pages
 */
export function getAssetPath(path: string): string {
  const basePath = '/rusker_landing'
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${basePath}/${cleanPath}`
}

/**
 * Get image URL with base path
 */
export function getImageUrl(path: string): string {
  return getAssetPath(path)
}

