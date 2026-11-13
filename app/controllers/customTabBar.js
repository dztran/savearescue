// Custom bottom tab bar (React Navigation 7 `tabBar` render prop).
// The middle "Hotline" tab is not a screen: pressing it starts a phone call.
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TAB_BAR_HEIGHT, PHONE_NUMBER, colors } from './app.styles';
import { phoneCall } from '../api/communications';

const ACTIVE_TINT = colors.white;
const INACTIVE_TINT = '#b5b5b5';

export function CustomTabBar({ state, descriptors, navigation }) {
    const insets = useSafeAreaInsets();
    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            height: TAB_BAR_HEIGHT + insets.bottom,
            paddingBottom: insets.bottom,
            backgroundColor: colors.primary,
        }}>
            {state.routes.map((route, idx) => {
                const { options } = descriptors[route.key];
                const focused = state.index === idx;
                const color = focused ? ACTIVE_TINT : INACTIVE_TINT;
                const label = typeof options.tabBarLabel === 'string' ? options.tabBarLabel : null;
                const onPress = () => {
                    if (route.name === 'Hotline') {
                        phoneCall(PHONE_NUMBER, true);
                        return;
                    }
                    const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
                    if (!focused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };
                return (
                    <TouchableOpacity key={route.key} onPress={onPress}
                        accessibilityRole="button" accessibilityState={focused ? { selected: true } : {}}>
                        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                            {options.tabBarIcon ? options.tabBarIcon({ focused, color, size: 30 }) : null}
                            {label ? (
                                <Text allowFontScaling={false} style={{ color, fontSize: 10, fontWeight: '900' }}>
                                    {label}
                                </Text>
                            ) : null}
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default CustomTabBar;
