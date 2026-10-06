import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

export type Product = {
    id: string;
    name: string;
    rating: number;
    image: string;
    category: string;
    price: number;
    inStock: boolean;
};

export type ProductCardProps = {
    product: Product;
    layout?: "row" | "tile";
    onSelect: (id: string) => void;
};

const ProductCard = ({
    product,
    layout = "row",
    onSelect,
}: ProductCardProps) => {
    const isTile = layout === "tile";

    return (
        <TouchableOpacity
            testID="product-card"
            onPress={() => onSelect(product.id)}
            style={[styles.card, isTile && styles.cardTile]}
        >
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: product.image }}
                    style={[styles.img, isTile && styles.imgTile]}
                />
                {isTile && (
                    <View style={styles.ratingBadge}>
                        <Text style={styles.ratingText}>⭐ {product.rating.toFixed(1)}</Text>
                    </View>
                )}
            </View>
            <View style={[styles.info, isTile && styles.infoTile]}>
                <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
                {!isTile && (
                    <>
                        <Text style={styles.ratingText}>⭐ {product.rating.toFixed(1)}</Text>
                        <Text style={styles.category}>{product.category}</Text>
                        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
                    </>
                )}
                <Text style={styles.stock}>
                    {product.inStock ? "✅" : "❌"}
                </Text>
            </View>
        </TouchableOpacity>
    );
};
export default React.memo(ProductCard);

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 8,
    },
    cardTile: {
        flexDirection: "column",
        flex: 1,
    },
    imageContainer: {
        position: "relative",
    },
    img: {
        width: 70,
        height: 100,
    },
    imgTile: {
        width: "100%",
        aspectRatio: 2/3
    },
    info: {
        flex: 1,
        marginLeft: 10,
        justifyContent: "center",
    },
    infoTile: {
        marginLeft: 0,
        marginTop: 6,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
    },
    category: {
        marginTop: 4,
        color: "gray",
    },
    price: {
        marginTop: 4,
        fontWeight: "bold",
        color: "blue",
    },
    ratingText: {
        marginTop: 4,
        // paddingTop: 100
    },
    stock: {
        marginTop: 4,
    },
    ratingBadge: {
        position: "absolute",
        top: 5,
        right: 5,
    },
});