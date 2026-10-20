import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootState } from "../store";
import type { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Checkout">;

export default function CheckoutScreen({ navigation }: Props) {
    const { user, isLoggedIn } = useSelector(
        (state: RootState) => state.auth
    );

    useEffect(() => {
        if (!isLoggedIn) navigation.replace("Auth", { redirect: "Checkout" });
    }, [isLoggedIn, navigation]);

    if (!isLoggedIn) return null;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Thanh toán</Text>

            <Text style={styles.text}>
                Người mua: {user?.name}
            </Text>

            <Text style={styles.text}>
                Email: {user?.email}
            </Text>

            <Text style={styles.note}>
                Bạn đã đăng nhập và có thể truy cập Checkout.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 24,
    },
    text: {
        fontSize: 16,
        marginBottom: 12,
    },
    note: {
        marginTop: 16,
        color: "green",
    },
});
