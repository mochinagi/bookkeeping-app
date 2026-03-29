import { memo } from 'react';
import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  transparent?: boolean;
  variant?: 'background' | 'card' | 'surface';
};

export const ThemedView = memo(function ThemedView({
  style,
  lightColor,
  darkColor,
  transparent,
  variant,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = transparent
    ? 'transparent'
    : useThemeColor(
      { light: lightColor, dark: darkColor },
      variant ?? 'background'
    );

  return (
    <View
      style={[
        { backgroundColor },
        ...(style ? (Array.isArray(style) ? style : [style]) : []),
      ]}
      {...otherProps}
    />
  );
});