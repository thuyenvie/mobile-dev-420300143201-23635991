import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Button, FlatList, Text, View } from "react-native";

type Product = {
    id: number;
    title: string;
    price: number;
};

export interface ApiResponse<T> {
    data: T[];
    total: number;
    page: number;
}

type ProductsResponse = {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
};

const PAGE_SIZE = 10;

export async function fetchProductPage(page: number): Promise<ApiResponse<Product>> {
    if (!Number.isInteger(page) || page < 1) throw new Error("Trang phải là số nguyên dương.");
    const response = await fetch(`https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${(page - 1) * PAGE_SIZE}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const json = (await response.json()) as ProductsResponse;
    // DummyJSON dùng products/skip/limit; chuyển sang wrapper của đề bài.
    return { data: json.products, total: json.total, page: Math.floor(json.skip / PAGE_SIZE) + 1 };
}

export default function Pagination() {
    const [result, setResult] = useState<ApiResponse<Product>>({ data: [], total: 0, page: 1 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const inFlight = useRef(false);

    const loadPage = async (page: number) => {
        if (inFlight.current) return;
        inFlight.current = true;
        setLoading(true);
        setError(null);
        try {
            setResult(await fetchProductPage(page));
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : "Không thể tải sản phẩm.");
        } finally {
            inFlight.current = false;
            setLoading(false);
        }
    };

    useEffect(() => { void loadPage(1); }, []);
    const totalPages = Math.max(1, Math.ceil(result.total / PAGE_SIZE));

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Text>Trang {result.page}/{totalPages} — Tổng: {result.total}</Text>
            {loading && <ActivityIndicator />}
            {error && <View><Text>{error}</Text><Button title="Thử lại" disabled={loading} onPress={() => void loadPage(result.page)} /></View>}
            <FlatList
                data={result.data}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => <View style={{ padding: 10 }}><Text>{item.title}</Text><Text>${item.price}</Text></View>}
                ListEmptyComponent={!loading && !error ? <Text>Không có sản phẩm.</Text> : null}
            />
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Button title="Trang trước" disabled={loading || result.page <= 1} onPress={() => void loadPage(result.page - 1)} />
                <Button title="Trang sau" disabled={loading || result.page >= totalPages} onPress={() => void loadPage(result.page + 1)} />
            </View>
        </View>
    );
}
