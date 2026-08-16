import {
    Pressable,
    StyleSheet,
    Text,
    ActivityIndicator,
} from 'react-native';

import { useState } from 'react';

interface SecondaryButtonProps {
    title: string;
    onPress?: () => void;
    disabled?: boolean;
    loading?: boolean;
}

export default function SecondaryButton({
    title,
    onPress,
    disabled = false,
    loading = false,
}: SecondaryButtonProps) {

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
        >
            {loading ? (
                <ActivityIndicator
                    size="small"
                    color="#2563EB"
                />
            ) : (
                <Text style={styles.text}>
                    {title}
                </Text>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        minHeight: 48,
        paddingHorizontal: 20,
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

    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2563EB',
    },
});