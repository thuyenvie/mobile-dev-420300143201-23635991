import { useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";

export function filterByName<T extends { name: string }>(
    items: T[],
    keyword: string
): T[] {
    return items.filter((item) =>
        item.name.toLowerCase().includes(keyword.toLowerCase())
    );
}

type User = {
    id: number;
    name: string;
};

type Product = {
    id: number;
    name: string;
    price: number;
};

const users: User[] = [
    { id: 1, name: "Nguyen Van An" },
    { id: 2, name: "Tran Van Binh" },
];

const products: Product[] = [
    { id: 1, name: "iPhone 15", price: 1000 },
    { id: 2, name: "Samsung Galaxy", price: 800 },
];

export default function FilteredList() {
    const [keyword, setKeyword] = useState("");
    const filteredUsers = filterByName(users, keyword);
    const filteredProducts = filterByName(products, keyword);

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <TextInput value={keyword} onChangeText={setKeyword} placeholder="Lọc theo tên" style={{ borderWidth: 1, padding: 12 }} />
            <Text>Người dùng</Text>
            <FlatList data={filteredUsers} keyExtractor={item => String(item.id)} renderItem={({ item }) => <Text>{item.name}</Text>} ListEmptyComponent={<Text>Không tìm thấy người dùng.</Text>} />
            <Text>Sản phẩm</Text>
            <FlatList data={filteredProducts} keyExtractor={item => String(item.id)} renderItem={({ item }) => <Text>{item.name} — ${item.price}</Text>} ListEmptyComponent={<Text>Không tìm thấy sản phẩm.</Text>} />
        </View>
    );
}
