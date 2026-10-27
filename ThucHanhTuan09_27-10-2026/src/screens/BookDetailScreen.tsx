import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import type { Book } from '../types';
import { fetchBookById } from '../api/books';
import { useAppDispatch, useAppSelector } from '../store';
import { addToCart, selectQuantityInCart } from '../store/cartSlice';
import FavoriteButton from '../components/FavoriteButton';
import { formatVND } from '../utils/format';
type Props = NativeStackScreenProps<RootStackParamList, 'BookDetail'>;
export default function BookDetailScreen({ route }: Props) {
  const { bookId } = route.params;
  const [book, setBook] = useState<Book | null>(null);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const inCart = useAppSelector(selectQuantityInCart(bookId));
  useEffect(() => {
    let active = true;
    fetchBookById(bookId)
      .then((b) => {
        if (active) setBook(b);
      })
      .catch((e) => {
        if (active) setError((e as Error).message);
      });
    return () => {
      active = false;
    };
  }, [bookId]);
  if (error) return <Text style={styles.message}>Lỗi: {error}</Text>;
  if (!book) return <ActivityIndicator style={{ flex: 1 }} />;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Image
          source={{ uri: book.cover }}
          style={styles.cover}
        />
        <FavoriteButton
          book={book}
          size={24}
          style={{ top: 12, right: 12 }}
        />
      </View>
      <Text style={styles.title}>{book.title}</Text>
      <Text>Tác giả: {book.author}</Text>
      <Text>
        Thể loại: {book.category} · Đánh giá: {book.rating}/10
      </Text>
      <Text style={styles.price}>{formatVND(book.price)}</Text>
      <Text>{book.stock === 0 ? 'Hết hàng' : `Tồn kho: ${book.stock}`}</Text>
      <Text style={styles.description}>{book.description}</Text>
      <Button
        title={
          book.stock === 0
            ? 'Hết hàng'
            : inCart >= book.stock
              ? 'Đã đạt tồn kho'
              : 'Thêm vào giỏ'
        }
        disabled={book.stock === 0 || inCart >= book.stock}
        onPress={() => {
          dispatch(addToCart(book));
          Alert.alert('Giỏ hàng', 'Đã thêm sách vào giỏ hàng.');
        }}
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 18,
    gap: 10,
  },
  cover: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 23,
    fontWeight: '700',
  },
  price: {
    color: '#b22',
    fontSize: 20,
    fontWeight: '700',
  },
  description: {
    lineHeight: 23,
    marginVertical: 8,
  },
  message: {
    padding: 20,
  },
});
