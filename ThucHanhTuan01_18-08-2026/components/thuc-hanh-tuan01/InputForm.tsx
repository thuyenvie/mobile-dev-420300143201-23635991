import { StyleSheet, Text, TextInput, View } from 'react-native';

type StudentInfo = {
    name: string;
    email: string;
    address: string;
};

type InputFormProps = {
    form: StudentInfo;
    isEditing: boolean;
    onChange: (field: keyof StudentInfo, value: string) => void;
};

export default function InputForm({ form, isEditing, onChange }: InputFormProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Thông tin sinh viên</Text>

            <TextInput
                style={[styles.input, !isEditing && styles.inputDisabled]}
                placeholder="Nhập họ và tên"
                placeholderTextColor="gray"
                value={form.name}
                editable={isEditing}
                onChangeText={(value) => onChange('name', value)}
                accessibilityLabel="Họ và tên sinh viên"
            />

            <TextInput
                style={[styles.input, !isEditing && styles.inputDisabled]}
                placeholder="Nhập Email"
                placeholderTextColor="gray"
                value={form.email}
                editable={isEditing}
                onChangeText={(value) => onChange('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
                accessibilityLabel="Email sinh viên"
            />

            <TextInput
                style={[styles.input, !isEditing && styles.inputDisabled]}
                placeholder="Nhập Địa chỉ"
                placeholderTextColor="gray"
                value={form.address}
                editable={isEditing}
                onChangeText={(value) => onChange('address', value)}
                multiline
                accessibilityLabel="Địa chỉ sinh viên"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },

    label: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 12,
        color: '#1F1F1F',
    },

    input: {
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 15,
        marginBottom: 12,
        backgroundColor: '#FFF',
        color: '#222',
    },

    inputDisabled: {
        backgroundColor: '#F5F5F5',
        color: '#555',
        borderColor: '#D9D9D9',
    },
});