import React, { useCallback, useMemo, useState } from 'react';
import {
    Button,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

export default function TimKiemVaTinhTongSanPham() {
    const [keyword, setKeyword] = useState('');

    // Bước 1: Danh sách sản phẩm
    const products = useMemo(
        () => [
            { id: '1', name: 'Áo thun', price: 200000 },
            { id: '2', name: 'Quần jean', price: 450000 },
            { id: '3', name: 'Giày thể thao', price: 800000 },
        ],
        []
    );

    // Bước 3: Lọc sản phẩm
    const filteredProducts = useMemo(() => {
        const normalizedKeyword = keyword.trim().toLowerCase();

        return products.filter(product =>
            product.name.toLowerCase().includes(normalizedKeyword)
        );
    }, [keyword, products]);

    // Bước 4: Tính tổng giá
    const totalPrice = useMemo(() => {
        return filteredProducts.reduce(
            (total, product) => total + product.price,
            0
        );
    }, [filteredProducts]);

    // Bước 5: Chọn sản phẩm
    const handleSelect = useCallback((product: { id: string; name: string; price: number }) => {
        console.log('Đã chọn:', product.name);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Danh sách sản phẩm</Text>

            {/* Bước 2: Ô tìm kiếm */}
            <TextInput
                value={keyword}
                onChangeText={setKeyword}
                placeholder="Tìm sản phẩm..."
                style={styles.input}
            />

            {/* Bước 6: Hiển thị danh sách */}
            <FlatList
                data={filteredProducts}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Button
                            title={`${item.name} - ${item.price.toLocaleString('vi-VN')}đ`}
                            onPress={() => handleSelect(item)}
                        />
                    </View>
                )}
                ListEmptyComponent={
                    <Text style={styles.empty}>Không tìm thấy sản phẩm</Text>
                }
            />

            {/* Bước 7: Hiển thị tổng giá */}
            <Text style={styles.total}>
                Tổng giá: {totalPrice.toLocaleString('vi-VN')}đ
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        gap: 12,
        backgroundColor: 'white'
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },

    input: {
        borderWidth: 1,
        borderColor: '#999',
        borderRadius: 8,
        padding: 12,
    },

    item: {
        marginBottom: 10,
    },

    total: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },

    empty: {
        textAlign: 'center',
        color: 'gray',
        marginTop: 20,
    },
});
