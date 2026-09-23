import { View, Text, StyleSheet } from 'react-native';

export default function Bai02BookGrid() {
  const books = [
    'Lập trình React Native',
    'Java cơ bản',
    'JavaScript',
    'Lập trình Web',
  ];

  return (
    <View style={styles.container}>
      {books.map((book) => (
        <View key={book} style={styles.item}>
          <View style={styles.image}>
            <Text>Ảnh</Text>
          </View>

          <Text style={styles.name}>{book}</Text>
          <Text style={styles.price}>150.000đ</Text>
        </View>
      ))}
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
//   item: {
//     width: '48%',
//     marginBottom: 16,
//   },
//   image: {
//     width: '100%',
//     aspectRatio: 3 / 4,
//     backgroundColor: '#ddd',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   name: {
//     marginTop: 8,
//     fontWeight: 'bold',
//   },
//   price: {
//     marginTop: 4,
//   },
// });
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  item: {
    width: '31%',
  },
  image: {
    width: '100%',
    aspectRatio: 3 / 4,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    marginTop: 8,
    fontWeight: 'bold',
  },
  price: {
    marginTop: 4,
  },
});