import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

type HeaderProps = {
    name: string;
    isEditing: boolean;
    onCancel: () => void;
};

export default function Header({ name, isEditing, onCancel }: HeaderProps) {
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{
                    uri: 'https://reactnative.dev/img/tiny_logo.png',
                }}
                accessibilityRole="image"
                accessibilityLabel="Ảnh đại diện sinh viên"
            />

            <View style={styles.info}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.mssv}>MSSV: 23635991</Text>
            </View>

            {isEditing ? (
                <Pressable
                    onPress={onCancel}
                    accessibilityRole="button"
                    accessibilityLabel="Hủy chỉnh sửa thông tin sinh viên"
                    hitSlop={10}
                    style={({ pressed }) => [
                        styles.cancelButton,
                        pressed && styles.cancelButtonPressed,
                    ]}
                >
                    <Text style={styles.cancelText}>Hủy</Text>
                </Pressable>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#F5F7FF',
    },

    image: {
        width: 65,
        height: 65,
        borderRadius: 33,
        marginRight: 15,
        borderWidth: 2,
        borderColor: '#3647E4',
    },

    info: {
        flex: 1,
        minWidth: 0,
    },

    name: {
        fontSize: 18,
        fontWeight: '700',
        color: '#222222',
    },

    mssv: {
        fontSize: 14,
        color: '#666666',
        marginTop: 5,
    },

    cancelButton: {
        minWidth: 52,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: '#E8ECFF',
        alignItems: 'center',
        justifyContent: 'center',
    },

    cancelButtonPressed: {
        backgroundColor: '#D5DBFF',
        transform: [{ scale: 0.98 }],
    },

    cancelText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#3647E4',
    },
});