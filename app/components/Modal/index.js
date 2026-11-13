// Small stand-in for react-native-modal (its latest release still calls
// InteractionManager, which React Native 0.88 removed). Supports the props this
// app uses: isVisible, style, onBackdropPress and children.
import React from 'react';
import { Modal as RNModal, View, TouchableWithoutFeedback, StyleSheet } from 'react-native';

export default function Modal({ isVisible, style, onBackdropPress, onRequestClose, children }) {
    return (
        <RNModal
            visible={!!isVisible}
            transparent
            animationType="fade"
            statusBarTranslucent
            onRequestClose={onRequestClose || onBackdropPress || (() => {})}
        >
            <TouchableWithoutFeedback onPress={onBackdropPress}>
                <View style={styles.backdrop} />
            </TouchableWithoutFeedback>
            <View style={[styles.content, style]} pointerEvents="box-none">
                {children}
            </View>
        </RNModal>
    );
}

const styles = StyleSheet.create({
    backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.7)' },
    content: { flex: 1, margin: 20, justifyContent: 'center' },
});
