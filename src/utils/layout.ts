import { theme } from 'styles/theme'

export function getLogoHeightForGivenWidth(width: number): number {
  return (26 / 159) * width // Base logo: 156 x 29
}

export function toPixels(rem: string): number {
  const remValue = parseFloat(rem.substr(0, rem.length - 3))
  return remValue * parseFloat(theme.rootFontSize)
}
