import { NativeTabs } from 'expo-router/unstable-native-tabs';

import { Colors, Fonts, GlassColors } from '@/constants/theme';

// Tab names match the top menu on sokotea.com. Each `name` is a folder in src/app.
// Icons: `sf` = SF Symbols on iOS, `md` = Material Symbols on Android.
export default function AppTabs() {
  return (
    <NativeTabs
      backgroundColor={Colors.background}
      indicatorColor={Colors.backgroundSelected}
      // Dynamic colors so iOS 26 Liquid Glass keeps them (see GlassColors in theme.ts).
      tintColor={GlassColors.accent}
      iconColor={{ default: GlassColors.textSecondary, selected: GlassColors.accent }}
      labelStyle={{
        default: { fontFamily: Fonts.semiBold, color: GlassColors.textSecondary },
        selected: { fontFamily: Fonts.bold, color: GlassColors.accent },
      }}>
      <NativeTabs.Trigger name="(menu)">
        <NativeTabs.Trigger.Label>Menu</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="cup.and.saucer" md="local_cafe" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="favorites">
        <NativeTabs.Trigger.Label>Favorites</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'heart', selected: 'heart.fill' }} md="favorite" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="visit">
        <NativeTabs.Trigger.Label>Visit</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="storefront" md="storefront" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
