import {
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

export default function CampusDashboardKeyboard() {
    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                STUDENT REGISTRATION FORM
            </Text>

            <Text style={styles.description}>
                Exercise 8 — Keyboard Failure Reproduction
            </Text>

            <View style={styles.form}>

                <Text style={styles.label}>
                    Họ và tên
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="Nhập họ và tên"
                />

                <Text style={styles.label}>
                    Mã số sinh viên
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="Nhập mã số sinh viên"
                    keyboardType="numeric"
                />

                <Text style={styles.label}>
                    Email
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="Nhập email"
                    keyboardType="email-address"
                />

                <Text style={styles.label}>
                    Số điện thoại
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="Nhập số điện thoại"
                    keyboardType="phone-pad"
                />

                <Text style={styles.label}>
                    Địa chỉ
                </Text>

                <TextInput
                    style={[styles.input, styles.multilineInput]}
                    placeholder="Nhập địa chỉ"
                    multiline
                />

                <Text style={styles.label}>
                    Ghi chú
                </Text>

                <TextInput
                    style={[styles.input, styles.multilineInput]}
                    placeholder="Nhập ghi chú"
                    multiline
                />

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 50,
    },

    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 12,
    },

    description: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 24,
    },

    form: {
        gap: 12,
    },

    label: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    input: {
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 18,
    },

    multilineInput: {
        minHeight: 100,
        textAlignVertical: 'top',
    },
});