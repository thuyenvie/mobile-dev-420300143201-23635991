import { isAxiosError } from "axios";
import { api } from "../api/client";
import type { Book, Review } from "../types";

export const bookService = {
    async getBooks(): Promise<Book[]> {
        const response = await api.get<Book[]>("/books");
        return response.data;
    },
    async getBook(id: number): Promise<Book> {
        const response = await api.get<Book>(`/books/${id}`);
        return response.data;
    },
    async getReviews(bookId: number): Promise<Review[]> {
        const response = await api.get<Review[]>("/reviews", {
            params: { bookId, _sort: "createdAt", _order: "desc" },
        });
        return response.data;
    },
    async addReview(review: Omit<Review, "id">, token: string): Promise<Review> {
        try {
            const response = await api.post<Review>("/reviews", review, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            if (isAxiosError(error) && [401, 403].includes(error.response?.status ?? 0)) {
                throw new Error("Phiên đăng nhập không hợp lệ. Vui lòng đăng xuất và đăng nhập lại.");
            }
            throw new Error("Không gửi được đánh giá. Vui lòng kiểm tra kết nối và thử lại.");
        }
    },
};
