import { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, TextInput, View } from "react-native";

type Product = {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
}

type ProductReponse = {
    products: Product[];
    skip: number;
    limit: number;
}

export default function ProductSearch() {
    const [products, setProducts] = useState<Product[]>([]);
    const [keyword, setKeyword] = useState("");
    const [limit, setLimit] = useState("");

    const fetchProducts = async (keyword: string, limit: number) => {
        try {
            const res = await fetch(`https://dummyjson.com/products/search?q=${keyword}&limit=${limit}`);
            if (!res.ok) {
                throw new Error("Error");
            }
            const json = (await res.json()) as ProductReponse; setProducts(json.products);
        } catch (error) {
            console.error(error);
        }
    }

    const fetchProducts2 = async () => {
        try {
            const res = await fetch(`https://dummyjson.com/products`);
            if (!res.ok) {
                throw new Error("Error");
            }
            const json = (await res.json()) as ProductReponse; setProducts(json.products);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchProducts2();
    }, [])

    return (
        <View style={styles.container}>
            <TextInput
                value={keyword}
                onChangeText={setKeyword}
                placeholder="Nhập tên sản phẩm"
                style={styles.search}
            />
            <TextInput
                value={limit}
                onChangeText={setLimit}
                placeholder="Số sản phẩm tối đa"
                style={styles.search}
            />

            <Button
                title="Search"
                onPress={() => fetchProducts(keyword, Number(limit))}
            />
            <FlatList
            style={{ flex: 1 }}
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.product}>
                        <Text>Tên sản phẩm: {item.title}</Text>
                        <Text>Mô tả: {item.description}</Text>
                        <Text>Loại: {item.category}</Text>
                        <Text>Giá: ${item.price}</Text>
                    </View>
                )}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    search:{
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 9,
        height: 50
    },
    product:{
        padding: 10
    }
});