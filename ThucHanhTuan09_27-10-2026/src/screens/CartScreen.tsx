import React, { useCallback, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../store';
import { removeFromCart, selectCartItems } from '../store/cartSlice';
import type { CartItem } from '../types';
import CartItemRow from '../components/CartItemRow';
import { useDebouncedQuantities } from '../hooks/useDebouncedQuantities';
import { formatVND } from '../utils/format';
type Coupon = {
  code: string;
  label: string;
  apply: (subtotal: number) => number;
};
const COUPONS: Record<string, Coupon> = {
  SALE10: {
    code: 'SALE10',
    label: 'Giảm 10%',
    apply: (s) => Math.round(s * 0.1),
  },
  BOOK50K: {
    code: 'BOOK50K',
    label: 'Giảm 50.000 đ (đơn từ 200.000 đ)',
    apply: (s) => (s >= 200000 ? 50000 : 0),
  },
};
function Line({
  label,
  value,
  bold = false,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <View style={styles.line}>
      <Text style={bold && styles.bold}>{label}</Text>
      <Text style={bold && styles.bold}>{value}</Text>
    </View>
  );
}
export default function CartScreen() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const { drafts, changeQuantity, discard } = useDebouncedQuantities(300);
  const qtyOf = useCallback(
    (i: CartItem) => drafts[i.book.id] ?? i.quantity,
    [drafts],
  );
  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.book.price * qtyOf(i), 0),
    [items, qtyOf],
  );
  const [couponInput, setCouponInput] = useState('');
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const discount = coupon ? Math.min(coupon.apply(subtotal), subtotal) : 0;
  const total = subtotal - discount;
  const applyCoupon = () => {
    const found = COUPONS[couponInput.trim().toUpperCase()];
    if (!found) {
      setCoupon(null);
      Alert.alert('Mã không hợp lệ', 'Thử SALE10 hoặc BOOK50K');
      return;
    }
    setCoupon(found);
  };
  const confirmRemove = useCallback(
    (item: CartItem) => {
      Alert.alert('Xoá sản phẩm', `Bỏ "${item.book.title}" khỏi giỏ hàng?`, [
        { text: 'Huỷ', style: 'cancel' },
        {
          text: 'Xoá',
          style: 'destructive',
          onPress: () => {
            discard(item.book.id);
            dispatch(removeFromCart(item.book.id));
          },
        },
      ]);
    },
    [dispatch, discard],
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(i) => i.book.id}
        renderItem={({ item }) => (
          <CartItemRow
            item={item}
            quantity={qtyOf(item)}
            onChangeQuantity={changeQuantity}
            onRemove={confirmRemove}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text>Giỏ hàng đang trống.</Text>
          </View>
        }
      />
      <View style={styles.footer}>
        <View style={styles.couponRow}>
          <TextInput
            style={styles.input}
            placeholder="Mã giảm giá (SALE10)"
            autoCapitalize="characters"
            value={couponInput}
            onChangeText={setCouponInput}
          />
          <Pressable
            style={styles.button}
            onPress={applyCoupon}
          >
            <Text style={styles.buttonText}>Áp dụng</Text>
          </Pressable>
        </View>
        {coupon && (
          <Pressable
            onPress={() => {
              setCoupon(null);
              setCouponInput('');
            }}
          >
            <Text style={styles.applied}>
              ✓ {coupon.code}: {coupon.label} (bấm để bỏ)
            </Text>
          </Pressable>
        )}
        <Line
          label="Tạm tính"
          value={formatVND(subtotal)}
        />
        {discount > 0 && (
          <Line
            label="Giảm giá"
            value={`− ${formatVND(discount)}`}
          />
        )}
        <Line
          label="Tổng cộng"
          value={formatVND(total)}
          bold
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    padding: 60,
  },
  footer: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#eee',
    gap: 12,
  },
  couponRow: {
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
  button: {
    backgroundColor: '#1769aa',
    borderRadius: 8,
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
  applied: {
    color: '#19714d',
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bold: {
    fontWeight: '700',
    fontSize: 18,
  },
});
