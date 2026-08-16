import {
    StyleSheet,
    Text,
    View,
    SectionList,
    SectionListData,
    SectionListRenderItem,
} from 'react-native';

import StudentCard from '../StudentCard/StudentCard';
import InfoRow from '../InfoRow/InfoRow';
import CourseCard from '../CourseCard/CourseCard';
import PrimaryButton from '../Button/PrimaryButton';
import SecondaryButton from '../Button/SecondaryButton';
import IconButton from '../Button/IconButton';

interface Announcement {
    id: string;
    label: string;
    value: string;
}

interface AnnouncementSection {
    title: string;
    data: Announcement[];
}

const announcementSections: AnnouncementSection[] = [
    {
        title: 'Today',
        data: [
            {
                id: '1',
                label: 'Thông báo 1:',
                value: 'Thông báo về thời gian và hình thức đóng học phí cho học kỳ mới',
            },
        ],
    },

    {
        title: 'This Week',
        data: [
            {
                id: '2',
                label: 'Thông báo 2:',
                value: 'Thông báo lịch thi cuối kỳ và thời gian có mặt tại phòng thi',
            },
            {
                id: '3',
                label: 'Thông báo 3:',
                value: 'Thông báo cập nhật lịch học và phòng học trong tuần này',
            },
        ],
    },

    {
        title: 'Earlier',
        data: [
            {
                id: '4',
                label: 'Thông báo 4:',
                value: 'Thông báo về việc cập nhật thông tin sinh viên trên hệ thống',
            },
        ],
    },
];

export default function CampusDashboard() {

    // Render từng announcement
    const renderAnnouncement: SectionListRenderItem<Announcement> = ({
        item,
    }) => {
        return (
            <InfoRow
                label={item.label}
                value={item.value}
            />
        );
    };

    // Render tiêu đề của từng section
    const renderSectionHeader = ({
        section,
    }: {
        section: SectionListData<Announcement, AnnouncementSection>;
    }) => {
        return (
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>
                    {section.title}
                </Text>
            </View>
        );
    };

    // Header của toàn bộ SectionList
    const renderHeader = () => {
        return (
            <View style={styles.headerContainer}>

                <Text style={styles.header}>
                    BẢNG ĐIỀU KHIỂN THÔNG TIN SINH VIÊN TRONG KHUÔN VIÊN
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

    // Footer của toàn bộ SectionList
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

    // Hiển thị khi toàn bộ danh sách rỗng
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
        <SectionList
            sections={announcementSections}

            // Render từng announcement
            renderItem={renderAnnouncement}

            // Key duy nhất cho từng announcement
            keyExtractor={(item) => item.id}

            // Header của toàn bộ danh sách
            ListHeaderComponent={renderHeader}

            // Footer của toàn bộ danh sách
            ListFooterComponent={renderFooter}

            // Empty state
            ListEmptyComponent={renderEmpty}

            // Header của từng section
            renderSectionHeader={renderSectionHeader}

            // Sticky section headers
            stickySectionHeadersEnabled={true}

            // Separator giữa các announcement
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

    sectionHeader: {
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 12,
    },

    sectionHeaderText: {
        fontSize: 22,
        fontWeight: 'bold',
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