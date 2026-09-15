import { useEffect, useState } from "react";
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

interface ApiResponse<T> {
    data: T[];
    total: number;
    page: number;
}

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchProducts = async () => {
        try {
            const response = await fetch(
                "https://dummyjson.com/products"
            );

            if (!response.ok) {
                throw new Error("API Error");
            }

            const json = await response.json();

            setProducts(json.products);
        } catch (error) {
            console.error(error);
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
        setRefreshing(true);

        try {
            await fetchProducts();
        } finally {
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