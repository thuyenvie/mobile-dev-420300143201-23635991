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
    total: number;
    skip: number;
    limit: number;
}

export default function ProductSearch() {
    const [products, setProducts] = useState<Product[]>([]);
    const [keyword, setKeyword] = useState("");
    const [limit, setLimit] = useState("10");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = async (keyword: string, limit: number) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(keyword)}&limit=${limit}`);
            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }
            const json = (await res.json()) as ProductReponse; setProducts(json.products);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Không thể tải sản phẩm");
        } finally {
            setLoading(false);
        }
    }

    const fetchProducts2 = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`https://dummyjson.com/products`);
            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }
            const json = (await res.json()) as ProductReponse; setProducts(json.products);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Không thể tải sản phẩm");
        } finally {
            setLoading(false);
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
                color={'blue'}
                title="Search"
                disabled={loading}
                onPress={() => {
                    const count = Number(limit);
                    if (!Number.isInteger(count) || count <= 0) {
                        setError("Số sản phẩm phải là số nguyên dương.");
                        return;
                    }
                    void fetchProducts(keyword, count);
                }}
            />
            {loading && <Text>Đang tải...</Text>}
            {error && <Text>{error}</Text>}
            <FlatList
                style={{ flex: 1 }}
                data={products}
                ListEmptyComponent={!loading && !error ? <Text>Không có sản phẩm.</Text> : null}
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
    search: {
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 9,
        height: 50
    },
    product: {
        padding: 10
    }
});
