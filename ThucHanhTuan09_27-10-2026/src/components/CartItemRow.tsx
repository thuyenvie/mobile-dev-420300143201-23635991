import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { CartItem } from '../types';
import { formatVND } from '../utils/format';
type Props = {
  item: CartItem;
  quantity: number;
  onChangeQuantity: (id: string, qty: number) => void;
  onRemove: (item: CartItem) => void;
};
function CartItemRow({ item, quantity, onChangeQuantity, onRemove }: Props) {
  const { book } = item;
  const canDecrease = quantity > 1;
  const canIncrease = quantity < book.stock;
  return (
    <View style={styles.row}>
      <Image
        source={{ uri: book.cover }}
        style={styles.cover}
      />
      <View style={styles.info}>
        <Text
          style={styles.title}
          numberOfLines={2}
        >
          {book.title}
        </Text>
        <Text>{formatVND(book.price)}</Text>
        <View style={styles.qtyRow}>
          <Pressable
            disabled={!canDecrease}
            style={[styles.qtyBtn, !canDecrease && styles.disabled]}
            onPress={() => onChangeQuantity(book.id, quantity - 1)}
          >
            <Text>−</Text>
          </Pressable>
          <Text style={styles.qty}>{quantity}</Text>
          <Pressable
            disabled={!canIncrease}
            style={[styles.qtyBtn, !canIncrease && styles.disabled]}
            onPress={() => onChangeQuantity(book.id, quantity + 1)}
          >
            <Text>+</Text>
          </Pressable>
          <Text style={styles.stock}>Còn {book.stock}</Text>
        </View>
        <Text style={styles.subtotal}>
          Thành tiền: {formatVND(book.price * quantity)}
        </Text>
      </View>
      <Pressable
        onPress={() => onRemove(item)}
        hitSlop={8}
      >
        <Text style={styles.remove}>✕</Text>
      </Pressable>
    </View>
  );
}
export default React.memo(CartItemRow);
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
    gap: 12,
  },
  cover: {
    width: 70,
    height: 105,
    borderRadius: 6,
  },
  info: {
    flex: 1,
    gap: 6,
  },
  title: {
    fontWeight: '700',
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  qtyBtn: {
    backgroundColor: '#eee',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  disabled: {
    opacity: 0.35,
  },
  qty: {
    fontWeight: '700',
  },
  stock: {
    fontSize: 12,
    color: '#777',
  },
  subtotal: {
    fontWeight: '600',
    color: '#b33',
  },
  remove: {
    fontSize: 20,
    color: '#999',
  },
});
