import { StyleSheet, Text, View } from 'react-native';
import { useAppSelector } from '@/store/hooks';

export default function ProductSummary() {
  const total = useAppSelector((state) => state.products.items.length);
  const favorites = useAppSelector((state) => state.products.favoriteIds.length);
  return (
    <View style={styles.summary}>
      <Text style={styles.text} testID="product-summary">
        Đã tải: {total} sản phẩm • Yêu thích: {favorites}
      </Text>
      <Text style={styles.hint}>Component thống kê đọc cùng Redux store với danh sách.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  summary: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#eaf2ff',
    gap: 6,
  },

  text: {
    color: '#16345a',
    fontSize: 16,
    fontWeight: '700',
  },

  hint: {
    color: '#526178',
    fontSize: 13,
    lineHeight: 20,
  },

});
