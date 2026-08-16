import {
    Pressable,
    StyleSheet,
    Text,
    ActivityIndicator,
} from 'react-native';

interface PrimaryButtonProps {
    title: string;
    onPress?: () => void;
    disabled?: boolean;
    loading?: boolean;
}

import { useState } from 'react';

export default function PrimaryButton({
    title,
    onPress,
    disabled = false,
    loading = false,
}: PrimaryButtonProps) {

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
                <ActivityIndicator size="small" color="#FFFFFF" />
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
        backgroundColor: 'blue',

        borderWidth: 3,
        borderColor: 'transparent',
    },

    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },

    pressed: {
        opacity: 0.7,
    },

    disabled: {
        opacity: 0.5,
    },

    focused: {
        borderWidth: 3,
        borderColor: 'black',
    },
});