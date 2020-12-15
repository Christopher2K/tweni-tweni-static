export function applyIf(
  condition: boolean | undefined | null,
  style: string,
): string {
  return condition ? style : ''
}
