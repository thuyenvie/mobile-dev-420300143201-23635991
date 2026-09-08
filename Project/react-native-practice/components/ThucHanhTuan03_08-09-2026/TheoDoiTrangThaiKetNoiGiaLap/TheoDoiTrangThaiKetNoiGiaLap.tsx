import { useEffect, useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

export default function TheoDoiTrangThaiKetNoiGiaLap() {

    const [isConnected, setIsConnected] = useState(false);
    const [message, setMessage] = useState('Chưa kết nối');

    useEffect(() => {
        if (isConnected) {
            setMessage('Thiết bị đã kết nối');
        } else {
            setMessage('Thiết bị đã ngắt kết nối');
        }
    }, [isConnected]);

    return (
        <View style={styles.container}>
            <Text>
                {isConnected ? 'Kết nối lần cuối: ' + new Date().toLocaleString() : ''}
            </Text>
            <Switch value={isConnected} onValueChange={setIsConnected} />
            <Text style={isConnected ? styles.ConnectedText : styles.DisconnectedText}>
                {message}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingTop: 50
    },
    ConnectedText: {
        color: 'green',
    },
    DisconnectedText: {
        color: 'red',
    }
});