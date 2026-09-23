import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function Challenge03() {
  const books = [
    'Lập trình React Native',
    'Java cơ bản',
    'JavaScript',
    'Lập trình Web',
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.grid}>
        {books.map((book, index) => (
          <View key={book} style={styles.card}>
            
            <View style={styles.image}>
              <Text>Ảnh bìa</Text>

              <View style={styles.discountBadge}>
                <Text style={styles.badgeText}>
                  -{index + 1}0%
                </Text>
              </View>
            </View>

            <Text style={styles.name}>{book}</Text>
            <Text>150.000đ</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.cartButton}>
        <Text style={styles.cartText}>Giỏ hàng</Text>

        <View style={styles.cartBadge}>
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
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },
  card: {
    width: '48%',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    aspectRatio: 3 / 4,

    backgroundColor: '#ddd',

    justifyContent: 'center',
    alignItems: 'center',

    position: 'relative',
  },
  discountBadge: {
    position: 'absolute',
    top: 6,
    left: 6,

    backgroundColor: 'red',
    borderRadius: 4,

    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  name: {
    marginTop: 8,
    fontWeight: 'bold',
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
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: -4,

    backgroundColor: 'red',

    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});