import { useState } from "react";
import { Alert, Button, Text, View } from "react-native";

type CustomError = {
    message: string;
    status: number;
};

export default function ApiErrorHandling() {
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const fetchData = async () => {
        setLoading(true);
        setMessage(null);
        try {
            const response = await fetch(
                "https://dummyjson.com/products/abcxyz"
            );

            if (!response.ok) {
                throw {
                    message: "Không thể lấy dữ liệu từ API",
                    status: response.status,
                };
            }
            const json = await response.json();
            console.log(json);
        } catch (error) {
            const customError: CustomError =
                typeof error === "object" && error !== null &&
                "message" in error && typeof error.message === "string" &&
                "status" in error && typeof error.status === "number"
                    ? error as CustomError
                    : { message: error instanceof Error ? error.message : "Lỗi không xác định", status: 0 };
            setMessage(customError.message + " (HTTP: " + customError.status + ")");
            Alert.alert(
                "Lỗi API",
                `${customError.message}\nStatus: ${customError.status}`
            );
        } finally {
            setLoading(false);
        }
    };
    return (
        <View>
            <Button
                title="Call API"
                disabled={loading}
                onPress={fetchData}
            />
            {loading && <Text>Đang gọi API...</Text>}
            {message && <Text>{message}</Text>}
        </View>
    );
}
