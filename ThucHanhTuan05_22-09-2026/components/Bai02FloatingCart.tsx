import { View, Text, StyleSheet } from 'react-native';

export default function Bai02FloatingCart() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.item} />
        <View style={styles.item} />
        <View style={styles.item} />
        <View style={styles.item} />
      </View>

      <View style={styles.cartButton}>
        <Text style={styles.cartText}>Giỏ hàng</Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>4</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    padding: 16,
  },
  content: {
    gap: 16,
  },
  item: {
    height: 52,
    backgroundColor: '#ddd',
  },
  cartButton: {
    position: 'absolute',

    bottom: 24,
    right: 20,

    width: 88,
    height: 88,
    borderRadius: 44,

    backgroundColor: '#6685ed',

    justifyContent: 'center',
    alignItems: 'center',
  },
  cartText: {
    fontWeight: 'bold',
  },
  badge: {
    position: 'absolute',

    top: 0,
    right: -4,

    backgroundColor: 'red',

    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
  },
});