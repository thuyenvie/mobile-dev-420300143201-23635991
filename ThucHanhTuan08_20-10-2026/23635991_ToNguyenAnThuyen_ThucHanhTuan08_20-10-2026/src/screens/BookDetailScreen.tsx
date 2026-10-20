import { useEffect, useState } from "react";
import { ActivityIndicator, Button, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useSelector } from "react-redux";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import RatingStars from "../components/RatingStars";
import { bookService } from "../services/bookService";
import type { RootStackParamList } from "../navigation/types";
import type { RootState } from "../store";
import type { Book, Review } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "BookDetail">;

export default function BookDetailScreen({ route, navigation }: Props) {
    const { bookId } = route.params;
    const { user, token, isLoggedIn } = useSelector((state: RootState) => state.auth);
    const [book, setBook] = useState<Book | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState("");
    const [retry, setRetry] = useState(0);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [formError, setFormError] = useState("");
    const [sending, setSending] = useState(false);
    const [success, setSuccess] = useState("");

    useEffect(() => {
        let active = true;
        Promise.all([bookService.getBook(bookId), bookService.getReviews(bookId)])
            .then(([loadedBook, loadedReviews]) => {
                if (!active) return;
                setBook(loadedBook);
                setReviews(loadedReviews);
            })
            .catch(() => {
                if (active) setLoadError("Không tải được chi tiết sách. Vui lòng kiểm tra kết nối và thử lại.");
            })
            .finally(() => { if (active) setLoading(false); });
        return () => { active = false; };
    }, [bookId, retry]);

    // Tính lại từ mảng reviews mỗi khi thêm đánh giá, không tải lại trang.
    const average = reviews.length
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
        : 0;

    async function handleSubmit() {
        if (sending || !isLoggedIn || !user || !token) return;
        setFormError("");
        setSuccess("");
        if (rating < 1 || !comment.trim()) {
            setFormError("Vui lòng chọn số sao và nhập bình luận.");
            return;
        }
        setSending(true);
        try {
            const created = await bookService.addReview({
                bookId, userId: user.id, userName: user.name,
                rating, comment: comment.trim(), createdAt: new Date().toISOString(),
            }, token);
            setReviews((current) => [created, ...current]);
            setRating(0);
            setComment("");
            setSuccess("Đã gửi đánh giá của bạn.");
        } catch (error) {
            setFormError(error instanceof Error ? error.message : "Không gửi được đánh giá.");
        } finally {
            setSending(false);
        }
    }

    if (loading) return <View style={styles.center}><ActivityIndicator size="large" color="green" /></View>;
    if (loadError || !book) return (
        <View style={styles.center}>
            <Text style={styles.error}>{loadError || "Không tìm thấy sách."}</Text>
            <Button title="Thử lại" onPress={() => {
                setLoading(true);
                setLoadError("");
                setRetry((value) => value + 1);
            }} />
        </View>
    );

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
                <Image source={{ uri: book.image }} style={styles.cover} accessibilityLabel={`Bìa sách ${book.title}`} />
                <Text style={styles.title}>{book.title}</Text>
                <Text style={styles.text}>Tác giả: {book.author}</Text>
                <Text style={styles.text}>Thể loại: {book.category}</Text>
                <Text style={styles.price}>{book.price.toLocaleString("vi-VN")} đ</Text>
                <Text style={styles.text}>{book.description}</Text>

                <Text style={styles.heading}>Đánh giá sách</Text>
                <RatingStars value={average} size={28} />
                <Text style={styles.text}>
                    {reviews.length ? `${average.toFixed(1)}/5 · ${reviews.length} đánh giá` : "Chưa có đánh giá. Hãy là người đầu tiên!"}
                </Text>
                {reviews.map((review) => (
                    <View key={review.id} style={styles.review}>
                        <Text style={styles.name}>{review.userName}</Text>
                        <RatingStars value={review.rating} size={20} />
                        <Text style={styles.text}>{review.comment}</Text>
                    </View>
                ))}

                <Text style={styles.heading}>Viết đánh giá</Text>
                {isLoggedIn ? (
                    <View>
                        <Text style={styles.text}>Chọn số sao:</Text>
                        <RatingStars value={rating} size={32} onChange={setRating} disabled={sending} />
                        <TextInput
                            style={styles.input} placeholder="Nhập bình luận của bạn"
                            accessibilityLabel="Bình luận đánh giá sách"
                            multiline value={comment} onChangeText={setComment}
                            editable={!sending} maxLength={1000} textAlignVertical="top"
                        />
                        {!!formError && <Text style={styles.error}>{formError}</Text>}
                        {!!success && <Text style={styles.success}>{success}</Text>}
                        <Button title={sending ? "Đang gửi..." : "Gửi đánh giá"} onPress={handleSubmit} disabled={sending} color="green" />
                    </View>
                ) : (
                    <View>
                        <Text style={styles.text}>Bạn cần đăng nhập để gửi đánh giá.</Text>
                        <Button title="Đăng nhập để đánh giá" onPress={() => navigation.navigate("Auth", { redirect: "BookDetail", bookId })} />
                    </View>
                )}
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    content: { padding: 20, paddingBottom: 40 },
    center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
    cover: { width: 150, height: 210, resizeMode: "cover", alignSelf: "center", marginBottom: 20, borderRadius: 8 },
    title: { fontSize: 24, fontWeight: "700", color: "green", marginBottom: 12 },
    heading: { fontSize: 20, fontWeight: "700", marginTop: 24, marginBottom: 12 },
    text: { fontSize: 16, lineHeight: 24, marginBottom: 8 },
    price: { fontSize: 18, fontWeight: "600", color: "green", marginBottom: 12 },
    review: { borderBottomWidth: 1, borderBottomColor: "#e2e8f0", paddingVertical: 12 },
    name: { fontSize: 16, fontWeight: "600" },
    input: { borderWidth: 1, borderColor: "#cbd5e1", borderRadius: 8, padding: 12, minHeight: 100, fontSize: 16, color: "#111827", marginVertical: 12 },
    error: { color: "#dc2626", marginBottom: 12 },
    success: { color: "green", marginBottom: 12 },
});
