import { Href, Link } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { type ComponentProps, memo, useCallback } from 'react';
import { Platform } from 'react-native';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: Href & string;
};

export const ExternalLink = memo(function ExternalLink({ href, onPress, ...rest }: Props) {
  const handlePress = useCallback(
    async (event) => {
      if (Platform.OS !== 'web') {
        event.preventDefault();
        try {
          await openBrowserAsync(href);
        } catch (e) {
          console.warn('Failed to open browser', e);
        }
      }

      onPress?.(event);
    },
    [href, onPress]
  );

  return <Link target="_blank" {...rest} href={href} onPress={handlePress} />;
});