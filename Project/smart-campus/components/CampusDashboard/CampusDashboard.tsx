import { StyleSheet, Text, View, Pressable } from 'react-native';
import StudentCard from '../StudentCard/StudentCard';

export default function CampusDashboard() {
    return (
        <View style={styles.container}>

            <Text style={styles.header}>
                CAMPUS DASHBOARD
            </Text>

            <StudentCard />

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    KHÓA HỌC
                </Text>

                <Text>Lập trình Mobile</Text>
                <Text>Cơ sở dữ liệu</Text>
                <Text>Phát triển giao diện</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    THÔNG BÁO
                </Text>

                <Text>Thông báo học phí học kỳ mới</Text>
                <Text>Lịch thi cuối kỳ</Text>
            </View>

            <Pressable style={styles.button}>
                <Text style={styles.buttonText}>
                    Xem tất cả thông báo
                </Text>
            </Pressable>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        gap: 16,
        paddingTop: 50
    },

    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    section: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 16,
        gap: 8,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },

    button: {
        padding: 14,
        borderWidth: 1,
        borderRadius: 8,
        alignItems: 'center',
    },

    buttonText: {
        fontWeight: 'bold',
    },
});