/**
 * Hook to get themed color based on current color scheme (light / dark).
 *
 * Priority:
 * 1. Use override color passed via props (light / dark)
 * 2. Fallback to predefined color in theme (Colors)
 *
 * Example:
 * const color = useThemeColor({}, 'text');
 * const custom = useThemeColor({ light: '#000', dark: '#fff' }, 'text');
 */

import { Colors, type ColorName, type Theme } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

type Props = {
  light?: string;
  dark?: string;
};

export function useThemeColor(props: Props, colorName: ColorName) {
  const theme: Theme = useColorScheme() ?? 'light';

  // Use override color if provided
  const overrideColor = props[theme];
  if (overrideColor) return overrideColor;

  // Otherwise fallback to theme color
  return Colors[theme][colorName];
}