/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const primaryColor = '#1e40af';  // Deep blue
const secondaryColor = '#3b82f6'; // Lighter blue

export const Colors = {
  light: {
    text: '#1f2937',
    background: '#f8fafc',
    tint: primaryColor,
    icon: '#64748b',
    tabIconDefault: '#94a3b8',
    tabIconSelected: primaryColor,
    card: '#ffffff',
    border: '#e2e8f0',
    primary: primaryColor,
    secondary: secondaryColor,
    accent: '#f97316',
    error: '#ef4444',
    success: '#22c55e',
  },
  dark: {
    text: '#f1f5f9',
    background: '#0f172a',
    tint: secondaryColor,
    icon: '#94a3b8',
    tabIconDefault: '#64748b',
    tabIconSelected: secondaryColor,
    card: '#1e293b',
    border: '#334155',
    primary: secondaryColor,
    secondary: primaryColor,
    accent: '#fb923c',
    error: '#f87171',
    success: '#4ade80',
  },
};