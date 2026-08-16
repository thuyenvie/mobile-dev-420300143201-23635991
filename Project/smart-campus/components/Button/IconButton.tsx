import {
    Pressable,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';

import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

interface IconButtonProps {
    icon: keyof typeof Ionicons.glyphMap;
    onPress?: () => void;
    disabled?: boolean;
    loading?: boolean;
    accessibilityLabel: string;
}

export default function IconButton({
    icon,
    onPress,
    disabled = false,
    loading = false,
    accessibilityLabel,
}: IconButtonProps) {

    const [focused, setFocused] = useState(false);

    return (
        <Pressable
            style={({ pressed }) => [
                styles.button,
                pressed && styles.pressed,
                focused && styles.focused,
                (disabled || loading) && styles.disabled,
            ]}
            onPress={onPress}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            disabled={disabled || loading}
            accessibilityRole="button"
            accessibilityLabel={accessibilityLabel}
        >
            {loading ? (
                <ActivityIndicator
                    size="small"
                    color="#2563EB"
                />
            ) : (
                <Ionicons
                    name={icon}
                    size={24}
                    color="#2563EB"
                />
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 48,
        height: 48,

        borderRadius: 8,

        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: '#FFFFFF',

        borderWidth: 2,
        borderColor: '#2563EB',
    },

    pressed: {
        opacity: 0.7,
    },

    focused: {
        borderWidth: 3,
        borderColor: '#000000',
    },

    disabled: {
        opacity: 0.5,
    },
});