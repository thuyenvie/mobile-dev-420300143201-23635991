import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    createAsyncThunk,
    createSlice,
    type PayloadAction,
} from "@reduxjs/toolkit";
import { isAxiosError } from "axios";

import { api } from "../api/client";
import type { AuthResult, User } from "../types";

const AUTH_STORAGE_KEY = "auth";

type AuthState = {
    user: User | null;
    token: string | null;
    isLoggedIn: boolean;
    initialized: boolean;
    restoreError: string | null;
};

const initialState: AuthState = {
    user: null,
    token: null,
    isLoggedIn: false,
    initialized: false,
    restoreError: null,
};

export const restoreSession = createAsyncThunk<AuthResult | null>(
    "auth/restoreSession",
    async () => {
        const raw = await AsyncStorage.getItem(AUTH_STORAGE_KEY);

        if (!raw) return null;

        let saved: AuthResult;

        try {
            saved = JSON.parse(raw);
        } catch {
            await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
            return null;
        }

        if (
            typeof saved?.token !== "string" ||
            !saved.token ||
            !saved?.user?.id
        ) {
            await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
            return null;
        }

        try {
            // Server kiểm tra cả chữ ký và hạn dùng của token (users: 600).
            const response = await api.get<User>(
                `/users/${saved.user.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${saved.token}`,
                    },
                }
            );

            // Chỉ lấy thông tin công khai, không giữ password.
            const user: User = {
                id: response.data.id,
                name: response.data.name,
                email: response.data.email,
            };

            return {
                token: saved.token,
                user,
            };
        } catch (error) {
            if (
                isAxiosError(error) &&
                [401, 403, 404].includes(error.response?.status ?? 0)
            ) {
                await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
                return null;
            }

            throw new Error(
                "Chưa khôi phục được phiên đăng nhập. Bạn có thể tiếp tục xem với tư cách khách."
            );
        }
    }
);

export const logout = createAsyncThunk(
    "auth/logout",
    async () => {
        await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setSession(state, action: PayloadAction<AuthResult>) {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
            state.restoreError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(restoreSession.pending, (state) => {
                state.initialized = false;
                state.restoreError = null;
            })
            .addCase(restoreSession.fulfilled, (state, action) => {
                state.initialized = true;
                state.user = action.payload?.user ?? null;
                state.token = action.payload?.token ?? null;
                state.isLoggedIn = !!action.payload;
            })
            .addCase(restoreSession.rejected, (state, action) => {
                state.initialized = true;
                state.user = null;
                state.token = null;
                state.isLoggedIn = false;
                state.restoreError =
                    action.error.message ?? "Không khôi phục được phiên.";
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.token = null;
                state.isLoggedIn = false;
                state.restoreError = null;
            });
    },
});

export const { setSession } = authSlice.actions;
export default authSlice.reducer;
