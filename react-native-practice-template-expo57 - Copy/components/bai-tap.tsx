import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import ProductCard, { type Product } from './ProductCard';

type ApiProduct = {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: number;
  thumbnail: string;
  stock: number;
};

export default function BaiTap() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [layout, setLayout] = useState<'row' | 'tile'>('row');

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    async function loadProducts() {
      try {
        const response = await fetch('https://dummyjson.com/products', {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Không thể tải sản phẩm.');
        }

        const data: { products: ApiProduct[] } = await response.json();
        const items = data.products.map((item): Product => ({
          id: String(item.id),
          name: item.title,
          category: item.category,
          price: item.price,
          rating: item.rating,
          image: item.thumbnail,
          inStock: item.stock > 0,
        }));

        if (active) {
          setProducts(items);
        }
      } catch {
        if (active) {
          setError('Không thể tải sản phẩm. Vui lòng kiểm tra kết nối mạng.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadProducts();

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  const onSelect = (id: string) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      Alert.alert(product.name);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <Pressable
        style={styles.toggleButton}
        onPress={() => setLayout((current) => (current === 'row' ? 'tile' : 'row'))}
      >
        <Text style={styles.toggleButtonText}>
          {layout === 'row' ? 'Bật chế độ lưới' : 'Tắt chế độ lưới'}
        </Text>
      </Pressable>

      <FlatList
        data={products}
        numColumns={layout === 'tile' ? 2 : 1}
        contentContainerStyle={layout === 'tile' ? styles.gridList : styles.list}
        columnWrapperStyle={layout === 'tile' ? styles.gridRow : undefined}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={layout === 'tile' ? styles.gridItem : styles.rowItem}>
            <ProductCard product={item} layout={layout} onSelect={onSelect} />
          </View>
        )}
        ListEmptyComponent={<Text>Chưa có sản phẩm.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  list: { padding: 16 },
  gridList: { padding: 12 },
  gridRow: { justifyContent: 'space-between' },
  rowItem: { width: '100%' },
  gridItem: { width: '50%', paddingHorizontal: 6, marginBottom: 12 },
  toggleButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#2f80ed',
    borderRadius: 999,
    marginRight: 16,
    marginTop: 12,
    marginBottom: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
