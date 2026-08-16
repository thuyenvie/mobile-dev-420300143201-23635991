import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Pressable,
    ScrollView,
} from 'react-native';

import { useState } from 'react';

interface FormData {
    name: string;
    studentId: string;
    email: string;
    summary: string;
}

interface FormErrors {
    name?: string;
    studentId?: string;
    email?: string;
    summary?: string;
}

const SUMMARY_MAX_LENGTH = 120;

export default function CampusDashboardValidation() {

    const [formData, setFormData] = useState<FormData>({
        name: '',
        studentId: '',
        email: '',
        summary: '',
    });

    const [errors, setErrors] = useState<FormErrors>({});

    const updateField = (
        field: keyof FormData,
        value: string,
    ) => {
        setFormData((current) => ({
            ...current,
            [field]: value,
        }));

        // Xóa lỗi của field ngay khi người dùng bắt đầu sửa
        setErrors((current) => ({
            ...current,
            [field]: undefined,
        }));
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // 1. Validate name
        if (!formData.name.trim()) {
            newErrors.name =
                'Họ và tên không được để trống hoặc chỉ chứa khoảng trắng.';
        }

        // 2. Validate student ID
        if (!/^\d{8}$/.test(formData.studentId.trim())) {
            newErrors.studentId =
                'Mã số sinh viên phải gồm đúng 8 chữ số. Ví dụ: 23635991.';
        }

        // 3. Validate email
        if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                formData.email.trim(),
            )
        ) {
            newErrors.email =
                'Email không hợp lệ. Vui lòng nhập theo dạng student@example.com.';
        }

        // 4. Validate summary length
        if (formData.summary.length > SUMMARY_MAX_LENGTH) {
            newErrors.summary =
                `Tóm tắt không được vượt quá ${SUMMARY_MAX_LENGTH} ký tự. ` +
                `Hiện tại: ${formData.summary.length} ký tự.`;
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        const isValid = validateForm();

        if (isValid) {
            console.log('Form is valid');
        }
    };

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
        >

            <Text style={styles.title}>
                VALIDATION COPY LABORATORY
            </Text>

            <Text style={styles.description}>
                Exercise 9 — Actionable validation messages
            </Text>

            {/* NAME */}

            <View style={styles.field}>
                <Text style={styles.label}>
                    Họ và tên
                </Text>

                <TextInput
                    style={[
                        styles.input,
                        errors.name && styles.inputError,
                    ]}
                    placeholder="Nhập họ và tên"
                    value={formData.name}
                    onChangeText={(value) =>
                        updateField('name', value)
                    }
                />

                {errors.name && (
                    <Text
                        style={styles.errorText}
                        accessibilityRole="alert"
                    >
                        {errors.name}
                    </Text>
                )}
            </View>

            {/* STUDENT ID */}

            <View style={styles.field}>
                <Text style={styles.label}>
                    Mã số sinh viên
                </Text>

                <TextInput
                    style={[
                        styles.input,
                        errors.studentId && styles.inputError,
                    ]}
                    placeholder="Ví dụ: 23635991"
                    value={formData.studentId}
                    onChangeText={(value) =>
                        updateField('studentId', value)
                    }
                    keyboardType="numeric"
                />

                {errors.studentId && (
                    <Text
                        style={styles.errorText}
                        accessibilityRole="alert"
                    >
                        {errors.studentId}
                    </Text>
                )}
            </View>

            {/* EMAIL */}

            <View style={styles.field}>
                <Text style={styles.label}>
                    Email
                </Text>

                <TextInput
                    style={[
                        styles.input,
                        errors.email && styles.inputError,
                    ]}
                    placeholder="student@example.com"
                    value={formData.email}
                    onChangeText={(value) =>
                        updateField('email', value)
                    }
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                {errors.email && (
                    <Text
                        style={styles.errorText}
                        accessibilityRole="alert"
                    >
                        {errors.email}
                    </Text>
                )}
            </View>

            {/* SUMMARY */}

            <View style={styles.field}>
                <Text style={styles.label}>
                    Tóm tắt
                </Text>

                <TextInput
                    style={[
                        styles.input,
                        styles.summaryInput,
                        errors.summary && styles.inputError,
                    ]}
                    placeholder={`Tối đa ${SUMMARY_MAX_LENGTH} ký tự`}
                    value={formData.summary}
                    onChangeText={(value) =>
                        updateField('summary', value)
                    }
                    multiline
                    maxLength={200}
                    textAlignVertical="top"
                />

                <Text style={styles.counter}>
                    {formData.summary.length}/{SUMMARY_MAX_LENGTH}
                </Text>

                {errors.summary && (
                    <Text
                        style={styles.errorText}
                        accessibilityRole="alert"
                    >
                        {errors.summary}
                    </Text>
                )}
            </View>

            {/* SUBMIT */}

            <Pressable
                style={styles.button}
                onPress={handleSubmit}
            >
                <Text style={styles.buttonText}>
                    Kiểm tra dữ liệu
                </Text>
            </Pressable>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
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
        lineHeight: 26,
        textAlign: 'center',
        marginBottom: 28,
    },

    field: {
        marginBottom: 20,
    },

    label: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },

    input: {
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 18,
    },

    inputError: {
        borderWidth: 2,
    },

    summaryInput: {
        minHeight: 120,
    },

    counter: {
        fontSize: 15,
        textAlign: 'right',
        marginTop: 4,
    },

    errorText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 6,
        lineHeight: 22,
    },

    button: {
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8,
    },

    buttonText: {
        fontSize: 19,
        fontWeight: 'bold',
    },
});