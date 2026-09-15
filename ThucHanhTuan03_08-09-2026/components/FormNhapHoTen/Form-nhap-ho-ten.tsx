import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function FormNhapHoTen() {
    const [fullName, setFullName] = useState('');
    const [age, setAge] = useState('');
    return (
        <View style={styles.container}>
            <TextInput
                value={fullName}
                onChangeText={setFullName}
                placeholder="Nhập họ tên"
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
            />
            <TextInput
                value={age}
                onChangeText={setAge}
                placeholder="Nhập tuổi"
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
            />
            <Text>
                {fullName ? `Xin chào, ${fullName}!` : 'Vui lòng nhập họ tên'}
            </Text>
            <Text>
                {age ? `Tuổi của bạn là: ${age}` : 'Vui lòng nhập tuổi'}
            </Text>
            <Button
                title="Xóa"
                onPress={() => {
                    setFullName('');
                    setAge('');
                }}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingTop: 50
    }
});