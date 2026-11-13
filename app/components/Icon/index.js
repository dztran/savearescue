// Drop-in replacement for the subset of react-native-elements' <Icon> that this
// app uses (react-native-elements 3.x is unmaintained and breaks on new RN).
import React from 'react';
import { View, TouchableHighlight, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Foundation from 'react-native-vector-icons/Foundation';

const ICON_SETS = {
    'material': MaterialIcons,
    'material-community': MaterialCommunityIcons,
    'font-awesome': FontAwesome,
    'ionicon': Ionicons,
    'entypo': Entypo,
    'feather': Feather,
    'octicon': Octicons,
    'simple-line-icon': SimpleLineIcons,
    'evilicon': EvilIcons,
    'foundation': Foundation,
};

export function Icon({
    name,
    type = 'material',
    size = 24,
    color = 'black',
    reverse = false,
    raised = false,
    reverseColor = 'white',
    iconStyle,
    containerStyle,
    style,
    onPress,
    onLongPress,
    underlayColor,
    activeOpacity,
    disabled,
}) {
    // Unknown types fall back to Material, matching react-native-elements.
    const IconSet = ICON_SETS[type] || MaterialIcons;
    const iconColor = reverse ? reverseColor : color;
    const round = (reverse || raised) ? {
        borderRadius: size + 4,
        height: size * 2 + 4,
        width: size * 2 + 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: reverse ? color : (raised ? 'white' : 'transparent'),
    } : null;

    const icon = (
        <View style={[round, raised && styles.raised]}>
            <IconSet name={name} size={size} color={iconColor} style={[styles.icon, iconStyle, style]} />
        </View>
    );

    if (!onPress && !onLongPress) {
        return <View style={[styles.container, containerStyle]}>{icon}</View>;
    }
    return (
        <TouchableHighlight
            style={[styles.container, containerStyle, round && { borderRadius: round.borderRadius }]}
            onPress={onPress}
            onLongPress={onLongPress}
            disabled={disabled}
            activeOpacity={activeOpacity}
            underlayColor={underlayColor || (reverse ? color : 'rgba(0, 0, 0, 0.1)')}
        >
            {icon}
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    container: { overflow: 'hidden', margin: 0 },
    icon: { backgroundColor: 'transparent' },
    raised: {
        margin: 7,
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 2,
    },
});

export default Icon;
