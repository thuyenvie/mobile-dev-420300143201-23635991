import { Pressable, StyleSheet, Text } from 'react-native';

type ActionButtonProps = {
    isEditing: boolean;
    hasChanges: boolean;
    onPress: () => void;
    disabled?: boolean;
};

export default function ActionButton({
    isEditing,
    hasChanges,
    onPress,
    disabled,
}: ActionButtonProps) {
    const shouldDisable = Boolean(disabled) || (isEditing && !hasChanges);
    const label = isEditing ? 'Lưu thông tin' : 'Chỉnh sửa thông tin';

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={isEditing ? 'Lưu thông tin sinh viên' : 'Chỉnh sửa thông tin sinh viên'}
            accessibilityState={{ disabled: shouldDisable, selected: isEditing }}
            disabled={shouldDisable}
            onPress={onPress}
            hitSlop={10}
            style={({ pressed }) => [
                styles.button,
                shouldDisable && styles.buttonDisabled,
                pressed && !shouldDisable && styles.buttonPressed,
            ]}
        >
            <Text style={[styles.text, shouldDisable && styles.textDisabled]}>{label}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        marginHorizontal: 16,
        marginBottom: 16,
        backgroundColor: '#3647E4',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 48,
    },

    buttonDisabled: {
        backgroundColor: '#B7C0FF',
    },

    buttonPressed: {
        backgroundColor: '#2635C5',
        transform: [{ scale: 0.98 }],
    },

    text: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
    },

    textDisabled: {
        color: '#EAF0FF',
    },
});