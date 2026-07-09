/** Curated country list for the billing form — codes only; labels come from Intl.DisplayNames. */
export const BILLING_COUNTRIES = [
  'FR', 'ES', 'BE', 'CH', 'LU', 'MC', 'DE', 'IT', 'PT', 'NL', 'GB', 'IE', 'AT',
  'DK', 'SE', 'NO', 'FI', 'PL', 'CZ', 'RO', 'GR', 'HU', 'MA', 'TN', 'US', 'CA',
] as const

export function countryLabel(code: string, locale: string): string {
  try {
    return new Intl.DisplayNames([locale], { type: 'region' }).of(code) ?? code
  } catch {
    return code
  }
}
