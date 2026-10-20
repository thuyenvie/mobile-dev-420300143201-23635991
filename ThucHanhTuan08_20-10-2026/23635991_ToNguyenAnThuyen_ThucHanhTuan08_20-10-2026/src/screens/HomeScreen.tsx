import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Button,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { RootStackParamList } from "../navigation/types";
import type { AppDispatch, RootState } from "../store";
import { logout, restoreSession } from "../store/authSlice";
import { bookService } from "../services/bookService";
import type { Book } from "../types";

type Props = NativeStackScreenProps<
    RootStackParamList,
    "Home"
>;

export default function HomeScreen({ navigation }: Props) {
    const dispatch = useDispatch<AppDispatch>();

    const { user, isLoggedIn, restoreError } = useSelector(
        (state: RootState) => state.auth
    );

    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState("");
    const [retry, setRetry] = useState(0);

    useEffect(() => {
        let active = true;
        bookService.getBooks()
            .then((data) => { if (active) setBooks(data); })
            .catch(() => { if (active) setLoadError("Không tải được danh sách sách."); })
            .finally(() => { if (active) setLoading(false); });
        return () => { active = false; };
    }, [retry]);

    async function handleLogout() {
        try {
            await dispatch(logout()).unwrap();
        } catch {
            Alert.alert(
                "Lỗi",
                "Không xóa được phiên đăng nhập. Vui lòng thử lại."
            );
        }
    }

    return (
        <FlatList
            style={styles.container}
            contentContainerStyle={styles.content}
            data={books}
            keyExtractor={(book) => String(book.id)}
            renderItem={({ item }) => (
                <Pressable
                    style={styles.book}
                    accessibilityRole="button"
                    accessibilityLabel={`Xem chi tiết ${item.title}`}
                    onPress={() => navigation.navigate("BookDetail", { bookId: item.id })}
                >
                    <Text style={styles.bookTitle}>{item.title}</Text>
                    <Text>{item.author}</Text>
                    <Text style={styles.price}>{item.price.toLocaleString("vi-VN")} đ</Text>
                </Pressable>
            )}
            ListHeaderComponent={<View>
            <Text style={styles.title}>Trang chủ BookStore</Text>

            <Text style={styles.text}>
                {isLoggedIn
                    ? `Xin chào, ${user?.name}!`
                    : "Bạn chưa đăng nhập."}
            </Text>

            {restoreError && (
                <View style={styles.button}>
                    <Text style={styles.text}>{restoreError}</Text>
                    <Button
                        title="Thử khôi phục phiên"
                        onPress={() => dispatch(restoreSession())}
                    />
                </View>
            )}

            {isLoggedIn && (
                <Text style={styles.text}>{user?.email}</Text>
            )}

            <View style={styles.button}>
                <Button
                    title="Thanh toán"
                    onPress={() => navigation.navigate("Checkout")}
                />
            </View>

            <View style={styles.button}>
                {isLoggedIn ? (
                    <Button
                        title="Đăng xuất"
                        color="#dc2626"
                        onPress={handleLogout}
                    />
                ) : (
                    <Button
                        title="Đăng nhập / Đăng ký"
                        onPress={() => navigation.navigate("Auth")}
                    />
                )}
            </View>
            <Text style={styles.sectionTitle}>Danh sách sách</Text>
            {loading && <ActivityIndicator color="green" />}
            {!!loadError && <View>
                <Text style={styles.text}>{loadError}</Text>
                <Button title="Thử tải lại sách" onPress={() => {
                    setLoading(true);
                    setLoadError("");
                    setRetry((value) => value + 1);
                }} />
            </View>}
            </View>}
            ListEmptyComponent={!loading && !loadError ? <Text style={styles.text}>Chưa có sách.</Text> : null}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    content: { padding: 24, paddingBottom: 40 },
    sectionTitle: { fontSize: 20, fontWeight: "700", marginTop: 28, marginBottom: 12 },
    book: { paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: "#e2e8f0" },
    bookTitle: { fontSize: 17, fontWeight: "600", marginBottom: 6 },
    price: { color: "green", marginTop: 6 },
    title: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 16,
        color: "green",
        textAlign: "center",
    },
    text: {
        fontSize: 16,
        marginBottom: 8,
        textAlign: "center",
    },
    button: {
        marginTop: 16,
    },
});
