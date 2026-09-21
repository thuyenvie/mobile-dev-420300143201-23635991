import { Pressable, StyleSheet, Text } from 'react-native';

type ActionButtonProps = {
  loading: boolean;
  onPress: () => void;
};

export default function ActionButton({ loading, onPress }: ActionButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: loading }}
      disabled={loading}
      onPress={onPress}
      style={[styles.reload, loading && styles.disabled]}>
      <Text style={styles.reloadText}>{loading ? 'Đang tải...' : 'Tải lại sản phẩm'}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  reload: {
    backgroundColor: '#185adb',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },

  reloadText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },

  disabled: {
    opacity: 0.6,
  },
});
