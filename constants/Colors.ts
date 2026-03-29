/**
 * App color system (light & dark themes)
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#ffffff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#ffffff',
    surface: '#f2f2f2',
    card: '#ffffff',

    tint: tintColorLight,

    icon: '#687076',
    border: '#e0e0e0',

    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    surface: '#1c1c1e',
    card: '#1c1c1e',

    tint: tintColorDark,

    icon: '#9BA1A6',
    border: '#2c2c2e',

    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
} as const;

// 👉 加类型（关键！）
export type Theme = keyof typeof Colors;
export type ColorName = keyof typeof Colors.light;