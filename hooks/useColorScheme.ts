import type { Theme } from '@/constants/Colors';
import { useColorScheme as useRNColorScheme } from 'react-native';

/**
 * Native color scheme hook with safe fallback.
 *
 * Ensures a non-null value is always returned.
 */
export function useColorScheme(): Theme {
    const colorScheme = useRNColorScheme();

    // Fallback to 'light' if system value is null
    return colorScheme ?? 'light';
}