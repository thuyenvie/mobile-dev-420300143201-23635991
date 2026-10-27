import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { useAppSelector } from '../store';
import { selectWishlist } from '../store/wishlistSlice';
export default function AccountScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const count = useAppSelector(selectWishlist).length;
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.item}
        onPress={() => navigation.navigate('Wishlist')}
      >
        <Text style={styles.text}>{'♥  Danh sách yêu thích'}</Text>
        <Text>{count} ›</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
  },
  text: {
    fontSize: 16,
  },
});
