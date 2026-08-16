import {
    StyleSheet,
    Text,
    View,
    Pressable,
    ScrollView,
} from 'react-native';

import StudentCard from '../StudentCard/StudentCard';
import InfoRow from '../InfoRow/InfoRow';

export default function CampusDashboard() {
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
        >

            <Text style={styles.header}>
                BẢNG ĐIỀU KHIỂN THÔNG TIN SINH VIÊN TRONG KHUÔN VIÊN
            </Text>

            <StudentCard />

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    DANH SÁCH CÁC KHÓA HỌC VÀ MÔN HỌC ĐANG ĐƯỢC ĐĂNG KÝ
                </Text>

                <InfoRow
                    label="Môn học số 1:"
                    value="Lập trình ứng dụng di động"
                />

                <InfoRow
                    label="Môn học số 2:"
                    value="Hệ quản trị cơ sở dữ liệu"
                />

                <InfoRow
                    label="Môn học số 3:"
                    value="Phát triển giao diện ứng dụng"
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    CÁC THÔNG BÁO QUAN TRỌNG DÀNH CHO SINH VIÊN
                </Text>

                <InfoRow
                    label="Thông báo 1:"
                    value="Thông báo về thời gian và hình thức đóng học phí cho học kỳ mới"
                />

                <InfoRow
                    label="Thông báo 2:"
                    value="Thông báo lịch thi cuối kỳ và thời gian có mặt tại phòng thi"
                />
            </View>

            <Pressable style={styles.button}>
                <Text style={styles.buttonText}>
                    Xem toàn bộ danh sách thông báo dành cho sinh viên
                </Text>
            </Pressable>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    contentContainer: {
        padding: 20,
        paddingTop: 50,
        paddingBottom: 120,
        gap: 16,
    },

    header: {
        fontSize: 28,
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
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
    },

    button: {
        padding: 14,
        borderWidth: 1,
        borderRadius: 8,
        alignItems: 'center',
    },

    buttonText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});