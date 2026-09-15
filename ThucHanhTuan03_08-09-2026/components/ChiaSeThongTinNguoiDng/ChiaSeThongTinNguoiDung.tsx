import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { defaultUser, UserProvider, useUserContext } from './contexts/UserContext';


function ProfileScreen() {
    const { user, login, logout } = useUserContext();

    if (!user) {
        return (
            <View style={styles.container}>
                <Text>Bạn chưa đăng nhập</Text>
                <Pressable onPress={() => login(defaultUser)}>
                    <Text style={styles.loginButton}>Đăng nhập lại</Text>
                </Pressable>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image source={user.avatar} style={{ width: 80, height: 80 }} />
            <Text >Xin chào, {user.name}</Text>
            <Text >Email: {user.email}</Text>

            <Pressable  onPress={logout}>
                <Text style={styles.logoutButton}>Đăng xuất</Text>
            </Pressable>
        </View>
    );
}

export default function ChiaSeThongTinNguoiDung() {
    return (
        <UserProvider>
            <ProfileScreen />
        </UserProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingTop: 50,
        paddingHorizontal: 20,
        paddingBottom: 30,
        flex: 1,
    },
    loginButton: {
        backgroundColor: 'blue',
        color: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    logoutButton: {
        backgroundColor: 'red',
        color: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    }
});