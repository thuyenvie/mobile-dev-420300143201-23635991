import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ListRenderItem,
} from 'react-native';

import StudentCard from '../StudentCard/StudentCard';
import CourseCard from '../CourseCard/CourseCard';
import PrimaryButton from '../Button/PrimaryButton';
import SecondaryButton from '../Button/SecondaryButton';
import IconButton from '../Button/IconButton';

interface Announcement {
    id: string;
    label: string;
    value: string;
}

const announcements: Announcement[] = [
    {
        id: '1',
        label: 'Thông báo 1:',
        value: 'Thông báo về thời gian và hình thức đóng học phí cho học kỳ mới',
    },
    {
        id: '2',
        label: 'Thông báo 2:',
        value: 'Thông báo lịch thi cuối kỳ và thời gian có mặt tại phòng thi',
    },
];

export default function CampusDashboard() {

    // Render từng announcement
    const renderAnnouncement: ListRenderItem<Announcement> = ({ item }) => {
        return (
            <View style={styles.announcementItem}>
                <Text style={styles.announcementLabel}>
                    {item.label}
                </Text>

                <Text style={styles.announcementValue}>
                    {item.value}
                </Text>
            </View>
        );
    };

    // Phần đầu của FlatList
    const renderHeader = () => {
        return (
            <View style={styles.headerContainer}>

                <Text style={styles.header}>
                    CAMPUS DASHBOARD
                </Text>

                <StudentCard />

                <CourseCard
                    title="Lập trình ứng dụng di động"
                    teacher="Nguyễn Văn A"
                    description="Môn học cung cấp kiến thức về phát triển ứng dụng di động bằng React Native và Expo."
                    imageSource={{
                        uri: 'https://picsum.photos/600/300',
                    }}
                    imageDescription="Hình ảnh minh họa cho khóa học Lập trình ứng dụng di động"
                    decorative={false}
                />

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        CÁC THÔNG BÁO QUAN TRỌNG DÀNH CHO SINH VIÊN
                    </Text>
                </View>

            </View>
        );
    };

    // Phần cuối của FlatList
    const renderFooter = () => {
        return (
            <View style={styles.footer}>

                <PrimaryButton
                    title="Xem toàn bộ danh sách thông báo dành cho sinh viên"
                    onPress={() => {
                        console.log('Primary button pressed');
                    }}
                    disabled={false}
                    loading={false}
                />

                <SecondaryButton
                    title="Hủy"
                    onPress={() => {
                        console.log('Secondary button pressed');
                    }}
                    disabled={false}
                    loading={false}
                />

                <IconButton
                    icon="refresh"
                    accessibilityLabel="Làm mới danh sách"
                    onPress={() => {
                        console.log('Refresh pressed');
                    }}
                    disabled={false}
                    loading={false}
                />

            </View>
        );
    };

    // Hiển thị khi danh sách không có dữ liệu
    const renderEmpty = () => {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                    Hiện tại không có thông báo nào.
                </Text>
            </View>
        );
    };

    return (
        <FlatList
            data={announcements}

            // Render từng item
            renderItem={renderAnnouncement}

            // Dùng id làm key duy nhất
            keyExtractor={(item) => item.id}

            // Header
            ListHeaderComponent={renderHeader}

            // Footer
            ListFooterComponent={renderFooter}

            // Empty state
            ListEmptyComponent={renderEmpty}

            // Đường phân cách giữa các announcement
            ItemSeparatorComponent={() => (
                <View style={styles.separator} />
            )}

            contentContainerStyle={styles.contentContainer}
        />
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        padding: 20,
        paddingTop: 50,
        paddingBottom: 120,
    },

    headerContainer: {
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
    },

    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    announcementItem: {
        paddingVertical: 12,
    },

    announcementLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 6,
    },

    announcementValue: {
        fontSize: 18,
        lineHeight: 26,
    },

    separator: {
        height: 1,
        backgroundColor: '#999',
        marginVertical: 4,
    },

    emptyContainer: {
        padding: 30,
        alignItems: 'center',
    },

    emptyText: {
        fontSize: 18,
        textAlign: 'center',
    },

    footer: {
        marginTop: 16,
        gap: 16,
    },
});