/**
 * Legal mention required on every invoice and receipt: Rusker Travel, S.L. sells
 * under the special scheme for travel agencies (régimen especial de las agencias
 * de viajes), LIVA arts. 141–147. VAT is included in the price, computed on the
 * agency margin, and is not separately itemised or recoverable by the buyer.
 */
export const REGIME_MENTION_FR =
  'Régime particulier des agences de voyages (art. 141 à 147 de la LIVA). ' +
  'TVA comprise dans le prix, non ventilée et non déductible.'

export const REGIME_MENTION_EN =
  'Special scheme for travel agents (arts. 141 to 147 of the LIVA). ' +
  'VAT included in the price, not itemised and not deductible.'

export function regimeMention(locale: string): string {
  return locale === 'en' ? REGIME_MENTION_EN : REGIME_MENTION_FR
}
