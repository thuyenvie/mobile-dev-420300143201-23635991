import { create } from "axios";
import Constants from "expo-constants";
import { Platform } from "react-native";

// JSON Server và Expo chạy trên cùng máy. Web lấy host của trang,
// Expo Go lấy host của Metro để điện thoại truy cập được qua mạng LAN.
const host = Platform.OS === "web" && typeof window !== "undefined"
  ? window.location.hostname
  : Constants.expoConfig?.hostUri?.split(":")[0];

const baseURL = process.env.EXPO_PUBLIC_API_URL
  || `http://${host || (Platform.OS === "android" ? "10.0.2.2" : "localhost")}:3000`;

export const api = create({
  baseURL,
  timeout: 10000,
});

export function setAuthToken(token: string | null) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}
