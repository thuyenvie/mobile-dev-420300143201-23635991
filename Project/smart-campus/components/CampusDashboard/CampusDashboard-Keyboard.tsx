import {
    StyleSheet,
    Text,
    TextInput,
    View,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';

export default function CampusDashboardKeyboard() {
    return (
        <KeyboardAvoidingView
            style={styles.keyboardContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
            >
                <Text style={styles.title}>
                    STUDENT REGISTRATION FORM
                </Text>

                <Text style={styles.description}>
                    Exercise 8 — Keyboard-safe Form
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

                    <Text style={styles.successText}>
                        Có thể cuộn đến field cuối khi bàn phím mở.
                    </Text>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    keyboardContainer: {
        flex: 1,
    },

    container: {
        padding: 20,
        paddingTop: 50,
        paddingBottom: 120,
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

    successText: {
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 12,
    },
});