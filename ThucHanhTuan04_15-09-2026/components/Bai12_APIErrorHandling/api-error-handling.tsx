import { Alert, Button, View } from "react-native";

type CustomError = {
    message: string;
    status: number;
};

export default function ApiErrorHandling() {
    const fetchData = async () => {
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
            const customError = error as CustomError;
            Alert.alert(
                "Lỗi API",
                `${customError.message}\nStatus: ${customError.status}`
            );
        }
    };
    return (
        <View>
            <Button
                title="Call API"
                onPress={fetchData}
            />
            {}
        </View>
    );
}
