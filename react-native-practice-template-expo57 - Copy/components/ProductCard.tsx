import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  inStock: boolean;
};

export type ProductCardProps = {
  product: Product;
  layout?: 'row' | 'tile';
  onSelect: (id: string) => void;
};

const ProductCard = ({ product, layout = 'row', onSelect }: ProductCardProps) => {
  const isTile = layout === 'tile';
  return (
    <TouchableOpacity
      testID="product-card"
      accessibilityRole="button"
      style={[styles.card, isTile && styles.cardTile]}
      onPress={() => onSelect(product.id)}
    >
      <Image
        source={{ uri: product.image }}
        style={isTile ? styles.imageTile : styles.imageRow}
      />
      <View style={styles.details}>
        <Text numberOfLines={1}>{product.name}</Text>
        <Text>⭐ {product.rating.toFixed(1)}</Text>
        {!isTile && <Text>{product.category} • {product.price}</Text>}
        <Text>{product.inStock ? '✅' : '❌'}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create(
    {
        card:{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          padding: 12,
          gap: 12,
          borderRadius: 12,
          backgroundColor: '#f0f0f0',
          marginBottom: 0,
        },
        cardTile:{
          flexDirection: 'column',
          alignItems: 'stretch',
        },
        imageRow: { width: 80, height: 80, resizeMode: 'contain' },
        imageTile: { width: '100%', aspectRatio: 1, resizeMode: 'contain' },
        details: { flex: 1, gap: 4 },
    }
);

export default ProductCard;
