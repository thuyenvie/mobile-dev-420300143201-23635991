import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { authService } from "../services/authService";
import { setSession } from "../store/authSlice";
import type { AppDispatch, RootState } from "../store";
import type { RootStackParamList } from "../navigation/types";

type Mode = "login" | "register";

type FormErrors = {
    name?: string;
    email?: string;
    password?: string;
};

type Props = NativeStackScreenProps<RootStackParamList, "Auth">;

export default function AuthScreen({ navigation, route }: Props) {
    const dispatch = useDispatch<AppDispatch>();
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const redirect = route.params?.redirect;
    const bookId = route.params?.bookId;

    useEffect(() => {
        if (!isLoggedIn) return;

        if (redirect === "BookDetail" && bookId !== undefined) {
            navigation.reset({
                index: 1,
                routes: [{ name: "Home" }, { name: "BookDetail", params: { bookId } }],
            });
            return;
        }

        // Giữ Home bên dưới Checkout để nút Back trở về đúng màn hình.
        const routes: { name: "Home" | "Checkout" }[] = [{ name: "Home" }];
        if (redirect === "Checkout") routes.push({ name: "Checkout" });
        navigation.reset({ index: routes.length - 1, routes });
    }, [isLoggedIn, redirect, bookId, navigation]);

    const [mode, setMode] = useState<Mode>("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState<FormErrors>({});
    const [serverError, setServerError] = useState("");
    const [loading, setLoading] = useState(false);

    const isRegister = mode === "register";

    function changeMode(nextMode: Mode) {
        setMode(nextMode);
        setErrors({});
        setServerError("");
        setPassword("");
    }

    function validate(): boolean {
        const nextErrors: FormErrors = {};

        if (isRegister && !name.trim()) {
            nextErrors.name = "Vui lòng nhập họ tên.";
        }

        if (!email.trim()) {
            nextErrors.email = "Vui lòng nhập email.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            nextErrors.email = "Email không đúng định dạng.";
        }

        if (!password) {
            nextErrors.password = "Vui lòng nhập mật khẩu.";
        } else if (password.length < 6) {
            nextErrors.password = "Mật khẩu phải có ít nhất 6 ký tự.";
        }

        setErrors(nextErrors);

        return Object.keys(nextErrors).length === 0;
    }

    async function handleSubmit() {
        if (loading) return;

        setServerError("");

        if (!validate()) return;

        setLoading(true);

        try {
            const result = isRegister
                ? await authService.register(name, email, password)
                : await authService.login(email, password);

            // Lưu token + user xuống bộ nhớ thiết bị.
            // Không lưu mật khẩu.
            try {
                await AsyncStorage.setItem("auth", JSON.stringify(result));
            } catch {
                setServerError(
                    "Không lưu được phiên đăng nhập. Vui lòng thử lại."
                );
                return;
            }

            // Effect phía trên đưa người dùng về Home hoặc Checkout.
            dispatch(setSession(result));
        } catch (error) {
            setServerError(
                error instanceof Error
                    ? error.message
                    : "Có lỗi xảy ra. Vui lòng thử lại."
            );
        } finally {
            setLoading(false);
        }
    }

    if (isLoggedIn) return null;

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={styles.title}>BookStore</Text>

                <View style={styles.tabs}>
                    <Pressable
                        disabled={loading}
                        onPress={() => changeMode("login")}
                        style={[
                            styles.tab,
                            !isRegister && styles.activeTab,
                        ]}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                !isRegister && styles.activeTabText,
                            ]}
                        >
                            Đăng nhập
                        </Text>
                    </Pressable>

                    <Pressable
                        disabled={loading}
                        onPress={() => changeMode("register")}
                        style={[
                            styles.tab,
                            isRegister && styles.activeTab,
                        ]}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                isRegister && styles.activeTabText,
                            ]}
                        >
                            Đăng ký
                        </Text>
                    </Pressable>
                </View>

                {isRegister && (
                    <View style={styles.field}>
                        <Text style={styles.label}>Họ tên</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Nhập họ tên"
                            value={name}
                            onChangeText={setName}
                            editable={!loading}
                        />

                        {errors.name && (
                            <Text style={styles.error}>{errors.name}</Text>
                        )}
                    </View>
                )}

                <View style={styles.field}>
                    <Text style={styles.label}>Email</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Nhập email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        editable={!loading}
                    />

                    {errors.email && (
                        <Text style={styles.error}>{errors.email}</Text>
                    )}
                </View>

                <View style={styles.field}>
                    <Text style={styles.label}>Mật khẩu</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Nhập mật khẩu"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        autoCapitalize="none"
                        autoCorrect={false}
                        editable={!loading}
                    />

                    {errors.password && (
                        <Text style={styles.error}>{errors.password}</Text>
                    )}
                </View>

                {!!serverError && (
                    <Text style={styles.serverError}>{serverError}</Text>
                )}

                <Pressable
                    onPress={handleSubmit}
                    disabled={loading}
                    style={[
                        styles.button,
                        loading && styles.disabledButton,
                    ]}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>
                            {isRegister ? "Đăng ký" : "Đăng nhập"}
                        </Text>
                    )}
                </Pressable>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    content: {
        flexGrow: 1,
        justifyContent: "center",
        padding: 24,
    },
    title: {
        fontSize: 32,
        fontWeight: "700",
        textAlign: "center",
        color: "green",
        marginBottom: 28,
    },
    tabs: {
        flexDirection: "row",
        marginBottom: 24,
        backgroundColor: "#eef2ff",
        borderRadius: 10,
        padding: 4,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: "center",
        borderRadius: 8,
    },
    activeTab: {
        backgroundColor: "green",
    },
    tabText: {
        color: "green",
        fontWeight: "600",
    },
    activeTabText: {
        color: "#fff",
    },
    field: {
        marginBottom: 18,
    },
    label: {
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: "#cbd5e1",
        borderRadius: 8,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 16,
        color: "#111827",
    },
    error: {
        color: "#dc2626",
        marginTop: 6,
    },
    serverError: {
        color: "#dc2626",
        marginBottom: 16,
    },
    button: {
        backgroundColor: "green",
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    disabledButton: {
        opacity: 0.6,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
});
