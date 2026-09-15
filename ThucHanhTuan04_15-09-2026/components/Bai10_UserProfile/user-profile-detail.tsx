import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
};

export default function UserDetail() {
    const [user, setUser] = useState<User | null>(null);

    const [error, setError] = useState<string | null>(null);

    const getUser = async () => {
        try {
            const response = await fetch(
                "https://jsonplaceholder.typicode.com/users/1"
            );
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const json = (await response.json()) as User;
            setUser(json);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Không thể tải người dùng");
        }
    };
    useEffect(() => {
        getUser();
    }, []);
    if (error) return <View style={styles.container}><Text>{error}</Text></View>;
    if (user === null) return <View style={styles.container} />;

    return (
        <View style={styles.container}>
            <Text>Name: {user?.name}</Text>
            <Text>Username: {user?.username}</Text>
            <Text>Email: {user?.email}</Text>
            <Text>Phone: {user?.phone}</Text>
            <Text>Website: {user?.website}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 24,
    flex: 1
  }
});
