import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { Book } from '../types';
import { formatVND } from '../utils/format';
import FavoriteButton from './FavoriteButton';
export default function BookCard({
  book,
  onPress,
}: {
  book: Book;
  onPress: (id: string) => void;
}) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => onPress(book.id)}
    >
      <View>
        <Image
          source={{ uri: book.cover }}
          style={styles.cover}
        />
        <FavoriteButton book={book} />
        {book.stock === 0 && <Text style={styles.soldOut}>Hết hàng</Text>}
      </View>
      <Text
        style={styles.title}
        numberOfLines={2}
      >
        {book.title}
      </Text>
      <Text
        style={styles.author}
        numberOfLines={1}
      >
        {book.author}
      </Text>
      <Text style={styles.price}>{formatVND(book.price)}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    elevation: 2,
  },
  cover: {
    width: '100%',
    aspectRatio: 2 / 3,
    borderRadius: 8,
  },
  title: {
    fontWeight: '700',
    marginTop: 8,
    minHeight: 40,
  },
  author: {
    color: '#777',
    fontSize: 12,
  },
  price: {
    color: '#bd332b',
    fontWeight: '700',
    marginTop: 6,
  },
  soldOut: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: '#b91c1c',
    color: '#fff',
    padding: 4,
    borderRadius: 4,
  },
});
