export const isSystemDark = window?.matchMedia
  ? window.matchMedia("(prefers-color-scheme: dark)")?.matches
  : undefined;

export function saveTheme(theme: string) {
  window.localStorage && localStorage.setItem("selectedTheme", theme);
}

export function getThemeFromStorage(): string | null {
  return window.localStorage
    ? (localStorage.getItem("selectedTheme") as string) || null
    : null;
}
