import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

/**
 * Web-only hook to safely get color scheme after hydration.
 *
 * Why:
 * During SSR (or static rendering), the color scheme is not available.
 * We fallback to 'light' to avoid mismatch between server and client.
 *
 * After hydration, we use the actual system color scheme.
 */
export function useColorScheme() {
  const [isMounted, setIsMounted] = useState(false);

  const colorScheme = useRNColorScheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Before hydration → fallback to light
  if (!isMounted) return 'light';

  // After hydration → use real color scheme
  return colorScheme ?? 'light';
}