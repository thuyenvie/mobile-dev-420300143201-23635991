import { useEffect } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProducts, toggleFavorite } from '@/store/productsSlice';
import Header from './Header';
import ProductItem from './ProductItem';

export default function ReduxToolkitDemo() {
  const dispatch = useAppDispatch();
  const { items, status, error, favoriteIds } = useAppSelector((state) => state.products);
  const loading = status === 'loading';

  useEffect(() => {
    if (status === 'idle') {
      void dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const handleReload = () => {
    void dispatch(fetchProducts());
  };

  const handleToggleFavorite = (id: number) => {
    dispatch(toggleFavorite(id));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <FlatList
        data={items}
        extraData={favoriteIds}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.listContent}
        // horizontal={true}
        ListHeaderComponent={
          <Header loading={loading} error={error} onReload={handleReload} />
        }
        ListEmptyComponent={
          status === 'succeeded' ? <Text style={styles.description}>Chưa có sản phẩm.</Text> : null
        }
        renderItem={({ item }) => (
          <ProductItem
            item={item}
            favorite={favoriteIds.includes(item.id)}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
        ListFooterComponent={
          <Text style={styles.note}>
            dispatch → pending → API → fulfilled hoặc rejected → giao diện
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },

  listContent: {
    padding: 20,
    gap: 14,
    width: '100%',
    maxWidth: 700,
    alignSelf: 'center',
  },

  description: {
    color: '#526178',
    fontSize: 16,
    lineHeight: 24,
  },

  note: {
    color: '#526178',
    fontSize: 13,
    lineHeight: 20,
  },
});
