import { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Text,
    View,
} from "react-native";

type Product = {
    id: number;
    title: string;
    price: number;
};

type ProductsResponse = {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
};

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const refreshInProgress = useRef(false);

    const fetchProducts = async () => {
        setError(null);
        try {
            const response = await fetch(
                "https://dummyjson.com/products"
            );

            if (!response.ok) {
                throw new Error("API Error");
            }

            const json = (await response.json()) as ProductsResponse;

            setProducts(json.products);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Không thể tải sản phẩm.");
        }
    };

    // Tải dữ liệu lần đầu
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                await fetchProducts();
            } finally {
                setIsLoading(false);
            }
        };

        loadInitialData();
    }, []);

    // Pull to refresh
    const handleRefresh = async () => {
        if (refreshInProgress.current || isLoading) return;
        refreshInProgress.current = true;
        setRefreshing(true);

        try {
            await fetchProducts();
        } finally {
            refreshInProgress.current = false;
            setRefreshing(false);
        }
    };

    if (isLoading) {
        return (
            <View>
                <ActivityIndicator />
            </View>
        );
    }

    return (
        <FlatList
            style={{ flex: 1 }}
            ListHeaderComponent={error ? <Text>{error}</Text> : null}
            ListEmptyComponent={<Text>Chưa có sản phẩm. Kéo xuống để tải lại.</Text>}
            data={products}
            keyExtractor={(item) => item.id.toString()}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            renderItem={({ item }) => (
                <View>
                    <Text>{item.title}</Text>
                    <Text>${item.price}</Text>
                </View>
            )}
        />
    );
}
