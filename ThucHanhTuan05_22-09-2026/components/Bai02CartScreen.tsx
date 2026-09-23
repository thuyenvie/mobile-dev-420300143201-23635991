import { SafeAreaView, View, Text, ScrollView, StyleSheet } from 'react-native';
import Bai01BottomTab from './Bai01BottomTab';

export default function Bai02CartScreen() {
  const products = [
    'Lập trình React Native',
    'Java cơ bản',
    'JavaScript',
    'Lập trình Web',
  ];

  return (
    <SafeAreaView style={styles.container}>
      
      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {products.map((product, index) => (
          <View key={product} style={styles.cartItem}>
            <View style={styles.image}>
              <Text>Ảnh</Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.name}>{product}</Text>

              <Text>SL: {index + 1}</Text>

              <Text style={styles.price}>
                150.000đ
              </Text>
            </View>

            <View style={styles.removeButton}>
              <Text>Xóa</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.summary}>
        <Text style={styles.totalLabel}>
          Tổng tiền
        </Text>

        <Text style={styles.total}>
          600.000đ
        </Text>

        <View style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>
            Thanh toán
          </Text>
        </View>
      </View>

      <Bai01BottomTab />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    gap: 12,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',

    padding: 8,

    borderWidth: 1,
    borderColor: '#ddd',
  },
  image: {
    width: 60,
    height: 60,

    backgroundColor: '#ddd',

    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    marginLeft: 12,
    gap: 4,
  },
  name: {
    fontWeight: 'bold',
  },
  price: {
    fontWeight: 'bold',
  },
  removeButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,

    backgroundColor: '#eee',
  },
  summary: {
    padding: 16,

    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  totalLabel: {
    fontSize: 14,
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  checkoutButton: {
    paddingVertical: 12,

    backgroundColor: '#6685ed',

    alignItems: 'center',
  },
  checkoutText: {
    fontWeight: 'bold',
  },
});