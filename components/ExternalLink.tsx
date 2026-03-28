import { Href, Link } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { type ComponentProps, memo, useCallback, useRef } from 'react';
import { GestureResponderEvent, Platform } from 'react-native';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: Href & string;
};

export const ExternalLink = memo(function ExternalLink({ href, onPress, ...rest }: Props) {
  const isOpeningRef = useRef(false);

  const handlePress = useCallback(
    async (event: GestureResponderEvent) => {
      if (Platform.OS !== 'web') {
        event.preventDefault();

        if (isOpeningRef.current) return;
        isOpeningRef.current = true;

        try {
          await openBrowserAsync(href);
        } catch (e) {
          console.warn('Failed to open browser', e);
        } finally {
          isOpeningRef.current = false;
        }
      }

      onPress?.(event);
    },
    [href, onPress]
  );

  return (
    <Link
      target={Platform.OS === 'web' ? '_blank' : undefined}
      {...rest}
      href={href}
      onPress={handlePress}
    />
  );
});