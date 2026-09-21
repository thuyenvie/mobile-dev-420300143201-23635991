import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import type { Product } from '@/store/productsSlice';

type ProductItemProps = {
  item: Product;
  favorite: boolean;
  onToggleFavorite: (id: number) => void;
};

export default function ProductItem({ item, favorite, onToggleFavorite }: ProductItemProps) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.thumbnail }} style={styles.image} accessibilityLabel={item.title} />
      <View style={styles.details}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${favorite ? 'Bỏ thích' : 'Yêu thích'} ${item.title}`}
          accessibilityState={{ selected: favorite }}
          onPress={() => onToggleFavorite(item.id)}
          style={[styles.favorite, favorite && styles.selected]}>
          <Text style={styles.favoriteText}>{favorite ? '♥ Đã thích' : '♡ Yêu thích'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: 14,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 14,
  },

  image: {
    width: 84,
    height: 100,
    resizeMode: 'contain',
  },

  details: {
    flex: 1,
    gap: 8,
  },

  productTitle: {
    color: '#142c4d',
    fontWeight: '600',
    fontSize: 16,
  },

  price: {
    color: '#185adb',
    fontSize: 18,
    fontWeight: '700',
  },

  favorite: {
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#edf2fa',
  },

  selected: {
    backgroundColor: '#ffe3eb',
  },

  favoriteText: {
    color: '#702b46',
    fontSize: 14,
    fontWeight: '600',
  },
});
