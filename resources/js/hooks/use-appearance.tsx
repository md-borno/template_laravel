export type Appearance = 'light';
export type ResolvedAppearance = 'light';

export function initializeTheme(): void {
    if (typeof document === 'undefined') {
        return;
    }

    document.documentElement.classList.remove('dark');
    document.documentElement.style.colorScheme = 'light';
}

export function useAppearance() {
    return { appearance: 'light', resolvedAppearance: 'light' } as const;
}
