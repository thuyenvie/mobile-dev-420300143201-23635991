import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import ActionButton from './ActionButton';
import ProductSummary from './ProductSummary';

type HeaderProps = {
  loading: boolean;
  error: string | null;
  onReload: () => void;
};

export default function Header({ loading, error, onReload }: HeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.eyebrow}>REACT NATIVE + DUMMYJSON</Text>
      <Text style={styles.title}>Redux Toolkit</Text>
      <Text style={styles.description}>
        Tải 10 sản phẩm từ API và quản lý danh sách yêu thích bằng Redux.
      </Text>
      <ProductSummary />
      <ActionButton loading={loading} onPress={onReload} />
      {loading && <ActivityIndicator size="large" color="#185adb" />}
      {error && <Text accessibilityRole="alert" style={styles.error}>{error}</Text>}
      <Text style={styles.note}>Yêu thích chỉ lưu trong bộ nhớ, không gửi lên API.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 14,
    marginBottom: 6,
  },

  eyebrow: {
    color: '#526782',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
  },

  title: {
    color: '#142c4d',
    fontSize: 34,
    fontWeight: '800',
  },

  description: {
    color: '#526178',
    fontSize: 16,
    lineHeight: 24,
  },

  error: {
    color: '#b42318',
    fontSize: 15,
    lineHeight: 23,
  },

  note: {
    color: '#526178',
    fontSize: 13,
    lineHeight: 20,
  },
});
