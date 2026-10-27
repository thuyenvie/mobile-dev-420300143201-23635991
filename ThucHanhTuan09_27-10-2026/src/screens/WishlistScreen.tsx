import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { useAppSelector } from '../store';
import { selectWishlist } from '../store/wishlistSlice';
import BookGrid from '../components/BookGrid';
type Props = NativeStackScreenProps<RootStackParamList, 'Wishlist'>;
export default function WishlistScreen({ navigation }: Props) {
  const wishlist = useAppSelector(selectWishlist);
  const empty = (
    <View style={styles.empty}>
      <Text style={styles.icon}>♡</Text>
      <Text style={styles.title}>Chưa có sách yêu thích</Text>
      <Text style={styles.hint}>
        Bấm vào biểu tượng trái tim trên sách để lưu lại.
      </Text>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })}
      >
        <Text style={styles.buttonText}>Khám phá sách</Text>
      </Pressable>
    </View>
  );
  return (
    <BookGrid
      books={wishlist}
      onPressBook={(id) => navigation.navigate('BookDetail', { bookId: id })}
      ListEmptyComponent={empty}
    />
  );
}
const styles = StyleSheet.create({
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 24,
  },
  icon: {
    fontSize: 60,
    color: '#888',
  },
  title: {
    fontSize: 19,
    fontWeight: '700',
  },
  hint: {
    textAlign: 'center',
    color: '#666',
  },
  button: {
    padding: 13,
    backgroundColor: '#1769aa',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
});
