import { StyleSheet, Text, type TextProps } from 'react-native';

import { Colors, Fonts, ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedTextProps = TextProps & {
  type?:
    | 'default'
    | 'title'
    | 'small'
    | 'smallBold'
    | 'label'
    | 'subtitle'
    | 'link'
    | 'linkPrimary'
    | 'code';
  themeColor?: ThemeColor;
};

export function ThemedText({ style, type = 'default', themeColor, ...rest }: ThemedTextProps) {
  const theme = useTheme();

  return (
    <Text
      style={[
        { color: theme[themeColor ?? 'text'] },
        type === 'default' && styles.default,
        type === 'title' && styles.title,
        type === 'small' && styles.small,
        type === 'smallBold' && styles.smallBold,
        type === 'label' && styles.label,
        type === 'subtitle' && styles.subtitle,
        type === 'link' && styles.link,
        type === 'linkPrimary' && styles.linkPrimary,
        type === 'code' && styles.code,
        style,
      ]}
      {...rest}
    />
  );
}

// Each style sets fontFamily instead of fontWeight: Nunito Sans weights are separate font
// families on native (see Fonts in src/constants/theme.ts).
const styles = StyleSheet.create({
  small: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    lineHeight: 20,
  },
  smallBold: {
    fontFamily: Fonts.extraBold,
    fontSize: 14,
    lineHeight: 20,
  },
  // Small uppercase label with wide letter spacing, like section labels on sokotea.com.
  label: {
    fontFamily: Fonts.extraBold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 1.7,
    textTransform: 'uppercase',
  },
  default: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    lineHeight: 24,
  },
  title: {
    fontFamily: Fonts.extraBold,
    fontSize: 40,
    lineHeight: 48,
  },
  subtitle: {
    fontFamily: Fonts.bold,
    fontSize: 28,
    lineHeight: 36,
  },
  link: {
    fontFamily: Fonts.regular,
    lineHeight: 30,
    fontSize: 14,
  },
  linkPrimary: {
    fontFamily: Fonts.regular,
    lineHeight: 30,
    fontSize: 14,
    color: Colors.accent,
  },
  code: {
    fontFamily: Fonts.mono,
    fontSize: 12,
  },
});
