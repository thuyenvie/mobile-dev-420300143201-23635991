import { StyleSheet, Text, View } from "react-native";

export default function Title() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                SmartCampus
            </Text>
            <Text style={styles.subtitle}>
                Quản lý thông tin sinh viên
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3647E4',
        paddingHorizontal: 18,
        paddingVertical: 16,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },

    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#FFF',
    },

    subtitle: {
        fontSize: 13,
        color: '#DDE2FF',
        marginTop: 4,
    },
});