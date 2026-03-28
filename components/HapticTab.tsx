import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';
import { memo, useCallback, useRef } from 'react';
import { GestureResponderEvent, Platform } from 'react-native';

export const HapticTab = memo(function HapticTab(props: BottomTabBarButtonProps) {
  const lastTriggeredRef = useRef(0);

  const handlePressIn = useCallback(
    (ev: GestureResponderEvent) => {
      if (!props.disabled) {
        const now = Date.now();
        if (now - lastTriggeredRef.current > 50) {
          lastTriggeredRef.current = now;

          if (Platform.OS === 'ios' || Platform.OS === 'android') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => { });
          }
        }
      }

      props.onPressIn?.(ev);
    },
    [props.onPressIn, props.disabled]
  );

  return <PlatformPressable {...props} onPressIn={handlePressIn} />;
});