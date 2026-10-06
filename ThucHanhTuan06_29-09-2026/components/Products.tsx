import React, { useCallback, useEffect, useState } from "react";
import {ActivityIndicator, Alert, FlatList, RefreshControl, StyleSheet, Switch, Text, View} from "react-native";

import ProductCard, { Product } from "./ProductCard";

const API_URL =
    "https://6abb7976b2118ed7abb8ab43.mockapi.io/products";

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [isTile, setIsTile] = useState(false);

    const fetchProducts = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            Alert.alert("Lỗi", "Không thể tải danh sách sản phẩm");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchProducts();
    }, []);

    const onSelect = (id: string) => {
        const product = products.find((p) => p.id === id);
        if (product) {
            Alert.alert(product.name);
        }
    };

    const numColumns = isTile ? 2 : 1;

    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Dạng lưới</Text>
                <Switch
                    value={isTile}
                    onValueChange={setIsTile}
                />
            </View>
            <FlatList
                key={String(numColumns)}
                data={products}
                numColumns={numColumns}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ProductCard
                        product={item}
                        layout={isTile ? "tile" : "row"}
                        onSelect={onSelect}
                    />
                )}
                columnWrapperStyle={
                    isTile ? styles.columnWrapper : undefined
                }
                contentContainerStyle={styles.list}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    headerText: {
        marginRight: 8,
        fontSize: 15,
    },
    list: {
        paddingHorizontal: 8,
        paddingBottom: 20,
    },
    columnWrapper: {
        justifyContent: "space-between",
    },
});