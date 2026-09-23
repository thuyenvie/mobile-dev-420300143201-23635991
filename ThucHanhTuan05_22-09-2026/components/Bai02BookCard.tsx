import { View, Text, StyleSheet } from 'react-native';

export default function Bai02BookCard() {
  return (
    <View style={styles.card}>
      <View style={styles.cover}>
        <Text>Ảnh bìa</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          Lập trình React Native cơ bản
        </Text>

        <Text style={styles.author}>Tô Nguyễn An Thuyên</Text>

        <Text style={styles.price}>150.000đ</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    gap: 16,
  },

  cover: {
    width: 80,
    height: 110,
    borderRadius: 8,
    backgroundColor: '#ddd',

    justifyContent: 'center',
    alignItems: 'center',
  },

  info: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 110,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  author: {
    fontSize: 14,
  },

  price: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});