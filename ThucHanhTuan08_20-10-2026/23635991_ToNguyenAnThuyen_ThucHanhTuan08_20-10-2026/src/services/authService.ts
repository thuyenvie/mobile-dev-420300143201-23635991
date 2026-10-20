import { isAxiosError } from "axios";
import { api } from "../api/client";
import type { AuthResult, User } from "../types";

type AuthResponse = {
    accessToken: string;
    user: User;
};

const messages: Record<string, string> = {
    "Cannot find user": "Email hoặc mật khẩu không đúng.",
    "Incorrect password": "Email hoặc mật khẩu không đúng.",
    "Email already exists": "Email đã được sử dụng.",
    "Email format is invalid": "Email không đúng định dạng.",
    "Password is too short": "Mật khẩu quá ngắn.",
    "Email and password are required": "Vui lòng nhập email và mật khẩu.",
};

function toResult(data: AuthResponse): AuthResult {
    return {
        token: data.accessToken,
        user: {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
        },
    };
}

function toAppError(error: unknown): Error {
    if (isAxiosError(error)) {
        if (!error.response) {
            return new Error(
                "Không kết nối được server. Kiểm tra server và địa chỉ IP."
            );
        }

        const data: unknown = error.response.data;

        if (typeof data === "string") {
            return new Error(messages[data] ?? "Yêu cầu không thành công.");
        }

        return new Error("Yêu cầu không thành công. Vui lòng thử lại.");
    }

    return new Error("Có lỗi xảy ra. Vui lòng thử lại.");
}

async function login(
    email: string,
    password: string
): Promise<AuthResult> {
    try {
        const response = await api.post<AuthResponse>("/login", {
            email: email.trim().toLowerCase(),
            password,
        });

        return toResult(response.data);
    } catch (error) {
        throw toAppError(error);
    }
}

async function register(
    name: string,
    email: string,
    password: string
): Promise<AuthResult> {
    try {
        const response = await api.post<AuthResponse>("/register", {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            password,
        });

        return toResult(response.data);
    } catch (error) {
        throw toAppError(error);
    }
}

export const authService = {
    login,
    register,
};
