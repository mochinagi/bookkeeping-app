import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedView } from '@/components/ThemedView';
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';

type Props = PropsWithChildren<{
  headerImage?: ReactElement;
  headerBackgroundColor?: { dark: string; light: string };
  headerHeight?: number;
  contentPadding?: number;
  safeArea?: boolean;
}>;

export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor = { light: '#fff', dark: '#000' },
  headerHeight = 250,
  contentPadding = 16,
  safeArea = true,
}: Props) {
  const colorScheme = useColorScheme() ?? 'light';
  const backgroundColor = headerBackgroundColor[colorScheme];

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const bottom = useBottomTabOverflow();

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-headerHeight, 0, headerHeight],
            [-headerHeight / 2, 0, headerHeight * 0.75],
            Extrapolate.CLAMP
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-headerHeight, 0, headerHeight],
            [2, 1, 1],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  const Container = safeArea ? SafeAreaView : ThemedView;

  return (
    <Container style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={{ paddingBottom: bottom }}>

        {/* Header */}
        {headerImage && (
          <Animated.View
            style={[
              styles.header,
              { backgroundColor, height: headerHeight },
              headerAnimatedStyle,
            ]}>
            {headerImage}
          </Animated.View>
        )}

        {/* Content */}
        <ThemedView style={[styles.content, { padding: contentPadding }]}>
          {children}
        </ThemedView>
      </Animated.ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    gap: 16,
  },
});