import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import { Alert, Linking, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { OpenStatusLine } from '@/components/open-status-line';
import { OrderButton } from '@/components/order-button';
import { ThemedText } from '@/components/themed-text';
import { store } from '@/config/store';
import { BottomTabInset, Colors, Fonts, Spacing } from '@/constants/theme';
import { useNow } from '@/hooks/use-now';
import { DISPLAY_WEEK, formatDayHours, getZonedTime } from '@/utils/open-status';
import { directionsUrl, phoneUrl } from '@/utils/store-links';

export default function VisitScreen() {
  // Highlight today's row, judged in the store's time zone like the open status.
  const today = getZonedTime(useNow(), store.timeZone).weekday;

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.content}>
      <View style={styles.orderArea}>
        <OpenStatusLine />
        <OrderButton />
      </View>

      <View style={styles.section}>
        <SectionLabel>Hours</SectionLabel>
        {DISPLAY_WEEK.map((day) => {
          const isToday = day === today;
          return (
            <View key={day} style={styles.hoursRow}>
              <ThemedText style={isToday ? styles.today : undefined}>
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </ThemedText>
              <ThemedText
                themeColor={store.hours[day] ? 'text' : 'textSecondary'}
                style={isToday ? styles.today : undefined}>
                {formatDayHours(store.hours[day])}
              </ThemedText>
            </View>
          );
        })}
      </View>

      <View style={styles.section}>
        <SectionLabel>Visit & contact</SectionLabel>
        <ActionRow
          icon={{ ios: 'map', android: 'map' }}
          title="Get directions"
          detail={store.address.full}
          url={directionsUrl(store.address.full, Platform.OS)}
        />
        <ActionRow
          icon={{ ios: 'phone', android: 'call' }}
          title="Call"
          detail={store.phone.display}
          url={phoneUrl(store.phone.tel)}
        />
        <ActionRow
          icon={{ ios: 'camera', android: 'photo_camera' }}
          title="Instagram"
          detail={store.instagram.handle}
          url={store.instagram.url}
        />
      </View>
    </ScrollView>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <ThemedText type="label" themeColor="textSecondary" style={styles.sectionLabel}>
      {children}
    </ThemedText>
  );
}

type ActionRowProps = {
  icon: SymbolViewProps['name'];
  title: string;
  detail: string;
  url: string;
};

/** Opens Maps, Phone, or Instagram (the app if installed, otherwise the browser). */
function ActionRow({ icon, title, detail, url }: ActionRowProps) {
  const open = async () => {
    try {
      await Linking.openURL(url);
    } catch {
      // e.g. "Call" on a device that cannot make phone calls.
      Alert.alert(`Can't open ${title}`, detail);
    }
  };

  return (
    <Pressable
      accessibilityRole="link"
      accessibilityLabel={`${title}, ${detail}`}
      onPress={open}
      style={({ pressed }) => [styles.actionRow, pressed && styles.pressed]}>
      <SymbolView name={icon} tintColor={Colors.accent} size={22} />
      <View style={styles.actionText}>
        <ThemedText style={styles.actionTitle}>{title}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {detail}
        </ThemedText>
      </View>
      <SymbolView
        name={{ ios: 'chevron.right', android: 'chevron_right' }}
        tintColor={Colors.border}
        size={14}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: Spacing.five,
    padding: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.four,
  },
  orderArea: {
    gap: Spacing.two,
  },
  section: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.border,
  },
  sectionLabel: {
    marginTop: Spacing.three,
    marginBottom: Spacing.one,
  },
  hoursRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.one,
  },
  today: {
    fontFamily: Fonts.bold,
    color: Colors.accent,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.three,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
  },
  actionText: {
    flex: 1,
  },
  actionTitle: {
    fontFamily: Fonts.bold,
  },
  pressed: {
    opacity: 0.6,
  },
});
