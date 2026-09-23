import { View, Text, StyleSheet } from 'react-native';

export default function Bai01Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.logo}>BookStore</Text>

      <View style={styles.actions}>
        <Text>Tìm kiếm</Text>
        <Text>Giỏ hàng</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
 header: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 56,
  paddingHorizontal: 16,
  backgroundColor: 'white',
  borderBlockColor: 'black',
},
  actions: {
    flexDirection: 'row',
    gap: 16,
  },
  logo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});