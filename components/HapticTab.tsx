import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';
import { memo, useCallback } from 'react';
import { Platform } from 'react-native';

export const HapticTab = memo(function HapticTab(props: BottomTabBarButtonProps) {
  const handlePressIn = useCallback(
    (ev) => {
      if (Platform.OS === 'ios' || Platform.OS === 'android') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => { });
      }
      props.onPressIn?.(ev);
    },
    [props.onPressIn]
  );

  return <PlatformPressable {...props} onPressIn={handlePressIn} />;
});