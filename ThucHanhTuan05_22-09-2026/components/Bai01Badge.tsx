import { View, Text, StyleSheet } from 'react-native';

export default function Bai01Badge() {
  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Text>Ảnh bìa sách</Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>-20%</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  image: {
    width: '100%',
    height: 220,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',

    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 6,
    left: 6,

    backgroundColor: 'red',
    borderRadius: 4,

    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
  },
});